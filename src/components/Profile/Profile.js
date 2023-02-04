import { memo, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { FormMessageContext } from '../../contexts/FormMessageContext';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import { useValidation } from '../../utils/validation';
import { successMessage } from "../../utils/utils";
import './Profile.css';

function Profile({ signOut, onSubmit }) {
  const userData = useContext(CurrentUserContext);
  const isLoading = useContext(IsLoadingContext);
  const {formMessage, handleResetFormMessage} = useContext(FormMessageContext);

  const { values, errors, isValid, handleChange } = useValidation();
  const { name: nameValue = userData.name, email: emailValue = userData.email } = values;
  const { name: nameError = '', email: emailError = '' } = errors;

  const handleChangeUserData = (evt) => {
    evt.preventDefault();

    onSubmit(nameValue, emailValue);
  };

  useEffect(() => {
    return () => handleResetFormMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="profile">
      <h1 className="profile__salutation">{`Привет, ${userData.name}!`}</h1>

      <form className="profile-form" onSubmit={handleChangeUserData}>
        <div className='form-container'>
          <label className="profile-form__label">Имя
            <input className= {`profile-form__input ${nameError ? 'form__input_type_error' : '' }`}  type="text" name="name" id="name" minLength={2} maxLength={30} required={true} value={nameValue} onChange={handleChange}/>
          </label>
          <span className={`from__name-error ${nameError ? 'form__error_visible' : '' }`}>{nameError}</span>
        </div>
        <div className='form-container'>
          <label className="profile-form__label">E-mail
            <input className= {`profile-form__input ${emailError ? 'form__input_type_error' : '' }`} type="email" name="email" id="email" pattern={'.+@.+\\..+'} value={emailValue} onChange={handleChange}/>
          </label>
          <span className={`from__email-error ${emailError ? 'form__error_visible' : '' }`}>{emailError}</span>
        </div>
        <span className={`form__message ${formMessage && formMessage!==successMessage.successMessage ? 'form__message_visible form__message_type_error' : 'form__message_visible'}`}>{formMessage}</span>
        <button className={`${isValid && (nameValue!==userData.name || emailValue!==userData.email) && !isLoading ? 'profile-form__btn' : 'profile-form__btn_disabled'}`} type="submit" disabled={!isValid || isLoading || (!(nameValue!==userData.name || emailValue!==userData.email))}>{isLoading ? 'Подождите...' : 'Редактировать'}</button>
      </form>

      <button className="profile__exit" onClick={signOut}>Выйти из аккаунта</button>
    </main>
  )
}

export default memo(Profile);
