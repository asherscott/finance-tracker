import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Nav from "./Nav";
import AccountCreated from "./AccountCreated";

function App() {
  const [user, setUser] = useState(null);
  const [masterList, setMasterList] = useState(null);
  const [signup, setSignup] = useState(false);

  function onLogin(user) {
    setUser(user);
    setMasterList(user.journal_entries);
  }

  function onSignup() {
    setSignup(true);
  }

  if (signup) {
    return <AccountCreated setSignup={setSignup} />;
  } else if (user) {
    return (
      <Nav
        user={user}
        setUser={setUser}
        masterList={masterList}
        setMasterList={setMasterList}
      />
    );
  } else {
    return (
      <Router>
        <div id="landing-background">
          <div className="landing-wrapper">
            <nav className="landing-nav">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <div className="right-nav">
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign Up!</Link>
                  </li>
                </div>
              </ul>
            </nav>

            <Switch>
              <Route path="/login">
                <Login onLogin={onLogin} />
              </Route>
              <Route path="/signup">
                <Signup onSignup={onSignup} />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
