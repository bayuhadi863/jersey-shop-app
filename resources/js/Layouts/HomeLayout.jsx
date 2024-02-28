/* eslint-disable react/prop-types */
import React from "react";
import Header from "@/Components/Home/Header";
import Footer from "@/Components/Home/Footer";

const HomeLayout = ({ children, authenticatedUser }) => {
  return (
    <>
      <Header authenticatedUser={authenticatedUser} />
      <main className="text-red">{children}</main>
      <Footer />
    </>
  );
};

export default HomeLayout;
