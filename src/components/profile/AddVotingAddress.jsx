import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next/";
import {createVotingAddress} from "../../utils/request";

import AddAddressForm from "./AddAddressForm";
import Title from "../global/Title";

/**
 * Component to show at the profile add voting address route
 * @component
 * @subcategory Profile
 * @example
 * return (
 *  <AddVotingAddress />
 * )
 */
function AddVotingAddress() {
  const history = useHistory();
  const {t} = useTranslation();

  const [submitting, setSubmitting] = useState(false);

  /**
   * function that handles the single voting address add
   * @param {Object} data the data from the single add form
   */
  const addAddress = async (data) => {
    setSubmitting(true);
    try {
      Swal.fire({
        title: "Adding voting address",
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      await createVotingAddress(data)
        .then(async (res) => {
          await Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1800,
          });
          setSubmitting(false);
          history.push("/profile");
        })
        .catch((err) => {
          if (err.response.status === 406) {
            Swal.fire({
              title: "There was an error",
              text: err.response.data.message,
              icon: "error",
            });
            setSubmitting(false);
          }
          if (err.response.status === 500) {
            throw err;
          }
        });
    } catch (error) {
      Swal.fire({
        title: "There was an error",
        text:
          error.message ||
          error.response?.data?.message ||
          "Verify the data and try again",
        icon: "error",
      });
      setSubmitting(false);
      return false;
    }
  };

  /**
   * function that handles the many voting address creation
   * @param {Object} data the data from the multiple add form
   */
  const addManyAddress = async ({masternodeConf}) => {
    setSubmitting(true);
    try {
      Swal.fire({
        title: "Adding voting address",
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      await createVotingAddress({listMN: masternodeConf})
        .then(async (res) => {
          await Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1800,
          });
          setSubmitting(false);
          history.push("/profile");
        })
        .catch((err) => {
          if (err.response.status === 406) {
            Swal.fire({
              title: "There was an error",
              text: err.response.data.message,
              icon: "error",
            });
            setSubmitting(false);
          }
          if (err.response.status === 500) {
            throw err;
          }
        });
    } catch (error) {
      Swal.fire({
        title: "There was an error",
        text: "Invalid format, Please verify the data and try again",
        icon: "error",
      });
      setSubmitting(false);
    }
  };

  return (
    <div className="shell-large">
      <div className="section__body">
        <div className="articles">
          <section className="article">
            <div className="cols">
              <div className="col col--size-12">
                <div className="article__content article__content--pull-left text-center">
                  <Title heading={t("profile.data.address.addAddress")}/>
                  <AddAddressForm
                    onSingleCreation={addAddress}
                    onMultipleCreation={addManyAddress}
                    submitting={submitting}
                  />
                  <Link to="/profile" className="btn btn--blue-border">
                    Go back
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AddVotingAddress;
