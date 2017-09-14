import Vue from 'vue'
import Vuex from 'vuex'
import * as properties from '../properties'
import Utils from "./../utility/otherUtilities";
import storage from './../services/Storage'
import scheduling from './modules/scheduling'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {},
    mailSentMessage: "",
    verifyEmailAddress: "",
    token: Utils.parseJsonString(storage.get('token'))
  },

  actions: {
    registerUser: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .post(properties.signupUrl, payload)
          .then(response => {
            if (response.status == 200) {
              commit('saveEmailAddress', payload);
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
            // eslint-disable-next-line
          });
      });
    },
    logInUser: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .post(properties.signinUrl, payload)
          .then(response => {
            if (response.status == 200) {
              console.log(response);  
              commit('logInSuccess', response.data);
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
            // eslint-disable-next-line
          });
      });
    },
    sendToken: ({commit}, token) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .get(properties.confirmEmailUrl + "/" + token)
          .then(response => {
            if (response.status == 200) {
              commit('logInSuccess', response.data);
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
            // eslint-disable-next-line
          });
      });
    },
    submitEmailForPassword: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .post(properties.forgotPasswordUrl, payload)
          .then(response => {
            if (response.status == 200) {
              commit('saveEmailAddress', payload);
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
            // eslint-disable-next-line
          });
      });
    },
    resetPassword: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        var formData = {};
        formData.password = payload.password;
        Vue.axios
          .post(properties.resetPasswordUrl + "/" + payload.token, formData)
          .then(response => {
            if (response.status == 200) {
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
            // eslint-disable-next-line
          });
      });
    },
    resendEmailVerification: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .post(properties.resendVerificationUrl, payload)
          .then(response => {
            if (response.status == 200) {
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
            // eslint-disable-next-line
          });
      });
    },
    registerWithFaceBook: ({commit}, data) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .post(properties.faceBookUrl, data)
          .then(response => {
            if (response.status == 200) {
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
            // eslint-disable-next-line
          });
      });
    },
    registerWithGoogle: ({commit}, data) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .post(properties.googleUrl, data)
          .then(response => {
            if (response.status == 200) {
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
            // eslint-disable-next-line
          });
      });
    },
    getTutorList: ({commit}) => {
      return new Promise((resolve, reject) => {
        Vue.axios.get(properties.tutorListUrl).then(response => {
          if (response.status == 200) {
            resolve(response);
          } else {
            reject(response);
          }
        }).catch((errors) => {
          reject(errors);
          // eslint-disable-next-line
        });
      });
    }
  },

  mutations: {
    saveEmailAddress: (state, params) => {
      state.verifyEmailAddress = params.email;
    },
    logInSuccess: (state, token) => {
      state.token = token;
      storage.setToken(JSON.stringify(token));
    },
    logOut (state) {
      storage.removeAll()
      state.token = null

    }
  },

  getters: {
  },

  modules: {
    'scheduling': scheduling
  }
})

export default store