import axios from "axios";
import router from "../router";
import store from "../store";

const Unauthorized = 401;
const onUnauthorized = () => {
  store.dispatch("LOGOUT");
  router.push(`/login`);
  return "";
};

const request = {
  get(endpoint, query) {
    var apiUrl =
      store.state.trelloApiUrl +
      endpoint +
      "/?key=" +
      store.state.trelloKey +
      "&token=" +
      store.state.trelloUserToken;
    if (query) {
      apiUrl = apiUrl + query;
    }
    return axios.get(apiUrl).catch(({ response }) => {
      const { status } = response;
      if (status === Unauthorized) return onUnauthorized();
      throw Error(response);
    });
  },
  post(path, data) {
    const apiUrl = store.state.trelloApiUrl;
    return axios.post(`${apiUrl + path}`, data);
  },
  put(path, data) {
    const apiUrl = store.state.trelloApiUrl;
    return axios.put(`${apiUrl + path}`, data);
  },
};

export const boards = {
  get() {
    return request
      .get(
        "/members/me/boards",
        "&filter=open&fields=name,id,url,dateLastActivity,desc"
      )
      .then(({ data }) => data);
  },
};

export const board = {
  getLists(id) {
    return request
      .get(
        `/boards/${id}/Lists`,
        "&cards=open&card_fields=id,name,desc,labels,dateLastActivity,due"
      )
      .then(({ data }) => data);
  },
};

export const list = {
  create(data) {
    return request.post(`/lists`, data);
  },
};
