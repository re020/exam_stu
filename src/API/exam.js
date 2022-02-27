import req from '@/utils/req';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getExamList() {
  const { data } = await req.post('/exam/getList', {
    columns: [], //  查询出来的参数
    currentCount: 99, // 每页显示条数
    currentPage: 1, // 当前页
    index: 0, // 起始索引
    list: [], // 每页显示数据
    sortName: '', // 排序列
    sortOrder: null, // 排序方式
    totalCount: null, // 总条数
    totalPage: null, // 总页数
    // 其他参数
    params: { type: '0' }, // 考试类型  考试类型，0平常测试，1普通考试，2补考
  });

  return data;
}

export async function startExam(examId = '1194610287897014272') {
  // 测试id
  const { data } = await req.get(`/exam/start/${examId}`, {
    data: {
      examId,
    },
  });
  return data;
}

export async function getExamQuestionList(examId, stuId) {
  const { data } = await req.get(`/studentPaperConfigDO/typeNum/${examId}/${stuId}`);
  return data;
}

export async function currentTime() {
  const { data } = await req.get('/exam/currentTime');
  return data;
}

export async function commitPaper(paperId) {
  const { data } = await req.post('/exam/submit', {
    paperId,
  });
  return data;
}

/**
 * @param {{
 * answerContent: string; // 答案内容
 * answerQuestion: string; // 问题id
 * answerPaper: string;  // 试卷id
 * answerConf: number;  // 配置id
 * } agrs
 */
export async function commitQuestion(agrs) {
  const { data } = await req.post('/studentAnswerDO/issue', agrs);

  return data;
}
