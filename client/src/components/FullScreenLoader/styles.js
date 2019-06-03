const styles = theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: '999',
    display: 'flex',
    flexFlow: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

export default styles;
