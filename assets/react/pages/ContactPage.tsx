// src/App.js

import { Link } from "react-router";
import { useState, useEffect } from "react";
import ContactDetail from "../components/ContactDetail";
import ContactForm from "../components/ContactForm";
import { useFormStatus } from "react-dom";
import { updateContact } from "../services/contactService";
import { deleteContact } from "../services/contactService";
import { useContactStore } from "../store/contactStore";
import { ErrorBoundary } from "react-error-boundary";
import { FormProvider, useForm } from "react-hook-form";

type ContactPagedProps = {
  contactId: string;
};

export default function ContactPage({ contactId }: ContactPagedProps) {
  const {
    contacts,
    currentContactId,
    setCurrentContactId,
    updateContact: updateStoreContact,
    deleteContact: deleteStoreContact,
  } = useContactStore();

  const formMethods = useForm();

  const onSubmit = formMethods.handleSubmit(async (data) => {
    console.log(data);
    const contact = {
      id: contactId,
      name: data.name as string,
      email: data.email as string,
      phone: data.phone as string,
    };

    await updateContact(contact);
    updateStoreContact(contact);
    setEditMode(false);
    formMethods.reset();
  });

  const contact = contacts.find((c) => c.id == contactId);

  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    setEditMode(false);
  }, [currentContactId]);

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

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteContact(contact.id);
        deleteStoreContact(contact.id);
        setCurrentContactId(null);
      } catch (error) {
        console.error("Failed to delete contact:", error);
        // We might want to show an error message to the user here
      }
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={(e) => e.preventDefault()} noValidate autoComplete="off">
        {editMode ? (
          <ContactForm contact={contact} />
        ) : (
          <ContactDetail contact={contact} />
        )}
        <div className="flex flex-row gap-x-3 mt-5">
          <Link
            to="#"
            onClick={() => setEditMode(!editMode)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {editMode ? "Cancel" : "Edit"}
          </Link>
          {editMode && <SubmitButton />}
          <Link
            to="#"
            onClick={() => setCurrentContactId(null)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Contact List
          </Link>
          {!editMode && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
