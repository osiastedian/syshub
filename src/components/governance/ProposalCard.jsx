import React, {useEffect, useState} from "react";
import { Collapse } from 'react-collapse';

import { useUser } from '../../context/user-context';
import ProposalCardInfo from "./ProposalCardInfo";

export default function ProposalCard({ proposal, enabled }) {
  const { user } = useUser();
  const [useCollapse, setUseCollapse] = useState(false);

  useEffect(() => {
    console.log(proposal);
    return () => {
      
    };
  }, []);

  const voteYes = () => {

  }

  const voteNo = () => {

  }

  const comaToNum = (str) => {
    return Number(str.replace(",", ""));
  }

  function proposalDate(creationTime) {
    var unixTimestamp = creationTime;
    var milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormat =
      dateObject.getDate() +
      "-" +
      (dateObject.getMonth() + 1) +
      "-" +
      dateObject.getFullYear();

    return humanDateFormat;
  }

  function proposalPassing(yesCount, noCount, enabled) {

    if (((yesCount - noCount) / enabled) * 100 > 10) {
      return (
        <div className="passed">
          <i className="demo-icon icon-ok"></i> Passed
        </div>
      )
    } else {
      return (
        <div className="not-passed">
          <i className="demo-icon icon-cancel-1"></i> Not passed
        </div>
      )
    }
  }


  return (
    <div className="proposal">
      <div className="vote-count">
        <span className="yes">{proposal.YesCount}</span>
        <span className="no">{proposal.NoCount}</span>
        {proposalPassing(proposal.YesCount, proposal.NoCount, comaToNum(enabled))}

      </div>
      <div className="description">
        <div className="date">{proposalDate(proposal.CreationTime)}</div>

        <span title="more info" style={{ cursor: 'pointer' }} onClick={() => setUseCollapse(!useCollapse)}>
          {proposal.name}
        </span>

        <br />
        
        <div className="budget">
          {`${parseFloat(proposal.payment_amount * proposal.nPayment)} SYS`} <br/>
          {`${parseFloat(proposal.payment_amount)} SYS/Month`} <br/>
          {`${proposal.nPayment} Payment(s)`}

          
        </div>
        <Collapse
            isOpened={useCollapse}
            initialStyle={{ height: 0, overflow: 'hidden' }}
          >
            <div className={"ReactCollapse--collapse"}>
              <ProposalCardInfo proposal={proposal} />
            </div>
          </Collapse>
      </div>
      {
        user && (
          <div className="actions">
            <button
              style={{border: "none", outline: "none"}}
              className="vote"
              title="Vote yes"
            >
              <i className="icon-up-open"></i>
            </button>
            <button
              style={{border: "none", outline: "none"}}
              className="vote"
              title="More info"
              onClick={() => setUseCollapse(!useCollapse)}
            >
              <i className="icon-info"></i>
            </button>
            <button
              style={{border: "none", outline: "none"}}
              className="vote"
              title="Vote no"
            >
              <i className="icon-down-open"></i>
            </button>
          </div>
        )
      }
    </div>
  );
}
