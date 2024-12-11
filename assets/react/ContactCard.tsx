// src/App.js

import { JSX } from "react";
import { Link } from "react-router";

type ContactCardProps = {
  showDetails?: boolean;
  contact: {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  linkText?: string | JSX.Element;
  linkAction?: () => void;
};

export default function ContactCard({
  showDetails = false,
  linkText,
  linkAction,
  contact,
}: ContactCardProps) {
  return (
    <Link
      to="#"
      onClick={linkAction}
      className="text-blue-500 hover:text-blue-700 text-end content-center"
    >
      <div className="bg-gray-300 p-4 rounded-lg shadow-md flex flex-row">
        <div className="flex-grow content-center text-left">
          {contact.name && (
            <div className="text-gray-800 font-bold text-lg mb-2">
              {contact.name}
            </div>
          )}
          {showDetails && contact.email && (
            <div className="text-gray-600 text-base mb-1">
              Email: {contact.email}
            </div>
          )}
          {showDetails && contact.phone && (
            <div className="text-gray-600 text-base">
              Phone: {contact.phone}
            </div>
          )}
        </div>
        {linkText}
      </div>
    </Link>
  );
}
