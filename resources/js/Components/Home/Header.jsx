import React, { useState } from "react";
import Container from "./Container";
import { Link } from "@inertiajs/react";
import {
  Input,
  CloseButton,
  Button,
  Burger,
  Drawer,
  NavLink,
  Badge,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoSearch } from "react-icons/io5";
import { RiShoppingBagLine } from "react-icons/ri";

const links = [
  {
    label: "BERANDA",
    href: "/",
  },
  {
    label: "BELANJA",
    href: "/",
  },
  {
    label: "HUBUNGI KAMI",
    href: "/",
  },
];

const Header = () => {
  const [value, setValue] = useState("");
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <header className="text-gray-700">
        <Container>
          <div className="flex justify-between items-center">
            <div className="flex gap-14 items-center ">
              <Link href="/" className="text-primary text-4xl font-bold ">
                <span className="text-blue-700">My</span>Jersey
              </Link>
              <nav className="hidden lg:block">
                <ul className="flex items-center gap-6 font-semibold uppercase">
                  {links.map((link) => (
                    <li>
                      <Link
                        href={link.href}
                        className="hover:text-primary transition"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="flex gap-6 items-center">
              <button className="text-2xl relative">
                <RiShoppingBagLine />

                <Badge className="absolute -top-1 -right-1" size="xs" circle>
                  1
                </Badge>
              </button>
              <div className="hidden lg:flex gap-6 items-center">
                <Input
                  placeholder="Cari produk"
                  value={value}
                  onChange={(event) => setValue(event.currentTarget.value)}
                  rightSectionPointerEvents="all"
                  leftSection={<IoSearch size={16} />}
                  rightSection={
                    <CloseButton
                      aria-label="Clear input"
                      onClick={() => setValue("")}
                      style={{ display: value ? undefined : "none" }}
                    />
                  }
                />

                <Button variant="filled" radius="xl">
                  Button
                </Button>
              </div>
              <div className="flex lg:hidden">
                <Burger
                  opened={opened}
                  onClick={open}
                  aria-label="Toggle navigation"
                />
              </div>
            </div>
          </div>
        </Container>
      </header>
      <Drawer opened={opened} onClose={close} size="xs" title="Menu">
        {links.map((link, i) => (
          <NavLink
            key={i}
            href={link.href}
            label={link.label}
            component={Link}
          />
        ))}
        <div className="mt-12 mb-6">
          <Input
            placeholder="Search"
            leftSection={<IoSearch />}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            rightSectionPointerEvents="all"
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => setValue("")}
                style={{ display: value ? undefined : "none" }}
              />
            }
          />
        </div>
        <Button radius="xl" variant="filled" fullWidth>
          Login
        </Button>
      </Drawer>
    </>
  );
};

export default Header;
