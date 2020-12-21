import React from 'react';
import './styles/index.scss';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0} onSelect={(index) => { console.log(index) }}>
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link2</MenuItem>
          <SubMenu title="下拉选项">
            <MenuItem>
              下拉选项一
            </MenuItem>
            <MenuItem>
              下拉选项二
            </MenuItem>
          </SubMenu>
        </Menu>
        <Menu defaultIndex={0} onSelect={(index) => { console.log(index) }} mode='vertical'>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem>
            cool link 2
          </MenuItem>
          <MenuItem disabled>
            disabled
          </MenuItem>
          <SubMenu title="下拉选项">
            <MenuItem>
              下拉选项一
            </MenuItem>
            <MenuItem>
              下拉选项二
            </MenuItem>
          </SubMenu>
        </Menu>
        <Button onClick={() => { console.log('this is button') }}>Prince</Button>
        <Button disabled size={ButtonSize.Small}>PrinceLee</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>Hello</Button>
        <Button btnType={ButtonType.Link} size={ButtonSize.Small} href='www.baidu.com' target="_blank">Link</Button>
      </header>
    </div>
  );
}

export default App;
