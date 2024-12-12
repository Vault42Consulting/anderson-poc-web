import { Contact } from "../types/contact";

type ContactDetailProps = {
  contact: Contact;
};

export default function ContactDetail({ contact }: ContactDetailProps) {
  return (
    <div className="bg-gray-300 p-4 rounded-lg shadow-md flex flex-row">
      <div className="content-center text-left grid grid-cols-2">
        <div className="text-gray-800 font-bold text-lg mb-2">Name:</div>
        <div>{contact.name}</div>
        <div className="text-gray-800 font-bold text-lg mb-2">Email:</div>
        <div>{contact.email}</div>
        <div className="text-gray-800 font-bold text-lg mb-2">Phone:</div>
        <div>{contact.phone}</div>
      </div>
    </div>
  );
}
