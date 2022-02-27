/* eslint-disable react/no-array-index-key */
import API from '@/API';
import React, { useState, useCallback } from 'react';
import { Typography, Radio } from 'antd';
import { getIDStringByTypeIndexAndQuestionIndex } from './utils';

const { Title } = Typography;

function TFQuestion(props) {
  const { examData, question, index, typeIndex, config } = props;

  const [radioValue, SetradioValue] = useState(-1);
  const checkAnswer = useCallback(
    (answerContent, value) => {
      // console.log('answer', answer, 'answerIndex', answerIndex, 'question', question);
      SetradioValue(value);
      API.exam.commitQuestion({
        answerContent,
        answerPaper: examData.paperId,
        answerConf: config.configId,
        answerQuestion: question.tfId,
      });
    },
    [question, SetradioValue],
  );

  return (
    <React.Fragment>
      <div id={getIDStringByTypeIndexAndQuestionIndex(typeIndex, index)} className="question-title">
        {typeIndex + 1}.{index + 1} {question.tfTitle}
      </div>
      <br />
      <div className="content">
        <Radio.Group value={radioValue}>
          <Radio onChange={() => checkAnswer(1, 1)} value={1}>
            对
          </Radio>
          <Radio onChange={() => checkAnswer(0, 0)} value={0}>
            错
          </Radio>
        </Radio.Group>
      </div>
    </React.Fragment>
  );
}

export default function TFQuestions(props) {
  const { examData, config, typeIndex } = props;

  return (
    <React.Fragment>
      <Title level={2}>{`${typeIndex + 1}. ${config.type.typeName}`}</Title>
      {config.questionDetailList.map((question, index) => (
        <TFQuestion
          typeIndex={typeIndex}
          config={config}
          key={index}
          index={index}
          examData={examData}
          question={question}
        />
      ))}
    </React.Fragment>
  );
}
