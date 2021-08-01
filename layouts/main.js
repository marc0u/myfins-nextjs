import React from "react";
import PropTypes from "prop-types";

import BaseLayout from "./base";
import Header from "./header";
import Footer from "./footer";
import Page from "./page";
import Theme from "./theme";

const MainLayout = ({ children }) => {
  return (
    <BaseLayout>
      <Theme>
        <Header />
        <Page>{children}</Page>
        <Footer />
      </Theme>
    </BaseLayout>
  );
};

MainLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default MainLayout;
