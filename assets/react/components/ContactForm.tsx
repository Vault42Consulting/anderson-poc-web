import { useFormContext } from "react-hook-form";
import { Contact } from "../types/contact";

type ContactFormProps = {
  contact: Contact;
};

export default function ContactForm({ contact }: ContactFormProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const InputError = (props) => {
    return (
      <div className="text-red-600">
        {errors[props.name]?.message.toString()}
      </div>
    );
  };

  return (
    <div className="bg-gray-300 p-4 rounded-lg shadow-md flex flex-row">
      <div className="content-center text-left grid grid-cols-2">
        <div className="text-gray-800 font-bold text-lg mb-2">Name:</div>
        <div className="flex flex-col">
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              pattern: /^[A-Za-z ]+$/i,
            })}
            defaultValue={contact.name}
          />
          <InputError name="name" />
        </div>
        <div className="text-gray-800 font-bold text-lg mb-2">Email:</div>
        <div className="flex flex-col">
          <input
            type="text"
            {...register("email", {
              required: "Email address is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email not valid",
              },
            })}
            defaultValue={contact.email}
          />
          <InputError name="email" />
        </div>
        <div className="text-gray-800 font-bold text-lg mb-2">Phone:</div>
        <div className="flex flex-col">
          <input
            type="text"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value:
                  /^\+?1?[-.]?\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/i,
                message:
                  "Phone number must be in North American format (e.g., 123-456-7890)",
              },
            })}
            defaultValue={contact.phone}
          />
          <InputError name="phone" />
        </div>
      </div>
    </div>
  );
}
