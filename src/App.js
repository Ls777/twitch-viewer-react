import React, { Component } from 'react';

import './App.css';

import Header from './Header.js';
import Table from './Table.js';





class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: ["esl_sc2"],
      hideOffline: false,
      input: ""
    }

    this.getArrayPos = this.getArrayPos.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addChannel = this.addChannel.bind(this)
  }

  componentDidMount() {
    setTimeout( () => this.addChannel("esl_sc2"), 100)
    setTimeout( () => this.addChannel("dan"), 200)
    setTimeout( () => this.addChannel("ls777"), 400)
    setTimeout( () => this.addChannel("beyondTheSummit"), 600)
  }

  onDismiss(id) {
    console.log(id);
    const {channels} = this.state
    this.setState({channels: channels.filter(item => item !== id)})
  }

  getArrayPos(id) {
    return this.state.channels.indexOf(id)
  }

  handleCheckbox(e) {
    this.setState({[e.target.name]: e.target.checked});
  }

  handleChange(e) {
    this.setState({input: e.target.value});
    e.preventDefault();
  }

  handleSubmit(e) {
    this.addChannel(this.state.input)
    e.preventDefault();
    console.log("where ya at buddy")
  }

  addChannel(name) {
    const {channels} = this.state;
    if (!channels.includes(name.toLowerCase()) && name !== '') {channels.push(name.toLowerCase())};
    this.setState({channels})
  }
  

  render() {
    const {
      channels,
      hideOffline,
      input
    } = this.state;

    return (
      <div className="App">
        <Header 
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          onCheckbox={this.handleCheckbox}
          value={input}/>
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
