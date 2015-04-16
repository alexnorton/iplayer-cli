var blessed = require('blessed'),
  request = require('request'),
  child_process = require('child_process'),
  spawn = require('node-spawn');

// Create a screen object.
var screen = blessed.screen({
  autoPadding: true,
  smartCSR: true
});

screen.key('C-c', function() {
  return process.exit(0);
});

screen.title = 'iplayer-cli';

// Create a box perfectly centered horizontally and vertically.
// var box = blessed.box({
//   top: 'center',
//   left: 'center',
//   width: '50%',
//   height: '50%',
//   content: 'Hello {bold}world{/bold}!',
//   tags: true,
//   border: {
//     type: 'line'
//   },
//   style: {
//     fg: 'white',
//     bg: 'magenta',
//     border: {
//       fg: '#f0f0f0'
//     },
//     hover: {
//       bg: 'green'
//     }
//   }
// });

request({
  url: 'http://ibl.api.bbci.co.uk/ibl/v1/home/highlights?rights=web',
  json: true
}, function(error, response, body) {
  
  var episodes = body.home_highlights.elements.filter(function(element) { return element.type == 'episode' ; });
  
  var details = blessed.box({
    parent: screen,
    top: '0',
    left: 'center',
    width: '50%',
    height: '110',
    content:  "  _      _                          _ _ \n" +
              " (_)_ __| |__ _ _  _ ___ _ _ ___ __| (_)\n" +
              " | | '_ \\ / _` | || / -_) '_|___/ _| | |\n" +
              " |_| .__/_\\__,_|\\_, \\___|_|     \\__|_|_|\n" +
              "   |_|          |__/                    \n",
    align: 'center',
    style: {
      bg: 'magenta',
      fg: 'black',
      bold: true
    },
    border: {
      type: 'line'
    }
  });
  
  var list = blessed.list({
    parent: screen,
    top: '110',
    left: 'center',
    width: '50%',
    height: '100%',
    padding: {
      left: 1,
      right: 1
    },
    keys: true,
    label: 'Highlights',
    border: {
      type: 'line'
    },
    style: {
      fg: 'magenta',
      bg: 'black',
      selected: {
        fg: 'black',
        bg: 'magenta'
      },
      border: {
        fg: '#f0f0f0'
      },
      hover: {
        bg: 'green'
      }
    },
    items: episodes.map(function(episode) { return episode.title + ' - ' + episode.subtitle; })
  });
  
  list.on('hover', function(item, index) {
    console.log(item, index);
  });

  list.focus();

  list.on('select', function(item, index) {
    var terminal = blessed.terminal({
      parent: screen,
      width: '100%',
      height: '100%'
    });
    
    var episode = episodes[index];
    
    screen.spawn('./play.sh', null, null);
    
    //terminal.pty.write('get_iplayer --quiet --pid=' + episode.id + ' --stream --modes=hls | mplayer -vf framestep=30 -really-quiet -vo caca -cache 8000 -\r\n');

    screen.key('C-x', function() {
      terminal.pty.destroy();
      screen.remove(terminal);
    });

  });

  screen.render();
  
})



// // screen.append(terminal);
// 
// // Append our box to the screen.
// // screen.append(box);
// 
// // Add a PNG icon to the box (X11 only)
// var icon = blessed.image({
//   parent: box,
//   top: 0,
//   left: 0,
//   width: 'shrink',
//   height: 'shrink',
//   file: __dirname + '/my-program-icon.png',
//   search: false
// });
// 
// // If our box is clicked, change the content.
// box.on('click', function(data) {
//   box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
//   screen.render();
// });
// 
// // If box is focused, handle `enter`/`return` and give us some more content.
// box.key('enter', function(ch, key) {
//   box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
//   box.setLine(1, 'bar');
//   box.insertLine(1, 'foo');
//   screen.render();
// });
// 
// // Quit on Escape, q, or Control-C.
// screen.key(['escape', 'q', 'C-c'], function(ch, key) {
//   return process.exit(0);
// });
// 
// // Focus our element.
// box.focus();





// terminal.pty.write('get_iplayer --quiet --pid=p02mwfcg --stream --modes=hls | mplayer -vf framestep=5 -quiet -vo caca -cache 8000 -\r\n');
