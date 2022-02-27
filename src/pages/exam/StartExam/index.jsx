/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'dva';
import { Card, Button, Typography, message } from 'antd';
import router from 'umi/router';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import API from '@/API';
import MultipleChoiceQuestions from './ui/MultipleChoiceQuestions';
import SingleChoiceQuestions from './ui/SingleChoiceQuestions';
import TFQuestions from './ui/TFQuestions';
import QuestionIndexCard from './ui/QuestionIndexCard';
import SubjectiveQuestions from './ui/SubjectiveQuestions';

const { Title, Paragraph } = Typography;

function getTypeNameOfQuestionConfig(questionConfig) {
  return questionConfig.type.typeName;
}

const MULTIPLE_CHOICE = '多项选择题';
const SINGLE_CHOICE = '单项选择题';
const TFQuestion = '判断题';
const SUBJECTIVE_QUESTION = '编程题'; // 主观题

function ExamList(props) {
  const [examData, setExamData] = useState(undefined);

  const examId = props.match.params.id;
  useEffect(() => {
    API.exam.startExam(examId).then(res => {
      setExamData(res.data);
    });
  }, []);

  const commitPaper = useCallback(() => {
    message.info('正在提交试卷');
    API.exam.commitPaper(examData.paperId).then(res => {
      if (res.code === 200) {
        router.replace('/exam/finish-exam');
      } else {
        message.error(`提交失败: ${res.msg} ${res.code}`);
      }
    });
  }, [examData]);

  if (examData == null) return null;
  return (
    <PageHeaderWrapper>
      <Card>
        <Title>{examData.paperTitle}</Title>
        <Paragraph>
          <span>试卷ID：{examData.paperId}</span>
          &nbsp;
          <span>创建时间：{examData.paperCreateTime}</span>
          &nbsp;
          <span>学生ID：{examData.paperStudent}</span>
          &nbsp;
          <span>试卷总分：{examData.paperScore}</span>
          &nbsp;
          {/* <span>Debug：{score}</span> */}
        </Paragraph>

        <QuestionIndexCard examData={examData} />
        <Title>题目</Title>
        <div className="questions">
          {examData.configList.map((config, typeIndex) => {
            const typeName = getTypeNameOfQuestionConfig(config);
            if (typeName === MULTIPLE_CHOICE) {
              return (
                <MultipleChoiceQuestions
                  examData={examData}
                  typeIndex={typeIndex}
                  key={typeIndex}
                  config={config}
                />
              );
            }
            if (typeName === SINGLE_CHOICE) {
              return (
                <SingleChoiceQuestions
                  examData={examData}
                  typeIndex={typeIndex}
                  key={typeIndex}
                  config={config}
                />
              );
            }
            if (typeName === TFQuestion) {
              return (
                <TFQuestions
                  examData={examData}
                  typeIndex={typeIndex}
                  key={typeIndex}
                  config={config}
                />
              );
            }

            if (typeName === SUBJECTIVE_QUESTION) {
              return (
                <SubjectiveQuestions
                  examData={examData}
                  typeIndex={typeIndex}
                  key={typeIndex}
                  config={config}
                />
              );
            }

            return <div key={typeIndex}>未实现</div>;
          })}
        </div>

        <div
          className="actions"
          style={{
            display: 'flex',
            justifyContent: ' center',
            padding: 20,
          }}
        >
          <Button onClick={commitPaper}>交卷</Button>
        </div>
      </Card>
    </PageHeaderWrapper>
  );
}

export default connect(({ user }) => ({
  stuId: user.stuId,
}))(ExamList);
