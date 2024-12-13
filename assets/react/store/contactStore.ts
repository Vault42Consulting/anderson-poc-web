import { create } from "zustand";
import { Contact } from "../types/contact";

interface State {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  currentContactId: string | null;
  setCurrentContactId: (contactId: string | null) => void;
  updateContact: (contact: Contact) => void;
  deleteContact: (contactId: string) => void;
}

function sortContacts(contacts: Contact[]) {
  return contacts.sort((a, b) => a.name.localeCompare(b.name));
}

export const useContactStore = create<State>((set) => ({
  contacts: [],
  setContacts: (contacts) => set((_) => ({ contacts: sortContacts(contacts) })),
  currentContactId: null,
  setCurrentContactId(contactId) {
    set({ currentContactId: contactId });
  },
  updateContact(contact) {
    set((state) => ({
      contacts: !state.contacts.find((c) => c.id == contact.id)
        ? sortContacts([...state.contacts, contact])
        : sortContacts(
            state.contacts.map((c) =>
              c.id === contact.id ? { ...contact } : c
            )
          ),
    }));
  },
  deleteContact(contactId) {
    set((state) => ({
      contacts: sortContacts(state.contacts.filter((c) => c.id !== contactId)),
      currentContactId: null,
    }));
  },
}));
