import React from "react";
import Header from "@/Components/Home/Header";
import Footer from "@/Components/Home/Footer";

const HomeLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default HomeLayout;
