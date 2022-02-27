/* eslint-disable react/no-array-index-key */
import API from '@/API';
import React, { useCallback, useState } from 'react';
import { Typography, Checkbox } from 'antd';
import { getIDStringByTypeIndexAndQuestionIndex } from './utils';

const { Title } = Typography;

function MultipleChoiceQuestion(props) {
  const { examData, question, index, typeIndex, config } = props;

  const [answerSet, setAnswerSet] = useState(new Set());

  const changeAnswer = useCallback(
    answer => {
      // const tmpAnswer = `${answer.answerNumber}.${answer.answerContent}`;
      const { answerNumber } = answer
      const answerContent = answerNumber
      if (answerSet.has(answerContent)) {
        answerSet.delete(answerContent)
      } else {
        answerSet.add(answerContent)
      }
      setAnswerSet(new Set(answerSet))

      API.exam.commitQuestion({
        answerContent: Array.from(answerSet).join('#'),
        answerPaper: examData.paperId,
        answerConf: config.configId,
        answerQuestion: question.choiceId,
      })
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
        {question.choiceAnswer.map((answer, answerIndex) => (
          <Checkbox
            value={answerSet.has(answer.answerContent)}
            onChange={() => changeAnswer(answer, answerIndex)}
            key={answerIndex}
          >
            {answer.answerNumber}:{answer.answerContent}
          </Checkbox>
        ))}
      </div>
    </React.Fragment>
  );
}

export default function MultipleChoiceQuestions(props) {
  const { examData, config, typeIndex } = props;

  return (
    <React.Fragment>
      <Title level={2}>{`${typeIndex + 1}. ${config.type.typeName}`}</Title>
      {config.questionDetailList.map((question, index) => (
        <MultipleChoiceQuestion
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
