import React from 'react';
import Channel from './Channel.js'

const Table = ({channels, onDismiss, hideOffline}) =>
  <ul>
    {channels.map((item) => 
      <Channel 
        key={item}
        id={item}
        onDismiss={onDismiss}
        hideOffline={hideOffline}>
      </Channel>
    )}
  </ul>

export default Table