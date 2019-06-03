import React, { Component } from 'react';
import Items from './Items';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_ITEMS_QUERY } from '../../apollo/queries';
import { ViewerContext } from '../../context/ViewerProvider';

class ItemsContainer extends Component {
  render() {
    return (
      <ViewerContext.Consumer>
        {({ viewer, loading }) => {
          if (loading) return <FullScreenLoader />;
          if (viewer) {
            return (
              <Query query={ALL_ITEMS_QUERY} variables={{ filter: viewer.id }}>
                {({ loading, error, data }) => {
                  if (loading) return <FullScreenLoader />;
                  if (error) return <p>{`Error! ${error.message}`}</p>;
                  return (
                    <Items classes={this.props.classes} items={data.items} />
                  );
                }}
              </Query>
            );
          }
        }}
      </ViewerContext.Consumer>
    );
  }
}

export default withStyles(styles)(ItemsContainer);
