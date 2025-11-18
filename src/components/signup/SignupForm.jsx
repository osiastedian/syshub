import React, {useEffect, useState, useRef} from 'react';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers';
import * as yup from "yup";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {useUser} from "../../context/user-context";
import './SignupForm.scss';

const schema = yup.object().shape({
  email: yup.string().email().typeError('Must be a valid email').required('Email is required'),
  password: yup.string()
    .matches(/^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/, 'Must include lower, upper, number, special characters and a min length of 8')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords does not match')
    .required('You have to confirm your password')
});

/**
 * Component that renders the signup form
 * @component
 * @subcategory signup
 * @param {*} props props onSignup, submitting, and t (translation function)
 */
const SignupForm = (props) => {
  const { t } = props;
  const { firebase } = useUser();
  const isMounted = useRef(false);

  const {register, handleSubmit, errors, formState} = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  useEffect(() => {
    window.recaptchaVerifier = firebase.newRecaptchaVerifier('recaptcha-sign-up', {
      callback: () => {
        if (isMounted.current) setRecaptchaVerified(true);
      },
      error: (err) => {
        if (isMounted.current) setRecaptchaVerified(false);
      }
    })
    isMounted.current = true;
    window.recaptchaVerifier.render();

    return () => {
      isMounted.current = false;
    }
  }, [firebase]);

  return (
    <form className="d-flex flex-column gap-4 signup-form" onSubmit={handleSubmit(props.onSignup)}>
      {/* Email Field */}
      <div className="signup-input-group d-flex flex-column gap-2">
        <label className="signup-input-label text-white" htmlFor="email">
          {t('signup.form.emailAddress')}
        </label>
        <input
          id="email"
          className={`signup-input ${errors.email ? 'error' : ''}`}
          type="email"
          name="email"
          placeholder={t('signup.form.emailPlaceholder')}
          ref={register}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({message}) => <div className="signup-input-error">{message}</div>}
        />
      </div>

      {/* Password Field */}
      <div className="signup-input-group d-flex flex-column gap-2">
        <label className="signup-input-label text-white" htmlFor="password">
          {t('signup.form.password')}
        </label>
        <input
          id="password"
          className={`signup-input ${errors.password ? 'error' : ''}`}
          type="password"
          name="password"
          placeholder={t('signup.form.passwordPlaceholder')}
          ref={register}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({message}) => <div className="signup-input-error">{message}</div>}
        />
      </div>

      {/* Confirm Password Field */}
      <div className="signup-input-group d-flex flex-column gap-2">
        <label className="signup-input-label text-white" htmlFor="confirmPassword">
          {t('signup.form.confirmPassword')}
        </label>
        <input
          id="confirmPassword"
          className={`signup-input ${errors.confirmPassword ? 'error' : ''}`}
          type="password"
          name="confirmPassword"
          placeholder={t('signup.form.confirmPasswordPlaceholder')}
          ref={register}
        />
        <ErrorMessage
          errors={errors}
          name="confirmPassword"
          render={({message}) => <div className="signup-input-error">{message}</div>}
        />
      </div>

      {/* reCAPTCHA */}
      <div className="signup-recaptcha">
        <div id={'recaptcha-sign-up'} className="recaptcha" style={{display: 'inline-block'}}/>
      </div>

      {/* Buttons */}
      <div className="signup-button-group">
        <button
          type="submit"
          className="signup-button-primary"
          disabled={props.submitting || !recaptchaVerified || !(formState.isValid)}
        >
          {props.submitting ? t('signup.form.creating') : t('signup.form.signUp')}
          <span className="button-icon">→</span>
        </button>

        <Link to="/login" className="signup-button-secondary text-decoration-none">
          {t('signup.form.alreadyHaveAccount')}
          <span className="button-icon">→</span>
        </Link>
      </div>
    </form>
  )
}

export default withTranslation()(SignupForm);
