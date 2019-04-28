import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Home from '../pages/Home';
import Items from '../pages/Items';
import Profile from '../pages/Profile';
import Share from '../pages/Share';

export default () => (
  <Fragment>
    {/* @TODO: Add your menu component here */}
    <Switch>
      <Route path="/items" component={Items}/>
      <Route path="/welcome" component={Home}/>
      <Route path="/share" component={Share}/>
      <Route path="/profile/:id" component={Profile}/>
      <Redirect from="/*" to="/items" /> 
      <Route />
    </Switch>
  </Fragment>
);
