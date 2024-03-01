/* eslint-disable react/prop-types */
// react import
import React, { useEffect } from "react";
// component import
import HomeLayout from "@/Layouts/HomeLayout";
import HeroSection from "./Partials/HeroSection";
import FeaturedProductSection from "./Partials/FeaturedProductSection";
// Mantine notifications import
import { notifications } from "@mantine/notifications";

const HomePage = ({ auth, products, error }) => {
  useEffect(() => {
    if (error) {
      notifications.show({
        color: "red",
        title: "Error notification",
        message: error,
      });
    }
  }, [error]);

  return (
    <HomeLayout authenticatedUser={auth.user}>
      <HeroSection />
      <FeaturedProductSection products={products} />
    </HomeLayout>
  );
};

export default HomePage;
