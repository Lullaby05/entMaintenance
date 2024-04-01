import axios, { CanceledError } from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message } from '@arco-design/web-vue';
import { getToken, getRefreshToken, setToken, setRefreshToken } from '@/utils/auth';
import { refreshToken } from './user';
import { useRouter } from 'vue-router';
import useUser from '@/hooks/user';
import router from '@/router';

const requestWhiteList = [
  'update',
  'create',
  'execute',
  'operation-special',
  'operation/operation',
  'delete',
  'creat'
];

let requestArr: any[] = []; //请求队列，是否正在刷新token
let isRefreshing: boolean = false;

export interface HttpResponse extends AxiosResponse {
  status: number;
  msg: string;
  code: number;
  data: any;
  type: string;
}

declare module 'axios' {
  interface AxiosResponse<T = any> {
    status: number;
    msg: string;
    code: number;
    data: T;
    type: string;
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

let instance: any = null;
function getRequestKey(config: any) {
  let { method, url, params, data } = config;
  return [method, url].join('&');
}

/**
 * @description 添加请求信息 **/
let pendingRequest = new Map();
Axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    const url = config.url;
    const flag =
      url.indexOf('get-pag') > -1
        ? true
        : url.indexOf('get-liat') > -1
          ? true
          : false;
    if (config.data !== undefined && flag) {
      const params = config.data;
      const keys = Object.keys(params);
      // 清除数据为空的参数
      keys.forEach((e) => {
        if (params[e] === null || params[e] === undefined || params[e] === '') {
          delete params[e];
        }
      });
    }
    config.headers.Authorization = token;
    const requestKey = getRequestKey(config);
    if (
      pendingRequest.has(requestKey) &&
      Date.now() - pendingRequest.get(requestKey) < 3000
    ) {
      if (!instance) {
        instance = Message.warning({
          content: '操作过于频繁，请稍后再试',
          duration: 3 * 1000,
          onClose() {
            instance = null;
          },
        });
      }
      return Promise.reject(
        new CanceledError(`操作过于频繁，请稍后再试 ${requestKey}`)
      );
    }
    if (requestWhiteList.some((ele) => requestKey.toString().includes(ele))) {
      pendingRequest.set(requestKey, Date.now());
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    setTimeout(() => {
      const requestKey = getRequestKey(response.config);
      pendingRequest.delete(requestKey);
    }, 3000);
    const res = response.data;
    if (res.code === 401) {
      const token = getToken()
      if (token) {
        //刷新token
        return refreshTokenFn(response.config);
      } else {
        Message.error({
          content: "请登录后重试",
          duration: 3 * 1000,
          async onClose() {
            localStorage.clear()
            router.push({
              name: 'login'
            })
          }
        });
        return Promise.reject(new Error('请登录后重试'))
      }
    }
    if (res.code > 200) {
      Message.error({
        content: res.msg || 'Error',
        duration: 5 * 1000,
      });
      return Promise.reject(new Error(res.msg));
    }
    return res;
  },
  (error) => {
    if (error.name !== 'CanceledError') {
      Message.error({
        content: error.msg || 'Request Error',
        duration: 5 * 1000,
      });
    }
    return Promise.reject(error);
  }
);

async function refreshTokenFn(
  options: any,
) {
  if (!isRefreshing) {
    isRefreshing = true;
    const token = getRefreshToken();
    return refreshToken(token as string)
      .then((res: any) => {
        switch (res.data.code) {
          case 0:
            setToken(`Bearer ${res.data.data.accessToken}`);
            setRefreshToken(res.data.data.refreshToken);
            // 重新请求队列
            requestArr.map((MT) => {
              MT();
            });
            requestArr = []; //清空队列
            return Axios(options)
          default:
            Message.error({
              content: "登录过期，请重新登录",
              duration: 3 * 1000,
              async onClose() {
                localStorage.clear()
                router.push({
                  name: 'login'
                })
              }
            });
        }
      })
      .finally(() => {
        //解除正在刷新
        isRefreshing = false;
      });
  } else {
    // 返回未执行 resolve 的 Promise
    return new Promise(resolve => {
      // 用函数形式将 resolve 存入，等待刷新后再执行
      requestArr.push(token => {
        resolve(Axios(options))
      })
    })
  }
}

export default Axios;
