import axios from 'axios'
import qs from 'qs'
import fileDownload from "js-file-download";


//设置baseURL及超时时长
let instance = axios.create({
    baseURL: 'https://www.suiren.com',
    timeout: 10000
})
// 设置请求头格式
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let loadingInstance1;

// 拦截器的添加
axios.interceptors.request.use(config => {
  loadingInstance1 = Loading.service({
    lock: true,
    text: '正在加载..',
    spinner: 'el-icon-loading',
    background: 'transparent'
  });
  console.log('开启')
  return config
}, error => {
  loadingInstance1.close();
  // Toast.fail('请求超时');
  return Promise.reject(error)
})
//响应拦截器
axios.interceptors.response.use(data => {
  loadingInstance1.close();
  return data
}, error => {
  loadingInstance1.close();
  return Promise.reject(error)
})


/** GET请求 */
export function get(url, params) {
	
	// 固定参数
  params.companyUuid = sessionStorage.getItem("companyUuid");
  params.tokenid = sessionStorage.getItem("Admin-Token");
  params.cuEmpUuid = sessionStorage.getItem("employeeUuid");
  params.timestamp = new Date().getTime();
  params.resultType = "json";

  return new Promise((resolve, reject) => {

    let promise = axios.get(url, {
      params: params
    })

    promise.then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })

  });
}

/** POST请求，参数键值对形式 */
export function post(url, params = {}) {
	
	// 固定参数
  params.companyUuid = sessionStorage.getItem("companyUuid");
  params.tokenid = sessionStorage.getItem("Admin-Token");
  params.cuEmpUuid = sessionStorage.getItem("employeeUuid");
  params.timestamp = new Date().getTime();
  params.resultType = "json";

  return new Promise((resolve, reject) => {

    let promise = axios.post(url, qs.stringify(params))

    promise.then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  });
}

/** POST请求, 参数Json形式 */
export function postJson(url, data, params = {}) {
	
	// 固定参数
  params.companyUuid = sessionStorage.getItem("companyUuid");
  params.tokenid = sessionStorage.getItem("Admin-Token");
  params.cuEmpUuid = sessionStorage.getItem("employeeUuid");
  params.timestamp = new Date().getTime();
  params.resultType = "json";


  return new Promise((resolve, reject) => {

    let promise = axios({
      url: url,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      params: params,
      data: data
    })

    promise.then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  });
}

export function getXML(url, params = {}) {
	
	// 固定参数
  params.companyUuid = sessionStorage.getItem("companyUuid");
  params.tokenid = sessionStorage.getItem("Admin-Token");
  params.cuEmpUuid = sessionStorage.getItem("employeeUuid");
  params.timestamp = new Date().getTime();
  params.resultType = "xml";


  return new Promise((resolve, reject) => {

    let promise = axios({
      url: url,
      method: "get",
      params: params
    })

    promise.then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  });
}

// 导出表格
export function exportExcel(url, fileName, params = {}) {
	// 固定参数
  params.companyUuid = sessionStorage.getItem("companyUuid");
  params.tokenid = sessionStorage.getItem("Admin-Token");
  params.cuEmpUuid = sessionStorage.getItem("employeeUuid");
  params.timestamp = new Date().getTime();
  params.resultType = "json";

  return new Promise((resolve, reject) => {
    let promise = axios({
      url: url,
      method: "get",
      withCredentials: true,
      responseType: "blob",
      params: params,
      headers: {
        "Content-Type": "application/json; application/octet-stream"
      }
    })

    promise.then(res => {

      resolve(res.data);

      fileDownload(res.data, fileName + ".xls");
    }).catch(err => {
      reject(err.data)
    })
  });
}

// 下载附件
export function downLoad(url, params = {}) {
	
	// 固定参数
  params.companyUuid = sessionStorage.getItem("companyUuid");
  params.tokenid = sessionStorage.getItem("Admin-Token");
  params.cuEmpUuid = sessionStorage.getItem("employeeUuid");
  params.timestamp = new Date().getTime();
  params.resultType = "json";

  return new Promise((resolve, reject) => {
    let promise = axios({
      url: url,
      method: "POST",
      responseType: "blob",
      params: params
    })
    promise.then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  });
}