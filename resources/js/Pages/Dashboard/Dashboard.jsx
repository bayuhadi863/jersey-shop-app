import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { FaUsers } from "react-icons/fa";
import { FaShirt } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import PageTitle from "../../Components/Dashboard/PageTitle";
import { BarChart } from "@mantine/charts";
import "@mantine/charts/styles.css";

export const data = [
  { month: "Januari", Pengguna: 10, Produk: 10, Kategori: 4 },
  { month: "Februari", Pengguna: 16, Produk: 18, Kategori: 5 },
  { month: "Maret", Pengguna: 3, Produk: 2, Kategori: 1 },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <PageTitle>Dashboard</PageTitle>
      <div class="mt-6">
        <div class="min-w-[375px] md:min-w-[700px] xl:min-w-[800px] grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
          <div class="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] light:border-[#ffffff33] light:!bg-navy-800 light:text-white light:shadow-none">
            <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
              <div class="rounded-full bg-lightPrimary p-3 light:bg-navy-700">
                <span class="flex items-center text-brand-500 light:text-white">
                  <FaUsers size="2em" />
                </span>
              </div>
            </div>
            <div class="h-50 ml-4 flex w-auto flex-col justify-center">
              <p class="font-dm text-sm font-medium text-gray-600">
                Total Pengguna
              </p>
              <h4 class="text-xl font-bold text-navy-700 light:text-white">
                29
              </h4>
            </div>
          </div>
          <div class="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] light:border-[#ffffff33] light:!bg-navy-800 light:text-white light:shadow-none">
            <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
              <div class="rounded-full bg-lightPrimary p-3 light:bg-navy-700">
                <span class="flex items-center text-brand-500 light:text-white">
                  <FaShirt size="2em" />
                </span>
              </div>
            </div>
            <div class="h-50 ml-4 flex w-auto flex-col justify-center">
              <p class="font-dm text-sm font-medium text-gray-600">
                Total Produk
              </p>
              <h4 class="text-xl font-bold text-navy-700 light:text-white">
                100
              </h4>
            </div>
          </div>
          <div class="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] light:border-[#ffffff33] light:!bg-navy-800 light:text-white light:shadow-none">
            <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
              <div class="rounded-full bg-lightPrimary p-3 light:bg-navy-700">
                <span class="flex items-center text-brand-500 light:text-white">
                  <BiSolidCategoryAlt size="2em" />
                </span>
              </div>
            </div>
            <div class="h-50 ml-4 flex w-auto flex-col justify-center">
              <p class="font-dm text-sm font-medium text-gray-600">
                Total Kategori
              </p>
              <h4 class="text-xl font-bold text-navy-700 light:text-white">
                10
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] light:border-[#ffffff33] light:!bg-navy-800 light:text-white light:shadow-none">
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
