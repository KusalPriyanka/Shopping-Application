import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({

    speedDial: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const actions = [
    { icon: <ShoppingCartIcon color={"error"} />, name: 'Shopping Cart', to : '/shoppingCart' },
    { icon: <FavoriteIcon color={"secondary"}/>, name: 'Wish List', to : '/wishList'  },
    { icon: <ExitToAppIcon style={{color : "red"}} />, name: 'Login', to : '/login'  },
    { icon: <LockOpenIcon  style={{color : "green"}}/>, name: 'Sign Up', to : '/register'  },
    { icon: <HomeIcon style={{color : "yellow"}} />, name: 'Home', to : '/'  },
];

export default function HomeNavigator() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                className={classes.speedDial}
                hidden={false}
                icon={<ShoppingCartIcon openIcon={<ShoppingCartIcon />} />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        component={Link} to={action.to}
                    />

                ))}
            </SpeedDial>
        </div>
    );
}
