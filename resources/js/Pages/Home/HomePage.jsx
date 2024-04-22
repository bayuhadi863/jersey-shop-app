/* eslint-disable react/prop-types */
// react import
import React, { useEffect } from "react";
// component import
import HomeLayout from "@/Layouts/HomeLayout";
import HeroSection from "./Partials/HeroSection";
import FeaturedProductSection from "./Partials/FeaturedProductSection";
import ServicesSection from "./Partials/ServicesSection";
import AboutSection from "./Partials/AboutSection";
import ContactSection from "./Partials/ContactSection/ContactSection";
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
      <HeroSection user={auth.user} />
      <FeaturedProductSection products={products} />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </HomeLayout>
  );
};

export default HomePage;
