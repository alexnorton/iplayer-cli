var blessed = require('blessed'),
  request = require('request');

var screen = blessed.screen({
  autoPadding: true,
  smartCSR: true
});

screen.key('C-c', function() {
  return process.exit(0);
});

screen.title = 'iplayer-cli';

request({
  url: 'http://ibl.api.bbci.co.uk/ibl/v1/home/highlights?rights=web',
  json: true
}, function(error, response, body) {

  if(error) {
    return process.exit(0);
  }

  var episodes = body.home_highlights.elements.filter(function(element) {
    return element.type == 'episode';
  });

  var details = blessed.box({
    parent: screen,
    top: '0',
    left: 'center',
    width: '50%',
    height: 7,
    content:  '  _      _                          _ _ \n' +
              ' (_)_ __| |__ _ _  _ ___ _ _ ___ __| (_)\n' +
              ' | | \'_ \\ / _` | || / -_) \'_|___/ _| | |\n' +
              ' |_| .__/_\\__,_|\\_, \\___|_|     \\__|_|_|\n' +
              '   |_|          |__/                    \n',
    align: 'center',
    style: {
      bg: 'magenta',
      fg: 'white',
      bold: true
    },
    border: {
      type: 'line'
    }
  });

  var list = blessed.list({
    parent: screen,
    top: 7,
    left: 'center',
    width: '50%',
    bottom: 0,
    padding: {
      left: 1,
      right: 1
    },
    keys: true,
    mouse: false,
    label: 'Highlights',
    border: {
      type: 'line'
    },
    style: {
      fg: 'magenta',
      bg: 'default',
      invert: true,
      selected: {
        fg: 'default',
        bg: 'magenta'
      }
    },
    items: episodes.map(function(episode) {
      return episode.title + (episode.subtitle ? ' - ' + episode.subtitle : '');
    })
  });

  list.on('hover', function(item, index) {
    console.log(item, index);
  });

  list.focus();

  list.on('select', function(item, index) {

    var loading = blessed.box({
      parent: screen,
      top: 'center',
      left: 'center',
      width: '25%',
      height: 3,
      content:  'Loading...',
      align: 'center',
      style: {
        bg: 'default',
        fg: 'magenta'
      },
      border: {
        type: 'line'
      }
    });

    screen.render();

    var episode = episodes[index];

    setTimeout(function() {
      screen.exec('./play.sh', [episode.id], null, function() {
        screen.remove(loading);
        screen.render();
      });
    }, 0);

  });

  screen.render();

});
