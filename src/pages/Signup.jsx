import React, {useState} from "react";
import {MetaTags} from "react-meta-tags";
import {withTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

import {useUser} from '../context/user-context';

import SignupForm from "../components/signup/SignupForm";
import swal from "sweetalert2";
import {createSeed, removeSeed} from "../utils/encryption";
import './Signup.scss';

/**
 * Signup page showed at /signup
 * @component
 * @category Pages
 * @param {*} t t prop received from withTranslation
 */
function Signup({ t }) {
  const history = useHistory();
  const { signupUser } = useUser();

  const [submitting, setSubmitting] = useState(false);


  /**
   * Function that proceeds to create the user and signups
   * @param {{email: string, password: string}} registerData register data received from SignupForm it has email and password
   */
  const registerToApp = async (registerData) => {
    swal.fire({
      title: 'Submitting',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    });
    setSubmitting(true);
    
    try {
      await signupUser(registerData).catch(err => {
        throw err;
      });
      createSeed(registerData.password);
      swal.fire({
        icon: "success",
        title: "Your account was created",
        timer: 2000,
        showConfirmButton: false
      });
      history.push('/profile?verifyEmail=true');
    } catch (error) {
      setSubmitting(false);
      swal.fire({
        icon: "error",
        title: "Error",
        text: error.message
      });
      removeSeed();
    }

  }

  return (
    <div className="signup-page">
      <MetaTags>
        <title> {t("signup.meta.title")} </title>
        <meta name="keywords" content={t("signup.meta.keywords")}/>
        {/* <meta name="description" content={t("signup.meta.description")}/> */}
      </MetaTags>

      <div className="signup-container">
        <div className="signup-title-section">
          <h1 className="signup-title">
            {t('signup.page.title')}
          </h1>
          <p className="signup-subtitle">
            {t('signup.page.subtitle')}
          </p>
        </div>

        <div className="signup-form-wrapper">
          <SignupForm onSignup={registerToApp} submitting={submitting} />
        </div>
      </div>
    </div>
  );

}

export default withTranslation()(Signup);
