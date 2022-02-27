import { getLocalUserInfo } from '@/utils/helper';
import { setAuthority } from '@/utils/authority';

const UserModel = {
  namespace: 'user',
  state: {
    ...(getLocalUserInfo() == null ? {} : getLocalUserInfo()),
  },
  effects: {},
  reducers: {
    setUser(state, { payload }) {
      setAuthority(['user']);
      return { ...state, ...payload };
    },
  },
};
export default UserModel;
