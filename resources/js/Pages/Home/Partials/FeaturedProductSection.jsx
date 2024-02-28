/* eslint-disable react/prop-types */
// react import
import React from "react";
// component import
import SectionTitle from "@/Components/Home/SectionTitle";
import Container from "@/Components/Home/Container";
// mantine import
import { Card, Image, Text } from "@mantine/core";

const FeaturedProductSection = ({ products }) => {
  console.log(products);
  return (
    <section className="py-10">
      <Container>
        <div>
          <SectionTitle>Jersey Terbaru</SectionTitle>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {products.map((product) => (
            <Card
              key={product.id}
              padding="xl"
              component="a"
              href="/"
              target="_blank"
              className="hover:shadow-card transition"
            >
              <Card.Section>
                <div className="bg-gray-200">
                  <Image
                    src={`/storage/product_images/${product.product_image[0].image}`}
                    w={300}
                    fit="contain"
                    alt="Gambar roduk"
                  />
                </div>
              </Card.Section>

              <Text fw={500} size="lg" mt="md">
                {product.name}
              </Text>

              <Text mt="xs" c="dimmed" size="sm">
                {product.price}
              </Text>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProductSection;
