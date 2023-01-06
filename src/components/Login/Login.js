import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import './Login.css';

function Login() {
  return (
    <div className="sign">
      <div className="sign__logo-box">
        <Logo />
      </div>

      <Form title="Рады видеть!" buttonTitle="Войти">

        <label class="form__input-label">E-mail
          <input className="form__input" type="email" required />
          <span id="mail-error" class=""></span>
        </label>
        
        <label class="form__input-label">Пароль
          <input className="form__input" type="password" minLength="8" required />
          <span id="pass-error" class=""></span>
        </label>

      </Form>

      <p className="sign__text">Ещё не зарегистрированы?&nbsp;
        <NavLink className="sign__link" to="/signup">Регистрация</NavLink>
      </p>
    </div>
  )
}

export default memo(Login);
