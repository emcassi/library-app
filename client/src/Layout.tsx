import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import type { MenuProps } from 'antd';
import {User} from 'firebase/auth';
import {
    HomeOutlined,
    SearchOutlined,
    DollarOutlined,
    UserOutlined,
  } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const noAuthItems: MenuItem[] = [
  getItem('Home', 'home', <HomeOutlined />),
  getItem('Browse', 'browse', <SearchOutlined />),
  getItem('Account', 'account-con', <UserOutlined />, [
    getItem('Sign In', 'sign-in'),
    getItem('Register', 'register'),
  ]),
];

const authItems: MenuItem[] = [
  getItem('Home', 'home', <HomeOutlined />),
  getItem('Browse', 'browse', <SearchOutlined />),
  getItem('Return', 'return', <DollarOutlined />),
  getItem('Account', 'account-con', <UserOutlined />, [
    getItem('My Account', 'account'),
    getItem('History', 'history'),
    getItem('Sign Out', 'sign-out'),
  ]),
];

interface Props {
    user: User | null;
}

export default function AppLayout(props: Props) {

    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();

    const onMenuSelect = ({ key }: { key: React.Key }) => {
      if (key === 'sign-in' || key === 'register') {
        navigate('/no-auth')
      } else if (key === 'sign-out') {

      }
    }


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={props.user !== null ? authItems : noAuthItems} onSelect={onMenuSelect} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}
