import { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./containers/Home/index";
import Signin from "./containers/Signin/index";
import Signup from "./containers/Signup/index";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { isUserLoggedIn } from "./actions/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import Products from "./containers/Products.js/index.js";
import Orders from "./containers/Orders";
import Category from "./containers/Category";

import { getInitialData } from "./actions/initialData.action";
import { NewPage } from "./containers/NewPage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);
  return (
    <div className='App'>
      <Switch>
        <PrivateRoute path='/' exact component={Home} />
        <PrivateRoute path='/page' component={NewPage} />
        <PrivateRoute path='/products' component={Products} />
        <PrivateRoute path='/orders' component={Orders} />
        <PrivateRoute path='/category' component={Category} />
        <Signin path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
