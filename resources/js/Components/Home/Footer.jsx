import React from "react";

const Footer = () => {
  const date = new Date;
  const year = date.getFullYear();

  return <footer className="text-center bg-primary text-white py-8 text-sm">&copy; {year} MyJersey Dev. All rights reserved.</footer>;
};

export default Footer;
