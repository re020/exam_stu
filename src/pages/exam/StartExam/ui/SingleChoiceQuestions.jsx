/* eslint-disable react/no-array-index-key */
import React, { useCallback, useState } from 'react';
import { Typography, Radio } from 'antd';
import API from '@/API';
import { getIDStringByTypeIndexAndQuestionIndex } from './utils';

const { Title } = Typography;

function SingleChoiceQuestion(props) {
  const { examData, question, index, typeIndex, config } = props;

  const [radioIndex, setRadioIndex] = useState(-1);
  const checkAnswer = useCallback(
    (answer, answerIndex) => {
      // console.log('answer', answer, 'answerIndex', answerIndex, 'question', question);
      setRadioIndex(answerIndex);
      API.exam.commitQuestion({
        answerContent: answer.answerNumber,
        answerPaper: examData.paperId,
        answerConf: config.configId,
        answerQuestion: question.choiceId,
      });
    },
    [question],
  );

  return (
    <React.Fragment>
      <div id={getIDStringByTypeIndexAndQuestionIndex(typeIndex, index)} className="question-title">
        {typeIndex + 1}.{index + 1} {question.choiceTitle}
      </div>
      <br />
      <div className="content">
        <Radio.Group value={radioIndex}>
          {question.choiceAnswer.map((answer, answerIndex) => (
            <Radio
              onChange={() => checkAnswer(answer, answerIndex)}
              key={answerIndex}
              value={answerIndex}
            >
              {answer.answerNumber}:{answer.answerContent}
            </Radio>
          ))}
        </Radio.Group>
      </div>
    </React.Fragment>
  );
}

export default function SingleChoiceQuestions(props) {
  const { examData, config, typeIndex } = props;

  return (
    <React.Fragment>
      <Title level={2}>{`${typeIndex + 1}. ${config.type.typeName}`}</Title>
      {config.questionDetailList.map((question, index) => (
        <SingleChoiceQuestion
          typeIndex={typeIndex}
          key={index}
          index={index}
          examData={examData}
          config={config}
          question={question}
        />
      ))}
    </React.Fragment>
  );
}
