import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Card, List, Button } from 'antd';
import Link from 'umi/link';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import './index.less';
import API from '@/API';

function ExamList(props) {
  const { user } = props;
  const [examList, setExamList] = useState([]);

  useEffect(() => {
    API.exam.getExamList().then(resp => {
      setExamList(resp.data.list);
    });
  }, [user]);
  return (
    <PageHeaderWrapper>
      <Card>
        <List
          dataSource={examList}
          renderItem={examItem => (
            <List.Item>
              <List.Item.Meta title={`考试名称：${examItem.paper.paperTitle}`} />
              <div className="content">
                <span className="date">创建日期 {examItem.examDate}</span>
                &nbsp;
                <Link to={`/start-exam/${examItem.examId}`} className="list-link-a">
                  <Button>开始考试</Button>
                </Link>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </PageHeaderWrapper>
  );
}

export default connect(({ user }) => ({
  user,
}))(ExamList);
