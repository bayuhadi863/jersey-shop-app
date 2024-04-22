/* eslint-disable react/prop-types */
// react import
import React from "react";
// mantine import
import { Carousel } from "@mantine/carousel";
import { Button } from "@mantine/core";
// image import
import HeroImg2 from "/public/storage/hero_images/manchester-united-1.png";
import HeroImg1 from "/public/storage/hero_images/real-madrid.png";
import HeroImg3 from "/public/storage/hero_images/bayern-munchen.png";
// component import
import Container from "@/Components/Home/Container";
// Inertia import
import { Link } from "@inertiajs/react";

const heroDatas = [
  {
    headline: "Temukan Jersey Sepak Bola Terlengkap di MyJersey",
    subHeadline:
      "Koleksi terlengkap untuk memenuhi kebutuhan Anda sebagai pecinta sepak bola.",
    image: HeroImg1,
  },
  {
    headline: "Dapatkan Harga Termurah untuk Jersey Sepak Bola",
    subHeadline: "MyJersey memberikan harga terbaik untuk produk berkualitas.",
    image: HeroImg2,
  },
  {
    headline: "Sumber Terpercaya untuk Produk Jersey Sepak Bola Original",
    subHeadline:
      "MyJersey hanya menjual produk original dan berkualitas tinggi.",
    image: HeroImg3,
  },
];

const HeroSection = ({ user }) => {
  return (
    <section>
      <Carousel withIndicators loop>
        {heroDatas.map((data, i) => (
          <Carousel.Slide
            key={i}
            className={`${
              i === 0 ? "bg-primary" : i === 1 ? "bg-red-600" : "bg-green-600"
            } bg-opacity-20`}
          >
            <Container>
              <div className="flex justify-between gap-16 items-center py-5">
                <div>
                  <h1 className="text-2xl uppercase">{data.headline}</h1>
                  <h2 className="text-5xl font-semibold mt-4">
                    {data.subHeadline}
                  </h2>
                  {user.is_admin ? (
                    <Button
                      size="md"
                      className="mt-6"
                      component={Link}
                      href="/dashboard"
                    >
                      Dahsboard
                    </Button>
                  ) : (
                    <div className="flex gap-4">
                      <Button size="md" className="mt-6">
                        Beli Sekarang
                      </Button>
                      <Button variant="default" size="md" className="mt-6 ">
                        Hubungi Kami
                      </Button>
                    </div>
                  )}
                </div>
                <div>
                  <img
                    src={data.image}
                    alt={`image${i + 1}`}
                    className="min-w-96"
                  />
                </div>
              </div>
            </Container>
          </Carousel.Slide>
        ))}
      </Carousel>
    </section>
  );
};

export default HeroSection;
