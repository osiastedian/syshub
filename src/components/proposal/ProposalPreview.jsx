import React from 'react';
import DOMPurify from 'dompurify';
import {unescape} from "./DescriptionProposal";


/**
 * Component to show the Proposal preview
 * @component
 * @subcategory Proposal
 * @param {string} title title of the proposal
 * @param {string} description description of the proposal
 * @param {string} url url of the proposal
 * @param {Object} payment payment data of the proposal
 * @example
 * const title = ''
 * const description = ''
 * const url = ''
 * const payment = {}
 * return (
 *  <DescriptionProposal title={title} description={description} url={url} payment={payment} />
 * )
 */
function ProposalPreview({ title, description, url, payment, onNext, onBack, preparing }) {

  return (
    <>
      <div className="proposals">
        <div className="proposal" style={{float: 'none'}}>
          <label style={{fontSize: '24px'}}>{title}</label>
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(unescape(description)) }} style={{margin:'0 10px'}}></div>
          <label>{url || 'No URL was given'}</label>
          {
            payment && (
              <>
                <div className="badge" style={{
                  backgroundColor: 'rgba(251, 176, 59, 0.2)',
                  color: '#FBB03B',
                  padding: '8px',
                  borderRadius: '12px',
                  marginTop: '1rem',
                  marginBottom: '0.5rem'
                }}>
                  {payment.paymentAmount*payment.paymentNumber} SYS in {payment.paymentNumber} payment(s)
                </div>
                <div>
                  <label style={{lineBreak: 'anywhere'}}>Address: {payment.paymentAddress}</label>
                </div>
              </>
            )
          }
        </div>
      </div>
      {onNext && onBack && (
        <div className="form-actions-spaced d-flex gap-2" style={{marginTop: '2rem'}}>
          <button className="btn btn-white-outline btn-chevron-left" type="button" onClick={onBack}>Back</button>
          <button className="btn btn-white btn-chevron-right" type="button" onClick={onNext} disabled={preparing}>Prepare</button>
        </div>
      )}
    </>
  )
}

export default ProposalPreview;