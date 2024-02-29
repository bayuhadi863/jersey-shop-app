/* eslint-disable react/prop-types */
import React from "react";
import Container from "./Container";

const PageTitle = ({ children }) => {
  return (
    <div className="bg-gray-100 shadow-inner">
      <Container>
        <h1 className="text-3xl font-medium uppercase">{children}</h1>
      </Container>
    </div>
  );
};

export default PageTitle;
