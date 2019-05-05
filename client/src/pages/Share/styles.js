const styles = theme => ({
    Grid: {
        margin: '0 auto',
        width: '100%',
        maxWidth:theme.container.maxWidth,
        display: 'grid',
        gridTemplateAreas:'"left right"',
        gridTemplateColumns:'1fr',
        justifyContent: 'center',
        alignItems:'center',
    },
});

export default styles;
