/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// react import
import React, { useState, useEffect } from "react";
// mantine react table import
import { useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";

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
