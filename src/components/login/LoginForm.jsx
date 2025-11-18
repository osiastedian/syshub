import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import { useUser } from "../../context/user-context";
import { Link } from "react-router-dom";
import './LoginForm.scss';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});

/**
 * Component that renders the form to login in the app
 * @component
 * @subcategory login
 * @param {*} props onLogin, submitting
 * @example
 * const onLogin = () => {}
 * const submitting = false
 * return (
 *  <LoginForm onLogin={onLogin} submitting={submitting} />
 * )
 */
const LoginForm = (props) => {
  const {firebase} = useUser();
  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema)
  });
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  useEffect(() => {
    window.recaptchaVerifier = firebase.newRecaptchaVerifier('recaptcha-login', {
      callback: () => {
        setRecaptchaVerified(true)
      }, error: (err) => {
        setRecaptchaVerified(false)
      }
    })
    window.recaptchaVerifier.render();
    // eslint-disable-next-line
  }, [])

  return (
    <form className="login-form d-flex flex-column gap-4" onSubmit={handleSubmit(props.onLogin)}>
      {/* Email Input Group */}
      <div className="login-input-group d-flex flex-column gap-1">
        <label className="login-input-label text-white">Email</label>
        <input
          className="login-input"
          type="text"
          name="email"
          placeholder="Email"
          ref={register}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <p className="login-error text-danger">{message}</p>}
        />
      </div>

      {/* Password Input Group */}
      <div className="login-input-group d-flex flex-column gap-1">
        <div className="login-password-label-row d-flex justify-content-between align-items-center">
          <label className="login-input-label text-white">Password</label>
          <Link to="/recover" className="login-forgot-link text-decoration-none">
            Forgot password?
          </Link>
        </div>
        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Password"
          ref={register}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p className="login-error text-danger">{message}</p>}
        />
      </div>

      {/* reCAPTCHA */}
      <div className="login-recaptcha-container d-flex justify-content-center">
        <div id="recaptcha-login"></div>
      </div>

      {/* Button Group */}
      <div className="login-button-group d-flex flex-column gap-2">
        <button
          className="login-button login-button--primary w-100"
          type="submit"
          disabled={props.submitting || !recaptchaVerified}
        >
          <span className="login-button__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1L14 8M14 8L8 15M14 8H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span>Log In</span>
        </button>

        <Link to="/signup" className="login-button login-button--secondary w-100 text-decoration-none">
          <span className="login-button__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1L14 8M14 8L8 15M14 8H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span>Create Account</span>
        </Link>
      </div>
    </form>
  )
}

export default LoginForm;
