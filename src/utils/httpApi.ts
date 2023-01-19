import { Organization } from "./../models/Organization";
import axios, { AxiosResponse } from "axios";
import router from "../router";
import store from "../store";

const Unauthorized = 401;
const onUnauthorized = () => {
  store.dispatch("logout");
  router.push(`/login`);
  return "";
};

const getEndpoint = (endpoint: string, query?: string): string => {
  let result =
    store.state.trelloApiUrl +
    endpoint +
    "/?key=" +
    store.state.trelloKey +
    "&token=" +
    store.state.trelloUserToken;
  if (query) {
    result += query;
  }
  return result;
};
const request = {
  get(endpoint: string, query?: string): Promise<string | AxiosResponse> {
    let apiUrl = getEndpoint(endpoint, query);
    return axios.get(apiUrl).catch(({ response }) => {
      const { status } = response;
      if (status === Unauthorized) return onUnauthorized();
      throw Error(response);
    });
  },
  post(path: string, data: unknown) {
    const apiUrl = store.state.trelloApiUrl;
    return axios.post(`${apiUrl + path}`, data);
  },
  put(path: string, data: unknown) {
    const apiUrl = store.state.trelloApiUrl;
    return axios.put(`${apiUrl + path}`, data);
  },
};

export const boards = {
  get(organizationId: string) {
    return request
      .get(
        `/organizations/${organizationId}/boards`,
        "&filter=open&fields=name,id,url,dateLastActivity,desc"
      )
      .then(({ data }: any) => data);
  },
};

export const board = {
  getLists(id: string) {
    return request
      .get(
        `/boards/${id}/Lists`,
        "&cards=open&card_fields=id,name,desc,labels,dateLastActivity,due"
      )
      .then(({ data }: any) => data);
  },
};

export const list = {
  create(data: unknown) {
    return request.post(`/lists`, data);
  },
};

export const organizations = {
  get() {
    return request
      .get("/members/me/organizations")
      .then(({ data }: any) => data);
  },
};

export const user = {
  get() {
    return request.get("/members/me").then(({ data }: any) => data);
  },
};
