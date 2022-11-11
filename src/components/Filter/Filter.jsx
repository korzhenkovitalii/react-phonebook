import { PropTypes } from 'prop-types';
import css from 'components/Filter/Filter.module.css';

export const Filter = ({ value, onFilterHandler }) => {
  return (
    <>
      <h2 className={css.title}>Find contact by name</h2>
      <input
        className={css.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        onChange={onFilterHandler}
        value={value}
      />
    </>
  );
};

Filter.propTypes = {
  onFilterHandler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
