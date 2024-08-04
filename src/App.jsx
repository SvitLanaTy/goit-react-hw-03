import { useEffect, useState } from "react";

import "./App.css";
import Section from "./components/Section/Section";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import css from "./components/Section/Section.module.css";
import contactsFromDb from "./db/contacts.json";

function App() {
  const [contacts, setContacts] = useState(() => {
    const localData = localStorage.getItem("contacts");
    return localData ? JSON.parse(localData) : contactsFromDb;
  });

  const [filter, setFilter] = useState("");

  const showContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = (newContact) => {
    setContacts((prevContacts) => {
      return [...prevContacts, newContact];
    });
  };

  const onDelete = (contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== contactId);
    });
  };

  return (
    <div>
      <Section>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm contacts={contacts} onAddContact={onAddContact} />
        <SearchBox value={filter} onFilter={setFilter} />
        <ContactList contacts={showContacts} onDelete={onDelete} />
      </Section>
    </div>
  );
}

export default App;
