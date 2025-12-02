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
    <div className="w-100" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      textAlign: 'left'
    }}>
      {/* Title */}
      <div style={{
        fontSize: '1.125rem',
        fontWeight: '400',
        lineHeight: '1.3',
        color: '#ffffff',
        fontFamily: '"DM Sans", sans-serif'
      }}>
        {title}
      </div>

      {/* Description */}
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(unescape(description)) }}
        style={{
          fontSize: '1.125rem',
          fontWeight: '400',
          lineHeight: '1.3',
          color: '#ffffff',
          fontFamily: '"DM Sans", sans-serif'
        }}
      />

      {/* Payment Badge */}
      {payment && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(251, 176, 59, 0.2)',
          color: '#FBB03B',
          padding: '0.5rem',
          borderRadius: '0.75rem',
          fontSize: '1rem',
          fontWeight: '600',
          lineHeight: '1.3',
          fontFamily: '"DM Sans", sans-serif',
          alignSelf: 'flex-start'
        }}>
          {payment.paymentAmount*payment.paymentNumber} SYS in {payment.paymentNumber} payment(s)
        </div>
      )}

      {/* Payment Address */}
      {payment && (
        <div style={{
          fontSize: '1.125rem',
          fontWeight: '400',
          lineHeight: '1.3',
          color: '#ffffff',
          fontFamily: '"DM Sans", sans-serif',
          wordBreak: 'break-all'
        }}>
          Address: {payment.paymentAddress}
        </div>
      )}

      {/* Buttons */}
      {onNext && onBack && (
        <div className="d-flex gap-2" style={{marginTop: '0.5rem'}}>
          <button className="btn btn-white-outline btn-back" type="button" onClick={onBack}>
            <span className="btn-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="16" fill="transparent"/>
                <path d="M14.3809 20.0467L10.3342 16L14.3809 11.9534" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.666 16H10.446" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="btn-text">Back</span>
          </button>
          <button className="btn btn-white btn-next" type="button" onClick={onNext} disabled={preparing}>
            <span className="btn-text">Prepare</span>
            <span className="btn-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="16" fill="transparent"/>
                <path d="M17.6191 11.9533L21.6658 16L17.6191 20.0466" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.334 16H21.554" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

export default ProposalPreview;