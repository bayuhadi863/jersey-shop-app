/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// React import
import React, { useMemo } from "react";

// Inertia import
import { Link, router } from "@inertiajs/react";

// Mantine import
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { Button, ActionIcon, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

// icon import
import { FiEye, FiTrash2 } from "react-icons/fi";

const OrderList = ({ data }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "Aksi",
        Cell: ({ cell }) => (
          <div>
            <ActionIcon
              variant="filled"
              color="blue"
              aria-label="Lihat"
              component={Link}
              href={route("order.show", cell.getValue())}
            >
              <FiEye />
            </ActionIcon>
            {data.find((order) => order.id === cell.getValue())
              .is_paid ? null : (
              <>
                <ActionIcon
                  variant="filled"
                  color="red"
                  aria-label="Batalkan"
                  onClick={() => {
                    modals.openConfirmModal({
                      title: "Pembatalan Pesanan",
                      centered: true,
                      children: (
                        <Text size="sm">
                          Apakah anda yakin ingin membatalkan pesanan ini?
                          Setelah mengonfirmasi maka pesanan Anda akan terhapus.
                        </Text>
                      ),
                      labels: {
                        confirm: "Hapus Pesanan",
                        cancel: "Batal",
                      },
                      confirmProps: { color: "red" },
                      onCancel: () => console.log("Cancel"),
                      onConfirm: () => {
                        router.visit(`/orders/${cell.getValue()}`, {
                          method: "delete",
                          onSuccess: () => {
                            close();
                            notifications.show({
                              color: "green",
                              title: "Success notification",
                              message: "Berhasil membatalkan pesanan!",
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
              </>
            )}
          </div>
        ),
        size: 80,
      },
      {
        accessorKey: "products", //access nested data with dot notation
        header: "Produk",
        Cell: ({ cell }) => (
          <div>
            {cell.getValue().map((product) => (
              <p key={product.id}>
                {product.name} ({product.size}) x{product.quantity}
              </p>
            ))}
          </div>
        ),
      },
      {
        accessorKey: "address", //access nested data with dot notation
        header: "Alamat Pengiriman",
        Cell: ({ cell }) => (
          <div>
            <p>{cell.getValue().recipient_name}</p>
            <p>{cell.getValue().address_name}</p>
            <p>
              {cell.getValue().city}, {cell.getValue().state},{" "}
              {cell.getValue().country} {cell.getValue().postal_code}
            </p>
          </div>
        ),
        size: 300,
      },
      {
        accessorKey: "total_price", //access nested data with dot notation
        header: "Total Harga",
        Cell: ({ cell }) => (
          <span className="text-primary">
            Rp{cell.getValue().toLocaleString()}
          </span>
        ),
        size: 100,
      },
      {
        accessorKey: "shipping_price", //access nested data with dot notation
        header: "Biaya Pengiriman",
        Cell: ({ cell }) => (
          <span className="text-primary">
            Rp{cell.getValue().toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: "is_paid",
        header: "Status Pembayaran",
        Cell: ({ cell }) => (
          <span
            className={`${
              cell.getValue() ? "text-green-500" : "text-red-500"
            } font-semibold`}
          >
            {cell.getValue() ? "Lunas" : "Belum Lunas"}
          </span>
        ),
      },
      {
        accessorKey: "created_at",
        header: "Waktu Pemesanan",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data,
  });

  return (
    <>
      <MantineReactTable table={table} />
    </>
  );
};

export default OrderList;
