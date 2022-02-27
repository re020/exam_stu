/* eslint-disable react/no-array-index-key */
import React, { useCallback, useRef, useState } from 'react';
import { Typography, Input } from 'antd';
import API from '@/API';
import { getIDStringByTypeIndexAndQuestionIndex } from './utils';

const { Title } = Typography;
const { TextArea } = Input;

function SubjectiveQuestion(props) {
  const { examData, question, index, typeIndex, config } = props;

  const [textValue, setTextValue] = useState('');
  const timerIdRef = useRef(null);
  const handleOnChange = useCallback(
    evt => {
      const { value } = evt.target;
      setTextValue(value);

      const sendToServer = () => {
        timerIdRef.current = null;
        API.exam.commitQuestion({
          answerContent: value,
          answerPaper: examData.paperId,
          answerConf: config.configId,
          answerQuestion: question.choiceId, // ?
        });
      };

      if (timerIdRef.current === null) {
        timerIdRef.current = setTimeout(sendToServer, 500);
      } else {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = setTimeout(sendToServer, 500);
      }
    },
    [question],
  );

  return (
    <React.Fragment>
      <div id={getIDStringByTypeIndexAndQuestionIndex(typeIndex, index)} className="question-title">
        {typeIndex + 1}.{index + 1} {question.codeTitle}
      </div>
      <br />
      <div className="content">
        <TextArea
          onChange={handleOnChange}
          value={textValue}
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
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
        <SubjectiveQuestion
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
