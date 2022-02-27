import React from 'react';
import { connect } from 'dva';
import { Redirect } from 'umi';
import PageLoading from '@/components/PageLoading';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, user } = this.props;
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）

    if (!isReady) {
      return <PageLoading />;
    }

    if (user.stuId == null) {
      return <Redirect to="/user/login" />;
    }

    return children;
  }
}

export default connect(({ user }) => ({
  user,
  // loading: loading.models.user,
}))(SecurityLayout);
