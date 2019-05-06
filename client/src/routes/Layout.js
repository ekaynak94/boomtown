import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { ViewerContext } from '../context/ViewerProvider';
import Home from '../pages/Home';
import Items from '../pages/Items';
import Profile from '../pages/Profile';
import Share from '../pages/Share';
import MenuBar from '../components/MenuBar'

export default () => (
  <Fragment>
    <ViewerContext.Consumer>
      {({ viewer, loading }) => {
        if (loading) return <p>Loading...</p>;
        if(viewer){
          return(
            <div>
            <Route path="/*" component={MenuBar} />
            <Switch>
              <Route path="/items" component={Items} />
              <Route path="/share" component={Share} />
                <Route path="/profile" render={({ match }) => {
                  return (
                    <Switch>
                      <Route
                        path={`${match.url}/:id`}
                        render={({ match }) => <Profile userid={match.params.id} />}
                      />
                      <Route
                        path={`${match.url}`}
                        render={() => <Profile userid={viewer.id} />}
                      />
                    </Switch>
                  );
              }} />
              <Redirect from="/*" to="/items" />
            </Switch>
            </div>
            
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