import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    position: "relative",
  },
  appBarVisible: {
    display: "none",
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
  const history = useHistory();

  const [state, setState] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openUserImg = Boolean(anchorEl);

  const handleClose = (nav) => {
    if (nav === "cart") history.push("/shoppingCart");
    else if (nav === "logout") {
      localStorage.removeItem("user");
      history.push("/");
    }
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

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
      <Divider />
      <List>
        {props.categories.map((category) => {
          return (
            <React.Fragment key={category}>
              <ListItem
                button
                component={Link}
                to={`/category/${category.CategoryName}`}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src={`https://source.unsplash.com/featured/?${category.CategoryName}`}
                  />
                </ListItemAvatar>
                <ListItemText primary={category.CategoryName} />
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );

  const loginOrRegister = () => {
    if (localStorage.getItem("user") != null) {
      return (
        <div>
          <Avatar
            alt="Remy Sharp"
            src={JSON.parse(localStorage.getItem("user")).userImage}
            onClick={handleMenu}
          />
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={openUserImg}
            onClose={() => handleClose()}
          >
            <MenuItem onClick={() => handleClose("cart")}>My Cart</MenuItem>
            <MenuItem onClick={() => handleClose("logout")}>Logout</MenuItem>
          </Menu>
        </div>
      );
    } else {
      return (
        <div>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
          <Button component={Link} to="/register" color="inherit">
            Register
          </Button>
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        className={props.visibility ? classes.appBar : classes.appBarVisible}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            style={{ outline: "none" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.title}
            component={Link}
            to="/"
            style={{ textDecoration: "none" }}
          >
            IShop Plaza
          </Typography>
          {loginOrRegister()}
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
        {list("left")}
      </Drawer>
    </React.Fragment>
  );
};

export default Navigation;
