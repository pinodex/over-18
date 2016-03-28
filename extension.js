/*!
 * Over 18 Chrome extension
 * 
 * Watch age restricted YouTube videos without signing in.
 */

(function() {
  var head, button, text;
  
  head = document.getElementById('yt-masthead-signin');

  if (head == null) {
    return;
  }

  button = document.createElement('a');
  text = document.createElement('span');

  button.className = 'yt-uix-button yt-uix-button-default';
  button.style.marginRight = '15px';

  text.className = 'yt-uix-button-content';
  text.innerHTML = 'I\'m Over 18';

  button.addEventListener('click', watch, false);

  button.appendChild(text);
  head.insertBefore(button, head.firstChild);

  function watch() {
    var playerWarning, playerTarget, playerFrame, videoId;

    playerWarning = document.getElementById('player-unavailable');

    if (playerWarning.classList.contains('hid')) {
      return;
    }

    playerTarget = document.getElementById('player-api');
    playerFrame = document.createElement('iframe');
    videoId = document.getElementById('page').className.match(/video-(.*) /)[1];

    playerFrame.style.height = '100%';
    playerFrame.style.width = '100%';
    
    playerFrame.setAttribute('allowfullscreen', 'allowfullscreen');
    playerFrame.setAttribute('src', '//www.youtube.com/embed/' + videoId + '?autoplay=true');
    
    playerFrame.addEventListener('load', function() {
      playerWarning.classList.add('hid');
      button.removeAttribute('disabled');
    });

    playerTarget.classList.remove('off-screen-target');
    playerTarget.appendChild(playerFrame);

    button.setAttribute('disabled', 'disabled');
  }
}());
