import mockApi from 'vue-cli-plugin-freshinup-ui/utils/mockApi'
import axios from 'axios'
import Provider from '../src/Provider'
import CoreProvider from '@freshinup/core-ui/src/Provider'
import Vue from 'vue'

const apiMocked = mockApi({ axios })

const providers = [
  CoreProvider(),
  Provider()
]

export default {
  apiMocked,
  providers,
  Vue
}
