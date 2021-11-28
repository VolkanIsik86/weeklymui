import * as React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import {observer} from "mobx-react-lite";
import NavMenu from "./NavMenu";
import {Box} from "@mui/material";


function App(props) {
  return(
      <Box>
      <NavMenu store={props.store} />
        <Switch>
          <Route exact path={"/"} component={Home}/>
          <Route render={() => <h1>404</h1>}/>
        </Switch>
      </Box>
  );
}

export default observer(App);
