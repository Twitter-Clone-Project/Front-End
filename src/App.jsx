import * as React from 'react';
import EmailConfirm from './sign-up/EmailConfirm';

function App() {
  return (
    <div
      data-k="dummy"
      className="bg-sky-500 flex h-screen w-full items-center justify-center text-center text-4xl"
    >
      <EmailConfirm email="mahsobhy3@gmail.com" />
    </div>
  );
}

export default App;
