import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ShowDetail from "./Components/mediaPage/ShowDetail";
import LandingPage from "./Components/landingPage/landingPage";
import Nav from "./Components/nav";
import Main from "./Components/homePage/main";
import Footer from "./Components/footer";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import TvShows from "./Components/TvShowsPage/TvShows";
import Registration from "./Components/registrationPage/Registration";
import SignIn from "./Components/signIn/signIn";
import { getFunction } from "./Components/CRUDFunctions";
import ProfilePage from "./Components/profilePage/profilePage";
import BackOffice from "./Components/backOffice/backOffice";

class App extends React.Component {
  state = {
    user: {},
    auth: true,
    admin: false,
  };

  getId = async (id) => {
    const user = await getFunction("user/" + id);
    this.setState({ user, auth: true });
    user.role === "admin" && this.setState({ admin: true });
    return user;
  };

  logOut = () => this.setState({ user: {}, auth: false });
  render() {
    const { user, auth, admin } = this.state;
    return (
      <div className='App'>
        <Router>
          <Nav user={user} logOut={this.logOut} />
          <Route path='/' exact component={LandingPage} />
          <Route path='/office' exact render={(props) => admin && <BackOffice admin={user} logOut={this.logOut} {...props} />} />
          <Route path='/signIn' exact render={(props) => <SignIn getId={this.getId} {...props} />} />
          <Route path='/registration' exact render={(props) => <Registration getId={this.getId} {...props} />} />
          <Route path='/main' exact render={(props) => (!admin ? auth ? <Main user={user} {...props} /> : <Redirect to='/' /> : <Redirect to='/office' />)} />
          <Route path='/profile' exact render={(props) => (auth && !admin ? <ProfilePage getId={this.getId} user={user} logOut={this.logOut} {...props} /> : <Redirect to='/' />)} />
          <Route path='/details/:id' exact render={(props) => (auth && !admin ? <ShowDetail user={user} {...props} /> : <Redirect to='/' />)} />
          <Route path='/shows' exact render={(props) => (auth && !admin ? <TvShows series={"s={and}&type=series"} {...props} /> : <Redirect to='/' />)} />
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
