/* eslint-disable react/prop-types */
// react import
import React, { useState } from "react";
// component import
import HomeLayout from "@/Layouts/HomeLayout";
import PageTitle from "@/Components/Home/PageTitle";
import Container from "@/Components/Home/Container";
import ProductCard from "@/Components/Home/ProductCard";
// mantine import
import { Select, RangeSlider } from "@mantine/core";

const sortDatas = [
  {
    value: "sort1",
    label: "Harga terendah",
  },
  {
    value: "sort2",
    label: "Harga tertinggi",
  },
  {
    value: "sort3",
    label: "Paling banyak terjual",
  },
  {
    value: "sort4",
    label: "Paling sedikit terjual",
  },
];

const ProductListPage = ({ auth, products }) => {
  // state for sorting
  const [value, setValue] = useState("");
  const [priceRange, setPriceRange] = useState([20, 80]);
  const [priceRangeEnd, setPriceRangeEnd] = useState([20, 80]);
  console.log(priceRangeEnd);

  return (
    <HomeLayout authenticatedUser={auth.user}>
      <PageTitle>List Produk</PageTitle>

      <Container>
        <div className="flex flex-col-reverse lg:flex-row gap-10 py-4">
          {/* sidebar */}
          <aside className="basis-1/4">
            <div className="p-4 border">
              <label>Filter Berdasarkan Harga</label>
              <RangeSlider
                value={priceRange}
                onChange={setPriceRange}
                onChangeEnd={setPriceRangeEnd}
                className="mt-4"
              />
            </div>
          </aside>

          {/* product list */}
          <div className="basis-3/4">
            <div className="flex justify-end">
              <Select
                size="md"
                placeholder="Urutkan berdasarkan..."
                data={sortDatas}
                value={value ? value.value : ""}
                onChange={(_value, option) => {
                  setValue(option);
                }}
              />
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </HomeLayout>
  );
};

export default ProductListPage;
