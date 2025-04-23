import { create } from 'zustand';
import { components } from 'types/swagger';
import { filterContacts } from 'utils/utils';

export type Contact = components['schemas']['Contact']

interface ContactDetailsStore {
  contacts: Contact[];
  activeContact: Contact | null;
  isEdit: boolean;
  isNew: boolean;
  filteredContacts: Contact[];
  searchQuery: string;
  showOnlyFavorites: boolean;

  setContacts: (contacts: Contact[]) => void;
  setActiveContact: (activeContact: Contact) => void;
  setIsEdit: (isEdit: boolean) => void;
  setIsNew: (isNew: boolean) => void;
  setSearchQuery: (query: string) => void;
  setShowOnlyFavorites: (show: boolean) => void;
  setContact: (updated: Contact) => void;
  reset: () => void;
}

const initialState = {
  contacts: [],
  filteredContacts: [],
  searchQuery: '',
  activeContact: null,
  isEdit: false,
  isNew: false,
  showOnlyFavorites: false
}

export const contactDetailsStore = create<ContactDetailsStore>((set, get) => ({
  ...initialState,
  setContacts: (contacts) => {
    const { searchQuery, showOnlyFavorites } = get();
    const filteredContacts = filterContacts(contacts, searchQuery, showOnlyFavorites);
    set({ contacts, filteredContacts });
  },
  setSearchQuery: (query) => {
    const { contacts, showOnlyFavorites } = get();
    const filteredContacts = filterContacts(contacts, query, showOnlyFavorites);
    set({ searchQuery: query, filteredContacts });
  },
  setShowOnlyFavorites: (show) => {
    const { contacts, searchQuery } = get();
    const filteredContacts = filterContacts(contacts, searchQuery, show);
    set({ showOnlyFavorites: show, filteredContacts });
  },
  setContact: (updated) => {
    const { contacts, searchQuery, showOnlyFavorites } = get();
    const newContacts = contacts.map((c) => (c.Id === updated.Id ? updated : c));
    const filteredContacts = filterContacts(newContacts, searchQuery, showOnlyFavorites);
    set({ contacts: newContacts, filteredContacts });
  },
  setActiveContact: (activeContact) => set({ activeContact }),
  setIsEdit: (isEdit) => set({ isEdit }),
  setIsNew: (isNew) => set({ isNew }),
  reset: () => set(initialState)
}));
