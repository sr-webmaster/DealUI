import axios from 'axios'
import { createStoreFromProviders } from '@freshinup/core-ui/src/App'
import Provider from '../src/Provider'
import CoreProvider from '@freshinup/core-ui/src/Provider'
import makeRestStore from '@freshinup/core-ui/src/store/utils/makeRestStore'
// Here only for Testing purposes as the client should load the Activity UI
import ActivityProvider from '@freshinup/activity-ui/src/Provider'

/**
 * DataVisibility really should be a part of Deals API and other similar data visibility need Modules
 *  However, this is currently on User Model via an override in various projects like SmartMotors
 * @constructor
 */
const UserProviderMock = () => {
  return {
    name: 'freshinup/users',
    version: 'x.x.x',
    store: {
      users: () => {
        return makeRestStore('users', {})
      }
    }
  }
}

export default (initialState = {}, options = {}) => {
  return createStoreFromProviders(
    [
      CoreProvider(),
      UserProviderMock(),
      ActivityProvider(),
      Provider()
    ],
    {
      navigationAdmin: {
        headerImage: '/images/header-background.png'
      },
      userNotifications: {
        fetchInterval: 0
      },
      ...initialState
    },
    {
      axios,
      ...options
    }
  )
}
