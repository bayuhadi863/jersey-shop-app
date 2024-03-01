/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// react import
import React from "react";
// component import
import HomeLayout from "@/Layouts/HomeLayout";
import Container from "@/Components/Home/Container";
import PageTitle from "@/Components/Home/PageTitle";
import AddressCard from "./Partials/AddressCard";
// inertia import
import { Head, Link } from "@inertiajs/react";
//mantine import
import { Button } from "@mantine/core";
// icons import
import { FiPlusCircle } from "react-icons/fi";

const AddressListPage = ({ auth, addresses }) => {
  return (
    <HomeLayout authenticatedUser={auth.user}>
      <Head title="Alamat Saya" />

      <PageTitle>Alamat saya</PageTitle>
      <Container>
        <Button
          component={Link}
          href={route("address.create")}
          leftSection={<FiPlusCircle size={14} />}
          className="mt-2"
        >
          Alamat Baru
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-4">
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
      </Container>
    </HomeLayout>
  );
};

export default AddressListPage;
