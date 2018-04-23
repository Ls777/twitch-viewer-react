import React, { Component } from 'react';
import ProfPic from './ProfPic.js'

const CLIENT_ID = "9uygzutqoo30vb6730vcjwr9sryai3";
const PATH_STREAMS = "https://api.twitch.tv/kraken/streams/"
const PATH_USERS = "https://api.twitch.tv/kraken/users/"

class Channel extends Component {
    constructor(props) {
      super(props);
      this.state = {
        "displayName": props.id, 
        "result" : null, 
        "onDismiss" : props.onDismiss,
        "isLoading" : true,  
        error: null,
      }
  
      this.fetchStream = this.fetchStream.bind(this)
      this.setStreamStatus = this.setStreamStatus.bind(this)
  
    }
    
    fetchStream() {
      const SearchPaths = [PATH_STREAMS, PATH_USERS]
      Promise.all(
        SearchPaths.map(path =>
          fetch(`${path}${this.props.id}`,{headers:{'Client-ID':CLIENT_ID}})
          .then(response => response.json())
        )
      )
        .then(results => this.setStreamStatus(results))
        .catch(e => this.setState({error: e}));
    }
  
    setStreamStatus(results) {
  
      
      const displayName = (results[1].display_name) || this.props.id;
      this.setState({
        result : {...results[0], ...results[1]},
        displayName,
        isLoading : false,
        error: results[1].error
      })
    }
  
    componentDidMount() {
      this.fetchStream();
      }
  
    render() {
      const {displayName, result, onDismiss, isLoading} = this.state;
      console.log(this.props.hideOffline)
      
  
      const online = result && result.stream ? true : false;
      if (this.props.hideOffline && !isLoading && !online) {return null}
  
  
      const cardText = online 
        ? result.stream.channel.status 
        : isLoading 
        ? "loading..."
        : result.error
        ? "User does not exist!"
        : result.bio || ""
  
      
      return (
        <li>
          <ProfPic result={result}/>
          <div className="list-content">
            <div className="list-bio">
              <h2><a href={result && result.logo && `https://www.twitch.tv/${this.props.id}`}>{displayName}</a></h2>
              <p className={cardText.length > 150 ? "card-small" : undefined}>{cardText}</p>
            </div>
            <div className={online ? "list-status online" : "list-status offline"}>
              <h2>{online ? "ONLINE" : "OFFLINE"}</h2>
              {online && <p>{result.stream.game}</p>}
              {online && <p><em>{result.stream.viewers + " viewers"}</em></p>}
              {online && result.stream.preview.medium &&
              <div>
                <img 
                    src={result.stream.preview.medium} 
                    className="preview"
                    alt="Stream preview"
                /> 
              </div>
              } 
            </div>
            <button onClick={() => onDismiss(this.props.id)}></button>
          </div>
        </li>
      )
    }
  }

  export default Channel