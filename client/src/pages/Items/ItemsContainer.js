import React, { Component } from 'react';
import Items from './Items';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
//import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_ITEMS_QUERY } from '../../apollo/queries';

class ItemsContainer extends Component {
    render() {
        return (
            <Query query={ALL_ITEMS_QUERY} variables={{ filter: 1 }}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading</p>;
                    if (error) return <p>{`Error! ${error.message}`}</p>;
                    return <Items classes={this.props.classes} items={data.items} />;
                }}
            </Query>
        );
    }
}

export default withStyles(styles)(ItemsContainer);