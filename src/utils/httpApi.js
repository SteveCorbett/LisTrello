import axios from "axios";
import router from "../router";
import store from "../store";

const Unauthorized = 401;
const onUnauthorized = () => {
  router.push(`/login?returnPath=${encodeURIComponent(location.pathname)}`);
};

const request = {
  get(path) {
    const apiUrl = store.state.trelloApiUrl;
    return axios.get(`${apiUrl + path}`).catch(({ response }) => {
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

export const setDefaultAuthHeader = trelloToken => {
  axios.defaults.headers.common["Authorization"] = trelloToken
    ? `Bearer ${trelloToken}`
    : null;
};

export const auth = {
  login(email, password) {
    return request.post("/login", { email, password }).then(({ data }) => data);
  }
};

export const board = {
  fetch(id) {
    if (id) {
      return request.get(`/boards/${id}`).then(({ data }) => data);
    }
    return request.get("/boards").then(({ data }) => data);
  },
  create(title) {
    return request.post("/boards", { title }).then(({ data }) => data);
  },
  update(id, data) {
    return request.put(`/boards/${id}`, data).then(({ data }) => data);
  },
  destroy(id) {
    return request.delete(`/boards/${id}`);
  }
};

export const list = {
  create(data) {
    return request.post(`/lists`, data);
  },
  update(id, data) {
    return request.put(`/lists/${id}`, data).then(({ data }) => data);
  },
  destroy(id) {
    return request.delete(`/lists/${id}`).then(({ data }) => data);
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
