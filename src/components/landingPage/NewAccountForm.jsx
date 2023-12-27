import React from 'react';
import GoogleSignInBtn from '../form-controls/GoogleSignIn';
import Button from '../form-controls/Button';

/**
 * Component representing the form for creating a new account.
 * This component includes sign-in options, account creation button,
 * and links to terms of service and privacy policy.
 */
function NewAccountForm() {
  return (
    <div className="logging flex w-[300px] flex-col">
      <GoogleSignInBtn label="Sign In with Google" />
      <div className="relative flex items-center py-1">
        <div className="flex-grow border-t border-border-gray" />
        <p className="px-2 font-thin">or</p>
        <div className="flex-grow border-t border-border-gray" />
      </div>
      <Button
        backGroundColor="blue"
        label="Create account"
        borderColor="none"
        labelColor="white"
        to="/signup"
      />
      <p className="py-2 text-xs font-extralight text-light-thin">
        By signing up, you agree to the <a href="/">Terms of Service</a> and{' '}
        <a href="/">Privacy Policy</a>, including <a href="/">Cookie Use</a>.
      </p>
      <div>
        <p className="mt-10 py-3">Already have an account?</p>
        <Button
          backGroundColor="transparant"
          label="Sign in"
          labelColor="blue"
          borderColor="gray"
          to="login"
        />
      </div>
    </div>
  );
}

NewAccountForm.propTypes = {
  // No props required for this component
};

export default NewAccountForm;
