/* eslint-disable react/prop-types */
//react import
import React from "react";
// component import
import HomeLayout from "@/Layouts/HomeLayout";
import Container from "@/Components/Home/Container";
import PageTitle from "@/Components/Home/PageTitle";
import CreateAddressForm from "./Partials/CreateAddressForm";
// inertia import
import { Head } from "@inertiajs/react";

const CreateAddressPage = ({ auth }) => {
  return (
    <HomeLayout authenticatedUser={auth.user}>
      <Head title="Tambah Alamat" />

      <PageTitle>Tambah alamat baru</PageTitle>
      <Container>
        <CreateAddressForm />
      </Container>
    </HomeLayout>
  );
};

export default CreateAddressPage;
