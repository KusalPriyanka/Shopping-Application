import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import SaveIcon from '@material-ui/icons/Save';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from "@material-ui/icons/Home";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

const useStyles = makeStyles((theme) => ({

    speedDial: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const actions = [
    { icon: <AssignmentIcon style={{color : "green"}} />, name: 'All Products', to : '/storeManager' },
    { icon: <PostAddIcon style={{color : "orange"}} />, name: 'Add New Product', to : '/storeManager/addProducts'  },
    { icon: <LocalOfferIcon style={{color : "purple"}}/>, name: 'All Offers', to : '/storeManager/allDiscounts'  },
    { icon: <InsertInvitationIcon color={"error"} />, name: 'Dashboard', to : '/storeManager'  },
    { icon: <HomeIcon style={{color : "yellow"}} />, name: 'Home', to : '/storeManager'  },
];

export default function OpenIconSpeedDial() {
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
                icon={<SupervisorAccountIcon openIcon={<EditIcon />} />}
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
