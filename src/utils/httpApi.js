import axios from "axios";
import router from "../router";
import store from "../store";

const Unauthorized = 401;
const onUnauthorized = () => {
  router.push(`/login`);
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
  }
};

export const boards = {
  get() {
    return request
      .get(
        "/members/me/boards",
        "&filter=open&fields=name,id,url,dateLastActivity,desc"
      )
      .then(({ data }) => data);
  }
};

export const board = {
  getLists(id) {
    //console.log("board: " + id);
    return request
      .get(`/boards/${id}/Lists`, "&cards=open&card_fields=id,name,desc,labels")
      .then(({ data }) => data);
  }
};

export const list = {
  create(data) {
    return request.post(`/lists`, data);
  }
};

export const card = {
  fetch(id) {
    return request.get(`/cards/${id}`).then(({ data }) => data);
  },
  create({ title, listId, pos }) {
    return request
      .post(`/cards`, { title, listId, pos })
      .then(({ data }) => data);
  },
  update(id, data) {
    return request.put(`/cards/${id}`, data).then(({ data }) => data);
  },
  destroy(id) {
    return request.delete(`/cards/${id}`);
  }
};
