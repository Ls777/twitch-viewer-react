import React, { Component } from 'react';

import './App.css';

import Header from './Header.js';
import Table from './Table.js';
import serialize from 'form-serialize'




class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [
        "esl_sc2",
        "dan", 
        "ls777", 
        "beyondTheSummit",
       // "wertytreuytrerty"
      ],
      hideOffline: false,
      error: null
    }

    this.getArrayPos = this.getArrayPos.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
      const {channels} = this.state;
      if (!channels.includes(body.name.toLowerCase()) && body.name !== "") {channels.push(body.name.toLowerCase())};
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
