import { BASE_URL, CODE_MESSAGE } from "./global.config";
import Cookie from "js-cookie";
import _ from "lodash";
import { Message, Loading } from "element-ui";
import axios from "axios";

const http = axios.create({
  baseURL: "https://codesandbox.io/",
  timeout: 5000,
  headers: { "X-httped-With": "XMLHttphttp" }
});

http.interceptors.request.use((config) => {
  const data = config.params || {};
  const info = JSON.parse(JSON.stringify(sessionStorage.getItem(info)));
  config.url = `${config.url}?_tmp=${new Date().getTime()}`;
  if ((data.userId === undefined || data.userId === "") && info.userId) {
    config.url = `${config.url}&userId=${info.userId}`;
  }

  if (config.method === "get") {
    Object.keys(config.params).forEach((key) => {
      if (_.isArray(config.params[key])) {
        config.params[key] = config.params[key].join(",");
      }
    });
  }
  config.headers["X-Requested-With"] = "XMLHttpRequest";
  config.headers["UC-CSRF-TOKEN"] = Cookie.get("UC-CSRF-TOKEN");
  return config;
});
http.defaults.headers.post["Content-Type"] = "application/json";

http.interceptors.response.use(
  (response) => {
    if (isBlob(response)) {
      downloadBlob(response);
      return Promise.resolve();
    }
    // 重新登录逻辑
    if (response.ssoRedirect) {
      window.location.href = `/login/`;
    }
    return response;
  },
  (err) => {
    const { response } = err;
    if (response) {
      const { status } = response;

      if (status === 412) {
        window.location.href = `/login`;
        return false;
      } else if (status === 919) {
        window.location.href = `/login`;
        return false;
      }

      Message.error("网络错误", {
        message: CODE_MESSAGE[status] || `请求错误 ${status}`
      });

      return Promise.reject(response);
    }
    return Promise.reject(err);
  }
);

function isBlob(res) {
  // 响应提 只有在 请求配置 等于 withResponse 为true 的情况下生效
  // eslint-disable-next-line no-underscore-dangle
  const response = res.__response;
  return (
    response && response.headers && response.headers["content-disposition"]
  );
}

function downloadBlob(res) {
  // 这里的res 是blob 类型的 没有data
  // eslint-disable-next-line no-underscore-dangle
  const response = res.__response;
  const a = document.createElement("a");
  const url = window.URL.createObjectURL(res);
  const nameArray = response.headers["content-disposition"].match(
    /filename=(.*)$/
  );
  const filename = nameArray[1];
  a.href = url;
  a.download = decodeURIComponent(filename);
  a.click();
  window.URL.revokeObjectURL(url);
}
export default http;