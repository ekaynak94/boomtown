const styles = theme => ({
    background: {
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.secondary.main,
        paddingTop:100
    },
    root: {
        maxWidth: theme.container.maxWidth,
        margin:'0 auto'
    }
});

export default styles;
