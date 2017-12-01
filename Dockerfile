###################################
# NOTE: Must build from application root context with "-f"
#
# NOTE: This file uses multi-stage builds. An external script can be used to easily find the
#       various stage layers using the 'docker history' command
###################################


# A build config to declare which stage is tagged as the final layer
ARG ARG_FINAL_STAGE

###################################
#
# STAGE: base_os
#
###################################
FROM        ubuntu:16.04 AS base_os
MAINTAINER  Brace Larsen <brace.larsen@gmail.com>
LABEL       "aboutBrace.name"="Base_OS"

# -- Configure the OS for nodejs, create an underprivileged runtime user for the nodejs application.
RUN set -ex \
 && groupadd --gid 1000 app \
 && useradd --uid 1000 --gid app --shell /bin/false --create-home app

# -- Declare a home directory for the nodejs application.
ENV ENV_HOME=/app

# -- 'gosu' configs, these args are handy for devs to use for testing and bumping versions
ARG ARG_GOSU_VERSION=1.10
ARG ARG_GOSU_GPG_KEY=B42F6819007F00F88E364FD4036A9C25BF357DD4

# -- Install 'gosu' utility, 'gosu' is like sudo for containers.
RUN set -ex \
# Config temporary and permenant dependencies needed
 && perm_deps='ca-certificates' \
 && temp_deps='wget' \
