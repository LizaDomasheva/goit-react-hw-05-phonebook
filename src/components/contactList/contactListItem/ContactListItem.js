import React from 'react';
import styles from '../contactListItem/contactListItem.module.css';
import PropTypes from 'prop-types';

export const ContactListItem = ({ contact, deleteContact }) => (
  <>
    <li className={styles.item}>{contact.name + ': ' + contact.number}</li>
    <button className={styles.button} id={contact.id} onClick={deleteContact}>
      Delete
    </button>
  </>
);

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  deleteContact: PropTypes.func,
};
