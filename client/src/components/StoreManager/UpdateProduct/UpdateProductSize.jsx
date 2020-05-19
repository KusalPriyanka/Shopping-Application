import React, {Component} from 'react';
import MaterialTable from 'material-table';
import ChipInput from 'material-ui-chip-input'


export default class UpdateProductSize extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.sizeAndPrice,
            sizes : this.props.sizes,
        }
        this.getColumns = this.getColumns.bind(this)
        this.addChips = this.addChips.bind(this)
        this.handleDeleteChip = this.handleDeleteChip.bind(this)
    }



    componentWillUnmount() {
        this.props.updateSizeAndPrice(this.state.data, this.state.sizes)
    }

    getColumns(){
        let sizesForTable = {};
        this.state.sizes.map(size => {
            Object.defineProperty(sizesForTable, size, {
                value: size,
                writable : true,
                enumerable : true,
                configurable : true
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

    addChips(chips){
        let sizes = this.state.sizes;
        sizes.push(chips)
        this.setState({
            sizes : sizes
        })
    }
    handleDeleteChip(chip, index){
        let sizes = this.state.sizes;
        sizes.splice(index, 1);
        this.setState({
            sizes : sizes
        })
    }

    render() {

        return (
            <React.Fragment>
                <div style={{marginBottom : "20px", paddingLeft:"20px", paddingRight:"20px", marginTop : "-10px"}}>
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
                                    data.push(newData);
                                    return {...prevState, data};
                                });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
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

