const styles = theme => ({
  card: {
    maxWidth: 450,
    maxHeight: 600
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    margin: 0,
    maxWidth: '100%',
    paddingTop: '0.5em',
    paddingBottom: '0.5em'
  },
  avatar: {
    borderRadius: '50%'
  },
  button: {
    border: '1px solid grey',
    padding: '0.5em 1em',
    margin: '0.5em 0',
    '&:hover': {
      backgroundColor: '#FFFFF'
    }
  }
});

export default styles;
