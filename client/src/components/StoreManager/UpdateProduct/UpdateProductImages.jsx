import React from 'react';
import {DropzoneArea} from 'material-ui-dropzone';
import Swal from "sweetalert2";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from "@material-ui/core/ListItem";

class AddProductImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: this.props.selectedFile,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    alertMsg = (icon, title, text) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        });
    }

    handleChange(files) {

        this.setState({
            selectedFile: files
        });
        this.props.updateSelectedFile(files);
    }

    checkImageSize = () => {
        if (this.state.selectedFile.length === 5) {
            return true
        } else {
            this.alertMsg("error", "Oooooooooooopz!", "Please upload 5 images.")
            return false
        }
    }

    componentWillUnmount() {
        this.props.updateSelectedFile(this.state.selectedFile)
    }


    render() {
        return (
            <React.Fragment>
                {this.state.selectedFile.map(image => {
                    return (<ListItem key={image} >
                        <ListItemAvatar>
                            <Avatar
                                src={image}
                            />
                        </ListItemAvatar>
                        {console.log(image)}
                        <ListItemText
                            secondary={image}
                            dasfsdfsd
                        />
                        <ListItemIcon>
                            <IconButton aria-label="delete" >
                                <DeleteIcon fontSize="default" color={"error"}/>
                            </IconButton>
                        </ListItemIcon>

                    </ListItem>)
                    alert(image)
                    }
                )}
            </React.Fragment>
        )
    }
};

export default AddProductImages;
