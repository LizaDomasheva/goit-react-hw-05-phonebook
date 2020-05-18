import React, { Component } from 'react';
import { ContactForm } from '../components/contactForm/ContactForm';
import { ContactList } from '../components/contactList/ContactList';
import { Filter } from '../components/filter/Filter';
import { CSSTransition} from 'react-transition-group';
import styles from '../components/App.module.css';
import fadeTransition from '../transition/fade.module.css';
import slideTransition from '../transition/slide.module.css';
import rotateTransition from '../transition/rotate.module.css'
import scaleTransition from '../transition/scale.module.css'

const filterContacts = (filter, contacts) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );
};

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
    isVisible: false,
    isOpen: false
  };

  componentDidMount() {
    this.setState({
      isVisible: true
    });
    const persistedContacts = localStorage.getItem('contacts');
    if (persistedContacts) {
      this.setState({ contacts: JSON.parse(persistedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  getContactInfo = newContact => {
    this.setState(prev => ({
      contacts: [...prev.contacts, newContact],
    }));
  };

  searchFilter = e => {
    this.setState({ filter: e.target.value });
  };

  deleteContact = e => {
    const { contacts, filter } = this.state;
    const filteredContacts = filterContacts(filter, contacts);
    const id = e.target.id;
    this.setState(prev => ({
      contacts: [...prev.contacts.filter(contact => contact.id !== id)],
    }));
    if (filteredContacts.length === 1) {
      this.setState({ filter: '' });
    }
  };

  render() {
    const { contacts, filter, isVisible } = this.state;
    const filteredContacts = filterContacts(filter, contacts);
    return (
      <>
        <CSSTransition
          in={isVisible}
          timeout={500}
          classNames={scaleTransition}
          mountOnEnter
          unmountOnExit
        >
          <h2 className={styles.title}>Phonebook</h2>
        </CSSTransition>
        <ContactForm getContactInfo={this.getContactInfo} contacts={contacts} />
        <h2 className={styles.title}>Contacts</h2>
          <CSSTransition
          in={contacts.length >= 2 || filter.length !== 0}
          timeout={500}
          classNames={fadeTransition}
          mountOnEnter
          unmountOnExit
        >
          <Filter  filter={filter} searchFilter={this.searchFilter} />
          </CSSTransition>
        <ContactList
          contacts={filteredContacts}
          filter={filter}
          deleteContact={this.deleteContact}
        />
      </>
    );
  }
}
