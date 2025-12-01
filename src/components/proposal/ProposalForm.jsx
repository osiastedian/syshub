import React, {useState, useEffect, useMemo, useRef} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import swal from "sweetalert2";
import {Collapse} from 'react-collapse';
import {useHistory} from "react-router";
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers';
import * as yup from "yup";
import {RiCheckLine} from 'react-icons/ri';

import {checkProposal, prepareProposal, notCompletedProposal, destroyProposal} from "../../utils/request";
import {getAxiosErrorFooter, getAxiosErrorMessage, logAxiosError} from "../../utils/errorHandler";

import CustomModal from '../global/CustomModal';
import TitleProposal from './TitleProposal';
import DescriptionProposal from './DescriptionProposal';
import PaymentProposal from './PaymentProposal';
import ProposalPreview from "./ProposalPreview";
import axios from 'axios';
import useProposalSubmission from './hooks/useProposalSubmission';
import styles from './ProposalForm.module.scss';


const schema = yup.object().shape({
  paymentTxId: yup.string()
    .test('len', 'Must be exactly 64 characters', val => val.length === 64)
    .required('Payment txid is required')
});
const schema2 = yup.object().shape({
  proposalHash: yup.string()
    .test('len', 'Must be exactly 64 characters', val => val.length === 64)
    .required('proposal hash is required')
});

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
  const [collapse, setCollapse] = useState(true);
  const [useCollapse, setUseCollapse] = useState(false);

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
    setUseCollapse,
    setCollapse,
  });

  const {register, handleSubmit, errors} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });
  const {register: register2, handleSubmit: handleSubmit2, errors: errors2} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema2)
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
    setCurrentStep(4);
    if (submitCommand !== "") {
      setUseCollapse(true);
      setCollapse(false);
    }
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
      setUseCollapse(false);
      setCollapse(true);
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
   * function that triggers sweet alert to show the copy is successful
   * @function
   */
  const copyButton = () => {
    swal.fire({
      icon: "success",
      title: "Copied",
      timer: 2000,
      showConfirmButton: false,
    });
  }

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

          {/* Step 5: Create proposal */}
          <div className={styles.stepItem}>
            <div className={styles.stepHeader}>
              <div className={`${styles.stepCircle} ${currentStep === 4 ? styles.active : currentStep > 4 ? styles.completed : styles.inactive}`}>
                {currentStep > 4 ? <RiCheckLine /> : '5'}
              </div>
              <h4 className={`${styles.stepTitle} ${currentStep !== 4 ? styles.inactive : ''}`}>Create proposal</h4>
            </div>
            {currentStep === 4 && (
              <div className={styles.stepForm}>
                <div className={styles.stepFormBorder}></div>
                <div className={styles.stepFormContent}>
                  <Collapse
                    isOpened={collapse}
                    initialStyle={{height: 0, overflow: 'hidden'}}
                  >
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
                        <CopyToClipboard
                          text={prepareCommand}
                          onCopy={copyButton}
                        >
                          <button className="copy-icon" type="button" title="Copy command">📋</button>
                        </CopyToClipboard>
                      </div>
                      <small>
                        <p style={{lineHeight: "1.5"}}>
                          Prepare command is ready to be copied. Please copy and paste it into Syscoin Q.T console for payment txid.
                        </p>
                      </small>
                    </div>

                    <div className="form-actions-spaced">
                      <CopyToClipboard
                        text={prepareCommand}
                        onCopy={copyButton}
                      >
                        <button className="btn btn--blue" type="button">Copy Command</button>
                      </CopyToClipboard>
                    </div>

                    <form className="input-form" onSubmit={handleSubmit(enterPaymentTxId)}>
                      <div className="form-group">
                        <label htmlFor="paymentTxId">Payment txid</label>
                        <input type="text" id="paymentTxId" ref={register} name="paymentTxId" className="styled" maxLength="64"/>
                        <ErrorMessage
                          errors={errors}
                          name="paymentTxId"
                          render={({message}) => <small><p style={{lineHeight: '1.5'}}>{message}</p></small>}
                        />
                      </div>
                      <div className="form-actions-spaced">
                        <button className="btn btn-outline-primary" type="button" onClick={cancelProposalBtn}>Cancel</button>
                        <button className="btn btn--blue" type="submit">Next</button>
                      </div>
                    </form>

                  </Collapse>


                  <Collapse
                    isOpened={useCollapse}
                    initialStyle={{height: 0, overflow: 'hidden'}}
                  >
                    <div className="form-group article">
                      {/* Disclaimer about waiting before go_submit */}
                      <div className="alert alert-warning mb-3 py-2 px-3" role="alert">
                        <strong>Important:</strong> Please wait at least <b>5 minutes</b> or <b>1 block confirmation</b> after sending the payment transaction before running <code>go_submit</code>. Submitting too early may cause your proposal to fail.
                      </div>
                      <div className="cli-command-container">
                        <textarea
                          className="styled"
                          name="submitCommand"
                          id="submitCommand"
                          rows="5"
                          disabled
                          value={submitCommand}
                        ></textarea>
                        <CopyToClipboard
                          text={submitCommand}
                          onCopy={copyButton}
                        >
                          <button className="copy-icon" type="button" title="Copy command">📋</button>
                        </CopyToClipboard>
                      </div>
                      <small>
                        <p style={{lineHeight: "1.5"}}>
                          Submit command is ready to be copied. Please copy and paste it into Syscoin Q.T console to submit your proposal. This could take a couple minutes.
                        </p>
                      </small>
                    </div>

                    <div className="form-actions-spaced">
                      <CopyToClipboard
                        text={submitCommand}
                        onCopy={copyButton}
                      >
                        <button className="btn btn--blue" type="button">Copy Command</button>
                      </CopyToClipboard>
                    </div>

                    <form className="input-form" onSubmit={handleSubmit2(enterProposalHash)}>
                      <div className="form-group">
                        <label htmlFor="proposalHash">Proposal hash</label>
                        <input type="text" id="proposalHash" ref={register2} name="proposalHash" className="styled" maxLength="64"/>
                        <ErrorMessage
                          errors={errors2}
                          name="proposalHash"
                          render={({message}) => <small><p style={{lineHeight: '1.5'}}>{message}</p></small>}
                        />
                      </div>
                      <div className="form-actions-spaced">
                        <button className="btn btn-outline-primary" type="button" onClick={cancelProposalBtn}>Cancel</button>
                        <button className="btn btn--blue" type="submit">Submit</button>
                      </div>
                    </form>
                  </Collapse>
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
        <h3>You were creating a proposal</h3>
        <small>
          <p style={{lineHeight: "1.5"}}>
            Save and continue with the previous proposal info, or cancel it to create a new one
          </p>
        </small>
        <ProposalPreview title={title} description={description} url={url} payment={payment}/>

        <button
          className="btn btn-outline-primary"
          style={{marginBottom: '10px', marginLeft: '10px'}}
          onClick={cancelCurrentProposal}
        >Cancel
        </button>
        <button
          className="btn btn--blue"
          style={{marginBottom: '10px', marginLeft: '10px'}}
          onClick={continueProposal}
        >Continue
        </button>

      </CustomModal>
    </>
  );
}

export default ProposalForm;