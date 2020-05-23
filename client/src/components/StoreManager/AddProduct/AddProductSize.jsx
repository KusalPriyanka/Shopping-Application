import React, {Component} from 'react';
import MaterialTable from 'material-table';
import ChipInput from 'material-ui-chip-input'
import {productSizeValidation} from "../ProductView/../../../Validations/ProductValidation"
import Swal from "sweetalert2";


export default class SizeAndPrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.sizeAndPrice,
            sizes: this.props.sizes,
        }
        this.getColumns = this.getColumns.bind(this)
        this.addChips = this.addChips.bind(this)
        this.handleDeleteChip = this.handleDeleteChip.bind(this)
    }


    componentWillUnmount() {
        this.props.updateSizeAndPrice(this.state.data, this.state.sizes)
    }

    getColumns() {
        let sizesForTable = {};
        this.state.sizes.map(size => {
            Object.defineProperty(sizesForTable, size, {
                value: size,
                writable: true,
                enumerable: true,
                configurable: true
            });
        })
        let columns = [
            {
                title: 'Product Size',
                field: 'productSize',
                lookup: sizesForTable,
            },
            {title: 'Color', field: 'productColour'},
            {title: 'Quantity', field: 'productQuantity', type: 'numeric'},


        ]
        return columns;
    }

    addChips(chips) {
        let sizes = this.state.sizes;
        sizes.push(chips)
        this.setState({
            sizes: sizes
        })
    }

    handleDeleteChip(chip, index) {
        let state = false

        this.state.data.map(item =>{
            if (item.productSize === chip){
                state = true
            }
        })

        if(!state){
            let sizes = this.state.sizes;
            sizes.splice(index, 1);
            this.setState({
                sizes: sizes
            })
        }else {
            this.alertMsg("error", "Oooooooooooopz!", "This Size have Added Colors.If You want To delete please remove Color")
        }

    }

    alertMsg = (icon, title, text) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        });
    }

    checkSize = () => {
        let unUsedSizes = this.state.sizes;

        this.state.data.map(item => {
            unUsedSizes = unUsedSizes.filter(size => {
                return  size !== item.productSize
            })
        })

        if(unUsedSizes.length !== 0){
            this.alertMsg("error", "Oooooooooooopz!", "Please Remove Unused Sizes.")
            return false
        }

        if(this.state.data.length !== 0){
            return true
        }else {
           this.alertMsg("error", "Oooooooooooopz!", "Please Add Color And Quantity With Size.")
            return false
        }
    }

    render() {

        return (
            <React.Fragment>
                <div style={{marginBottom: "20px", paddingLeft: "20px", paddingRight: "20px", marginTop: "-10px"}}>
                    <ChipInput
                        required
                        label={"Please add Product Sizes"}
                        fullWidth
                        allowDuplicates={false}
                        value={this.state.sizes}
                        onAdd={(chip) => this.addChips(chip)}
                        onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                    />
                </div>
                <MaterialTable
                    title="Product Sizes"
                    columns={this.getColumns()}
                    options={{
                        actionsColumnIndex: -1,
                        headerStyle: {
                            backgroundColor: '#34569b',
                            color: '#FFF'
                        },
                    }}

                    data={this.state.data}
                    editable={{
                        onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        if (productSizeValidation(newData)) {
                                            data.push(newData);
                                        }
                                        return {...prevState, data};
                                    });
                                }, 400);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        this.setState((prevState) => {
                                            const data = [...prevState.data];
                                            if (productSizeValidation(newData)) {
                                                data[data.indexOf(oldData)] = newData;
                                            }

                                            return {...prevState, data};
                                        });
                                    }
                                }, 600);
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        return {...prevState, data};
                                    });
                                }, 600);
                            }),
                    }}
                />
            </React.Fragment>

        );
    }

}

