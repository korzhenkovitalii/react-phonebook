import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsFromLS = JSON.parse(localStorage.getItem('contacts'));
    if (contactsFromLS) {
      setContacts({ contacts: contactsFromLS });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = contact => {
    console.log(contact);

    //Проверка есть ли уже данные в контактах
    const repeatName = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.trim().toLowerCase()
    );

    //return если контакт уже есть
    if (repeatName) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }

    setContacts(contacts => [contact, ...contacts]);
  };

  const onFilterHandler = e => {
    setFilter(e.target.value);
  };

  const getFilteredContacts = filterString => {
    const normalizedFilter = filterString.toLowerCase().trim();

    return filter(({ name }) => name.toLowerCase().includes(normalizedFilter));
  };

  // const deleteContact = id => {
  //  setContacts(prevState => ({
  //     filter(contact => contact.id !== id),
  //   }));
  // };

  const renderContacts = filter ? getFilteredContacts(filter) : contacts;

  return (
    <div style={{ padding: '10px' }}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter value={filter} onFilterHandler={onFilterHandler} />
      <ContactList
        contacts={renderContacts}
        deleteContact={this.deleteContact}
      />
    </div>
  );
};

// ContactList.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//       id: PropTypes.string.isRequired,
//     })
//   ),
//   deleteContact: PropTypes.func.isRequired,
// };
