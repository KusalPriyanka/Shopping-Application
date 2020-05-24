import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        marginTop : "18px"
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: 350,
        height: 230,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },

}));


const DiscountListPopUp = (props) =>  {
    const classes = useStyles();
    return(

        <Dialog
            open={true}
            onClose={() => props.hideOfferProductList()}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="simple-dialog-title">Offer Product List</DialogTitle>
                <Divider/>
                <Card >

                    <List className={classes.list} dense component="div" role="list">
                        {props.items.map((value) => {
                            const labelId = `transfer-list-all-item-${value._id}-label`;

                            return (
                                <React.Fragment>
                                    <ListItem key={value._id} role="listitem" >
                                        <ListItemAvatar>
                                            <Avatar
                                                src={value.imageURL}
                                            />
                                        </ListItemAvatar>

                                        <ListItemText id={labelId}
                                                      primary={value.productName}
                                                      secondary={value._id}
                                        />

                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </React.Fragment>
                            );
                        })}
                        <ListItem />
                    </List>
                </Card>

        </Dialog>

    )
}

export default DiscountListPopUp;
