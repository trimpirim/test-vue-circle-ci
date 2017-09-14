import Vue from 'vue'
import * as properties from '../../properties';

const state = {
    scheduleId: ""
};

const getters = {
   
};

const mutations = {
   
};

const actions = {
    setAvailableTime: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .post(properties.availableUrl, payload)
          .then(response => {
            if (response.status == 200) {
              resolve(response.data);
            } else {
              reject(response.data);
            }
          }).catch((errors) => {
            reject(errors);
          });
      });
    },
    getAvailableTime:({commit},payload) => {
      return new Promise((resolve, reject) => {
        var query = "";
        if(payload.hasOwnProperty("current_month")) {
          query = "month=" + payload.current_month;
        }else if(payload.hasOwnProerpty("start_time") || payload.hasOwnProerpty("end_time")){
          query = query + "start=" + payload.start_time + "&end=" + payload.end_time;
        }
        if(payload.hasOwnProperty("tutor_id")) {
          query = query + "&tutor_id=" + payload.tutor_id;
        }
        Vue.axios
          .get(properties.availableUrl + "?" + query)
          .then(response => {
            if (response.status == 200) {
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
          });
      });
    },
    updateAvailableTime:({commit},payload) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .put(properties.availableUrl + '/' + payload.id , payload.eventData)
          .then(response => {
            if (response.status == 200) {
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
          });
      });
    },
    deleteAvailableTime:({commit},id) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .delete(properties.availableUrl + "/" + id)
          .then(response => {
            if (response.status == 200) {
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
          });
      });
    },
    setAppointment:({commit}, payload) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .post(properties.appointmentUrl, payload)
          .then(response => {
            if (response.status == 200) {
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
          });
      });
    },
    getAppointment:({commit}) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .get(properties.appointmentUrl)
          .then(response => {
            if (response.status == 200) {
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
          });
      });
    },
    getAppointmentById:({commit,payload}) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .get(properties.appointmentUrl + "/" + payload.id)
          .then(response => {
            if (response.status == 200) {
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
          });
      });
    },
    rescheduleAppointment:({commit,payload}) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .put(properties.appointmentUrl + "/" + payload.id + "/reschedule",payload.appointment)
          .then(response => {
            if (response.status == 200) {
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
          });
      });
    },
    cancelAppointment:({commit,payload}) => {
        return new Promise((resolve, reject) => {
           Vue.axios
            .put(properties.appointmentUrl + "/" + payload.id + "/cancel", payload.data)
            .then(response => {
                if (response.status == 200) {
                resolve(response);
                } else {
                reject(response);
                }
            }).catch((errors) => {
                reject(errors);
            });
      });
    },
    getTrialTime:({commit},payload) => {
      return new Promise((resolve, reject) => {
        var query = "";
        if(payload.hasOwnProperty("current_month")) {
          query = "month=" + payload.current_month;
        }else if(payload.hasOwnProerpty("start_time") || payload.hasOwnProerpty("end_time")){
          query = query + "start=" + payload.start_time + "&end=" + payload.end_time;
        }
        if(payload.hasOwnProperty("tutor_id")) {
          query = query + "&tutor_id=" + payload.tutor_id;
        }
        Vue.axios
          .get(properties.trialUrl + "?" + query)
          .then(response => {
            if (response.status == 200) {
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
          });
      });
    },
    setTrialTime: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .post(properties.trialUrl, payload)
          .then(response => {
            if (response.status == 200) {
              resolve(response.data);
            } else {
              reject(response.data);
            }
          }).catch((errors) => {
            reject(errors);
          });
      });
    },
    updateTrialTime:({commit},payload) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .put(properties.trialUrl + '/' + payload.id , payload.trialData)
          .then(response => {
            if (response.status == 200) {
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
          });
      });
    },
    deleteTrialTime:({commit},id) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .delete(properties.trialUrl + "/" + id)
          .then(response => {
            if (response.status == 200) {
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
          });
      });
    },
    getTrialTimeForStudent:({commit},payload) => {
      return new Promise((resolve, reject) => {
        var parameter = "";
        if(payload.hasOwnProperty("start") && payload.hasOwnProperty("end")) {
          parameter = "?start=" + payload["start"] + "&end=" + payload["end"];
        }
        Vue.axios
          .get(properties.trialStudentUrl + parameter)
          .then(response => {
            if (response.status == 200) {
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
                    console.log(errors);

            reject(errors);
          });
      });
    },
    bookTrialTime:({commit},payload) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .post(properties.bookTrialUrl , payload)
          .then(response => {
            if (response.status == 200) {
              resolve(response);
            } else {
              reject(response);
            }
          }).catch((errors) => {
            reject(errors);
          });
      });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};