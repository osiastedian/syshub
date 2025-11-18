import React, {useState, useEffect} from 'react';
import {useUser} from "../../context/user-context";
import swal from 'sweetalert2';
import './FormRecover.scss';

/**
 * Component that renders the recover password form
 * @component
 * @subcategory recover
 * @example
 * return(
 *  <FormRecover />
 * )
 */
const FormRecover = () => {
  const {firebase} = useUser();
  const [email, setEmail] = useState('');
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  useEffect(() => {
    window.recaptchaVerifier = firebase.newRecaptchaVerifier('recaptcha-recover', {
      callback: response => {
        setRecaptchaVerified(true)
      },
      error: () => {
        setRecaptchaVerified(false)
      }
    })
    window.recaptchaVerifier.render();
    // eslint-disable-next-line
  }, [])

  /**
   * Function to submit the recover password form
   * @function
   * @param {*} e
   */
  const submitForm = async (e) => {
    e.preventDefault();
    swal.fire({
      title: 'Submitting',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    });
    firebase.passwordReset(email).then(() => {
      swal.fire({
        icon: 'success',
        title: 'Email sent',
        text: 'We have sent you an email with the steps to recover your password'
      })
    }).catch(err => {
      return swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err}`
      });
    })
    e.target.reset();
    setEmail('');
    setRecaptchaVerified(false);
  }

  return (
    <form className="recover-form d-flex flex-column gap-4" onSubmit={submitForm}>

      {/* Email Input Group */}
      <div className="recover-input-group d-flex flex-column gap-1">
        <label className="recover-input-label text-white" htmlFor="email-input">
          Email
        </label>
        <input
          id="email-input"
          className="recover-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* reCAPTCHA Container */}
      <div className="recover-recaptcha-container d-flex justify-content-center">
        <div id="recaptcha-recover" style={{display: 'inline-block'}}></div>
      </div>

      {/* Button Group */}
      <div className="recover-button-group d-flex flex-column gap-2">
        <button
          type="submit"
          className="recover-button recover-button--primary"
          disabled={!recaptchaVerified}
        >
          <span className="recover-button__icon">
            {/* Arrow Icon SVG */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1L14 8M14 8L8 15M14 8H2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>Send email</span>
        </button>
      </div>
    </form>
  );

}


export default FormRecover;
