import React from 'react';
import {DropzoneArea} from 'material-ui-dropzone';

class AddProductImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: [],
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(files) {
        this.setState({
            selectedFile: files
        });
        this.props.updateSelectedFile(files);
    }

    componentWillUnmount() {
        this.props.updateSelectedFile(this.state.selectedFile)
    }

    render() {
        return (
            <React.Fragment>
                <DropzoneArea
                    onChange={files =>  this.handleChange(files)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    filesLimit={5}
                    maxFileSize={5000000}
                    dropzoneText={'Please Upload Images For Product'}
                    showPreviews={false}
                    showFileNamesInPreview={true}
                    showPreviewsInDropzone={true}
                    previewText={''}


                />
                <button type="button"  className="btn btn-success btn-block"
                        onClick={this.onClickHandler}>Upload
                </button>
            </React.Fragment>
        )
    }
};

export default AddProductImages;
