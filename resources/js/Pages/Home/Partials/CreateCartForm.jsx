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

const CreateCartForm = ({ product, selectSizeData }) => {
  // state for select size
  const [value, setValue] = useState("");
  // form data initiation
  const { data, setData, post, processing, errors, reset } = useForm({
    product_size_id: "",
    quantity: 0,
  });
  // handle form submit
  const submit = (e) => {
    e.preventDefault();
    post(`/products/${product.id}/carts`, {
      preserveScroll: true,
      onSuccess: () => {
        reset("product_size_id");
        reset("quantity");
        notifications.show({
          color: "green",
          title: "Success notification",
          message: "Berhasil menambahkan ke keranjang!",
        });
      },
    });
  };

  const [selectedStock, setSelectedStock] = useState(0);

  const findProductSize = (product_size_id) => {
    const filteredProductSize = product.product_size.find(
      (item) => item.id === product_size_id
    );
    setSelectedStock(filteredProductSize.stock);
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
          <div className="grid grid-cols-2 gap-4">
            <Select
              size="md"
              placeholder="Pilih ukuran"
              data={selectSizeData}
              value={value ? value.value : ""}
              onChange={(_value, option) => {
                setValue(option);
                setData("product_size_id", option.value);
                findProductSize(option.value);
              }}
              error={errors.product_size_id ? errors.product_size_id : false}
            />
            <NumberInput
              size="md"
              placeholder="Jumlah"
              allowNegative={false}
              allowDecimal={false}
              thousandSeparator="."
              decimalSeparator=","
              value={data.quantity}
              clampBehavior="strict"
              min={0}
              max={selectedStock}
              onChange={(value) => setData("quantity", parseInt(value))}
              error={errors.quantity ? errors.quantity : false}
            />
          </div>

          {product.product_size.map(
            (item) =>
              item.id === data.product_size_id && (
                <p
                  key={item.id}
                  className={`mt-4 text-sm ${
                    calculateRemainingStock(item.stock, data.quantity) <= 5
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  Sisa stok:{" "}
                  <span>
                    {calculateRemainingStock(item.stock, data.quantity)}
                  </span>
                </p>
              )
          )}

          <p className="text-xl mt-4 text-primary">
            Total: Rp{(product.price * data.quantity).toLocaleString()}
          </p>

          <div className="mt-6">
            <Button type="submit" size="md" fullWidth disabled={processing}>
              Masukkan Keranjang
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};

const calculateRemainingStock = (stock, quantity) => {
  if (quantity) {
    if (quantity > stock) {
      return 0;
    } else {
      return stock - quantity;
    }
  } else {
    return stock;
  }
};

export default CreateCartForm;
