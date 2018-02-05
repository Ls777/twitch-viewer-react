import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const CLIENT_ID = "9uygzutqoo30vb6730vcjwr9sryai3";
const PATH_STREAMS = "https://api.twitch.tv/kraken/streams/"
const PATH_USERS = "https://api.twitch.tv/kraken/users/"

const PARAM_SEARCH = ""


const stream1 = {
  "stream": {
     "_id": 23932774784,
     "game": "BATMAN - The Telltale Series",
     "viewers": 7254,
     "video_height": 720,
     "average_fps": 60,
     "delay": 0,
     "created_at": "2016-12-14T22:49:56Z",
     "is_playlist": false,
     "preview": {
        "small": "https://static-cdn.jtvnw.net/previews-ttv/live_user_dansgaming-80x45.jpg",
        "medium": "https://static-cdn.jtvnw.net/previews-ttv/live_user_dansgaming-320x180.jpg",
        "large": "https://static-cdn.jtvnw.net/previews-ttv/live_user_dansgaming-640x360.jpg",
        "template": "https://static-cdn.jtvnw.net/previews-ttv/live_user_dansgaming-{width}x{height}.jpg"
     },
     "channel": {
        "mature": false,
        "status": "Dan is Batman? - Telltale's Batman",
        "broadcaster_language": "en",
        "display_name": "DansGaming",
        "game": "BATMAN - The Telltale Series",
        "language": "en",
        "_id": 7236692,
        "name": "dansgaming",
        "created_at": "2009-07-15T03:02:41Z",
        "updated_at": "2016-12-15T01:33:58Z",
        "partner": true,
        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/dansgaming-profile_image-76e4a4ab9388bc9c-300x300.png",
        "video_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/dansgaming-channel_offline_image-d3551503c24c08ad-1920x1080.png",
        "profile_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/dansgaming-profile_banner-4c2b8ece8cd010b4-480.jpeg",
        "profile_banner_background_color": null,
        "url": "https://www.twitch.tv/dansgaming",
        "views": 63906830,
        "followers": 538598
     }
  }
}

const stream2 = {
  "stream":null
}






class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [
        {"id" : "esl_sc2", "displayName": "Nothing", "result" : stream1, "isLoading" : true, error: null },
        {"id" : "dan", "displayName": "Nothing", "result" : stream1, "isLoading" : true, error: null },
        {"id" : "ls777", "displayName": "Nothing", "result" : stream1, "isLoading" : true, error: null },
        {"id" : "wertytreuytrerty", "displayName": "Nothing", "result" : stream1, "isLoading" : true,  error: null},
      ],
      error: null

      
    }

    this.getArrayPos = this.getArrayPos.bind(this)
    this.fetchStream = this.fetchStream.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  onDismiss(id) {
    console.log(id);
    const {channels} = this.state
    this.setState({channels: channels.filter(item => item.id != id)})
  }

  getArrayPos(id) {
    return this.state.channels.findIndex(item => item.id == id)
  }

  fetchStream(id) {
    const SearchPaths = [PATH_STREAMS, PATH_USERS]
    Promise.all(
      SearchPaths.map(path => 
        fetch(`${path}${id}`,{headers:{'Client-ID':CLIENT_ID}})
        .then(response => response.json())
      )
    )
      .then(results => this.setStreamStatus(results, id))
      .catch((e) => {
        const {channels} = this.state
        const pos = this.getArrayPos(id)
        this.setState({error: e})
      });
      

  }

  setStreamStatus(results, id) {
    const {channels} = this.state
    const pos = this.getArrayPos(id)
    channels[pos].results = {...results[0], ...results[1]};
    channels[pos].isLoading = false;
    this.setState({channels})

    console.log(channels[pos].results)
  }

  componentDidMount() {
    this.state.channels.forEach(item => this.fetchStream(item.id))
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
    <i className="fa fa-twitch fa-3x" aria-hidden="true"></i>
    <h1>Twitch Streams</h1>
    <form>
      <div>Hide offline streams
        <input id="checkbox" type="checkbox" name="offline"></input>
      </div>
      <div>
        <input id="textbox" placeholder="Add new streamer"></input>
        <button type="submit">
        <i className="fa fa-search-plus" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  </div>



const Table = ({channels, onDismiss}) =>
  <ul>
    {channels.map((item) => 
      <Channel 
        key={item.id}
        id={item.id}
        result={item.result} 
        onDismiss={onDismiss}
        isLoading={item.isLoading}/>
    )}
  </ul>


const Channel = ({id, result, onDismiss, isLoading}) => {
  if (!result.stream)
  return (
    <li>
      Error user not found
    </li>
  )


  const displayName = (result.stream.channel.display_name) || "";

  return (
    <li>
      {displayName} - HI WHASSUP {isLoading.toString()}
      <button onClick={() => onDismiss(id)}>close</button>
    </li>
  )
}

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
