import { MdChevronRight } from "react-icons/md";
import { Contact } from "../types/contact";

type ContactCardProps = {
  contact: Contact;
  cancel?: () => void;
};

export default function ContactCard({ contact }: ContactCardProps) {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-row">
      <div className="flex-grow content-center text-left">
        {contact.name && (
          <div className="text-gray-800 font-bold text-lg mb-2">
            {contact.name}
          </div>
        )}
      </div>
      <MdChevronRight size={50} />
    </div>
  );
}
