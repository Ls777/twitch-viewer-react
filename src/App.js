import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCircleNotch, faExclamationCircle, faSearch } from '@fortawesome/fontawesome-free-solid'
import { faTwitch } from '@fortawesome/fontawesome-free-brands'
import './App.css';


const CLIENT_ID = "9uygzutqoo30vb6730vcjwr9sryai3";
const PATH_STREAMS = "https://api.twitch.tv/kraken/streams/"
const PATH_USERS = "https://api.twitch.tv/kraken/users/"


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [
        "esl_sc2",
        "dan", 
        "ls777", 
        "wertytreuytrerty"
      ],
      error: null
    }

    this.getArrayPos = this.getArrayPos.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  onDismiss(id) {
    console.log(id);
    const {channels} = this.state
    this.setState({channels: channels.filter(item => item !== id)})
  }

  getArrayPos(id) {
    return this.state.channels.indexOf(id)
  }
  

  render() {
    const {
      channels
    } = this.state;

    return (
      <div className="App">
        <Header />
        <Table 
          channels={channels}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

const Header = () =>
  <div className="header">
    <div className="header-icon">
      <FontAwesomeIcon icon={faTwitch} className="fa-5x"/>
    </div>
    <h1>Twitch Streams</h1>
    <form>
      <div>Hide offline streams
        <input id="checkbox" type="checkbox" name="offline"></input>
      </div>
      <div>
        <input id="textbox" placeholder="Add new streamer"></input>
        <button type="submit">
          <FontAwesomeIcon icon={faSearch}/>
        </button>
      </div>
    </form>
  </div>



const Table = ({channels, onDismiss}) =>
  <ul>
    {channels.map((item) => 
      <Channel 
        key={item}
        id={item}
        onDismiss={onDismiss}>
      </Channel>
    )}
  </ul>


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
    console.log({...results[0], ...results[1]});
  }

  componentDidMount() {
    this.fetchStream();
	}

  render() {
    const {displayName, result, onDismiss, isLoading, error} = this.state;

   
    
    return (
      <li>
        <ProfPic result={result}/>
        <div className="list-content">{displayName} - HI WHASSUP {isLoading.toString()} {error}

        </div>
        <button onClick={() => onDismiss(this.props.id)}>close</button>
      </li>
    )
  }
}

const ProfPic = ({result, isLoading}) => 
  result ? 
    result.logo ?
      <img src={result.logo.replace("300x300", "150x150")} className="prof-pic"></img>
      : <div className="errorIcon prof-pic">
          <FontAwesomeIcon icon={faExclamationCircle} className="fa-3x"/>
        </div>
    : <div className="loadingIcon prof-pic">
        <FontAwesomeIcon icon={faCircleNotch} className="fa-3x fa-spin"/>
      </div>

  



const Stream = (channel) =>
  <iframe
    src={`http://player.twitch.tv/?channel=${channel}&muted=true`}
    height="720"
    width="1280"
    frameborder="0"
    scrolling="no"
    allowfullscreen="true">
  </iframe>


export default App;
