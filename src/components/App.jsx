import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLS = JSON.parse(localStorage.getItem('contacts'));
    if (contactsFromLS) {
      this.setState({ contacts: contactsFromLS });
    }
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = contact => {
    console.log(contact);

    //Проверка есть ли уже данные в контактах
    const repeatName = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.trim().toLowerCase()
    );

    //return если контакт уже есть
    if (repeatName) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  onFilterHandler = e => {
    this.setState({ filter: e.target.value });
  };

  getFilteredContacts = filterString => {
    const { contacts } = this.state;
    const normalizedFilter = filterString.toLowerCase().trim();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const {
      formSubmitHandler,
      onFilterHandler,
      getFilteredContacts,
      state: { contacts, filter },
    } = this;

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
  }
}

export default App;
