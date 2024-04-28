/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// react import
import React, { useState, useEffect } from "react";
// mantine react table import
import { useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { ActionIcon, Text } from "@mantine/core";

// inertia import
import { router } from "@inertiajs/react";
// icon import
import { FiTrash2 } from "react-icons/fi";

const CartList = ({ data, setSelectedCartId }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "product_name", //access nested data with dot notation
        header: "Nama Produk",
      },
      {
        accessorKey: "product_price", //access nested data with dot notation
        header: "Harga",
        Cell: ({ cell }) => (
          <span className="text-primary">
            Rp{cell.getValue().toLocaleString()}
          </span>
        ),
        size: 100,
      },
      {
        accessorKey: "product_size",
        header: "Ukuran",
        size: 50,
      },
      {
        accessorKey: "quantity",
        header: "Jumlah",
        size: 50,
      },
      {
        accessorKey: "total_price",
        header: "Total",
        Cell: ({ cell }) => (
          <span className="text-primary">
            Rp{cell.getValue().toLocaleString()}
          </span>
        ),
        size: 100,
      },
      {
        accessorKey: "id",
        header: "Aksi",
        Cell: ({ cell }) => (
          <ActionIcon
            variant="filled"
            color="red"
            aria-label="Batalkan"
            onClick={() => {
              modals.openConfirmModal({
                title: "Hapus Keranjang",
                centered: true,
                children: (
                  <Text size="sm">
                    Apakah anda yakin ingin menghapus keranjang ini? Setelah
                    mengonfirmasi maka keranjang ini akan terhapus.
                  </Text>
                ),
                labels: {
                  confirm: "Hapus Pesanan",
                  cancel: "Batal",
                },
                confirmProps: { color: "red" },
                onCancel: () => console.log("Cancel"),
                onConfirm: () => {
                  router.visit(`/carts/${cell.getValue()}`, {
                    method: "delete",
                    onSuccess: () => {
                      close();
                      notifications.show({
                        color: "green",
                        title: "Success notification",
                        message: "Berhasil menghapus keranjang!",
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
            className="ml-1"
          >
            <FiTrash2 />
          </ActionIcon>
        ),
      },
    ],
    []
  );

  const [rowSelection, setRowSelection] = useState({});
  const selectedIds = Object.keys(rowSelection);

  useEffect(() => {
    setSelectedCartId(selectedIds);
  }, [rowSelection]);

  const table = useMantineReactTable({
    columns,
    data,
    enableRowSelection: true,
    getRowId: (row) => row.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  return <MantineReactTable table={table} />;
};

export default CartList;
