import React from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import { CopyToClipboard } from "react-copy-to-clipboard";
import swal from "sweetalert2";

const schema = yup.object().shape({
  paymentTxId: yup.string()
    .test('len', 'Must be exactly 64 characters', val => val.length === 64)
    .required('Payment txid is required')
});

/**
 * Component for Step 5: Prepare Proposal
 * Displays the prepare command and collects payment transaction ID
 * @component
 * @subcategory Proposal
 * @param {string} prepareCommand - The prepare command from API
 * @param {string} proposalUid - Proposal identifier
 * @param {function} onNext - Callback to advance to Step 6
 * @param {function} onCancel - Callback to cancel proposal
 * @param {function} enterPaymentTxId - Hook function from useProposalSubmission
 */
function PrepareProposal({ prepareCommand, proposalUid, onNext, onCancel, enterPaymentTxId }) {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });

  const copyButton = () => {
    swal.fire({
      icon: "success",
      title: "Copied",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const onSubmit = async (data) => {
    await enterPaymentTxId(data);
    // Always advance to next step - hook handles errors internally
    onNext();
  };

  return (
    <div className="input-form w-100">
      <div className="form-group article">
        <div className="cli-command-container">
          <textarea
            className="styled"
            name="prepareCommand"
            id="prepareCommand"
            rows="5"
            disabled
            value={prepareCommand}
          ></textarea>
          <CopyToClipboard text={prepareCommand} onCopy={copyButton}>
            <button className="copy-icon" type="button" title="Copy command">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4V16C8 17.1046 8.89543 18 10 18H18C19.1046 18 20 17.1046 20 16V7.24162C20 6.7034 19.7831 6.18789 19.3982 5.81161L16.1566 2.62007C15.7616 2.23334 15.2288 2 14.6734 2H10C8.89543 2 8 2.89543 8 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 18V20C16 21.1046 15.1046 22 14 22H6C4.89543 22 4 21.1046 4 20V9C4 7.89543 4.89543 7 6 7H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </CopyToClipboard>
        </div>
        <small>
          <p style={{ lineHeight: "1.5" }}>
            Prepare command is ready to be copied. Please copy and paste it into Syscoin Q.T console for payment txid.
          </p>
        </small>
      </div>

      <form className="input-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="paymentTxId">Payment txid</label>
          <input
            type="text"
            id="paymentTxId"
            ref={register}
            name="paymentTxId"
            className="styled"
            maxLength="64"
          />
          <ErrorMessage
            errors={errors}
            name="paymentTxId"
            render={({ message }) => <small><p style={{ lineHeight: '1.5' }}>{message}</p></small>}
          />
        </div>
        <div className="form-actions-spaced">
          <button className="btn btn-outline-primary" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn--blue" type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}

export default PrepareProposal;
