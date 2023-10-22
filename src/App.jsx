import * as React from 'react';
import EmailInput from './form-controls/emailInput';
import NameInput from './form-controls/nameInput';
import PasswordInput from './form-controls/passwordInput';

function App() {
  return (
    <div
      data-k="dummy"
      className="ml-80 mt-80 flex h-80 w-80 flex-col items-center justify-end gap-8 bg-white "
    >
      <NameInput />
      <EmailInput />
      <PasswordInput />
    </div>
  );
}

export default App;
