import React  from 'react';
import Navbar from '../src/components/navbar'
import { BrowserRouter as Router, Switch,Route,Link} from "react-router-dom";
import Wall from '../src/components/wall'
import SignUp from '../src/pages/SignUp'
import SignIn from '../src/pages/SignIn'
import MyProfile from '../src/pages/MyProfile'




function App() {
  return (
    <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/me" component={MyProfile} />

        </div>
      </Router>
  );
}

export default App;
