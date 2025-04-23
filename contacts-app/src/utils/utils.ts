import { Contact } from "store/contactDetailsStore";

export const getFullName = (firstName: string, middleName: string, lastName: string) => {
  return `${firstName} ${middleName ? middleName : ''
    } ${lastName}`.trim();
};

export const getInitials = (firstName: string, lastName: string) => {
  return [firstName[0], lastName[0]].join('').toUpperCase();
};

export const filterContacts = (contacts: Contact[], query: string, onlyFav: boolean): Contact[] => {
  let result = contacts;

  if (onlyFav) {
    result = result.filter((c) => c.IsFav);
  }

  if (query.trim()) {
    const lower = query.toLowerCase();
    result = result.filter((contact) =>
      Object.values(contact).some(
        (value) =>
          typeof value === 'string' && value.toLowerCase().includes(lower)
      )
    );
  }

  return result;
}
