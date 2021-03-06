import Web3 from 'web3'
import { Provider } from 'web3/providers'
import { Context, Inject } from '@nuxt/vue-app'

const messageJson = require('../../ethereum/build/contracts/Message.json')

interface JsonRPCRequest {
  jsonrpc: string
  method: string
  params: any[]
  id: number
}

interface JsonRPCResponse {
  jsonrpc: string
  id: number
  result?: any
  error?: string
}

interface Callback<ResultType> {
  (error: Error): void
  (error: null, val: ResultType): void
}

class LoggingWrapper {
  private provider: Provider
  constructor(provider: Provider) {
    this.provider = provider
  }
  send(payload: JsonRPCRequest, callback: Callback<JsonRPCResponse>): any {
    // eslint-disable-next-line
    console.log('LoggingWrapper', payload, callback)
    this.provider.send(payload, callback)
  }
}

export default (_: Context, inject: Inject) => {
  const web3 = new Web3(window.web3.currentProvider)
  inject('web3', web3)

  const updateProvider = (provider: Provider) => {
    console.log('updateProvider', provider)
    const wrapedProvider = new LoggingWrapper(provider)
    web3.setProvider(wrapedProvider)
  }

  updateProvider(window.web3.currentProvider)
  inject('updateProvider', updateProvider)

  const contractAddress = process.env.MESSAGE_CONTRACT_ADDRESS
  const message = new web3.eth.Contract(messageJson.abi, contractAddress)
  inject('contracts', { message })
}
