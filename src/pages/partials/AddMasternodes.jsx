import React from 'react';
import { Link } from 'react-router-dom';
import { createMasterNode } from '../../utils/request';

import AddMNForm from './AddMNForm';
import Title from './Title';

export default function AddMasternodes() {

  const singleCreation = (data) => {

  }

  const multipleCreation = (data) => {

  }

  return (
    <div className="shell-large">
      <div className="section__body">
        <div className="articles">
          <section className="article">
            <div className="cols">
              <div className="col col--size-12">
                <div className="article__content article__content--pull-left text-center">
                  <Title heading="Add masternodes" />
                  <AddMNForm onSingleCreation={singleCreation} onMultipleCreation={multipleCreation} />
                  <Link to="/profile" className="btn btn--blue-border">Profile</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}