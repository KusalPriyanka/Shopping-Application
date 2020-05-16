import React, { Component } from "react";
import MaterialTable from "material-table";
import { withStyles } from "@material-ui/styles";
import { green, red } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const styles = (theme) => ({
    backdrop: {
        zIndex: 1500,
        color: "#fff",
    },
    paper: {
        marginBottom: "30px",
    },
});

class AllProducts extends Component {

    getIcon = (icon) => {
        if (icon === "edit") return <Icon style={{ color: green[500] }}>edit</Icon>;
        else return <Icon style={{ color: red[500] }}>delete</Icon>;
    };

    render() {
        const { classes, data, handleEditCategory, handleDeleteCategory } = this.props;
        return (
            <Container>
                <Grid container>
                    <Grid item xs={12} className={classes.paper + " hoverable"}>
                        {/*{this.renderRedirect()}*/}

                        <MaterialTable
                            title="All Categories"  //table title
                            //table column names
                            columns={[
                                { title: "Category Name", field: "CategoryName" },
                                { title: "Category Description", field: "categoryDescription" },
                            ]}
                            data={data} //table row data
                            //table action column
                            options={{
                                actionsColumnIndex: 0,
                                headerStyle: {
                                    backgroundColor: "#34569b",
                                    color: "#FFF",
                                },
                            }}
                            actions={[
                                {
                                    icon: () => this.getIcon("edit"),
                                    tooltip: "Update Product",
                                    onClick: (event, rowData) =>
                                        handleEditCategory(rowData._id),
                                },
                                {
                                    icon: () => this.getIcon("delete"),
                                    tooltip: "Delete Product",
                                    // onClick: (event, rowData) => this.deleteProduct(rowData._id)
                                    onClick: (event, rowData) =>
                                        handleDeleteCategory(rowData._id),
                                },
                            ]}
                        />
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
export default withStyles(styles)(AllProducts);
