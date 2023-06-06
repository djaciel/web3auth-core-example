import ThresholdKey from '@tkey/default'
import WebStorageModule from '@tkey/web-storage'
import SecurityQuestionsModule from '@tkey/security-questions'
import { TorusServiceProvider } from '@tkey/service-provider-torus'

// Configuration of Modules
const webStorageModule = new WebStorageModule()
const securityQuestionsModule = new SecurityQuestionsModule()

const serviceProvider = new TorusServiceProvider({
  customAuthArgs: {
    web3AuthClientId: '',
    baseUrl: 'localhost:3000' || window.location.origin,
    redirectPathName: 'demo',
    enableLogging: true,
    uxMode: 'redirect',
    network: 'testnet',
  },
})

export const tKey = new ThresholdKey({
  serviceProvider: serviceProvider,
  modules: { webStorage: webStorageModule, securityQuestions: securityQuestionsModule },
})