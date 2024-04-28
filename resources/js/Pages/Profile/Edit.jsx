/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import PageTitle from "@/Components/Home/PageTitle";
import Container from "@/Components/Home/Container";

export default function Edit({ auth, mustVerifyEmail, status }) {
  return (
    
    <HomeLayout authenticatedUser={auth.user}>
      <Head title="Profil Saya" />
      <PageTitle>Profil</PageTitle>

      <Container>
        <div className="max-w-7xl mx-auto space-y-6 my-4">
          <div className="p-4 sm:p-8 bg-white border border-gray-300 sm:rounded-lg">
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="max-w-xl"
            />
          </div>

          <div className="p-4 sm:p-8 bg-white border border-gray-300 sm:rounded-lg">
            <UpdatePasswordForm className="max-w-xl" />
          </div>

          <div className="p-4 sm:p-8 bg-white border border-gray-300 sm:rounded-lg">
            <DeleteUserForm className="max-w-xl" />
          </div>
        </div>
      </Container>
    </HomeLayout>
  );
}
