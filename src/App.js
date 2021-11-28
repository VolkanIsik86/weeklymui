import * as React from 'react';
import {Route, Switch} from "react-router-dom";

import Home from "./Home";
import UserStore from "./stores/UserStore";
import {observer} from "mobx-react-lite";
import Layout from "./Layout";

const userStore = new UserStore();
function App() {
  return(
      <Layout store={userStore}>
        <Switch>
          <Route exact path={"/"} component={Home}/>
          <Route render={() => <h1>404</h1>}/>
        </Switch>
      </Layout>
  );

}

export default observer(App);
