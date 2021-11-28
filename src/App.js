import * as React from 'react';
import {Route, Switch} from "react-router-dom";
import {Layout} from "./Layout";
import Home from "./Home";


function App() {
  return(
      <Layout>
        <Switch>
          <Route exact path={"/"} component={Home}/>
          <Route render={() => <h1>404</h1>}/>
        </Switch>
      </Layout>
  );

}

export default App;
