import { memo } from 'react';
import { useState } from 'react';
import './Profile.css';

function Profile() {
  const [userData, setUserData] = useState({ name: 'Hedgehog', email: 'hedgehog@yandex.ru' });

  const handleChangeUserData = (evt) => {
    userData[evt.target.id] = evt.target.value;
    setUserData({ ...userData })
  };

  return (
    <main className="profile">
      <h1 className="profile__salutation">{`Привет, ${userData.name}!`}</h1>

      <form className="profile-form">
        <label className="profile-form__label">Имя
          <input 
            className="profile-form__input" 
            type="text" 
            name="name" 
            id="name" 
            minLength={2}
            maxLength={30}
            required={true} 
            value={userData.name} 
            onChange={(evt) => handleChangeUserData(evt)} 
          />
        </label>

        <label className="profile-form__label">E-mail
          <input 
            className="profile-form__input" 
            type="email" 
            name="email" 
            id="email" 
            value={userData.email} 
            onChange={(evt) => handleChangeUserData(evt)} 
          />
        </label>
        
        <button className="profile-form__submit">Редактировать</button>
      </form>

      <button className="profile__exit">Выйти из аккаунта</button>
    </main>
  )
}

export default memo(Profile);
