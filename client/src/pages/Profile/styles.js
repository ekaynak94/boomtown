const styles = theme => ({
    background: {
        height: '100%',
        width: '100%',
        backgroundColor: theme.palette.secondary.main,
        paddingTop:100
    },
    root: {
        maxWidth: theme.container.maxWidth,
        margin:'0 auto'
    }
});

export default styles;
