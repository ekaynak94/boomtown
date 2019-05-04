const styles = theme => ({
    card: {
        maxWidth: 400,
      },
      cardMedia: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
          borderRadius:'50%'
    },
    button: {
        border: '1px solid grey',
        padding: '0.5em 1em',
        margin: '1.5em 0',
        '&:hover': {
           backgroundColor:'#FFFFF'
        }
    }
      
});

export default styles;