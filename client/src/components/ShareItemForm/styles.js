const styles = theme => ({
    form: {
        maxWidth: 400
    },
    headline: {
        fontSize: '2.5em',
        fontWeight: 'bold',
        marginBottom:'1.5em'
    },
    imagebtn: {
        width: '100%',
        margin:'2em auto',
        backgroundColor:theme.palette.primary.main
    },
    textField: {
        margin:'1em auto',
        width:'100%'
    },
    select: {
        margin:'1em auto',
        minWidth: '100%',
        display: 'block'
    },
    selectLabel: {
      marginTop:'-0.7em'
    },
    sharebtn: {
        margin: '1em 0',
        padding:'0.7em 2em',
        backgroundColor:theme.palette.primary.main
    }
});

export default styles;
