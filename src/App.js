import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ShowDetail from "./Components/ShowDetail";
import Nav from "./Components/nav";
import Main from "./Components/main";
import Footer from "./Components/footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TvShows from "./Components/TvShows";
import Registration from "./Components/Registration";

function App() {
  return (
    <div className='App'>
      <Router>
        <Nav />
        <Route path='/' exact component={Main} />
        <Route path='/details/:id' component={ShowDetail} />
        <Route path='/registration' exact component={Registration} />
        <Route path='/shows' exact render={(props) => <TvShows series={"s={and}&type=series"} {...props} />} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
