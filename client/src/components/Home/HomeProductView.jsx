import React, { useState } from "react";
import { Container, Grid, Typography } from "@material-ui/core/";
import axios from "axios";
import { useEffect } from "react";

import SmallProductView from "../StoreManager/ProductView/SmallProductView";

const HomeProductView = () => {
  const [categories, setCategories] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/Categories/")
      .then((res) => {
        setCategories(res.data);
        getProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getProducts = (categories) => {
    axios
      .get("http://localhost:8080/api/products/")
      .then((res) => {
        setProductList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayProductsByCategory = () => {
    return categories.map((cate) => {
      return {
        category: cate.CategoryName,
        data: productList
          .filter((p) => p.productCategory === cate.CategoryName)
          .slice(0, 3),
      };
    });
  };

  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: "50px", marginBottom: "50px" }}
    >
      {displayProductsByCategory().map((proCategory) => (
        <Grid container direction={"row"}>
          <Grid
            item
            xs={12}
            direction={"row"}
            style={{ marginTop: "25px", marginBottom: "25px" }}
          >
            <Typography variant="h3" align="center" color="textSecondary">
              {proCategory.data.length > 0 ? proCategory.category : null}
            </Typography>
          </Grid>
          <Grid container direction={"row"}>
            {proCategory.data.map((product) => {
              return <SmallProductView key={product._id} product={product} />;
            })}
          </Grid>
        </Grid>
      ))}
    </Container>
  );
};

export default HomeProductView;
