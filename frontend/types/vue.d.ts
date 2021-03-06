import Vue from 'vue'
import Web3 from 'web3'
import { Provider } from 'web3/providers'
import Contract from 'web3/eth/contract'
import { QurageLink } from '@uniqys/qurage-link-lib/dist/link'

declare module 'vue/types/vue' {
  interface Vue {
    $contracts: {
      message: Contract
    }
    $web3: Web3
    $updateProvider(provider: Provider): Web3
    $qurageLink: QurageLink
  }
}

declare module '*.vue' {
  export default Vue
}
