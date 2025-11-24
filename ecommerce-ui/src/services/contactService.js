const CONTACTS_KEY = 'contacts';

export const contactService = {
  getAllContacts: () => {
    return JSON.parse(localStorage.getItem(CONTACTS_KEY) || '[]');
  },

  getContactById: (id) => {
    const contacts = contactService.getAllContacts();
    return contacts.find(contact => contact.id === id);
  },

  saveContact: (contactData) => {
    const contacts = contactService.getAllContacts();
    const newContact = {
      ...contactData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    contacts.push(newContact);
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    return newContact;
  },

  updateContact: (id, contactData) => {
    const contacts = contactService.getAllContacts();
    const updatedContacts = contacts.map(contact => 
      contact.id === id 
        ? { ...contactData, id, updatedAt: new Date().toISOString() }
        : contact
    );
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(updatedContacts));
    return updatedContacts.find(contact => contact.id === id);
  },

  deleteContact: (id) => {
    const contacts = contactService.getAllContacts();
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(updatedContacts));
    return true;
  }
};