import { create } from "zustand";
import { Contact } from "../types/contact";

interface State {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  currentContactId: string | null;
  setcurrentContactId: (contactId: string | null) => void;
  updateContact: (contact: Contact) => void;
}

export const useContactStore = create<State>((set) => ({
  contacts: [],
  setContacts: (contacts) => set((_) => ({ contacts: contacts })),
  currentContactId: null,
  setcurrentContactId(contactId) {
    set({ currentContactId: contactId });
  },
  updateContact(contact) {
    set((state) => ({
      contacts: !state.contacts.find((c) => c.id == contact.id)
        ? [...state.contacts, contact]
        : state.contacts.map((c) => (c.id === contact.id ? { ...contact } : c)),
    }));
  },
}));
