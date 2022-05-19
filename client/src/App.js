import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Dashboard from "./Dashboard";
import AccountCreated from "./AccountCreated";

function App() {
  const [user, setUser] = useState(null);
  const [signup, setSignup] = useState(false);

  function onLogin(user) {
    setUser(user);
  }

  function onSignup() {
    setSignup(true);
  }

  if (signup) {
    return <AccountCreated setSignup={setSignup} />;
  } else if (!user) {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up!</Link>
              </li>
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
      </Router>
    );
  } else {
    return <Dashboard user={user} setUser={setUser} />;
  }
}

export default App;
