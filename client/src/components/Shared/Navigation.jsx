import React from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        position: "relative",
    },
    list: {
        width: 250,
    },
    fullList: {
        width: "auto",
    },
    title: {
        flexGrow: 1,
    },
}));

const Navigation = (props) => {
    const classes = useStyles();

    const [state, setState] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState(open);
    };

    const list = () => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: "left" === "top" || "left" === "bottom",
            })}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Divider/>
            <List>
                {props.categories.map((category) => {
                    return (
                        <React.Fragment key={category}>
                            <ListItem button component={Link} to={`/category/${category.CategoryName}`}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={`https://source.unsplash.com/featured/?${category.CategoryName}`}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={category.CategoryName}/>
                            </ListItem>
                            <Divider/>
                        </React.Fragment>
                    );
                })}
            </List>
        </div>
    );

    return (
        <React.Fragment>
            <AppBar position="static" color="default" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(true)}
                        style={{outline: "none"}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.title} >
                        IShop Plaza
                    </Typography>
                    <Button component={Link} to="/" color="inherit">
                        Home
                    </Button>
                    <Button component={Link} to="/login" color="inherit">
                        Login
                    </Button>
                    <Button component={Link} to="/register" color="inherit">
                        Register
                    </Button>
                    <Button component={Link} to="/storeManager" color="inherit">
                        Store Manager
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
                {list("left")}
            </Drawer>
        </React.Fragment>
    );
};

export default Navigation;
