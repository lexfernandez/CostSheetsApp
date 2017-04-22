import React, { Component, PropTypes } from 'react';
import { Menu, Icon } from 'antd';
class MainMenu extends Component {
    render() {
        let {changeLocationTo}=this.props;
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']} onClick={({ key }) => changeLocationTo(key)}>
            <Menu.Item key="/">
              <Icon type="pie-chart" />
              <span className="nav-text">Dashboard</span>
            </Menu.Item>
            <Menu.Item key="/sheet-costs">
              <Icon type="pie-chart" />
              <span className="nav-text">Sheet Costs</span>
            </Menu.Item>
            <Menu.Item key="/projects">
              <Icon type="calendar" />
              <span className="nav-text">Projects</span>
            </Menu.Item>
            <Menu.Item key="/users" >
              <Icon type="usergroup-add" />
              <span className="nav-text">Users</span>
            </Menu.Item>
            {/*<Menu.Item key="/reports">
              <Icon type="copy" />
              <span className="nav-text">Reports</span>
            </Menu.Item>
            <Menu.Item key="/finances">
              <Icon type="credit-card" />
              <span className="nav-text">Finances</span>
            </Menu.Item>*/}
            
          </Menu>
        );
    }
}

MainMenu.propTypes = {
    changeLocationTo: PropTypes.func.isRequired,
};

export default MainMenu;