import { v1 } from "@std/uuid";

interface ContactFields {
  readonly first?: string;
  readonly last?: string;
  readonly phone?: string;
  readonly email?: string;
}

export class Contact {
  static contacts: Contact[] = [];

  id: string;
  first?: string;
  last?: string;
  phone?: string;
  email?: string;

  constructor({ first, last, phone, email }: ContactFields) {
    this.id = v1.generate();
    this.first = first;
    this.last = last;
    this.phone = phone;
    this.email = email;
  }

  static all(): Contact[] {
    return Contact.contacts;
  }

  static search(query: string): Contact[] {
    return Contact.contacts.filter(
      (contact) =>
        contact.first?.includes(query) ||
        contact.last?.includes(query) ||
        contact.email?.includes(query) ||
        contact.phone?.includes(query)
    );
  }

  static register(contact: Contact) {
    Contact.contacts.push(contact);
  }

  static find(id: string) {
    return Contact.contacts.find((contact) => contact.id === id);
  }
}
