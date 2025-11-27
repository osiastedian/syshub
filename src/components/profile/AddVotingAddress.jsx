import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { createVotingAddress, updateVotingAddress } from "../../utils/request";
import { FormProvider, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import {
  parseDescriptor,
  deriveAddressesFromXprv,
  deriveAddressFromWifPrivKey,
} from "./AddAddress/validation-utils";

import "./AddVotingAddress.scss";

// Validation schema
const schema = yup.object().shape({
  type: yup
    .string()
    .required("Address type is required")
    .oneOf(
      ["descriptor", "legacy"],
      "Address type must be descriptor or legacy"
    ),
  name: yup.string().required("Label is required"),
  privateKey: yup.string().required("Descriptor wallet is required"),
  address: yup
    .string()
    .required("Voting address is required")
    .test(
      "Validated Address Validity",
      "Invalid Address",
      (value, { parent }) => {
        if (!parent?.privateKey || !value) {
          return false;
        }

        if (parent.type === "legacy") {
          try {
            const derived = deriveAddressFromWifPrivKey(parent.privateKey);
            return (derived || "").toLowerCase() === value.toLowerCase();
          } catch (_) {
            return false;
          }
        }

        const results = parseDescriptor(parent.privateKey);
        if (!results || !results.xprv || !results.path) {
          return false;
        }

        const addresses = deriveAddressesFromXprv(
          results.xprv,
          results.path,
          100
        );

        return addresses
          .map((a) => (a || "").toLowerCase())
          .includes(value.toLowerCase());
      }
    ),
  txId: yup
    .string()
    .matches(/-0$|-1$/, "Tx ID must end with the index: -0 or -1")
    .required("Tx ID is required"),
});

/**
 * Component to show at the profile add/edit voting address section
 * @component
 * @subcategory Profile
 * @param {Object} editData - Voting address data when editing (null when adding)
 * @param {function} onClose - Callback to close the form and return to information section
 */
function AddVotingAddress({ editData, onClose }) {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);

  // Check if we're in edit mode
  const isEditMode = !!editData;

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: editData?.type || "descriptor",
      name: editData?.name || "",
      privateKey: editData?.privateKey || "",
      address: editData?.address || "",
      txId: editData?.txId || "",
    },
  });

  const { register, handleSubmit, formState, reset, watch } = form;
  const { errors } = formState;
  const selectedType = watch("type");

  // Update form values when editData changes
  useEffect(() => {
    if (editData) {
      reset({
        type: editData.type || "descriptor",
        name: editData.name || "",
        privateKey: editData.privateKey || "",
        address: editData.address || "",
        txId: editData.txId || "",
      });
    }
  }, [editData, reset]);

  /**
   * Handle form submission
   * @param {Object} data - Form data
   */
  const addAddress = async (data) => {
    setSubmitting(true);
    try {
      const actionText = isEditMode
        ? t("profile.data.address.updating") || "Updating voting address"
        : t("profile.data.address.adding") || "Adding voting address";

      Swal.fire({
        title: actionText,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      // Call appropriate API method based on mode
      const apiCall = isEditMode
        ? updateVotingAddress(editData._id, data)
        : createVotingAddress(data);

      await apiCall
        .then(async (res) => {
          await Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1800,
          });
          setSubmitting(false);
          onClose();
        })
        .catch((err) => {
          if (err.response?.status === 406) {
            Swal.fire({
              title: t("common.error") || "There was an error",
              text: err.response.data.message,
              icon: "error",
            });
            setSubmitting(false);
          }
          if (err.response?.status === 500) {
            throw err;
          }
        });
    } catch (error) {
      Swal.fire({
        title: t("common.error") || "There was an error",
        text:
          error.message ||
          error.response?.data?.message ||
          t("common.verifyData") ||
          "Verify the data and try again",
        icon: "error",
      });
      setSubmitting(false);
      return false;
    }
  };

  return (
    <div className="add-voting-address">
      <div className="add-voting-address__section">
        {/* Main content */}
        <div className="add-voting-address__content">
          {/* Page title */}
          <h1 className="add-voting-address__title">
            {t("profile.data.heading") || "User Profile"}
          </h1>

          {/* Form */}
          <FormProvider {...form}>
            <form
              className="add-voting-address__form"
              onSubmit={handleSubmit(addAddress)}
            >
              {/* Section title */}
              <h2 className="add-voting-address__section-title">
                {isEditMode
                  ? t("profile.data.address.editAddress") || "Edit voting address"
                  : t("profile.data.address.addAddress") || "Add voting address"}
              </h2>

              {/* Address type selection */}
              <div className="add-voting-address__field">
                <label
                  htmlFor="type"
                  className="add-voting-address__label"
                >
                  {t("profile.data.address.selectType") ||
                    "Select the type of address you want to add"}
                  <span className="required">*</span>
                </label>
                <div className="add-voting-address__input-wrapper">
                  <select
                    id="type"
                    name="type"
                    ref={register}
                    className="add-voting-address__select"
                  >
                    <option value="descriptor">
                      From Descriptor (QT Default)
                    </option>
                    <option value="legacy">From Legacy Wallet</option>
                  </select>
                  <div className="add-voting-address__select-arrow"></div>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="type"
                  render={({ message }) => (
                    <p className="add-voting-address__error">{message}</p>
                  )}
                />
              </div>

              {/* Label field */}
              <div className="add-voting-address__field">
                <label
                  htmlFor="name"
                  className="add-voting-address__label"
                >
                  {t("profile.data.address.label") || "Label"}
                  <span className="required">*</span>
                </label>
                <div className="add-voting-address__input-wrapper">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    ref={register}
                    className={`add-voting-address__input ${
                      errors.name ? "error" : ""
                    }`}
                    placeholder=" "
                  />
                  <span className="add-voting-address__info-icon" title="Help">?</span>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => (
                    <p className="add-voting-address__error">{message}</p>
                  )}
                />
              </div>

              {/* Descriptor wallet field */}
              <div className="add-voting-address__field">
                <label
                  htmlFor="privateKey"
                  className="add-voting-address__label"
                >
                  {selectedType === "legacy"
                    ? t("profile.data.address.wifPrivateKey") || "WIF Private Key"
                    : t("profile.data.address.descriptorWallet") || "Descriptor wallet"}
                  <span className="required">*</span>
                </label>
                <div className="add-voting-address__input-wrapper">
                  <input
                    type="text"
                    id="privateKey"
                    name="privateKey"
                    ref={register}
                    className={`add-voting-address__input ${
                      errors.privateKey ? "error" : ""
                    }`}
                    placeholder={selectedType === "legacy" ? "" : "wpkh(...)"}
                  />
                  <span className="add-voting-address__info-icon" title="Help">?</span>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="privateKey"
                  render={({ message }) => (
                    <p className="add-voting-address__error">{message}</p>
                  )}
                />
              </div>

              {/* Voting address field */}
              <div className="add-voting-address__field">
                <label
                  htmlFor="address"
                  className="add-voting-address__label"
                >
                  {t("profile.data.address.votingAddress") ||
                    "Voting address"}
                  <span className="required">*</span>
                </label>
                <div className="add-voting-address__input-wrapper">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    ref={register}
                    className={`add-voting-address__input ${
                      errors.address ? "error" : ""
                    }`}
                    placeholder=" "
                  />
                  <span className="add-voting-address__info-icon" title="Help">?</span>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="address"
                  render={({ message }) => (
                    <p className="add-voting-address__error">{message}</p>
                  )}
                />
              </div>

              {/* Tx ID field */}
              <div className="add-voting-address__field">
                <label
                  htmlFor="txId"
                  className="add-voting-address__label"
                >
                  {t("profile.data.address.txId") || "Tx ID"}
                  <span className="required">*</span>
                </label>
                <div className="add-voting-address__input-wrapper">
                  <input
                    type="text"
                    id="txId"
                    name="txId"
                    ref={register}
                    className={`add-voting-address__input ${
                      errors.txId ? "error" : ""
                    }`}
                    placeholder=" "
                  />
                  <span className="add-voting-address__info-icon" title="Help">?</span>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="txId"
                  render={({ message }) => (
                    <p className="add-voting-address__error">{message}</p>
                  )}
                />
              </div>

              {/* Buttons */}
              <div className="add-voting-address__buttons">
                <button
                  type="button"
                  onClick={onClose}
                  className="add-voting-address__button-back"
                >
                  <span>&lt; Back</span>
                </button>
                <button
                  type="submit"
                  className="add-voting-address__button-submit"
                  disabled={submitting}
                >
                  {submitting
                    ? t("common.submitting") || "Submitting..."
                    : isEditMode
                    ? t("profile.data.address.saveChanges") || "Save Changes"
                    : t("profile.data.address.addAddress") || "Add voting address"}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

AddVotingAddress.propTypes = {
  editData: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

AddVotingAddress.defaultProps = {
  editData: null,
};

export default AddVotingAddress;
