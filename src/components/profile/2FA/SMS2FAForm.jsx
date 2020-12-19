import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {yupResolver} from "@hookform/resolvers";
import * as yup from "yup";
import swal from "sweetalert2";
import {PhoneNumberFormat, PhoneNumberUtil} from "google-libphonenumber";

import {useUser} from "../../../context/user-context";
import {isoArray} from "../../../utils/isoCodes";
import {phoneValidation} from "../../../utils/phoneUtil";

const PNF = PhoneNumberFormat;
const phoneUtil = PhoneNumberUtil.getInstance();

const schema = yup.object().shape({
  phoneNumber: yup.string().required("Phone number is required"),
  areaCode: yup.string().required("Country Code is required"),
});
const schema2 = yup.object().shape({
  phoneCode: yup.string().required("The verification code is required"),
});

/**
 * Component to show inside 2fa modal to activate sms verification
 * @component
 * @subcategory Profile
 * @param {*} onClose function to close after the verification 
 * @example
 * const onClose = () => {}
 * return (
 *  <SMS2FAForm onClose={onClose} />
 * )
 */
function SMS2FAForm({ onClose }) {
  const {firebase, updateCurrentActionsUser} = useUser();

  const [codeSent, setCodeSent] = useState(false);
  const [verifyId, setVerifyId] = useState("");

  const {register, handleSubmit, errors} = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    errors: errors2,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema2),
  });

  const isoOrdened = isoArray.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLocaleLowerCase())
  );

  /**
   * useEffect to render the invisible recaptcha at mount
   * @function
   */
  useEffect(() => {
    window.recaptchaVerifier = firebase.newRecaptchaVerifier("recaptcha", {
      size: "invisible",
      callback: (resp) => {
        // console.log(resp);
      },
      error: (err) => {
        // console.log(err);
      },
    });
    window.recaptchaVerifier.render();
    //eslint-disable-next-line
  }, []);

  /**
   * function to send the sms
   * @function
   * @param {{areaCode: string, phoneNumber: string}} data data received from the phone number form
   */
  const sendSMS = async ({areaCode, phoneNumber}) => {
    const userPhone = phoneValidation(phoneNumber, areaCode);
    if (userPhone) {
      swal.fire({
        title: 'Sending SMS',
        showConfirmButton: false,
        willOpen: () => {
          swal.showLoading()
        }
      })

      const appVerifier = window.recaptchaVerifier;
      const verificationId = await firebase.sendSMSToPhone(
        phoneUtil.format(userPhone, PNF.E164),
        appVerifier
      );
      swal.fire({
        title: 'SMS sent!',
        timer: 1500,
        icon: 'success'
      });
      setVerifyId(verificationId);
      setCodeSent(true);
    }
  };

  /**
   * function to verificate the code sent via sms
   * @function
   * @param {{phoneCode: string}} data phone code received from the phone code input form 
   */
  const auth = async ({ phoneCode }) => {
    swal.fire({
      title: 'Verifying',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    })
    let credentials = await firebase.verifyPhoneCode(verifyId, phoneCode);
    await firebase
      .updatePhoneCredentials(credentials)
      .then(async () => {
        let currentUserDataUpdate = {
          sms: true,
          twoFa: true,
          gAuth: false
        };
        await updateCurrentActionsUser(currentUserDataUpdate).then(async () => {
          await swal.fire({
            icon: "success",
            title: "Your phone number was verified",
            text: "Please log in again",
            timer: 1500,
            showConfirmButton: false
          }).then(async () => {
            onClose();
          })

        }).catch((err) => {
          throw err;
        });
      })
      .catch((err) => {
        throw err;
      });
    // SMSAuth({phoneNumber, ...data});
  };


  return (
    <>
      <h3>2FA SMS</h3>

      <div className="input-form">
        <form>
          <div className="form-group">
            <label htmlFor="areaCode">Country Code</label>
            <select
              className="styled"
              name="areaCode"
              id="areaCode"
              ref={register}
              defaultValue=""
            >
              <option value="" hidden>
                Select your country
              </option>
              {isoOrdened.map((iso, index) => (
                <option key={index} value={iso.code}>
                  {iso.name} ({iso.dial_code})
                </option>
              ))}
            </select>
            <ErrorMessage
              errors={errors}
              name="areaCode"
              render={({message}) => (
                <small>
                  <p style={{lineHeight: "1.5"}}>{message}</p>
                </small>
              )}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              className="styled"
              name="phoneNumber"
              type="tel"
              id="phoneNumber"
              ref={register}
            />
            <ErrorMessage
              errors={errors}
              name="phoneNumber"
              render={({message}) => (
                <small>
                  <p style={{lineHeight: "1.5"}}>{message}</p>
                </small>
              )}
            />
          </div>

          <div
            id={"recaptcha"}
            className="recaptcha"
            style={{display: "inline-block"}}
          />

          <button
            className="btn btn--blue btn-center"
            onClick={handleSubmit(sendSMS)}
          >
            Send SMS
          </button>
        </form>
        <div className="form-group spacer line"></div>
      </div>

      <div className="input-form">
        <form>
          <div className="form-group">
            <label htmlFor="phoneCode">
              Insert the code sent to your phone
            </label>
            <input
              className="styled"
              name="phoneCode"
              type="text"
              id="phoneCode"
              ref={register2}
              disabled={!codeSent}
            />
            <ErrorMessage
              errors={errors2}
              name="phoneCode"
              render={({message}) => (
                <small>
                  <p style={{lineHeight: "1.5"}}>{message}</p>
                </small>
              )}
            />
          </div>

          <button
            className="btn btn--blue btn-center"
            disabled={!codeSent}
            onClick={handleSubmit2(auth)}
          >
            Verify
          </button>
        </form>
      </div>
    </>
  );

}

export default SMS2FAForm;