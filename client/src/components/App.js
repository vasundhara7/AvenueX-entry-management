import React from 'react';
import {  BrowserRouter,Route} from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import './app.css';


function App() {
  return (
    <div className="App background">
      <BrowserRouter>
        <div className="container-fluid site_body">
        <Route exact path="/" component={Home}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
