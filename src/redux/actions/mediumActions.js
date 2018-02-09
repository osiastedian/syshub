// curl https://d3j22jloo6hpq6.cloudfront.net/API/curl?url="https://www.dashcentral.org/api/v1/public"

import constants from '../constants';

import { HTTPAsync } from '../helpers';

/**---------------------------------------------------------------------------- */
/** TO CHANGE THE URL FOR THE API GO TO "/src/redux/constants/apiURLsConst.js"  */
/**---------------------------------------------------------------------------- */

const baseApiURL = constants.URL_SYS_MN_API; // Quang HTTPS server

/**---------------------------------------------------------------------------- */

export default {
  getMediumPosts: () => {
    return dispatch => {
      return dispatch(
        HTTPAsync.get(
          `${baseApiURL}/curl?url="https://medium.com/feed/@BlockchainFoundry"`,
          null,
          constants.MEDIUM_POSTS_GET
        )
      );
    };
  }
};
