import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './contactForm.module.css';
import PropTypes from 'prop-types';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const doublicateContact = this.props.contacts.map(contact => contact.name);
    if (!(name && number)) {
      return alert('Please, fill all fields');
    }
    if (doublicateContact.includes(e.target.name.value)) {
      // return alert('Contact already exist');
      return store.addNotification({
        title: 'Oooops:(',
        message: 'Contact already exist',
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 1000,
          showIcon: true
        },
      });
    } else {
      const newContact = { id: uuidv4(), name, number };
      this.props.getContactInfo(newContact);
      this.setState({
        name: '',
        number: '',
      });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
        <ReactNotification />
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <label className={styles.label}>
            Name
            <input
              className={styles.input}
              type="text"
              name="name"
              value={name}
              placeholder="Enter full name"
              minLength="4"
              maxLength="20"
              onChange={this.handleChange}
            />
          </label>
          <label className={styles.label}>
            Number
            <input
              className={styles.input}
              type="tel"
              name="number"
              value={number}
              placeholder="+38 (___) ___ __ __"
              minLength="10"
              maxLength="13"
              onChange={this.handleChange}
            />
          </label>
          <button className={styles.button} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  getContactInfo: PropTypes.func,
};
