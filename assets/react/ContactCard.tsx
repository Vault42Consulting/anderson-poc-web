// src/App.js

import React, { useEffect, useState } from "react";
import { fetchContacts } from "./services/contactService";

type ContactCardProps = {
  contact: {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
  };
};

export default function ContactCard(props: ContactCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {props.contact.name && (
        <div className="text-gray-800 font-bold text-lg mb-2">
          {props.contact.name}
        </div>
      )}
      {props.contact.email && (
        <div className="text-gray-600 text-base mb-1">
          Email: {props.contact.email}
        </div>
      )}
      {props.contact.phone && (
        <div className="text-gray-600 text-base">
          Phone: {props.contact.phone}
        </div>
      )}
    </div>
  );
}
