import React from 'react';

const Stream = (channel) =>
  <iframe
    src={`http://player.twitch.tv/?channel=${channel}&muted=true`}
    height="720"
    width="1280"
    frameborder="0"
    scrolling="no"
    allowfullscreen="true">
  </iframe>

  export default Stream