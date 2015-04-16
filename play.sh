#!/bin/bash

PID=$1

get_iplayer \
    --silent \
    --pid=$PID\
    --stream \
    --modes=hls | \
  mplayer -framedrop \
    -contrast 25 \
    -really-quiet \
    -vo caca \
    -cache 8192 \
    /dev/fd/3 3<&0 </dev/tty
