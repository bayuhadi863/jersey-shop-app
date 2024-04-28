/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
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
  Avatar,
  Menu,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoSearch } from "react-icons/io5";
import { RiShoppingBagLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { RiBillLine } from "react-icons/ri";
import { LuUser } from "react-icons/lu";
import { PiAddressBookBold } from "react-icons/pi";
import { IoWalletOutline } from "react-icons/io5";

const links = [
  {
    label: "BERANDA",
    href: "/",
  },
  {
    label: "BELANJA",
    href: "/products",
  },
  {
    label: "HUBUNGI KAMI",
    href: "/",
  },
];

const userLinks = [
  {
    label: "Profil",
    routeName: "profile.edit",
    icon: <LuUser style={{ width: rem(14), height: rem(14) }} />,
  },
  {
    label: "Alamat",
    routeName: "address.index",
    icon: <PiAddressBookBold style={{ width: rem(14), height: rem(14) }} />,
  },
  {
    label: "Pesanan",
    routeName: "order.index",
    icon: <RiBillLine style={{ width: rem(14), height: rem(14) }} />,
  },
  {
    label: "Dompet",
    routeName: "wallet.index",
    icon: <IoWalletOutline style={{ width: rem(14), height: rem(14) }} />,
  },
];

const adminLinks = [
  {
    label: "Profil",
    routeName: "profile.edit",
    icon: <LuUser style={{ width: rem(14), height: rem(14) }} />,
  },
];

const getInitialName = (name) => {
  const words = name.split(" ");
  let initials = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i].charAt(0);
  }

  return initials;
};

const Header = ({ authenticatedUser }) => {
  const [value, setValue] = useState("");
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <header className="text-gray-700">
        <Container>
          <div className="flex justify-between items-center">
            <div className="flex gap-14 items-center ">
              <Link href="/" className=" text-4xl font-bold ">
                My<span className="text-primary">Jersey</span>
              </Link>
              <nav className="hidden lg:block">
                <ul className="flex items-center gap-6 font-semibold uppercase">
                  {links.map((link, i) => (
                    <li key={i}>
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
              <Link className="text-2xl relative" href={route("cart.index")}>
                <RiShoppingBagLine />

                <Badge className="absolute -top-1 -right-1" size="xs" circle>
                  1
                </Badge>
              </Link>
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

                {authenticatedUser ? (
                  <Menu shadow="md" width={170}>
                    <Menu.Target>
                      <Avatar
                        color="cyan"
                        variant="filled"
                        radius="xl"
                        component="button"
                      >
                        {getInitialName(authenticatedUser.name)}
                      </Avatar>
                    </Menu.Target>

                    <Menu.Dropdown>
                      {authenticatedUser.is_admin
                        ? adminLinks.map((link, i) => (
                            <Menu.Item
                              key={i}
                              leftSection={link.icon}
                              component={Link}
                              href={route(link.routeName)}
                            >
                              {link.label}
                            </Menu.Item>
                          ))
                        : userLinks.map((link, i) => (
                            <Menu.Item
                              key={i}
                              leftSection={link.icon}
                              component={Link}
                              href={route(link.routeName)}
                            >
                              {link.label}
                            </Menu.Item>
                          ))}

                      <Menu.Divider />

                      <Menu.Item
                        color="red"
                        leftSection={
                          <TbLogout2
                            style={{ width: rem(14), height: rem(14) }}
                          />
                        }
                        component={Link}
                        method="post"
                        href={route("logout")}
                        as="button"
                      >
                        Logout
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                ) : (
                  <Button
                    variant="filled"
                    component={Link}
                    href={route("login")}
                  >
                    Masuk
                  </Button>
                )}
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
        <Button variant="filled" fullWidth>
          Masuk
        </Button>
      </Drawer>
    </>
  );
};

export default Header;
