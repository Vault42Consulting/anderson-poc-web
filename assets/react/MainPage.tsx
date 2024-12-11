// src/App.js

import React, { useEffect, useState } from "react";
import { fetchContacts } from "./services/contactService";
import ContactCard from "./ContactCard";

export default function MainPage() {
  const [data, setData] = useState(null);

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
      <h1 className="font-bold text-xl">React App</h1>
      {data ? (
        data.map((contact) => (
          <div key={contact.id}>
            <ContactCard contact={contact} />
          </div>
        ))
      ) : (
        <p>Loading Contacts...</p>
      )}
    </div>
  );
}
