import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import './Register.css';

function Register() {
  return (
    <div className="sign">
      <div className="sign__logo-box">
        <Logo />
      </div>

      <Form title="Добро пожаловать!" buttonTitle="Зарегистрироваться">

        <label class="form__input-label">Имя
          <input className="form__input" type="text" minLength="2" maxLength="30" required />
          <span id="name-error" class=""></span>
        </label>

        <label class="form__input-label">E-mail
          <input className="form__input" type="email" required />
          <span id="mail-error" class=""></span>
        </label>
        
        <label class="form__input-label">Пароль
          <input className="form__input" type="password" minLength="8" required />
          <span id="pass-error" class=""></span>
        </label>

      </Form>

      <p className="sign__text">Уже зарегистрированы?&nbsp;
        <NavLink className="sign__link" to="/signin">Войти</NavLink>
      </p>
    </div>
  )
}

export default memo(Register);
