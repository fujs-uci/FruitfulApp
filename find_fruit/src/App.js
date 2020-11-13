import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";


// import components
import Navbar from "./components/navbar.component";
import FruitsList from "./components/fruits-list.component";

function App() {

  return (
    <div className="container">
      <Router>
        <Navbar/>
        <br/>
        <Route path="/" exact component={FruitsList}/>
      </Router>
    </div>
  );
}

export default App;
 