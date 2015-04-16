#!/bin/bash

get_iplayer \
  --quiet \
  --pid=b05rhvgc\
  --stream \
  --modes=hls | \
mplayer -framedrop \
  -contrast 25 \
  -really-quiet \
  -vo caca \
  -cache 8000 \
  /dev/fd/3 3<&0 </dev/tty
  
  exit 0