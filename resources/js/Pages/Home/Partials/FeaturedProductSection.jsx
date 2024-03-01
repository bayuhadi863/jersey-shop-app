/* eslint-disable react/prop-types */
// react import
import React from "react";
// component import
import SectionTitle from "@/Components/Home/SectionTitle";
import Container from "@/Components/Home/Container";
import ProductCard from "@/Components/Home/ProductCard";
// mantine import

const FeaturedProductSection = ({ products }) => {
  return (
    <section className="py-10">
      <Container>
        <div>
          <SectionTitle>Jersey Terbaru</SectionTitle>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProductSection;
