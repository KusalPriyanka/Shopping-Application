import React from 'react';
import {DropzoneArea} from 'material-ui-dropzone';
import Swal from "sweetalert2";

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

    checkImageSize = () =>{
        if(this.state.selectedFile.length === 5){
            return true
        }else {
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
                <DropzoneArea
                    onChange={files => this.handleChange(files)}
                    acceptedFiles={['image/jpeg', 'image/png']}
                    filesLimit={5}
                    maxFileSize={5000000}
                    dropzoneText={'Please Upload Images For Product'}
                    showPreviews={false}
                    showFileNamesInPreview={true}
                    showPreviewsInDropzone={true}
                    previewText={''}


                />


            </React.Fragment>
        )
    }
};

export default AddProductImages;
