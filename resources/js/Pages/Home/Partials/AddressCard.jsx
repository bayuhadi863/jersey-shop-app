/* eslint-disable react/prop-types */
import React from "react";
// mantine import
import { Badge } from "@mantine/core";

const AddressCard = ({ address }) => {
  return (
    <div className="py-4 px-6 rounded bg-gray-100">
      <p>
        <span className="font-medium">{address.recipient_name}</span> |{" "}
        {address.phone_number}
      </p>
      <div className="text-sm mt-2">
        <p>
          {address.address_name} ({address.additional_detail})
        </p>
        <p className="uppercase">
          {address.city}, {address.state}, {address.country}{" "}
          {address.postal_code}
        </p>
      </div>
      {address.is_default && (
        <Badge radius="sm" variant="outline" size="sm" className="mt-2">
          Utama
        </Badge>
      )}
    </div>
  );
};

export default AddressCard;
