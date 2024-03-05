/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
// component import
import DashboardLayout from "@/Layouts/DashboardLayout";
import PageTitle from "../../Components/Dashboard/PageTitle";
// icons import
import { FaUsers } from "react-icons/fa";
import { FaShirt } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { RiBillFill } from "react-icons/ri";
// mantine import
import { BarChart } from "@mantine/charts";
// Mantine notifications import
import { notifications } from "@mantine/notifications";

export const data = [
  { month: "Januari", Pengguna: 10, Produk: 10, Kategori: 4 },
  { month: "Februari", Pengguna: 16, Produk: 18, Kategori: 5 },
  { month: "Maret", Pengguna: 3, Produk: 2, Kategori: 1 },
];

const Dashboard = ({
  auth,
  error,
  totalUser,
  totalProduct,
  totalCategory,
  totalOrder,
}) => {
  const cartData = [
    {
      label: "Total Pengguna",
      total: totalUser,
      icon: <FaUsers size="2.8rem" />,
    },
    {
      label: "Total Produk",
      total: totalProduct,
      icon: <FaShirt size="2.5rem" />,
    },
    {
      label: "Total Kategori",
      total: totalCategory,
      icon: <BiSolidCategoryAlt size="2.5rem" />,
    },
    {
      label: "Total Pesanan",
      total: totalOrder,
      icon: <RiBillFill size="2.5rem" />,
    },
  ];

  useEffect(() => {
    if (error) {
      notifications.show({
        color: "red",
        title: "Error notification",
        message: error,
      });
    }
  }, [error]);

  return (
    <DashboardLayout authenticatedUser={auth.user}>
      <PageTitle>Dashboard</PageTitle>
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cartData.map((card, i) => (
            <div
              key={i}
              className="flex items-center rounded-md bg-white shadow-md py-5 px-6 gap-4"
            >
              <div>
                <span className="flex items-center text-brand-500">
                  {card.icon}
                </span>
              </div>
              <div>
                <p className="font-dm text-sm font-medium text-gray-600">
                  {card.label}
                </p>
                <h4 className="text-2xl font-semibold text-navy-700">
                  {card.total}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* carts */}
      <div className="mt-6 rounded-md bg-white shadow-md py-4">
        <div className="font-medium mt-8 ml-8">2024</div>
        <BarChart
          p={16}
          h={300}
          data={data}
          dataKey="month"
          withLegend
          series={[
            { name: "Pengguna", color: "violet.6" },
            { name: "Produk", color: "blue.6" },
            { name: "Kategori", color: "teal.6" },
          ]}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
