import React from "react";
import PropTypes from "prop-types";
import BaseLayout from "./base";
import Header from "./header";
import Footer from "./footer";
import Page from "./page";

const MainLayout = ({ children }) => {
  return (
    <BaseLayout>
      <Header />
      <Page>{children}</Page>
      <Footer />
    </BaseLayout>
  );
};

MainLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default MainLayout;
