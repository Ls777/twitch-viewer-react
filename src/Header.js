import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faSearchPlus } from '@fortawesome/fontawesome-free-solid'
import { faTwitch } from '@fortawesome/fontawesome-free-brands'

const Header = ({onSubmit, handleChange}) =>
  <div className="header-container">
    <div className="header">
      <div className="header-icon">
        <FontAwesomeIcon icon={faTwitch} className="fa-5x"/>
      </div>
      <h1>Twitch Streams</h1>
      <form onSubmit={onSubmit}>
        <div className="hide-offline"><span>Hide offline streams</span>
          <input id="checkbox" type="checkbox" name="hideOffline" onChange={handleChange}></input>
        </div>
        <div>
          <input id="textbox" name="name" type="text"></input>
          <button type="submit">
            <FontAwesomeIcon icon={faSearchPlus}/>
          </button>
        </div>
      </form>
    </div>
  </div>

  export default Header