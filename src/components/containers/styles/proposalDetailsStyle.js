import palette from './palette';

const greyDark = palette.greyDark;
const grey = grey;
const white = palette.white;

export default {
  root: {
    background: 'white',
    paddingTop: '10px',
    overflowY: 'auto',
    height: '80vh',
    boxShadow: '0px 3px 3px 3px ' + grey,
  },
  proposalDetails: {
    margin: 0,
    marginLeft: 15,
    paddingTop: 70,
    paddingLeft: '0.4%',
    maxWidth: '98%',
  },
};
