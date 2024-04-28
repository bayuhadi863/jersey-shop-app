/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// react import
import React, { useState } from "react";
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
    value: "priceAsc",
    label: "Harga terendah",
  },
  {
    value: "priceDesc",
    label: "Harga tertinggi",
  },
  {
    value: "soldDesc",
    label: "Paling banyak terjual",
  },
  {
    value: "soldAsc",
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
  selectedMinPrice,
  selectedMaxPrice,
  selectedCategory,
  homeKit,
  awayKit,
  thirdKit,
}) => {
  // state for sorting
  const [value, setValue] = useState("");
  const [orderByState, setOrderByState] = useState(orderBy);

  // Filtering
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [priceRangeEnd, setPriceRangeEnd] = useState([
    selectedMinPrice,
    selectedMaxPrice,
  ]);
  const marks = [
    { value: minPrice, label: formatPrice(minPrice) },
    { value: maxPrice, label: formatPrice(maxPrice) },
  ];

  const [category, setCategory] = useState(selectedCategory);
  const [homeKitState, setHomeKitState] = useState(homeKit);
  const [awayKitState, setAwayKitState] = useState(awayKit);
  const [thirdKitState, setThirdKitState] = useState(thirdKit);

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

  console.log("homekit", homeKitState);
  console.log("awaykit", awayKitState);
  console.log("thirdkit", thirdKitState);

  return (
    <HomeLayout authenticatedUser={auth.user}>
      <PageTitle>List Produk</PageTitle>

      <Container>
        <div className="flex flex-col-reverse lg:flex-row gap-10 py-4">
          {/* sidebar */}
          <aside className="basis-1/4">
            <div className="py-4 px-6 border rounded-md">
              <p>Filter Harga</p>
              <RangeSlider
                defaultValue={[selectedMinPrice, selectedMaxPrice]}
                onChange={setPriceRange}
                onChangeEnd={(value) => {
                  setPriceRangeEnd(value);
                  router.visit(
                    route("product.homeProductIndex", {
                      orderBy: orderByState,
                      minPrice: value[0],
                      maxPrice: value[1],
                      category: category,
                      homeKit: homeKitState,
                      awayKit: awayKitState,
                      thirdKit: thirdKitState,
                    })
                  );
                }}
                min={minPrice}
                max={maxPrice}
                marks={marks}
                step={10000}
                className="mt-4"
              />
              <p className="mt-10 mb-2">Filter Klub</p>
              <Select
                size="md"
                placeholder="Pilih klub"
                data={categoriesData}
                value={selectedCategory}
                onChange={(_value, option) => {
                  setCategory(option.value);
                  router.visit(
                    route("product.homeProductIndex", {
                      orderBy: orderByState,
                      minPrice: priceRangeEnd[0],
                      maxPrice: priceRangeEnd[1],
                      category: option.value,
                      homeKit: homeKitState,
                      awayKit: awayKitState,
                      thirdKit: thirdKitState,
                    })
                  );
                }}
              />
              <p className="mt-5 mb-2">Filter Jenis Jersey</p>
              <Checkbox
                checked={homeKitState}
                onChange={(e) => {
                  setHomeKitState(!homeKitState);
                  router.visit(
                    route("product.homeProductIndex", {
                      orderBy: orderByState,
                      minPrice: priceRangeEnd[0],
                      maxPrice: priceRangeEnd[1],
                      category: category,
                      homeKit: e.target.checked,
                      awayKit: awayKitState,
                      thirdKit: thirdKitState,
                    })
                  );
                }}
                label="Home Kit"
              />
              <Checkbox
                checked={awayKitState}
                onChange={(e) => {
                  setAwayKitState(!awayKitState);
                  router.visit(
                    route("product.homeProductIndex", {
                      orderBy: orderByState,
                      minPrice: priceRangeEnd[0],
                      maxPrice: priceRangeEnd[1],
                      category: category,
                      homeKit: homeKitState,
                      awayKit: e.target.checked,
                      thirdKit: thirdKitState,
                    })
                  );
                }}
                label="Away Kit"
                className="mt-2"
              />
              <Checkbox
                checked={thirdKitState}
                onChange={(e) => {
                  setThirdKitState(!thirdKitState);
                  router.visit(
                    route("product.homeProductIndex", {
                      orderBy: orderByState,
                      minPrice: priceRangeEnd[0],
                      maxPrice: priceRangeEnd[1],
                      category: category,
                      homeKit: homeKitState,
                      awayKit: awayKitState,
                      thirdKit: e.target.checked,
                    })
                  );
                }}
                label="Third Kit"
                className="mt-2"
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
                value={orderBy ? orderBy : value}
                onChange={(_value, option) => {
                  setValue(option);
                  setOrderByState(option.value);
                  router.visit(
                    route("product.homeProductIndex", {
                      orderBy: option.value,
                      minPrice: priceRangeEnd[0],
                      maxPrice: priceRangeEnd[1],
                      category: category,
                      homeKit: homeKitState,
                      awayKit: awayKitState,
                      thirdKit: thirdKitState,
                    })
                  );
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
