/* eslint-disable react/prop-types */
// React import
import React, { useMemo } from "react";

// Inertia import
import { Link } from "@inertiajs/react";

// Mantine import
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { Button } from "@mantine/core";

const OrderDatatable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "Aksi",
        Cell: ({ cell }) => (
          <Button
            component={Link}
            // eslint-disable-next-line no-undef
            href={route("order.show", cell.getValue())}
            variant="outline"
          >
            Lihat
          </Button>
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
        accessorKey: "user",
        header: "Pemesan",
        Cell: ({ cell }) => (
          <div>
            <p>{cell.getValue().name}</p>
            <p>{cell.getValue().email}</p>
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

  return <MantineReactTable table={table} />;
};

export default OrderDatatable;
