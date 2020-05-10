import React from "react";
import MaterialTable from 'material-table';

export default function CategoryList() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Category Name', field: 'name' },
            { title: 'Category Description', field: 'description' },
        ],
        data: [
            {
                name: 'Clothing',
                description: 'Men and women cloths',
            },
            {
                name: 'Watches',
                description: 'Classical watches',
            },
        ],
    });

    return (
        <MaterialTable
            title="Category List"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
}