// react import
import React from "react";
// inertia import
import { useForm } from "@inertiajs/react";
// mantine import
import {
  Button,
  TextInput,
  Textarea,
  NumberInput,
  LoadingOverlay,
  Box,
  Checkbox,
} from "@mantine/core";
// Mantine notifications import
import { notifications } from "@mantine/notifications";

const CreateAddressForm = () => {
  // form data initiation
  const { data, setData, post, processing, errors, reset } = useForm({
    recipient_name: "",
    phone_number: "",
    address_name: "",
    country: "",
    state: "",
    city: "",
    postal_code: "",
    additional_detail: "",
    is_default: false,
  });
  // handle form submit
  const submit = (e) => {
    e.preventDefault();
    post(`/addresses`, {
      preserveScroll: true,
      onSuccess: () => {
        reset("recipient_name");
        reset("phone_number");
        reset("address_name");
        reset("country");
        reset("state");
        reset("city");
        reset("postal_code");
        reset("additional_detail");
        reset("is_default");
        notifications.show({
          color: "green",
          title: "Success notification",
          message: "Berhasil menambahkan alamat baru!",
        });
      },
    });
  };

  console.log(data);

  return (
    <>
      <Box pos="relative">
        <LoadingOverlay
          visible={processing}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <form onSubmit={submit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* INPUT RECIPIENT NAME START */}
            <TextInput
              placeholder="Masukkan nama penerima"
              label="Nama Penerima"
              size="lg"
              value={data.recipient_name}
              onChange={(e) => setData("recipient_name", e.target.value)}
              error={errors.recipient_name ? errors.recipient_name : false}
            />
            {/* INPUT RECIPIENT NAME END */}

            {/* INPUT PHONE NUMBER START */}
            <TextInput
              placeholder="+6289167761221"
              label="Nomor Handphone"
              size="lg"
              value={data.phone_number}
              onChange={(e) => setData("phone_number", e.target.value)}
              error={errors.phone_number ? errors.phone_number : false}
            />
            {/* INPUT PHONE NUMBER END */}
          </div>

          <div className="mt-4">
            {/* INPUT ADDRESS NAME START */}
            <Textarea
              placeholder="Masukkan alamat"
              label="Alamat"
              size="lg"
              value={data.address_name}
              onChange={(e) => setData("address_name", e.currentTarget.value)}
              error={errors.address_name ? errors.address_name : false}
            />
            {/* INPUT ADDRESS NAME END */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {/* INPUT COUNTRY START */}
            <TextInput
              placeholder="Masukkan negara"
              label="Negara"
              size="lg"
              value={data.country}
              onChange={(e) => setData("country", e.target.value)}
              error={errors.country ? errors.country : false}
            />
            {/* INPUT COUNTRY END */}

            {/* INPUT STATE START */}
            <TextInput
              placeholder="Masukkan provinsi"
              label="Provinsi"
              size="lg"
              value={data.state}
              onChange={(e) => setData("state", e.target.value)}
              error={errors.state ? errors.state : false}
            />
            {/* INPUT STATE END */}

            {/* INPUT CITY START */}
            <TextInput
              placeholder="Masukkan kota"
              label="Kota"
              size="lg"
              value={data.city}
              onChange={(e) => setData("city", e.target.value)}
              error={errors.city ? errors.city : false}
            />
            {/* INPUT CITY END */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* INPUT POSTAL CODE START */}
            <NumberInput
              placeholder="Masukkan kode pos"
              label="Kode Pos"
              size="lg"
              allowNegative={false}
              allowDecimal={false}
              value={data.postal_code}
              onChange={(value) => setData("postal_code", parseInt(value))}
              error={errors.postal_code ? errors.postal_code : false}
            />
            {/* INPUT POSTAL CODE END */}

            {/* INPUT ADDITIONAL detail START */}
            <TextInput
              placeholder="Masukkan detail tambahan"
              label="Detail Tambahan (optional)"
              size="lg"
              value={data.additional_detail}
              onChange={(e) => setData("additional_detail", e.target.value)}
              error={errors.additional_detail ? errors.additional_detail : false}
            />
            {/* INPUT ADDITIONAL detail END */}
          </div>

          <div className="mt-6">
            <Checkbox
              label="Jadikan alamat utama"
              size="md"
              checked={data.is_default}
              onChange={(e) => setData("is_default", e.currentTarget.checked)}
            />
          </div>

          <div className="mt-6">
            <Button type="submit" size="md">
              Tambah
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};

export default CreateAddressForm;
