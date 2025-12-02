import React from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";

const schema = yup.object().shape({
  proposalTitle: yup.string().max(40, 'The proposal title must be at most 40 characters.').required('The proposal title is required.')
});

/**
 * Component to show the Proposal title form
 * @component
 * @subcategory Proposal
 * @param {*} onNext function that gets executed after the form is submitted
 * @example
 * const onNext = () => {}
 * return (
 *  <TitleProposal onNext={onNext} />
 * )
 */
function TitleProposal({ onNext }) {

  const { register, watch, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      proposalTitle: ''
    }
  });
  const watchedTitle = watch('proposalTitle') || '';

  return (
    <form className="input-form w-100" onSubmit={handleSubmit(onNext)}>
      <div className="form-group position-relative mb-4">
        <div style={{position: 'relative', display: 'block'}}>
          <input
            type="text"
            id="proposalTitle"
            ref={register}
            name="proposalTitle"
            className="form-control input-glass w-100"
            maxLength="40"
            placeholder=" "
            style={{paddingRight: '80px'}}
          />
          <small
            style={{
              fontSize: '0.875rem',
              color: '#9fa6b0',
              pointerEvents: 'none',
              position: 'absolute',
              top: '50%',
              right: '16px',
              transform: 'translateY(-50%)',
              width: 'auto',
              marginBottom: 0
            }}
          >
            {watchedTitle.length}/40
          </small>
        </div>
        <ErrorMessage
          errors={errors}
          name="proposalTitle"
          render={({ message }) => <small className="d-block mt-2 text-danger"><p style={{lineHeight:'1.5', margin: 0}}>{message}</p></small>}
        />
      </div>
      <div className="form-actions-spaced mt-4">
        <button className="btn btn-white btn-next" type="submit">
          <span className="btn-text">Next</span>
          <span className="btn-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="16" fill="transparent"/>
              <path d="M17.6191 11.9533L21.6658 16L17.6191 20.0466" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.334 16H21.554" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
      </div>
    </form>
  )
}

export default TitleProposal;