// react import
import React from "react";
// mantine import
import { Carousel } from "@mantine/carousel";
import { Button } from "@mantine/core";
// image import
import HeroImg2 from "/public/storage/hero_images/manchester_united_home3-removebg-preview.png";
import HeroImg1 from "/public/storage/hero_images/real_madrid_home1-removebg-preview.png";
import HeroImg3 from "/public/storage/hero_images/bayern_munchen_home3-removebg-preview.png";
// component import
import Container from "@/Components/Home/Container";

const heroDatas = [
  {
    headline: "Lorem ipsum dolor sit amet",
    subHeadline: "Lorem ipsum dolor sit amet amet sit ipsut dolor lorem",
    image: HeroImg1,
  },
  {
    headline: "Lorem ipsum dolor sit amet",
    subHeadline: "Lorem ipsum dolor sit amet amet sit ipsut dolor lorem",
    image: HeroImg2,
  },
  {
    headline: "Lorem ipsum dolor sit amet",
    subHeadline: "Lorem ipsum dolor sit amet amet sit ipsut dolor lorem",
    image: HeroImg3,
  },
];

const HeroSection = () => {
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
                  <div className="flex gap-4">
                    <Button size="md" className="mt-6">
                      Beli Sekarang
                    </Button>
                    <Button variant="default" size="md" className="mt-6 ">
                      Hubungi Kami
                    </Button>
                  </div>
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
