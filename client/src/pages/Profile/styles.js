const styles = theme => ({
  background: {
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: theme.palette.secondary.main,
    paddingTop: 100
  },
  root: {
    maxWidth: theme.container.maxWidth,
    paddingBottom: '100px',
    margin: '0 auto'
  },
  title: {
    margin: '0.75em auto'
  }
});

export default styles;