# grab dependencies needed to fetch binaries
 && apt-get update \
 && apt-get install -y --no-install-recommends $temp_deps $perm_deps \
 && rm -rf /var/lib/apt/lists/* \
# now we can securely fetch the binaries
 && dpkg_arch="$(dpkg --print-architecture | awk -F- '{ print $NF }')" \
 && wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/$ARG_GOSU_VERSION/gosu-$dpkg_arch" \
 && wget -O /usr/local/bin/gosu.asc "https://github.com/tianon/gosu/releases/download/$ARG_GOSU_VERSION/gosu-$dpkg_arch.asc" \
# verify the signature
 && export GNUPGENV_HOME="$(mktemp -d)" \
 && gpg --keyserver ha.pool.sks-keyservers.net --recv-keys $ARG_GOSU_GPG_KEY \
 && gpg --batch --verify /usr/local/bin/gosu.asc /usr/local/bin/gosu \
 && rm -r "$GNUPGENV_HOME" /usr/local/bin/gosu.asc \
 && chmod +x /usr/local/bin/gosu \
# clean up the dependencies that were needed to download
 && apt-get purge -y --auto-remove $temp_deps

LABEL  "aboutBrace.image.stage"="base"


###################################
#
# STAGE: nodejs_from_package
#
###################################
FROM  base_os AS nodejs_from_package

# -- Nodejs configs
#   These args are handy for devs to use when testing version bumps
ARG ARG_NODEJS_FULL_VERSION=8.9.1
ARG ARG_NPM_VERSION=5.5.1

# NPM log verbosity. Acceptable Values: silent, error, warn, http, info, verbose, and silly
ARG ARG_NPM_CONFIG_LOGLEVEL=info
ENV NPM_CONFIG_LOGLEVEL=$ARG_NPM_CONFIG_LOGLEVEL

# -- Install nodejs from package manager in the container
RUN set -ex \
 && temp_deps='rlwrap wget python' \
 && apt-get update \
# fetch dependencies needed to download the sources
 && apt-get install -y --no-install-recommends $temp_deps \
 && rm -rf /var/lib/apt/lists/* \
# will store in tmp space
 && cd /tmp \
# now we can securely fetch the binaries from https://deb.nodesource.com/node_8.x/pool/main/n/nodejs/
 && nodejsMajorVersion=$( echo "$ARG_NODEJS_FULL_VERSION" | cut -c1 ) \
 && wget https://deb.nodesource.com/node_${nodejsMajorVersion}.x/pool/main/n/nodejs/nodejs_$ARG_NODEJS_FULL_VERSION-1nodesource1_amd64.deb \
# now install the binaries
 && dpkg -i nodejs_$ARG_NODEJS_FULL_VERSION-1nodesource1_amd64.deb \
# lets cleanup
 && rm -f nodejs_$ARG_NODEJS_FULL_VERSION-1nodesource1_amd64.deb \
# set NPM to the specific version we like
 && npm set depth 0 \
 && npm install --global npm@$ARG_NPM_VERSION \
# clean up the NPM cache
 && npm cache clean --force \
# update the PATH variable
 && printf '\n # Node.js\nexport PATH="node_modules/.bin:$PATH"' >> /root/.bashrc \
# clean up the dependencies that were needed to download
 && apt-get purge -y --auto-remove $temp_deps

# -- Setup conventional base settings
WORKDIR $ENV_HOME
ENTRYPOINT [ "bash", "scripts/entrypoint.sh" ]

# allows scripts that need to identify image history tags
LABEL "aboutBrace.image.stage"="package"


###################################
#
# STAGE: nodejs_with_dependencies
#
###################################
FROM nodejs_from_package AS nodejs_with_dependencies

# -- Install some OS dependencies needed before installing App dependencies
RUN set -ex \
# config temporary dependencies needed
 && temp_deps='build-essential git python' \
# grab dependencies needed to fetch binaries
 && apt-get update \
 && apt-get install -y --no-install-recommends $temp_deps \
 && rm -rf /var/lib/apt/lists/*

# -- Prepare to install NPM dependencies in underprivileged userspace
#    Forces subsequent layer to rebuld if dependencies changes otherwise caches
COPY package.json $ENV_HOME/

RUN set -ex \
# Allow npm access to the app directory when installing as an underprivileged runtime user.
 && chown -vR app: $ENV_HOME/

# -- Make docker rebuilds faster with layer caching
USER app

RUN set -ex \
# Install the minimal dependencies needed for production use
 && NODE_ENV=production \
 && npm install --rebuild --only=production \
 && npm dedupe \
# Save a copy of the production dependencies
 && cp -R node_modules prod_node_modules \
# Install 'ALL' dependencies: production and development
 && NODE_ENV=development \
 && npm install \
 && npm dedupe \
 && npm cache clean --force

USER root

# allows scripts that need to identify image history tags
LABEL "aboutBrace.image.stage"="dependencies"


###################################
#
# STAGE: nodejs_sources
#
###################################
FROM nodejs_from_package AS nodejs_sources

# Copy code sources into the container.
COPY . $ENV_HOME


###################################
#
# STAGE: nodejs_test
#
###################################
FROM nodejs_sources AS nodejs_test

# -- Copy sources into container
# Dev node_modules are from dependencies image built on an earlier stage
COPY --from=nodejs_with_dependencies $ENV_HOME/node_modules $ENV_HOME/node_modules

# allows scripts that need to identify image history tags
LABEL "aboutBrace.image.stage"="test"


###################################
#
# STAGE: nodejs_local
#
###################################
FROM nodejs_sources AS nodejs_local

# -- Copy sources into container as root
# Dev node_modules are from dependencies image built on an earlier stage
COPY --from=nodejs_with_dependencies $ENV_HOME/node_modules $ENV_HOME/node_modules
# Prod node_modules are from dependencies image built on an earlier stage
COPY --from=nodejs_with_dependencies $ENV_HOME/prod_node_modules $ENV_HOME/node_modules

# allows scripts that need to identify image history tags
LABEL "aboutBrace.image.stage"="local"


###################################
#
# STAGE: nodejs_prod
#
###################################
FROM nodejs_sources AS nodejs_prod

# -- Copy sources into container
# Prod node_modules are from dependencies image built on an earlier stage
COPY --from=nodejs_with_dependencies $ENV_HOME/prod_node_modules $ENV_HOME/node_modules

# allows scripts that need to identify image history tags
LABEL "aboutBrace.image.stage"="prod"


###################################
#
# STAGE: FINAL
#
###################################
FROM $ARG_FINAL_STAGE
