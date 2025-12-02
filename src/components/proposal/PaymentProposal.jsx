import React, {useEffect, useState, useMemo} from 'react';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers';
import * as yup from "yup";
import axios from 'axios';


import {nextGovernanceRewardInfo} from "../../utils/request";

const schema = yup.object().shape({
  paymentNumber: yup.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('The number of payments is required')
    .integer('Must be an integer number')
    .typeError('Must be a number')
    .positive('Must be a positive number'),
  paymentAmount: yup.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('The amount is required')
    .typeError('Must be a number')
    .positive('Must be a positive number'),
  paymentAddress: yup.string()
    .required('The payment address is required')
    // .test(
    //   'test-sys-address',
    //   'Must be a valid Syscoin address',
    //   async (value) => await WAValidator.validate(value, 'sys')
    // )
});

/**
 * Component to show the Proposal payment form
 * @component
 * @subcategory Proposal
 * @param {*} onNext function that gets executed after the form is submitted
 * @param {*} onBack function that gets executed to go back
 * @example
 * const onNext = () => {}
 * const onBack = () => {}
 * return (
 *  <PaymentProposal onNext={onNext} onBack={onBack} />
 * )
 */
const PaymentProposal = ({onNext, onBack}) => {
  const [paymentQuantity, setPaymentQuantity] = useState(1);
  const [nextGovernanceDate, setNextGovernanceDate] = useState();
  const [proposalStartEpoch, setProposalStartEpoch] = useState();
  const [proposalEndEpoch, setProposalEndEpoch] = useState();
  const [proposalPayoutDates, setProposalPayoutDates] = useState([]);
  const [amount, setAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [theDatesWereLoaded, setTheDatesWereLoaded] = useState(false);

  const cancelSource = useMemo(() => axios.CancelToken.source(), []);

  const {register, handleSubmit, errors} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      paymentNumber: paymentQuantity,
      paymentAmount: amount
    }
  });

  /**
   * Formats the date to have the correct format in usa, eu or default
   * @function
   * @param {*} dateInMills date
   * @param {string} format type of format receives
   * @returns {string}
   */
  const yearDayMonth = (dateInMills, format) => {
    const date = new Date(dateInMills);
    const firstDay = `0${date.getDate()}`.slice(-2);
    const firstMonth = `0${parseInt(date.getMonth(), 10) + 1}`.slice(-2);
    const firstYear = date.getFullYear();
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    
    // Get timezone abbreviation
    const timezoneAbbr = new Intl.DateTimeFormat('en', { timeZoneName: 'short' }).formatToParts(date)
      .find(part => part.type === 'timeZoneName')?.value || '';

    switch (format) {
      case 'usa':
        return `${firstMonth}/${firstDay}/${firstYear} ${hours}:${minutes} ${timezoneAbbr}`;
      case 'eu':
        return `${firstDay}/${firstMonth}/${firstYear} ${hours}:${minutes} ${timezoneAbbr}`;
      default:
        return `${firstYear}-${firstMonth}-${firstDay} ${hours}:${minutes} ${timezoneAbbr}`;
    }
  };

  /**
   * Calculates the last payment
   * @function
   * @param {*} nPayments number of payments
   * @param {*} nextGovernanceDate the next governance date of syscoin
   * @returns {Object}
   */
  const lastPaymentCalculator = (nPayments, nextGovernanceDate) => {
    const {
      rewardDateEpoch,
      superblockCycleEpoch,
      votingDeadLineEpoch
    } = nextGovernanceDate;

    const todayEpoch = Math.round(new Date().getTime() / 1000);
    const afterVotingDeadLine = todayEpoch >= votingDeadLineEpoch ? true : false;

    const firstRewardDateEpoch = rewardDateEpoch + (afterVotingDeadLine ? superblockCycleEpoch : 0);
    const proposalPayoutDates = [];
    for (let i = 0; i < nPayments; i++) {
      proposalPayoutDates.push(firstRewardDateEpoch + superblockCycleEpoch * i);
    }
    const gapEnsurePayment = superblockCycleEpoch / 2;
    
    const paymentInfo = {
      proposalPayoutDates,
      endEpoch: proposalPayoutDates[nPayments - 1] + gapEnsurePayment
    };
    return paymentInfo;
  };

  /**
   * Function that fetch the governance reward info from the API
   * @function
   * @returns {Object}
   */
  const getGovernanceDate = async () => {
    const nextGovernanceDate = await nextGovernanceRewardInfo(cancelSource.token)
    if (typeof nextGovernanceDate === "undefined") {
      return null
    } else {
      Object.assign(nextGovernanceDate);
      return nextGovernanceDate;
    }
  }

  /**
   * Gets the payment quantity and their values and sets them in the state
   * @function
   */
  const paymentQuantityValue = (nPayments, paymentAmount) => {
    const numPayments = parseInt(nPayments) || 0;
    const amountPay = parseInt(paymentAmount) || 0;

    if (typeof nextGovernanceDate !== "undefined") {
      const {endEpoch, proposalPayoutDates} = lastPaymentCalculator(
        numPayments,
        nextGovernanceDate
      );

      setProposalEndEpoch(endEpoch);
      setProposalPayoutDates(proposalPayoutDates);
      setAmount(amountPay);
      setTotalAmount(amountPay * numPayments)
      setPaymentQuantity(numPayments)
    } else {
      setProposalEndEpoch(0)
      setProposalPayoutDates([]);
      setAmount(amountPay);
      setTotalAmount(amountPay * numPayments)
      setPaymentQuantity(numPayments)
    }
  }

  /**
   * Function that passes the onNext function with the data of payments
   * @function
   * @param {*} data payment data from the payment inputs 
   */
  const nextPayment = (data) => {
    onNext({proposalStartEpoch, proposalEndEpoch, ...data});
  }

  /**
   * useEffect to calculate the paymentDates
   * @function
   */
  useEffect(() => {
    /**
     * Function that calculate the paymentDates and gets the governanceDates from the API
     * @function
     */
    const calculatePaymentDates = async () => {
      const nextGovernanceDate = await getGovernanceDate();
      if (nextGovernanceDate !== null) {
        const {endEpoch, proposalPayoutDates} = lastPaymentCalculator(
          paymentQuantity,
          nextGovernanceDate
        );
        const proposalStartEpoch = proposalPayoutDates[0];
        setProposalStartEpoch(proposalStartEpoch);
        setNextGovernanceDate(nextGovernanceDate);
        setProposalEndEpoch(endEpoch);
        setProposalPayoutDates(proposalPayoutDates);
        setTheDatesWereLoaded(true)
      } else {
        setTheDatesWereLoaded(false)
      }
    }
    calculatePaymentDates();
    return () => {
      cancelSource.cancel('The request has been canceled')
    };
    // eslint-disable-next-line
  }, [cancelSource])

  return (
    <form className="input-form w-100" onSubmit={handleSubmit(nextPayment)}>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem', width: '100%'}}>
        <div className="form-group" style={{margin: 0}}>
          <label htmlFor="paymentNumber">Number of payments</label>
          <input
            type="number"
            id="paymentNumber"
            ref={register}
            name="paymentNumber"
            className="form-control input-glass w-100"
            onChange={(e) => paymentQuantityValue(e.target.value, document.getElementById('paymentAmount').value)}
          />
          <ErrorMessage
            errors={errors}
            name="paymentNumber"
            render={({message}) => <small><p style={{lineHeight: '1.5'}}>{message}</p></small>}
          />
        </div>
        <div className="form-group" style={{margin: 0}}>
          <label htmlFor="paymentAmount">Amount per payment</label>
          <div style={{position: 'relative', display: 'block'}}>
            <input
              type="number"
              id="paymentAmount"
              ref={register}
              name="paymentAmount"
              className="form-control input-glass w-100"
              onChange={(e) => paymentQuantityValue(document.getElementById('paymentNumber').value, e.target.value)}
              style={{paddingRight: '2.5rem'}}
            />
            <span style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#fff',
              fontSize: '1rem',
              pointerEvents: 'none',
              fontWeight: '500'
            }}>SYS</span>
          </div>
          <ErrorMessage
            errors={errors}
            name="paymentAmount"
            render={({message}) => <small><p style={{lineHeight: '1.5'}}>{message}</p></small>}
          />
        </div>
      </div>
      <div className="form-group w-100" style={{marginBottom: '1.5rem'}}>
        <label htmlFor="paymentAddress">Payment address</label>
        <input
          type="text"
          id="paymentAddress"
          name="paymentAddress"
          className="form-control input-glass w-100"
          ref={register}
        />
        <ErrorMessage
          errors={errors}
          name="paymentAddress"
          render={({message}) => <small><p style={{lineHeight: '1.5'}}>{message}</p></small>}
        />
      </div>
      <div style={{marginTop: '1.5rem', marginBottom: '1.5rem', textAlign: 'left', width: '100%', position: 'relative', zIndex: 1, clear: 'both'}}>
        <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#ffffff', textAlign: 'left'}}>Payment info:</h3>
        <div style={{textAlign: 'left'}}>
          <p style={{marginBottom: '0.75rem', color: '#ffffff'}}>
            {`This proposal will result in – ${paymentQuantity} payments of – ${amount} SYS.`}
          </p>
          <div style={{textAlign: 'left'}}>
            <p style={{fontSize: '1rem', marginBottom: '0.5rem', color: '#ffffff'}}>Payout dates approximately (in your local timezone):</p>
            <div
              className="payment-dates"
              style={{
                maxHeight: '12.5rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left'
              }}
            >
              {theDatesWereLoaded === true ?
                proposalPayoutDates.map((epoch, index) => {
                  return (
                    <div key={index} style={{width: '100%', marginBottom: '0.5rem', color: '#ffffff'}}>
                      {yearDayMonth(epoch * 1000, 'usa')}
                    </div>
                  );
                })
                : <>
                  <p style={{color: '#ffffff'}}>There has been a problem loading the payment dates, please check your internet connection and reload the page!</p>
                </>
              }
            </div>
          </div>
          <p style={{marginTop: '0.75rem', marginBottom: '0', fontSize: '1rem', fontWeight: '500', color: '#ffffff'}}>
            {`Total amount: –${totalAmount || amount}SYS.`}
          </p>
        </div>
      </div>
      <div className="form-actions-spaced d-flex gap-2 justify-content-start">
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
        <button className="btn btn-white btn-next" type="submit" disabled={!theDatesWereLoaded}>
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

export default PaymentProposal;
