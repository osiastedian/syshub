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
        <button className="btn btn-white btn-chevron-right" type="submit">Next</button>
      </div>
    </form>
  )
}

export default TitleProposal;