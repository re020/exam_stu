/* eslint-disable prefer-destructuring */
import { routerRedux } from 'dva/router';
import { stringify } from 'querystring';
import API from '@/API';
// import { getFakeCaptcha } from '@/services/login';
import { getPageQuery } from '@/utils/utils';
import { setToken, setLocalUserInfo } from '@/utils/helper';

const Model = {
  namespace: 'login',
  state: {},
  effects: {
    *login({ payload }, { call, put }) {
      const resp = yield call(API.user.login, payload);
      if (resp.code === 200) {
        const stuInfo = resp.data.student;
        const token = resp.data.token;
        yield put({
          type: 'user/setUser',
          payload: stuInfo,
        });
        setLocalUserInfo(stuInfo);
        setToken(token);
        yield put(routerRedux.push('/'));
      }
    },

    *logout(_, { put }) {
      const { redirect } = getPageQuery(); // redirect
      setLocalUserInfo(null);
      setToken('');
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },
  reducers: {},
};
export default Model;
