/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {
  AppShell,
  Burger,
  Group,
  NavLink,
  Avatar,
  Menu,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "@inertiajs/react";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiBillLine } from "react-icons/ri";
import { PiTShirt } from "react-icons/pi";
import { TbLogout2 } from "react-icons/tb";
import { LuUser } from "react-icons/lu";
import { FooterSimple } from "@/Components/Dashboard/Footer";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <AiOutlineDashboard size="1rem" stroke={1.5} />,
  },
  {
    label: "Produk",
    href: "/dashboard",
    icon: <PiTShirt size="1rem" stroke={1.5} />,
    children: [
      {
        label: "Daftar Produk",
        href: "/dashboard/product",
      },
      {
        label: "Tambah Produk",
        href: "/dashboard/product/create",
      },
    ],
  },
  {
    label: "Pesanan",
    href: "/dashboard",
    icon: <RiBillLine size="1rem" stroke={1.5} />,
  },
];

const userLinks = [
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

export default function DashboardLayout({ children, authenticatedUser }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
      withBorder={false}
    >
      <AppShell.Header>
        <Group h="100%" px="md" className="border-b border-gray-100">
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center gap-2">
              <div>
                <Burger
                  opened={mobileOpened}
                  onClick={toggleMobile}
                  hiddenFrom="sm"
                  size="sm"
                />
                <Burger
                  opened={desktopOpened}
                  onClick={toggleDesktop}
                  visibleFrom="sm"
                  size="sm"
                />
              </div>
              <Link href="/" className="text-3xl font-bold">
                My<span className="text-primary">Jersey</span>
              </Link>
            </div>
            <Menu shadow="md" width={160}>
              <Menu.Target>
                <Avatar
                  color="cyan"
                  variant="filled"
                  radius="xl"
                  component="button"
                  size="md"
                >
                  {getInitialName(authenticatedUser.name)}
                </Avatar>
              </Menu.Target>

              <Menu.Dropdown>
                {userLinks.map((link, i) => (
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
                    <TbLogout2 style={{ width: rem(14), height: rem(14) }} />
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
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {links.map((link, i) =>
          link.children ? (
            <NavLink
              href="#required-for-focus"
              key={i}
              label={link.label}
              leftSection={link.icon}
              childrenOffset={28}
            >
              {link.children.map((child, idx) => (
                <NavLink
                  key={idx}
                  href={child.href}
                  label={child.label}
                  component={Link}
                />
              ))}
            </NavLink>
          ) : (
            <NavLink
              key={i}
              href={link.href}
              label={link.label}
              leftSection={link.icon}
              component={Link}
            />
          )
        )}
      </AppShell.Navbar>
      <AppShell.Main className="bg-gray-100 shadow-inner">
        <div className="p-4 min-h-screen">{children}</div>
      </AppShell.Main>
      <FooterSimple />
    </AppShell>
  );
}
