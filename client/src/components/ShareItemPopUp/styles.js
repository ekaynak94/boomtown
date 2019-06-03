const styles = theme => ({
  background: {
    position: 'fixed',
    zIndex: '999999',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    padding: '10px 20px',
    width: '800px'
  },
  icon: { marginRight: '0.5em' },
  title: {
    display: 'inline-block'
  },
  text: {
    margin: '1em auto',
    color: 'grey'
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  blackLink: {
    textTransform: 'uppercase',
    color: theme.palette.secondary.main
  },
  yellowLink: {
    textTransform: 'uppercase',
    color: theme.palette.primary.main
  }
});

export default styles;
