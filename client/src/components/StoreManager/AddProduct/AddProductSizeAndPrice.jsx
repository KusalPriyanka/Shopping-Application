import React, {Component} from 'react';
import MaterialTable from 'material-table';

export default class SizeAndPrice extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.sizeAndPrice
        }
    }

    columns = [
        {title: 'Size', field: 'size'},
        {title: 'Color', field: 'color'},
        {title: 'Quantity', field: 'quantity', type: 'numeric'},
        {title: 'Price', field: 'price', type: 'numeric'},

    ]

    componentWillUnmount() {
        this.props.updateSizeAndPrice(this.state.data)
    }

    render() {

        return (
            <MaterialTable
                title="Product Sizes"
                options={{
                    actionsColumnIndex: -1,
                    headerStyle: {
                        backgroundColor: '#34569b',
                        color: '#FFF'
                    },
                }}
                columns={this.columns}
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
        );
    }

}

