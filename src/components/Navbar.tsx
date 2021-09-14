import React from 'react';

import { useHistory } from 'react-router-dom';
import { Layout, Menu, Row } from 'antd';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RouteNames } from '../router';

const Navbar: React.FC = () => {
  const router = useHistory();
  const { isAuth, user } = useTypedSelector((state) => state.auth);
  const { logout } = useActions();

  const redirectToLoginPage = () => {
    router.push(RouteNames.LOGIN);
  };

  return (
    <Layout.Header>
      <Row justify='end'>
        {isAuth ? (
          <>
            <div style={{ color: 'white' }}>{user.username}</div>
            <Menu theme='dark' mode='horizontal' selectable={false}>
              <Menu.Item onClick={logout} key={1}>
                Logout
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <Menu theme='dark' mode='horizontal' selectable={false}>
            <Menu.Item onClick={redirectToLoginPage} key={1}>
              Login
            </Menu.Item>
          </Menu>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Navbar;
