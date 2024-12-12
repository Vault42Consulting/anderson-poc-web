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
import { FormProvider, useForm } from "react-hook-form";
import FallbackRender from "../components/FallbackRender";

type CreateContactPageProps = {
  setIsNewContact: (boolean) => void;
};

export default function CreateContactPage({
  setIsNewContact,
}: CreateContactPageProps) {
  const { setCurrentContactId, updateContact: updateStoreContact } =
    useContactStore();

  const formMethods = useForm();

  const onSubmit = formMethods.handleSubmit(async (data) => {
    const contact = {
      name: data.name as string,
      email: data.email as string,
      phone: data.phone as string,
    };

    const response = await createContact(contact);
    updateStoreContact(response.data);
    setIsNewContact(false);
    setCurrentContactId(response.data.id);
    formMethods.reset();
  });

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <button
        type="submit"
        disabled={pending}
        onClick={onSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {pending ? "Submitting..." : "Save"}
      </button>
    );
  };

  return (
    <FormProvider {...formMethods}>
      <ErrorBoundary fallbackRender={FallbackRender}>
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          autoComplete="off"
        >
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
    </FormProvider>
  );
}
