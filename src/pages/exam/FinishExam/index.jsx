import { Button, Result } from 'antd';
import { Link } from 'umi';
import React from 'react';
import styles from './style.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/">
      <Button type="primary" size="large">
        确定
      </Button>
    </Link>
  </div>
);

const FinishExam = ({ location }) => (
  <Result
    className={styles.registerResult}
    status="success"
    title={<div className={styles.title}>提交成功</div>}
    // subTitle="examandfinishexam.register-result.activation-email"
    extra={actions}
  />
);

export default FinishExam;
