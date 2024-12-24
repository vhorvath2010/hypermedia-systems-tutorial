interface ContactFields {
  readonly first: string;
  readonly last: string;
  readonly phone: string;
  readonly email: string;
}

export class Contact {
  static contacts: Contact[] = [];

  first: string;
  last: string;
  phone: string;
  email: string;

  constructor({ first, last, phone, email }: ContactFields) {
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
        contact.first.includes(query) ||
        contact.last.includes(query) ||
        contact.email.includes(query) ||
        contact.phone.includes(query)
    );
  }
}
