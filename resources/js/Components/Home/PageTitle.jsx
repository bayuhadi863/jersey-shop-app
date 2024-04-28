/* eslint-disable react/prop-types */
import React from "react";
import Container from "./Container";
// icon import
import { IoArrowBackCircleOutline } from "react-icons/io5";
// inertia import
import { Link } from "@inertiajs/react";

const PageTitle = ({ children }) => {
  return (
    <div className="bg-gray-100 shadow-inner">
      <Container>
        <h1 className="text-2xl font-medium uppercase">{children}</h1>
      </Container>
    </div>
  );
};

export default PageTitle;
