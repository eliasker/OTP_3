import React, { useContext } from 'react'
import TopNav from './TopNav'
import Menu from './Menu'
import Content from './Content'

const DashBoard = () => {

  return (
    <div id="dashboard">
      <TopNav />
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <Content />
        </div>
      </div>
    </div>
  )
}

export default DashBoard
