#!/usr/bin/env bash
set -e

CUR=`dirname $0`
# $1 压缩文件夹名
tar -C $CUR/dist/$1/ -czf $CUR/dist/$1.tar.gz .
