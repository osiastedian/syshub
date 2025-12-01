import React from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import { CopyToClipboard } from "react-copy-to-clipboard";
import swal from "sweetalert2";

const schema = yup.object().shape({
  proposalHash: yup.string()
    .test('len', 'Must be exactly 64 characters', val => val.length === 64)
    .required('proposal hash is required')
});

/**
 * Component for Step 6: Submit Proposal
 * Displays the submit command and collects proposal hash
 * @component
 * @subcategory Proposal
 * @param {string} submitCommand - The submit command from API
 * @param {string} proposalUid - Proposal identifier
 * @param {function} onCancel - Callback to cancel proposal
 * @param {function} enterProposalHash - Hook function from useProposalSubmission
 */
function SubmitProposal({ submitCommand, proposalUid, onCancel, enterProposalHash }) {
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

  return (
    <div className="input-form w-100">
      {/* WARNING BANNER - Prominently displayed at top */}
      <div className="alert alert-warning mb-3 py-2 px-3" role="alert">
        <strong>Important:</strong> Please wait at least <b>5 minutes</b> or <b>1 block confirmation</b> after sending the payment transaction before running <code>go_submit</code>. Submitting too early may cause your proposal to fail.
      </div>

      <div className="form-group article">
        <div className="cli-command-container">
          <textarea
            className="styled"
            name="submitCommand"
            id="submitCommand"
            rows="5"
            disabled
            value={submitCommand}
          ></textarea>
          <CopyToClipboard text={submitCommand} onCopy={copyButton}>
            <button className="copy-icon" type="button" title="Copy command">📋</button>
          </CopyToClipboard>
        </div>
        <small>
          <p style={{ lineHeight: "1.5" }}>
            Submit command is ready to be copied. Please copy and paste it into Syscoin Q.T console to submit your proposal. This could take a couple minutes.
          </p>
        </small>
      </div>

      <div className="form-actions-spaced">
        <CopyToClipboard text={submitCommand} onCopy={copyButton}>
          <button className="btn btn--blue" type="button">Copy Command</button>
        </CopyToClipboard>
      </div>

      <form className="input-form" onSubmit={handleSubmit(enterProposalHash)}>
        <div className="form-group">
          <label htmlFor="proposalHash">Proposal hash</label>
          <input
            type="text"
            id="proposalHash"
            ref={register}
            name="proposalHash"
            className="styled"
            maxLength="64"
          />
          <ErrorMessage
            errors={errors}
            name="proposalHash"
            render={({ message }) => <small><p style={{ lineHeight: '1.5' }}>{message}</p></small>}
          />
        </div>
        <div className="form-actions-spaced">
          <button className="btn btn-outline-primary" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn--blue" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SubmitProposal;
