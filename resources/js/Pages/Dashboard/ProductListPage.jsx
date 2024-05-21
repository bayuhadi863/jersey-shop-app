/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
//Component import
import DashboardLayout from "@/Layouts/DashboardLayout";
import PageTitle from "../../Components/Dashboard/PageTitle";
//Mantice core import
import { Button, ActionIcon, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
// Iternia import
import { Link, router } from "@inertiajs/react";
// Icons import
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";

const ProductListPage = ({ data, auth }) => {
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        // Menggunakan colSpan={2} untuk menggabungkan dua cell dalam satu header
        header: <th colSpan={2}>Aksi</th>,
        Cell: ({ cell }) => (
          <div>
            <ActionIcon
              variant="filled"
              color="blue"
              aria-label="Lihat"
              component={Link}
              href={route("product.show", cell.getValue())}
            >
              <FiEye />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              color="yellow"
              aria-label="Edit"
              component={Link}
              href={route("product.edit", cell.getValue())}
              className="mx-1"
            >
              <BiEdit />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              color="red"
              aria-label="Hapus"
              onClick={() => {
                modals.openConfirmModal({
                  title: "Hapus Produk",
                  centered: true,
                  children: (
                    <Text size="sm">
                      Apakah anda yakin ingin menghapus produk ini? Anda tidak
                      dapat mengembalikan produk yang sudah dihapus.
                    </Text>
                  ),
                  labels: {
                    confirm: "Hapus",
                    cancel: "Batal",
                  },
                  confirmProps: { color: "red" },
                  onCancel: () => console.log("Cancel"),
                  onConfirm: () => {
                    router.visit(`/dashboard/product/${cell.getValue()}`, {
                      method: "delete",
                      onSuccess: () => {
                        close();
                        notifications.show({
                          color: "green",
                          title: "Success notification",
                          message: "Berhasil menghapus produk!",
                        });
                      },
                      onError: (errors) => {
                        close();
                        if (errors.remainingBalance) {
                          notifications.show({
                            color: "red",
                            title: "Error notification",
                            message: errors.remainingBalance,
                          });
                        }
                      },
                    });
                  },
                });
              }}
            >
              <FiTrash2 />
            </ActionIcon>
          </div>
        ),
        size: 140,
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
