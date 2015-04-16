# iplayer-cli

Browse and watch BBC iPlayer from your terminal.

Uses [get_iplayer](https://github.com/get-iplayer/get_iplayer) for access to iPlayer content and [MPlayer](https://www.mplayerhq.hu/) with [libcaca](http://caca.zoy.org/wiki/libcaca) for playback in the terminal, all  wrapped up in an interface powered by [blessed](https://github.com/chjj/blessed).

## Installation

Dependencies can be installed on OS X using [Homebrew](http://brew.sh/):

    $ brew tap dinkypumpkin/get_iplayer
    $ brew update
    $ brew install get_iplayer --with-deps libcaca mplayer --with-libcaca

You also need to install the required Node.js modules:

    $ npm install

## Usage

Run using:

    $ node iplayer-cli

Use the arrow keys to navigate the programme list and press enter to select.

As MPlayer is used for playback you can use any of the keyboard shortcuts it supports. The most important of these is `q`, which will quit the player and return you to the programme list.
