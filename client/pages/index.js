import Head from "next/head";
import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import { Container, Grid } from "@material-ui/core";
import TableDataComponent from "../components/TableDataComponent";
import { makeStyles } from "@material-ui/core/styles";
import AddUserComponent from "../components/AddUserComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
  },
}));

export default function HomePage() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Head>
        <title key="title">Webapp</title>
      </Head>
      <HeaderComponent />
      <Container className={classes.root}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={9}>
            <TableDataComponent />
          </Grid>
          <Grid item sm={12} md={3}>
            <AddUserComponent />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
