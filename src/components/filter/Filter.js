import React from 'react';
import styles from '../filter/filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ filter, searchFilter }) => (
  <>
    <h3 className={styles.title}>Find contacts by name</h3>
    <input
      className={styles.input}
      value={filter}
      onChange={searchFilter}
    ></input>
  </>
);

Filter.proptTypes = {
  filter: PropTypes.string,
  searchFilter: PropTypes.func,
};
