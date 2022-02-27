
import API from '@/API'


const Model = {
  namespace: 'exam',
  state: {
    examList: [],
  },
  effects: {
    *getExamList({ payload: stuId }, { call, put }) {
      const resp = yield call(API.exam.getExamList, stuId);
      if (resp.code === 200) {
        yield put({
          type: 'setExamList',
          payload: resp.data,
        });
      }
    },
  },
  reducers: {
    setExamList(state, { payload: examList }) {
      return { ...state, examList };
    },
  },
};
export default Model;
