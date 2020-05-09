import React, {Component} from "react";
import axios from 'axios'
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import '../../css/hoverable.css'


class MainProductView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            images:[],
            open: false,
        }
    }

    componentDidMount() {
        this.setState({
            open: true,
        })
        let url = `http://localhost:8080/api/products/${this.props.match.params.id}`
        axios.get(url)
            .then(res => {
                let images = [];
                res.data.productImageURLS.map((image) => {
                    images.push(image.imageURL);
                });

                this.setState({
                    product: res.data,
                    images:images,
                    open: false,
                })
            }).catch(err => {
            console.log(err)
        })


    }


    render() {


        return (
            <React.Fragment>
                <Container>
                    <Backdrop style={{zIndex: '10000', color: '#fff',}} open={this.state.open}>
                        <CircularProgress color="inherit"/>
                    </Backdrop>
                    {(this.state.product != null) ?
                        <Paper className={'hoverable'} elevation={3} style={{marginTop: '40px'}}>
                            <Container style={{padding: "30px"}}>
                                <Grid container item>
                                    <Grid item xs={12} sm={5} container alignItems={"center"} justify={"center"}>
                                        <img style={{maxWidth:"100%"}} width={'400px'} src={this.state.images[0]}/>
                                    </Grid>
                                    <Grid item xs={12} sm={7}>
                                        <Typography variant={'h4'} color={"primary"}>
                                            {this.state.product.productName}
                                        </Typography>
                                        <Typography variant={'h6'}>
                                            {this.state.product.productCategory}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Paper> : <React.Fragment></React.Fragment>
                    }

                </Container>

            </React.Fragment>
        )
    }
}

export default MainProductView;
