import React, { Component } from "react";
import MaterialTable from "material-table";
import { withStyles } from "@material-ui/styles";
import { green, red } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CardContent from "@material-ui/core/CardContent";

const styles = (theme) => ({
    backdrop: {
        zIndex: 1500,
        color: "#fff",
    },
    paper: {
        marginBottom: "30px",
    },
});

class StoreManagerList extends Component {

    getIcon = (icon) => {
        return <Icon style={{ color: red[500] }}>delete</Icon>;
    };

    render() {
        const { classes, data, fnHandleDeleteStoreManager } = this.props;
        return (
            <Container>
                <Grid container>
                    <Grid item xs={12} className={classes.paper + " hoverable"}>
                        {/*{this.renderRedirect()}*/}

                        <MaterialTable
                            title="Store managers details"  //table title
                            //table column names
                            columns={[
                                { title: "Name", field: "empName" },
                                { title: "Address", field: "empAddress" },
                                { title: "Email", field: "empEmail" },
                                { title: "Mobile", field: "empContactNo" },
                                //{ title: "Password", field: "empPassword" },
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
                                    icon: () => this.getIcon("delete"),
                                    tooltip: "Delete Product",
                                    // onClick: (event, rowData) => this.deleteProduct(rowData._id)
                                    onClick: (event, rowData) =>
                                        fnHandleDeleteStoreManager(rowData._id),
                                },
                            ]}
                        />
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
export default withStyles(styles)(StoreManagerList);
