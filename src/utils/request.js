import axios from 'axios';

// const API_URI = 'http://localhost:3000'
const API_URI = 'http://198.211.117.144:3000'

/** MasterNodes **/
export const list = async () => {
  try {
    return await axios.get(`${API_URI}/masternode/list`).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

export const getInfo = async () => {
  try {
    return await axios.get(`${API_URI}/masternode/getinfo`).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

export const getMiningInfo = async () => {
  try {
    return await axios.get(`${API_URI}/masternode/getmininginfo`).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

export const getGovernanceInfo = async () => {
  try {
    return await axios.get(`${API_URI}/masternode/getgovernanceinfo`).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

export const getSuperBlockBudget = async (params) => {
  try {
    return await axios.get(`${API_URI}/masternode/getsuperblockbudget`).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

export const getOneMasterNode = async (id) => {
  try {
    return await axios.get(`${API_URI}/masternode/${id}`, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

export const createMasterNode = async (data) => {
  try {
    return await axios.post(`${API_URI}/masternode`, data, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

export const updateMasterNode = async (id, data) => {
  try {
    return await axios.put(`${API_URI}/masternode/${id}`, data, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

export const destroyMasterNode = async (id) => {
  try {
    return await axios.delete(`${API_URI}/masternode/${id}`, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

/** Proposal **/
export const checkProposal = async (data) => {
  try {
    return await axios.post(`${API_URI}/proposal/check`, data, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

export const prepareProposal = async (data) => {
  try {
    return await axios.post(`${API_URI}/proposal/prepare`, data, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

export const submitProposal = async (data) => {
  try {
    return await axios.post(`${API_URI}/proposal/submit`, data, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

export const voteProposal = async (data) => {
  try {
    return await axios.post(`${API_URI}/proposal/vote`, data, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};


export const getOneProposal = async (id) => {
  try {
    return await axios.get(`${API_URI}/proposal/${id}`, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

export const createProposal = async (data) => {
  try {
    return await axios.post(`${API_URI}/proposal`, data, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

export const updateProposal = async (id, data) => {
  try {
    return await axios.put(`${API_URI}/proposal/${id}`, data, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

export const destroyProposal = async (id) => {
  try {
    return await axios.delete(`${API_URI}/proposal/${id}`, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

/** Auth **/
export const login = async (data) => {
  try {
    return await axios.post(`${API_URI}/auth/login`, data).catch(err => {
      throw err
    })
  } catch (err) {
    if (err.response) {
      return {statusCode: err.response.status, message: err.response.data}
    } else {
      throw err
    }
  }
}

export const register = async (data) => {
  try {
    return await axios.post(`${API_URI}/auth/register`, data).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}
/** User **/

export const getUserInfo = async (id) => {
  try {
    return await axios.get(`${API_URI}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

export const updateUser = async (id, data) => {
  try {
    return await axios.put(`${API_URI}/user/${id}`, data, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    return new Error(err)
  }
}
