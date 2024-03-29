/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
//Component import
import DashboardLayout from "@/Layouts/DashboardLayout";
import PageTitle from "../../Components/Dashboard/PageTitle";
//Mantice core import
import { Button } from "@mantine/core";
// Iternia import
import { Link } from "@inertiajs/react";
// Icons import
import { IoMdAddCircleOutline } from "react-icons/io";

const ProductListPage = ({ data, auth }) => {
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "Aksi",
        Cell: ({ cell }) => (
          <Link href={route("product.show", cell.getValue())}>Edit</Link>
        ),
        size: 80,
      },
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Nama Produk",
      },
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Nama Produk",
      },
      {
        accessorKey: "category",
        header: "Kategori",
      },
      {
        accessorKey: "price",
        header: "Harga",
        Cell: ({ cell }) => <span>Rp{cell.getValue().toLocaleString()}</span>,
        size: 100,
      },
      {
        accessorKey: "created_at",
        header: "Waktu Tambah",
      },
      {
        accessorKey: "updated_at",
        header: "Update Terakhir",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data,
  });

  return (
    <DashboardLayout authenticatedUser={auth.user}>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-6 sm:items-center">
        <PageTitle>Daftar Produk</PageTitle>
        <div>
          <Button
            component={Link}
            href="/dashboard/product/create"
            leftSection={<IoMdAddCircleOutline size={16} />}
          >
            Tambah Produk
          </Button>
        </div>
      </div>
      <div className="mt-6">
        <MantineReactTable table={table} />
      </div>
    </DashboardLayout>
  );
};

export default ProductListPage;
