/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { AppShell, Burger, Group, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "@inertiajs/react";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiBillLine } from "react-icons/ri";
import { PiTShirt } from "react-icons/pi";

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

export default function DashboardLayout({ children }) {
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
          <Link href="/" className="text-3xl font-bold">
            My<span className="text-primary">Jersey</span>
          </Link>
          <Link method="post" href={route("logout")} as="button">
            Logout
          </Link>
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
        <div className="p-4">{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
