import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { ViewerContext } from '../context/ViewerProvider';
import Home from '../pages/Home';
import Items from '../pages/Items';
import Profile from '../pages/Profile';
import Share from '../pages/Share';

export default () => (
  <Fragment>
    <ViewerContext.Consumer>
      {({ viewer, loading }) => {
        if (loading) return <p>Loading...</p>;
        if(viewer){
          return(
            /* @TODO: Add your menu component here */
            <Switch>
              <Route path="/items" component={Items} />
              <Route path="/share" component={Share} />
              <Route path="/profile/:id" component={Profile} />
              <Redirect from="/*" to="/items" />
            </Switch>
          );
        } else {
          return (
            <Switch>
              <Route path="/welcome" component={Home} />
              <Redirect from="/*" to="/welcome" /> 
            </Switch>
          );
        }
      }
      }
    </ViewerContext.Consumer>
  </Fragment>
);