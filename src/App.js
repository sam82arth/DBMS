import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './Login'
import Admin from './Admin'
import AddStudent from "./AddStudent";
import AddStaff from "./AddStaff";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/Admin">
            <Admin />
          </Route>
         
        
        
         
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;