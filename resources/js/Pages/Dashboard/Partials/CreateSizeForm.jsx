/* eslint-disable react/prop-types */
// react import
import React, { useState } from "react";
// mantince core import
import {
  Select,
  NumberInput,
  Button,
  LoadingOverlay,
  Box,
} from "@mantine/core";
// Inertia import
import { useForm } from "@inertiajs/react";
// Mantine notifications import
import { notifications } from "@mantine/notifications";

const CreateSizeForm = ({ product_id, sizes }) => {
  // size data
  const selectSizeData = ["XS", "S", "M", "L", "XL", "XXL"];
  // form data initiation
  const { data, setData, post, processing, errors, reset } = useForm({
    size: "",
    stock: "",
  });
  // handle form submit
  const submit = (e) => {
    e.preventDefault();
    post(`/dashboard/product/${product_id}/size`, {
      preserveScroll: true,
      onSuccess: () => {
        reset("size");
        reset("stock");
        notifications.show({
          color: "green",
          title: "Success notification",
          message: "Berhasil menambahkan size dan stok produk!",
        });
      },
    });
  };

  return (
    <>
      <Box pos="relative">
        <LoadingOverlay
          visible={processing}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <form onSubmit={submit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* SELECT SIZE START */}
            <Select
              label="Ukuran produk"
              size="md"
              placeholder="Masukkan ukuran produk"
              data={selectSizeData}
              value={data.size}
              onChange={(value) => {
                setData("size", value);
              }}
              error={errors.size ? errors.size : false}
            />
            {/* SELECT SIZE END */}

            {/* INPUT STOK START */}
            <NumberInput
              size="md"
              label="Stok"
              placeholder="Masukkan stok produk ukuran ini"
              allowNegative={false}
              allowDecimal={false}
              thousandSeparator="."
              decimalSeparator=","
              value={data.stock}
              onChange={(value) => setData("stock", parseInt(value))}
              error={errors.stock ? errors.stock : false}
            />
            {/* INPUT STOK END */}
          </div>
          <div className="mt-4">
            <Button type="submit" disabled={processing}>
              Tambah
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};

export default CreateSizeForm;
