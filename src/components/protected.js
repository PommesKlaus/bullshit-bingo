import React, { Component } from 'react';

class Protected extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Are you allowed??</h1>
        </header>
      </div>
    );
  }
}

export default Protected;
