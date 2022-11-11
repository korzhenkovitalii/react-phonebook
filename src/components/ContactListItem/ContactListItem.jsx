import React from 'react';
import PropTypes from 'prop-types';
import css from 'components/ContactListItem/ContactListItem.module.css';

export const ContactListItem = ({ id, name, number, deleteContact }) => {
  return (
    <li className={css.contact} key={id}>
      {name}:{number}
      <button
        className={css.button}
        type="button"
        onClick={() => deleteContact(id)}
      >
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteContact: PropTypes.func,
};
