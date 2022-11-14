import { useState } from 'react';
import shortid from 'shortid';
import css from 'components/ContactForm/ContactForm.module.css';

export const ContactForm = ({onSubmit}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [id, setId] = useState(() => shortid.generate());

  const onChangeInput = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.log(`Поле инпута ${name} не обрабатывается`);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      name: name,
      number: number,
      id: id,
    };
    
    onSubmit(user);

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
    setId('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label} htmlFor={1}>
        Name:
      </label>
      <input
        className={css.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={onChangeInput}
      />

      <label className={css.label} htmlFor={2}>
        Number:
      </label>
      <input
        className={css.input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={onChangeInput}
      />
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};
