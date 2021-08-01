import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

export default function BaseLayout({ children }) {
  return (
    <div>
      <Head>
        <title>Myfins-Nextjs</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          key="viewport"
          name="viewport"
          content="initial-scale=1.0, with=device-width"
        />
      </Head>
      {children}
    </div>
  );
}

BaseLayout.prototype = {
  children: PropTypes.element.isRequired,
};
