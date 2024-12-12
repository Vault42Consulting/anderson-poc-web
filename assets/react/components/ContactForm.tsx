import { Contact } from "../types/contact";

type ContactFormProps = {
  contact: Contact;
};

export default function ContactForm({ contact }: ContactFormProps) {
  return (
    <div className="bg-gray-300 p-4 rounded-lg shadow-md flex flex-row">
      <div className="content-center text-left grid grid-cols-2">
        <div className="text-gray-800 font-bold text-lg mb-2">Name:</div>
        <div>
          <input type="text" name="name" defaultValue={contact.name} />
        </div>
        <div className="text-gray-800 font-bold text-lg mb-2">Email:</div>
        <div>
          <input type="text" name="email" defaultValue={contact.email} />
        </div>
        <div className="text-gray-800 font-bold text-lg mb-2">Phone:</div>
        <div>
          <input type="text" name="phone" defaultValue={contact.phone} />
        </div>
      </div>
    </div>
  );
}
