import React, { useContext } from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import POSInfoContext from "../../../contexts/POSInfo";
import AvatarWrapper from "../../../components/AvatarWrapper";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useProducts } from "../../../state/products";

const useStyles = makeStyles(theme => ({
  grid: {
    margin: 0,
    padding: 10,
    width: 800
  },
  cardButton: {
    width: "100%"
  },
  cardImg: {
    margin: "auto"
  }
}));

const ProductPOS = () => {
  const classes = useStyles();
  const posContext = useContext(POSInfoContext);
  const [isLoadingProducts, products] = useProducts();

  return (
    <Grid
      className={classes.grid}
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      {!isLoadingProducts
        ? products.map(product => (
            <Grid key={product.id} item xs={4}>
              <ButtonBase
                className={classes.cardButton}
                focusRipple
                onClick={() => {
                  posContext.setProductId(product.id);
                  posContext.nextPage();
                }}
              >
                <ProductCard product={product} />
              </ButtonBase>
            </Grid>
          ))
        : null}
    </Grid>
  );
};

const ProductCard = ({ product }) => {
  const classes = useStyles();
  return (
    <Card className={classes.cardButton}>
      <CardContent>
        <AvatarWrapper
          className={classes.cardImg}
          isImg={product.imageUrl}
          src={product.imageUrl ? product.imageUrl : product.name}
        />
        <Typography variant="h6" color="inherit" noWrap>
          {`${product.name} / ${product.stock ? product.stock.quantity : 0}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductPOS;
