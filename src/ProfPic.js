import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCircleNotch, faExclamationCircle } from '@fortawesome/fontawesome-free-solid'

const ProfPic = ({result, isLoading}) => 
  result ? 
    result.logo ?
      <img 
        src={result.logo.replace("300x300", "150x150")} 
        className="prof-pic"
        alt="User Avatar"
      />
      : <div className="errorIcon prof-pic">
          <FontAwesomeIcon icon={faExclamationCircle} className="fa-3x"/>
        </div>
    : <div className="loadingIcon prof-pic">
        <FontAwesomeIcon icon={faCircleNotch} className="fa-2x fa-spin"/>
      </div>

export default ProfPic