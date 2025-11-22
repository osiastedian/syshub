import React from "react";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {yupResolver} from "@hookform/resolvers";
import * as yup from "yup";


const schema = yup.object().shape({
  gAuthCode: yup.string().required("The verification code is required").matches(/^[0-9]{6}$/, "Must be a 6-digit code"),
});

/**
 * Component that renders the form to submit the Gauth code to be verified
 * @component
 * @subcategory login
 * @param {*} userSignInGAuth function executed after submitting the code
 * @example
 * const userSignInGAuth = () => {}
 * return (
 *  <GAuthTwoFAFormLogin userSignInGAuth={userSignInGAuth} />
 * )
 */
const GAuthTwoFAFormLogin = ({userSignInGAuth}) => {
  const {register, handleSubmit, errors} = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });


  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-4 text-center">
        <div className="mb-3">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" stroke="#FBB03B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12L11 14L15 10" stroke="#FBB03B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h4 className="text-white mb-2">Google Authenticator</h4>
        <p className="text-white-50 mb-0">Enter the 6-digit code from your authenticator app</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(userSignInGAuth)}>
        <div className="mb-4">
          <label htmlFor="gAuthCode" className="form-label text-white">
            Verification Code
          </label>
          <input
            className="form-control form-control-lg bg-dark text-white border-secondary text-center"
            style={{
              fontSize: '24px',
              letterSpacing: '8px',
              fontWeight: '500'
            }}
            name="gAuthCode"
            type="text"
            id="gAuthCode"
            placeholder="000000"
            maxLength="6"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="one-time-code"
            autoFocus
            ref={register}
          />
          <ErrorMessage
            errors={errors}
            name="gAuthCode"
            render={({message}) => (
              <div className="text-danger mt-2 small">
                {message}
              </div>
            )}
          />
          <div className="form-text text-white-50 mt-2">
            The code refreshes every 30 seconds
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-warning w-100 fw-semibold"
          style={{
            backgroundColor: '#FBB03B',
            borderColor: '#FBB03B',
            color: '#000'
          }}
        >
          Verify & Continue
        </button>
      </form>
    </div>
  )
}

export default GAuthTwoFAFormLogin;
