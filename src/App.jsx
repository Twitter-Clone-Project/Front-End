import * as React from 'react';

import { useState } from 'react';

import NameInput from './form-controls/nameInput';
import EmailInput from './form-controls/emailInput';
import PasswordInput from './form-controls/passwordInput';
import NormalInput from './form-controls/BasicInput';

function App() {
  const [error, setError] = useState('');
  const [value, setValue] = useState('');

  return (
    <div
      data-k="dummy"
      className="bg-sky-500 mb-24 flex h-screen w-full flex-col items-center justify-center gap-24 p-5 text-center dark:bg-black "
    >
      <button
        type="submit"
        className="w-full border bg-black text-white "
        onClick={() => {
          setError('Error form back-end');
        }}
      >
        send error
      </button>

      <div className=" border bg-black text-white">the error : {error} </div>
      <div className=" border bg-black text-white">the value : {value} </div>

      <EmailInput
        error={error}
        setError={setError}
        email={value}
        setEmail={setValue}
      />
      <NameInput
        title="Name"
        error={error}
        setError={setError}
        Name={value}
        setName={setValue}
        maxLength={50}
      />
      <NameInput
        title="Username"
        error={error}
        setError={setError}
        Name={value}
        setName={setValue}
        maxLength={20}
      />
      <PasswordInput
        error={error}
        setError={setError}
        password={value}
        setPassword={setValue}
        title="Password"
      />
      <NormalInput
        error={error}
        setError={setError}
        title="Verification code"
        value={value}
        setValue={setValue}
      />
    </div>
  );
}

export default App;
