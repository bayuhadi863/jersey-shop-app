/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// react import
import React, { useState, useEffect } from "react";
// component import
import HomeLayout from "@/Layouts/HomeLayout";
import PageTitle from "@/Components/Home/PageTitle";
import Container from "@/Components/Home/Container";
import ProductCard from "@/Components/Home/ProductCard";
// mantine import
import { Select, RangeSlider, Checkbox } from "@mantine/core";
// Inertia import
import { router } from "@inertiajs/react";

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

const ProductListPage = ({
  auth,
  products,
  categoriesData,
  maxPrice,
  minPrice,
  orderBy,
  order,
}) => {
  // state for sorting
  const [value, setValue] = useState("");
  const [orderByState, setOrderByState] = useState(orderBy);
  const [orderState, setOrderState] = useState(order);

  // Filtering
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [priceRangeEnd, setPriceRangeEnd] = useState([minPrice, maxPrice]);
  const marks = [
    { value: minPrice, label: formatPrice(minPrice) },
    { value: maxPrice, label: formatPrice(maxPrice) },
  ];

  const [categoryValue, setCategoryValue] = useState("");

  function formatPrice(price) {
    // Jika harga lebih besar dari atau sama dengan 1000
    if (price >= 1000) {
      // Bagikan harga dengan 1000 dan bulatkan ke bilangan bulat terdekat
      let roundedPrice = Math.round(price / 1000);
      // Tambahkan "k" setelah harga dan kembalikan hasilnya
      return roundedPrice + "k";
    }
    // Jika harga kurang dari 1000, kembalikan harga tanpa perubahan
    return price;
  }

  useEffect(() => {
    router.visit(
      route("product.homeProductIndex", {
        // orderBy: orderByState,
        // order: orderState,
        minPrice: priceRangeEnd[0],
        maxPrice: priceRangeEnd[1],
      })
    );
  }, [priceRangeEnd]);

  return (
    <HomeLayout authenticatedUser={auth.user}>
      <PageTitle>List Produk</PageTitle>

      <Container>
        <div className="flex flex-col-reverse lg:flex-row gap-10 py-4">
          {/* sidebar */}
          <aside className="basis-1/4">
            <div className="py-4 px-8 border rounded-md">
              <p>Filter Harga</p>
              <RangeSlider
                value={priceRange}
                onChange={setPriceRange}
                onChangeEnd={(value) => {
                  setPriceRangeEnd(value);
                  // router.visit(
                  //   route("product.homeProductIndex", {
                  //     orderBy,
                  //     order,
                  //     minPrice: value[0],
                  //     maxPrice: value[1],
                  //   })
                  // );
                }}
                min={minPrice}
                max={maxPrice}
                marks={marks}
                className="mt-4"
              />
              <p className="mt-10 mb-2">Filter Klub</p>
              <Select
                size="md"
                placeholder="Pilih klub"
                data={categoriesData}
                value={categoryValue ? categoryValue.value : ""}
                onChange={(_value, option) => {
                  setCategoryValue(option);
                }}
              />
              <p className="mt-5 mb-2">Filter Jenis Jersey</p>
              <Checkbox defaultChecked label="Home Kit" />
              <Checkbox defaultChecked label="Away Kit" className="mt-2" />
              <Checkbox defaultChecked label="Third Kit" className="mt-2" />
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
                  if (option.value === "sort1") {
                    setOrderByState("price");
                    setOrderState("asc");
                  } else if (option.value === "sort2") {
                    setOrderByState("price");
                    setOrderState("desc");
                  } else if (option.value === "sort3") {
                    setOrderByState("sold");
                    setOrderState("desc");
                  } else if (option.value === "sort4") {
                    setOrderByState("sold");
                    setOrderState("asc");
                  }
                  // router.visit(
                  //   route("product.homeProductIndex", {
                  //     orderBy: orderBy,
                  //     order: order,
                  //     minPrice: priceRangeEnd[0],
                  //     maxPrice: priceRangeEnd[1],
                  //   })
                  // );
                }}
              />
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6">
              {products.length === 0 ? (
                <p>Produk tidak ada.</p>
              ) : (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>
      </Container>
    </HomeLayout>
  );
};

export default ProductListPage;
