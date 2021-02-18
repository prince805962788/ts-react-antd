import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import './styles/index.scss';
import Button from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
import Input from './components/Input/input'
import AutoComplete, { DataSourceType } from './components/AutoComplete/autoComplete'
import Upload, { UploadProps } from './components/upload/upload'
library.add(fas)
function App() {
  const [value, setValue] = useState('')
  const handleFetch = (query: string): Promise<DataSourceType[]> => {
    return new Promise((resolve, reject) => {
      const AutoCompleteList = [
        { value: '1' },
        { value: '11' },
        { value: '111' },
      ]
      setTimeout(() => {
        resolve(AutoCompleteList.filter(item => item.value.includes(query)))
      }, 300)
    })
  }
  const renderOption = (item: DataSourceType) => {
    return (
      <h2>
        name:{item.value}
      </h2>
    )
  }
  const uploadSuccess = (data: any, file: File) => {
    console.log('data:', data)
    console.log('file:', file)
  }
  const uploadProgress = (percent: Number, file: File) => {
    console.log('percent:', percent)
  }
  return (
    <div className="App">
      <header className="App-header">
        <Upload
          action="https://jsonplaceholder.typicode.com/posts"
          onSuccess={uploadSuccess}
          onProgress={uploadProgress}
        ></Upload>
        <Icon icon="coffee" theme="danger" size="6x"></Icon>
        <Menu defaultIndex={'0'} onSelect={(index) => { console.log(index) }}>
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
        <Menu defaultIndex={'0'} onSelect={(index) => { console.log(index) }} mode='vertical' defaultOpenSubMenus={['3']}>
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
        <Button disabled size='sm'>PrinceLee</Button>
        <Button btnType='danger' size='lg'>Hello</Button>
        <Button btnType='link' size='sm' href='www.baidu.com' target="_blank">Link</Button>
        <Input value={value} size="sm" icon="coffee" prepend='name' onChange={e => setValue(e.target.value)}></Input>
        <AutoComplete
          fetchSuggestions={(keyword) => handleFetch(keyword)}
          onSelect={(item: DataSourceType) => { console.log(item) }}
          renderOption={renderOption}
        />
      </header>
    </div >
  );
}

export default App;
