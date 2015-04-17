# iplayer-cli

Browse and watch BBC iPlayer from your terminal.

Uses [get_iplayer](https://github.com/get-iplayer/get_iplayer) for access to iPlayer content and [MPlayer](https://www.mplayerhq.hu/) with [libcaca](http://caca.zoy.org/wiki/libcaca) for playback in the terminal, all  wrapped up in an interface powered by [blessed](https://github.com/chjj/blessed).

![Programmes list screenshot](https://i.imgur.com/QOcQFMk.png)

![Player screenshot](https://i.imgur.com/DshTZoh.png)

## Installation

#### Mac OS X
Dependencies can be installed on OS X using [Homebrew](http://brew.sh/):

    $ brew tap dinkypumpkin/get_iplayer
    $ brew update
    $ brew install get_iplayer --with-deps libcaca mplayer --with-libcaca

You also need to install the required Node.js modules:

    $ npm install

#### Linux
`cd` to the directory where you want to install `get_iplayer`

    $ git clone git@github.com:get-iplayer/get_iplayer.git && cd get_iplayer && chmod 755 ./get_iplayer
    $ sudo apt-get install rtmpdump mplayer libcaca0 ffmpeg atomicparsley id3v2

`cd` again to the directory where you want to install `iplayer-cli`

    $ git clone git@github.com:alexnorton/iplayer-cli.git && cd iplayer-cli && npm install
   
Edit `play.sh` to match the path of your `get-iplayer` executable.
*Example:*

    #!/bin/bash
    
    PID=$1
    
    ~/softs/get_iplayer/get_iplayer \
        --silent \
        --pid=$PID\
        --stream \
        --modes=hlslow | \
      mplayer -framedrop \
        -contrast 25 \
        -really-quiet \
        -vo caca \
        -cache 8192 \
        /dev/fd/3 3<&0 </dev/tty



## Usage

Run using:

    $ node iplayer-cli

Use the arrow keys to navigate the programme list and press enter to select.

As MPlayer is used for playback you can use any of the keyboard shortcuts it supports. The most important of these is `q`, which will quit the player and return you to the programme list.
