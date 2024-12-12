// src/App.js

import { useEffect, useState } from "react";
import { fetchContacts } from "../services/contactService";
import ContactCard from "../components/ContactCard";
import { Link } from "react-router";
import ContactPage from "../pages/ContactPage";
import { useContactStore } from "../store/contactStore";

export default function MainPage() {
  const contacts = useContactStore((state) => state.contacts);
  const setContacts = useContactStore((state) => state.setContacts);
  const currentContactId = useContactStore((state) => state.currentContactId);
  const setCurrentContactId = useContactStore(
    (state) => state.setcurrentContactId
  );

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await fetchContacts();

        setContacts(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchDataFromAPI();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-xl text-center mt-5">
        Simple address book
      </h1>

      <div className="m-10 gap-y-4 flex flex-col">
        {currentContactId && (
          <div>
            <ContactPage contactId={currentContactId} />
          </div>
        )}

        {currentContactId == null &&
          contacts &&
          contacts.map((contact) => (
            <div key={contact.id}>
              <Link
                to="#"
                onClick={() => setCurrentContactId(contact.id)}
                className="text-blue-500 text-end content-center flex flex-col"
              >
                <ContactCard contact={contact} />
              </Link>
            </div>
          ))}
      </div>

      {!contacts && <p>Loading Contacts...</p>}
    </div>
  );
}
