import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

/**
 * Component that customizes the Modal from react-responsive-modal
 * @component
 * @subcategory Global
 * @param {*} props props to close and open the Modal, and the children
 */

export default function CustomModal(props) {
  return (
    <Modal
      {...props}
      center
      styles={{
        modal: {
          background: '#2E3354',
          borderRadius: '12px',
          WebkitBorderRadius: '12px',
          MozBorderRadius: '12px',
          padding: '2rem',
          maxWidth: '600px',
          width: '90%'
        },
        closeButton: { fill: '#ffffff' },
        overlay: {
          background: 'rgba(0, 0, 0, 0.75)'
        }
      }}
      blockScroll={false}
    >
      <div style={{ color: '#ffffff', textAlign: 'left' }}>
        {props.children}
      </div>
    </Modal>
  );
}
