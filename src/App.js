import React from 'react';
import 'materialize-css/dist/css/materialize.min.css'

import Digits from './components/digits.component';

const App = () => {
  return <>
    <header className="pink accent-3">
      <div className="container">
        <p>Memory Tools</p>
      </div>
    </header>
    <main className="grey lighten-2">
      <div className="container">
        <h1>Memory Tools</h1>
        <Digits />
      </div>
    </main>
    <footer className="black">
      <div className="container center-align">
        <p className="white-text">
          <span>&copy; 2021 </span>
          <a className="white-text" href="http://bryanmytko.com">Bryan Mytko</a>
          <span> &#9829; </span>
          <a className="white-text" href="https://github.com/bryanmytko">Github</a>
        </p>
      </div>
    </footer>
  </>;
}

export default App;
