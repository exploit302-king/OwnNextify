import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`Nextify - ${title || 'Home Page'}`}</title>
    </Helmet>
  );
};

export default MetaData;
