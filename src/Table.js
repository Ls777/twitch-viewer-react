import React from 'react';
import { Transition } from 'react-spring'

import Channel from './Channel.js'

const Table = ({channels, onDismiss, hideOffline}) =>
  <ul>
    <Transition
        native
        keys={channels}
        from={{ transform: 'translate(110%)', height: 150}}
        enter={{ transform: 'translate(0px)' , height: 150}}
        leave={{ transform: 'translate(100%)', height: 0, margin: 0, border: 0}}
    >

    {channels.map(item => styles =>
      <Channel 
        style={styles}
        key={item}
        id={item}
        onDismiss={onDismiss}
        hideOffline={hideOffline}>
      </Channel>
    )}
    </Transition>
  </ul>

export default Table