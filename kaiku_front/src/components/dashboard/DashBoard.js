import React, { useState } from 'react'
import TopNav from './TopNav'
import Menu from './Menu'
import Content from './content/Content'
import Context from '../../providers/Context'

const DashBoard = () => {
  const[content, setContent] = useState('u/all')

  return (
    <div id="dashboard">
      <TopNav />
      <div className="container-fluid">
        <div className="row">
          <Context.Provider value={{content, setContent}}>
            <Menu />
            <Content />
          </Context.Provider>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
