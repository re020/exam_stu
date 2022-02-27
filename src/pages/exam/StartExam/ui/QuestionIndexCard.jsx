/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card, Button } from 'antd';
import { getIDStringByTypeIndexAndQuestionIndex } from './utils';

export default function QuestionIndexCard(props) {
  const { examData } = props;
  return (
    <div
      style={{
        position: 'fixed',
        right: 40,
      }}
    >
      <Card
        title="题目索引"
        style={{
          padding: 0,
        }}
      >
        {examData.configList.map((config, typeIndex) => (
          <React.Fragment key={typeIndex}>
            {config.questionDetailList.map((question, questionIndex) => (
              <a
                key={questionIndex}
                href={`#${getIDStringByTypeIndexAndQuestionIndex(typeIndex, questionIndex)}`}
              >
                <Button>
                  {typeIndex + 1}.{questionIndex + 1}
                </Button>
              </a>
            ))}
          </React.Fragment>
        ))}
      </Card>
    </div>
  );
}
