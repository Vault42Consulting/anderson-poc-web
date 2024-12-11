// src/App.js

import { useEffect, useState } from "react";
import { fetchContacts } from "./services/contactService";
import ContactCard from "./ContactCard";
import { MdChevronRight } from "react-icons/md";

export default function MainPage() {
  const [data, setData] = useState(null);
  const [currentContact, setCurrentContact] = useState(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await fetchContacts();
        setData(response.data);
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
        {currentContact && (
          <div>
            <ContactCard
              showDetails={true}
              contact={currentContact}
              linkAction={() => setCurrentContact(null)}
              linkText="Back to Contact List"
            />
          </div>
        )}

        {currentContact == null &&
          data &&
          data.map((contact) => (
            <div key={contact.id}>
              <ContactCard
                contact={contact}
                linkAction={() => setCurrentContact(contact)}
                linkText={<MdChevronRight size={50} />}
              />
            </div>
          ))}
      </div>

      {!data && <p>Loading Contacts...</p>}
    </div>
  );
}
