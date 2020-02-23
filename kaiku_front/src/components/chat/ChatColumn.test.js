import React, { Component } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import InMessage from './message/InMessage'
import OutMessage from './message/OutMessage'
import messageValidation from '../../util/inputValidation'
import jsonService from '../../services/jsonService'

afterEach(cleanup)

test('renders inMessage from other users and outMessage from loggedUser', () => {
  const testUser = {
    name: 'TestUser',
    id: 1,
    color: 'red'
  }
  const loggedUser = {
    name: 'LoggedUser',
    id: 2,
    color: 'green'
  }

  const messages = [{
    content: 'Message from TestUser',
    id: 1,
    user_id: testUser.id
  },
  {
    content: 'Message from LoggedUser',
    id: 2,
    user_id: loggedUser.id
  }]

  const component = render(
    <InMessage user={testUser} content={messages[0].content} />
  )
  component.debug()

  expect(component.container).toHaveTextContent(
    'Message from TestUser'
  )
})