import { memo } from 'react';
import './Form.css';

function Form({ children, title, buttonTitle }) {
  return (
    <form className="form">
      <h1 className="form__title">{title}</h1>
      {children}
      <button className="form__btn" type="submit">{buttonTitle}</button>
    </form>
  )
}

export default memo(Form);
