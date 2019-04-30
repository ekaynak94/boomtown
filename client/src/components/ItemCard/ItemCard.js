import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Gravatar from 'react-gravatar'

const ItemCard = ({ classes, item = {
    imageurl: "http://via.placeholder.com/350x250?text=Please select an image",
    description: "Describe your item",
    title: "Name your item",
    tags: ['tag1', 'tag2'],
    itemowner: {
        fullname: "Emre",
        email:"emrekaynak94@gmail.com"
    },
    created:"0 hours ago"
    }
}) => {
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                image={!!item.imageurl &&item.imageurl}
                title="Image for item"
            />
            <CardHeader
                avatar={
                    <Gravatar email={item.itemowner.email ? item.itemowner.email:"example@example.com"} className={classes.avatar} />
                }
                title={!!item.itemowner.fullname && item.itemowner.fullname}
                subheader={!!item.created && item.created}
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="headline" component="h2">
                    {!!item.title &&item.title}
                </Typography>
                <Typography gutterBottom variant="subheading" component="h3">
                    {!!item.tags &&item.tags.join(', ')}
                </Typography>
                <Typography>
                    {!!item.description &&item.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Borrow
                </Button>
            </CardActions>
        </Card>
    );
}

export default withStyles(styles)(ItemCard);