import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import "./App.css";
import "./lib/font-awesome/css/all.min.css";

import { GlobalProvider } from "./context/GlobalState";
import Login from "./components/login";
import Signup from "./components/signup";
import  Home  from "./components/Home";
import { Add } from "./components/Add";



function App() {
   const user = localStorage.getItem('userInfo');
    
    return (
        <GlobalProvider>
            <Router>
            {user && <Header />}
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/add">
                        <Add />
                    </Route>

                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/search">
                        <Search />
                    </Route>
                </Switch>
            </Router>
        </GlobalProvider>
    );
}

export default App;
