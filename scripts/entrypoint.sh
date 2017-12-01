#!/bin/bash
set -e

set -- gosu app "$@"

exec "$@"
