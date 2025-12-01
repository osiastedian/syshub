import React, {useState, useEffect, useMemo, useRef} from "react";
import swal from "sweetalert2";
import {useHistory} from "react-router";
import {RiCheckLine} from 'react-icons/ri';

import {checkProposal, prepareProposal, notCompletedProposal, destroyProposal} from "../../utils/request";
import {getAxiosErrorFooter, getAxiosErrorMessage, logAxiosError} from "../../utils/errorHandler";

import CustomModal from '../global/CustomModal';
import TitleProposal from './TitleProposal';
import DescriptionProposal from './DescriptionProposal';
import PaymentProposal from './PaymentProposal';
import ProposalPreview from "./ProposalPreview";
import PrepareProposal from './PrepareProposal';
import SubmitProposal from './SubmitProposal';
import axios from 'axios';
import useProposalSubmission from './hooks/useProposalSubmission';
import styles from './ProposalForm.module.scss';

/**
 * Component to show the create Proposal form
 * @component
 * @subcategory Proposal
 * @example
 * return (
 *  <ProposalForm />
 * )
 */
function ProposalForm() {
  const history = useHistory();
  const isMounted = useRef(false);
  //COMPONENT STATES
  const [currentStep, setCurrentStep] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  //PROPOSAL STATES
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [payment, setPayment] = useState(null);
  const [prepareCommand, setPrepareCommand] = useState('');
  const [submitCommand, setSubmitCommand] = useState('');
  const [preparing, setPreparing] = useState(false);
  const [proposalUid, setProposalUid] = useState('');

  const cancelSource = useMemo(() => axios.CancelToken.source(), []);

  const { enterPaymentTxId, enterProposalHash } = useProposalSubmission({
    proposalUid,
    history,
    setSubmitCommand,
  });

  /**
   * UseEffect at mounting to get saved proposal
   * @function
   */
  useEffect(() => {
    /**
     * function to get saved proposal from the API
     * @function
     */
    const getSavedProposal = async () => {
      try {
        const {data} = await notCompletedProposal(cancelSource.token);

        if (data.proposal) {
          showSavedProposal(data.proposal);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          logAxiosError('ProposalForm::getSavedProposal', error);
        }
      }
    };
    isMounted.current = true;
    getSavedProposal();

    return () => {
      cancelSource.cancel('The request has been canceled');
      isMounted.current = false;
    };
  }, [cancelSource]);

  /**
   * Function that opens a modal with the preview of the saved proposal
   * @function
   * @param {Object} proposal the saved proposal to show from the API
   */
  const showSavedProposal = (proposal) => {
    // console.log(proposal);
    setTitle(proposal.title);
    setDescription(proposal.description);
    if (proposal.url !== 'emptyField') setUrl(proposal.url);
    const payment = {
      paymentNumber: proposal.nPayment,
      paymentAmount: proposal.payment_amount,
      paymentAddress: proposal.payment_address,
      proposalStartEpoch: proposal.start_epoch,
      proposalEndEpoch: proposal.end_epoch
    }
    setPayment(payment);
    setProposalUid(proposal.uid);
    setPrepareCommand(proposal.prepareCommand);
    setSubmitCommand(proposal.commandSubmit || '');

    setOpenModal(true);
  }

  /**
   * Function that erase from the API the saved proposal and sets the proposal in blank to create a new one
   * @function
   */
  const cancelCurrentProposal = async () => {
    if (openModal) setOpenModal(false);
    setCurrentStep(0);
    try {
      await destroyProposal(proposalUid);
    } catch (error) {
      logAxiosError('ProposalForm::cancelCurrentProposal', error, { proposalUid });

      const errorMessage = getAxiosErrorMessage(
        error,
        'Unable to cancel the proposal. Please reload the page.'
      );
      const footer = getAxiosErrorFooter(error);

      await swal.fire({
        icon: 'error',
        title: 'Please reload the page',
        text: errorMessage,
        footer,
        timer: 2000
      });
    }

    if (isMounted.current) {
      setTitle('');
      setDescription('');
      setUrl('');
      setPayment(null);
      setProposalUid('');
      setPrepareCommand('');
      setSubmitCommand('');
    }

    //cancelar el proposal y empezar de cero
  }

  /**
   * Function to continue with the saved proposal and proceed to submit or prepare the creation
   * @function
   */
  const continueProposal = () => {
    // If submit command exists, user was on Step 6 (Submit)
    // If only prepare command exists, user was on Step 5 (Prepare) or earlier
    setCurrentStep(submitCommand !== "" ? 5 : 4);
    setOpenModal(false);
  }

  /**
   * Function to confirm the delete of the saved proposal
   * @function
   */
  const cancelProposalBtn = async () => {
    const swalConfirm = await swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You will delete the info of the proposal and create a new one",
      showCancelButton: true,
      confirmButtonText: 'Delete'
    })
    if (swalConfirm.isConfirmed) {
      cancelCurrentProposal();
    }
  }

  /**
   * function to set back the step of the proposal form
   * @function 
   */
  const back = () => {
    setCurrentStep(currentStep - 1);
  };

  /**
   * function to set next step of the proposal form
   * @function 
   */
  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  /**
   * function that sets in the state the title from the input
   * @function
   * @param {{proposalTitle: string}} proposalTitle the proposal title from the title input form
   */
  const getTitle = ({proposalTitle}) => {
    setTitle(proposalTitle);
    next();
  }

  /**
   * function that sets in the state the description and url from the input
   * @function
   * @param {{proposalDescription: string, proposalUrl: string}} proposalDescription the proposal description and url from the description input form
   */
  const getDescription = ({proposalDescription, proposalUrl}) => {
    setDescription(proposalDescription);
    setUrl(proposalUrl);
    next();
  }
  /**
   * function that sets in the state the payment information from the input
   * @function
   * @param {Object} proposalPayment the proposal payment from the description input form
   */
  const getPayment = (proposalPayment) => {
    setPayment(proposalPayment);
    next();
  }

  /**
   * Function that checks the proposal and fetch the prepare command from the API
   * @function
   */
  const checkProposalAndPrepare = async () => {
    setPreparing(true);

    const name = title.trim().toLowerCase().replace(/[^A-Za-z0-9]/g, '');
    const proposal = {
      type: 1,
      title,
      name,
      description,
      url,
      firstEpoch: payment.proposalStartEpoch,
      startEpoch: payment.proposalStartEpoch,
      endEpoch: payment.proposalEndEpoch,
      nPayment: payment.paymentNumber,
      paymentAddress: payment.paymentAddress,
      paymentAmount: payment.paymentAmount
    }

    try {
      await checkProposal(proposal);

      const prepareResponse = await prepareProposal(proposal);
      const preparedUid = prepareResponse?.data?.uid;
      const prepareCommand = prepareResponse?.data?.command;

      if (!preparedUid || !prepareCommand) {
        throw new Error('Prepare command was not returned by the API.');
      }

      setProposalUid(preparedUid);
      setPrepareCommand(prepareCommand);
      next();
    } catch (error) {
      logAxiosError('ProposalForm::checkProposalAndPrepare', error, { proposal });

      const errorMessage = getAxiosErrorMessage(error, 'There was an error');
      const footer = getAxiosErrorFooter(error);

      await swal.fire({
        icon: 'error',
        title: 'There was an error',
        text: errorMessage,
        footer
      });
    } finally {
      setPreparing(false);
    }

  }


  return (
    <>
      <div className="d-flex flex-column align-items-center gap-5 py-5 px-3">
        {/* Page Header */}
        <div className={`${styles.pageHeader} text-center`}>
          <h3 className={`${styles.pageTitle} fw-semibold`}>Create a proposal</h3>
          <p className={`${styles.pageSubtitle} text-white-50`}>All requested information is required for proposal submission</p>
        </div>

        {/* Step Indicators Container */}
        <div className={styles.stepContainer}>
          {/* Step 1: Title */}
          <div className={styles.stepItem}>
            <div className={styles.stepHeader}>
              <div className={`${styles.stepCircle} ${currentStep === 0 ? styles.active : currentStep > 0 ? styles.completed : styles.inactive}`}>
                {currentStep > 0 ? <RiCheckLine /> : '1'}
              </div>
              <h4 className={`${styles.stepTitle} ${currentStep !== 0 ? styles.inactive : ''}`}>Proposal Title</h4>
            </div>
            {currentStep === 0 && (
              <div className={styles.stepForm}>
                <div className={styles.stepFormBorder}></div>
                <div className={styles.stepFormContent}>
                  <TitleProposal onNext={getTitle}/>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Description */}
          <div className={styles.stepItem}>
            <div className={styles.stepHeader}>
              <div className={`${styles.stepCircle} ${currentStep === 1 ? styles.active : currentStep > 1 ? styles.completed : styles.inactive}`}>
                {currentStep > 1 ? <RiCheckLine /> : '2'}
              </div>
              <h4 className={`${styles.stepTitle} ${currentStep !== 1 ? styles.inactive : ''}`}>Description</h4>
            </div>
            {currentStep === 1 && (
              <div className={styles.stepForm}>
                <div className={styles.stepFormBorder}></div>
                <div className={styles.stepFormContent}>
                  <DescriptionProposal onNext={getDescription} onBack={back}/>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Payment details */}
          <div className={styles.stepItem}>
            <div className={styles.stepHeader}>
              <div className={`${styles.stepCircle} ${currentStep === 2 ? styles.active : currentStep > 2 ? styles.completed : styles.inactive}`}>
                {currentStep > 2 ? <RiCheckLine /> : '3'}
              </div>
              <h4 className={`${styles.stepTitle} ${currentStep !== 2 ? styles.inactive : ''}`}>Payment details</h4>
            </div>
            {currentStep === 2 && (
              <div className={styles.stepForm}>
                <div className={styles.stepFormBorder}></div>
                <div className={styles.stepFormContent}>
                  <PaymentProposal onNext={getPayment} onBack={back}/>
                </div>
              </div>
            )}
          </div>

          {/* Step 4: Preview proposal */}
          <div className={styles.stepItem}>
            <div className={styles.stepHeader}>
              <div className={`${styles.stepCircle} ${currentStep === 3 ? styles.active : currentStep > 3 ? styles.completed : styles.inactive}`}>
                {currentStep > 3 ? <RiCheckLine /> : '4'}
              </div>
              <h4 className={`${styles.stepTitle} ${currentStep !== 3 ? styles.inactive : ''}`}>Preview proposal</h4>
            </div>
            {currentStep === 3 && (
              <div className={styles.stepForm}>
                <div className={styles.stepFormBorder}></div>
                <div className={styles.stepFormContent}>
                  <ProposalPreview
                    title={title}
                    description={description}
                    url={url}
                    payment={payment}
                    onNext={checkProposalAndPrepare}
                    onBack={back}
                    preparing={preparing}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Step 5: Prepare Proposal */}
          <div className={styles.stepItem}>
            <div className={styles.stepHeader}>
              <div className={`${styles.stepCircle} ${currentStep === 4 ? styles.active : currentStep > 4 ? styles.completed : styles.inactive}`}>
                {currentStep > 4 ? <RiCheckLine /> : '5'}
              </div>
              <h4 className={`${styles.stepTitle} ${currentStep !== 4 ? styles.inactive : ''}`}>Prepare Proposal</h4>
            </div>
            {currentStep === 4 && (
              <div className={styles.stepForm}>
                <div className={styles.stepFormBorder}></div>
                <div className={styles.stepFormContent}>
                  <PrepareProposal
                    prepareCommand={prepareCommand}
                    proposalUid={proposalUid}
                    onNext={next}
                    onCancel={cancelProposalBtn}
                    enterPaymentTxId={enterPaymentTxId}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Step 6: Submit Proposal */}
          <div className={styles.stepItem}>
            <div className={styles.stepHeader}>
              <div className={`${styles.stepCircle} ${currentStep === 5 ? styles.active : currentStep > 5 ? styles.completed : styles.inactive}`}>
                {currentStep > 5 ? <RiCheckLine /> : '6'}
              </div>
              <h4 className={`${styles.stepTitle} ${currentStep !== 5 ? styles.inactive : ''}`}>Submit Proposal</h4>
            </div>
            {currentStep === 5 && (
              <div className={styles.stepForm}>
                <div className={styles.stepFormBorder}></div>
                <div className={styles.stepFormContent}>
                  <SubmitProposal
                    submitCommand={submitCommand}
                    proposalUid={proposalUid}
                    onCancel={cancelProposalBtn}
                    enterProposalHash={enterProposalHash}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <CustomModal
        open={openModal}
        onClose={cancelCurrentProposal}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '0.75rem',
            color: '#ffffff'
          }}>
            You were creating a proposal
          </h3>
          <p style={{
            fontSize: '1rem',
            lineHeight: '1.5',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '1.5rem'
          }}>
            Save and continue with the previous proposal info, or cancel it to create a new one
          </p>
        </div>

        <div style={{
          marginBottom: '1.5rem',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px'
        }}>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong style={{ fontSize: '1.125rem', color: '#ffffff' }}>{title}</strong>
          </div>
          {description && (
            <div style={{
              marginBottom: '0.75rem',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.875rem'
            }}>
              {description.substring(0, 100)}{description.length > 100 ? '...' : ''}
            </div>
          )}
          {payment && (
            <>
              <div style={{
                display: 'inline-block',
                backgroundColor: 'rgba(251, 176, 59, 0.2)',
                color: '#FBB03B',
                padding: '0.5rem',
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                {payment.paymentAmount * payment.paymentNumber} SYS in {payment.paymentNumber} payment(s)
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.7)',
                wordBreak: 'break-all'
              }}>
                Address: {payment.paymentAddress}
              </div>
            </>
          )}
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'flex-start'
        }}>
          <button
            className="btn btn-white-outline"
            style={{
              flex: '1',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '500'
            }}
            onClick={cancelCurrentProposal}
          >
            Cancel
          </button>
          <button
            className="btn"
            style={{
              flex: '1',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              backgroundColor: '#FBB03B',
              color: '#0a0a0a',
              border: 'none',
              borderRadius: '1000px'
            }}
            onClick={continueProposal}
          >
            Continue
          </button>
        </div>

      </CustomModal>
    </>
  );
}

export default ProposalForm;