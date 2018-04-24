import React from 'react';
import { Transition } from 'react-spring'

import Channel from './Channel.js'

const Table = ({channels, onDismiss, hideOffline}) =>
  <ul>
    <Transition
        native
        keys={channels}
        from={{ transform: 'translate(110%)', opacity: 1,  marginBottom: "0em"}}
        enter={{ transform: 'translate(0%)' , opacity: 1,  marginBottom: "0em"}}
        leave={{ transform: 'translate(110%)',  opacity: 0,  marginBottom: "-10.375rem;" }}
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