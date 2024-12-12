// src/App.js

import { Link } from "react-router";
import { useState, useEffect } from "react";
import ContactDetail from "../components/ContactDetail";
import ContactForm from "../components/ContactForm";
import { useFormStatus } from "react-dom";
import { createContact } from "../services/contactService";
import { useContactStore } from "../store/contactStore";
import { Contact } from "../types/contact";
import { ErrorBoundary } from "react-error-boundary";

type CreateContactPageProps = {
  setIsNewContact: (boolean) => void;
};

export default function CreateContactPage({
  setIsNewContact,
}: CreateContactPageProps) {
  const { setCurrentContactId, updateContact: updateStoreContact } =
    useContactStore();

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <button
        type="submit"
        disabled={pending}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {pending ? "Submitting..." : "Save"}
      </button>
    );
  };

  const save = async (formData: FormData) => {
    const contact = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    };

    const response = await createContact(contact);
    updateStoreContact(response.data);
    setIsNewContact(false);
    setCurrentContactId(response.data.id);
  };

  return (
    <ErrorBoundary
      fallback={
        <p>
          There was an error while submitting the form. Please try again later.
        </p>
      }
    >
      <form action={save}>
        <ContactForm contact={{}} />
        <div className="flex flex-row gap-x-3 mt-5">
          <SubmitButton />
          <Link
            to="#"
            onClick={() => setIsNewContact(false)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </Link>
        </div>
      </form>
    </ErrorBoundary>
  );
}
