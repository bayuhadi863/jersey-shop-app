/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// react import
import React from "react";
// mantine import
import { Card, Image, Text } from "@mantine/core";
// Inertia import
import { Link } from "@inertiajs/react";

const ProductCard = ({ product }) => {
  return (
    <Card
      padding="md"
      component={Link}
      href={route("product.homeProductShow", product.id)}
      className="hover:shadow-card transition"
    >
      <Card.Section>
        <div className="bg-gray-200 p-4">
          <Image
            src={`/storage/product_images/${product.product_image[0].image}`}
            w={300}
            fit="contain"
            alt="Gambar produk"
          />
        </div>
      </Card.Section>

      <Text fw={400} size="lg" mt="md">
        {product.name}
      </Text>

      <Text mt="xs" c="blue" fw={400} size="lg">
        Rp{product.price.toLocaleString()}
      </Text>
    </Card>
  );
};

export default ProductCard;
