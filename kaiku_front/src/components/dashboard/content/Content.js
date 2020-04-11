import React, { useContext } from 'react'
import UserList from './UserList'
import GroupList from './GroupList'
import Context from '../../../providers/Context'
import InitialData from '../../../providers/InitialData'
import NewUser from './NewUser'
import NewGroup from './NewGroup'
import MemberManagment from './MemberManagment'
import Breadcrumb from '../Breadcrumb'

const Content = () => {
  const { content, setContent } = useContext(Context)
  const { useLang } = useContext(InitialData);
  const string = (ref) => useLang.getString(ref)

  const showContent = () => {
    switch (content) {
      case 'u/all':
        return <UserList />
      case 'u/new':
        return <NewUser />
      case 'g/all':
        return <GroupList />
      case 'g/new':
        return <NewGroup />
      case 'g/members':
        return <MemberManagment />
      default:
        return <UserList />
    }
  }

  return(
  <>
    <div className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-5 pb-2 mb-3 border-bottom">
  <h1 className="h2">{string('dash_header')}</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group mr-2">
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setContent('u/new')}>{string('dash_createuser')}</button>
  <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() =>setContent('g/new')}>{string('dash_creategroup')}</button>
          </div>
        </div>
      </div>
      <Breadcrumb />
      {showContent()}
    </div>
  </>
  )
}

export default Content