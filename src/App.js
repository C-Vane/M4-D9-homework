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
import AccountPage from "./Components/accountPage/accountPage";
import MyList from "./Components/myList/MyList";
import RecentlyAdded from "./Components/recent/RecentlyAdded";
import Movies from "./Components/movies/Movies";

class App extends React.Component {
  state = {
    user: {},
    auth: false,
    admin: false,
  };

  getId = async (id) => {
    const user = await getFunction("user/" + id);
    this.setState({ user, auth: true });
    this.setState({ admin: user.role === "admin" ? true : false });
    return user;
  };
  // : <Redirect to='/'/>

  logOut = () => this.setState({ user: {}, auth: false });
  render() {
    const { user, auth, admin } = this.state;
    console.log(user, auth, admin);
    return (
      <div className='App'>
        <Router>
          <Nav user={user} logOut={this.logOut} />
          <Route path='/' exact component={LandingPage} />
          <Route path='/signIn' exact render={(props) => <SignIn getId={this.getId} {...props} />} />
          <Route path='/registration' exact render={(props) => <Registration getId={this.getId} {...props} />} />
          <Route path='/office' exact render={(props) => auth && admin && <BackOffice admin={user} logOut={this.logOut} {...props} />} />
          <Route path='/main' exact render={(props) => auth && !admin && <Main user={user} {...props} />} />
          <Route path='/profile' exact render={(props) => auth && !admin && <ProfilePage getId={this.getId} user={user} logOut={this.logOut} {...props} />} />
          <Route path='/myList' exact render={(props) => auth && !admin && <MyList user={user} {...props} />} />
          <Route path='/new' exact render={(props) => auth && !admin && <RecentlyAdded user={user} {...props} />} />
          <Route path='/movies' exact render={(props) => auth && !admin && <Movies user={user} {...props} />} />
          <Route path='/details/:id' exact render={(props) => auth && !admin && <ShowDetail user={user} {...props} />} />
          <Route path='/account' exact render={(props) => auth && !admin && <AccountPage getId={this.getId} user={user} logOut={this.logOut} {...props} />} />
          <Route path='/shows' exact render={(props) => auth && !admin && <TvShows series={"s={and}&type=series"} {...props} />} />
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
