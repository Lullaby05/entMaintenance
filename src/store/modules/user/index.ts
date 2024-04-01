import { defineStore } from 'pinia';
import { login as userLogin, getUserInfo, LoginData, login, loginByPhone } from '@/api/user';
import { setToken, clearToken, setRefreshToken } from '@/utils/auth';

const useUserStore = defineStore('user', {
  state: (): any => ({
    deptId: "",
    deptName: "",
    enterpriseId: "",
    enterpriseName: "",
    entryDate: "",
    enterPriseUserId: "",
    incumbencyStatus: undefined,
    jobId: "",
    jobName: "",
    jobNumber: "",
    postName: "",
    safeDeptId: "",
    sex: undefined,
    sexName: "",
    tel: "",
    updateTime: "",
    userId: "",
    userName: "",
    workTypeId: "",
    workTypeName: "",
    avatar: "",
    email: "",
    id: undefined,
    mobile: "",
    name: "",
    nickname: "",
    postIds: [],
    sign: undefined,
    status: 0,
    username: "",
  }),

  getters: {
    userInfo(state: any): any {
      return this.$state
      // return { ...state };
    },
  },

  actions: {
    setName(name: string) {
      this.name = name;
    },
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: any) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      // const res = await getUserInfo();
      // console.log('userstore-info-res:', res);
      // this.setInfo(res.data);
    },

    // Login
    async login(loginForm: LoginData, title: string) {
      try {
        // 调接口登录获取数据
        const loginApi = title === '1' ? login : login;
        const params = {
          condition: loginForm.username,
          password: loginForm.password,
          mobile: loginForm.phone,
          code: loginForm.verifyCode,
        };
        const { data } = await loginApi(params);
        // 保存token，请求用户信息
        setToken(`Bearer ${data.accessToken}`);
        setRefreshToken(data.refreshToken);
        // setToken(`Bearer testSec_1_1`);
        // 获取并保存，保存用户信息和员工信息
        // const { data: info } = await getUserInfo();
        // const res: any = await userLogin(loginForm);
        // console.log('success', data, info);
        // this.$state = info
        // this.setInfo({
        //   ...info.employeeInfo,
        //   ...info.userInfo,
        //   tenantId: info.tenantId
        // });
        return true
      } catch (err) {
        clearToken();
        // throw err;
        // setToken(`Bearer testSec_1_1`);
        console.log('err=', err);
        // this.setInfo(userInfo.user);
        return false
      }
    },
    logoutCallBack() {
      // const appStore = useAppStore();
      // this.resetInfo();
      // clearToken();
      // removeRouteListener();
      // appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        // await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
  persist: {
    enabled: true
  }
});

export default useUserStore;
