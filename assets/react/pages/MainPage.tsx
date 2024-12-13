import { useEffect, useState } from "react";
import { fetchContacts } from "../services/contactService";
import ContactCard from "../components/ContactCard";
import { Link } from "react-router";
import ContactPage from "../pages/ContactPage";
import { useContactStore } from "../store/contactStore";
import CreateContactPage from "./CreateContactPage";

export default function MainPage() {
  const { contacts, setContacts, currentContactId, setCurrentContactId } =
    useContactStore();

  const [isNewContact, setIsNewContact] = useState(false);

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
      <h1 className="font-bold text-xl text-center">Simple contact list</h1>

      <div className="m-10 gap-y-4 flex flex-col">
        {isNewContact && (
          <CreateContactPage setIsNewContact={setIsNewContact} />
        )}

        {currentContactId && <ContactPage contactId={currentContactId} />}

        {!isNewContact &&
          currentContactId == null &&
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

        {contacts && contacts.length == 0 && !isNewContact && (
          <p className="text-center">No contacts found. Add a contact below.</p>
        )}
        {!contacts && <p className="text-center">Loading Contacts...</p>}
      </div>

      {!isNewContact && !currentContactId && (
        <Link
          to="#"
          onClick={() => setIsNewContact(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New Contact
        </Link>
      )}
    </div>
  );
}
