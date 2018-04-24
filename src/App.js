import React, { Component } from 'react';

import './App.css';

import Header from './Header.js';
import Table from './Table.js';
import serialize from 'form-serialize'




class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [],
      hideOffline: false,
      error: null
    }

    this.getArrayPos = this.getArrayPos.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addChannel = this.addChannel.bind(this)
  }

  componentDidMount() {
    //setTimeout( () => this.addChannel('esl_sc2'), 5000)
    /*setTimeout( () => this.addChannel("dan"), 400)
    setTimeout( () => this.addChannel("ls777"), 600)
    setTimeout( () => this.addChannel("beyondTheSummit"), 800)*/
  }



  onDismiss(id) {
    console.log(id);
    const {channels} = this.state
    this.setState({channels: channels.filter(item => item !== id)})
  }

  getArrayPos(id) {
    return this.state.channels.indexOf(id)
  }

  handleChange(e) {

    this.setState({[e.target.name]: e.target.checked});
    console.log(e.target.checked + " value")
  }

  onSubmit(event) {
      event.preventDefault();
      const form = event.currentTarget
      const body = serialize(form, {hash: true, empty: true})
      this.addChannel(body.name)
  }

  addChannel(name) {
    const {channels} = this.state;
    if (!channels.includes(name.toLowerCase()) && name !== '') {channels.push(name.toLowerCase())};
    this.setState({channels})
  }
  

  render() {
    const {
      channels,
      hideOffline
    } = this.state;

    return (
      <div className="App">
        <Header 
          onSubmit={this.onSubmit}
          handleChange={this.handleChange}/>
        <Table 
          channels={channels}
          hideOffline={hideOffline}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}





export default App;
