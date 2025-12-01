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
          <button className="btn btn-white-outline btn-chevron-left" type="button" onClick={onBack}>Back</button>
          <button className="btn btn-white btn-chevron-right" type="button" onClick={onNext} disabled={preparing}>Prepare</button>
        </div>
      )}
    </div>
  )
}

export default ProposalPreview;