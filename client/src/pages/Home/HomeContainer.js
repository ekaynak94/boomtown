import React, { Component } from 'react';
import Home from './Home';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';

class HomeContainer extends Component {
  render() {
    return <Home classes={this.props.classes} />;
  }
}

HomeContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeContainer);
