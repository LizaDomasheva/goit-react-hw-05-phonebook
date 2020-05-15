import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ContactListItem } from './contactListItem/ContactListItem';
import styles from './contactList.module.css';
import PropTypes from 'prop-types';
import slideTransition from '../../transition/slide.module.css';

export const ContactList = ({ contacts, deleteContact }) => (
  <TransitionGroup component="ul" className={styles.list}>
    {contacts.map(contact => (
      <CSSTransition key={contact.id} timeout={250} unmountOnExit classNames={slideTransition}>
      <ContactListItem
        key={contact.id}
        contact={contact}
        deleteContact={deleteContact}
      />
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
  deleteContact: PropTypes.func,
};
