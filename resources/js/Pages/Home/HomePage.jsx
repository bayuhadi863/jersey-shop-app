/* eslint-disable react/prop-types */
// react import
import React from "react";
// component import
import HomeLayout from "@/Layouts/HomeLayout";
import HeroSection from "./Partials/HeroSection";
import FeaturedProductSection from "./Partials/FeaturedProductSection";

const HomePage = ({ auth, products }) => {
  return (
    <HomeLayout authenticatedUser={auth.user}>
      <HeroSection />
      <FeaturedProductSection products={products} />
    </HomeLayout>
  );
};

export default HomePage;
