<template>
  <v-layout row justify-center align-center wrap>
    <v-flex xs10>
      <v-text-field
        v-model="inputMessage"
        label="Regular"
        placeholder="Placeholder"
      ></v-text-field>
    </v-flex>
    <v-flex xs2>
      <v-btn @click="click">Submit</v-btn>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          Message
        </v-card-title>
        <v-card-text>
          <span>address:</span><span> {{ address }} </span><br />
          <span>message:</span><span> {{ message }} </span><br />
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          Quragé Link
        </v-card-title>
        <v-card-text>
          <v-flex xs12>
            <v-btn @click="enableQurageLink">Enable Quragé Link</v-btn>
          </v-flex>
          <v-flex xs12>
            <canvas ref="canvas"> </canvas>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-snackbar v-model="isShowQurageLinkSuccessAlert" :timeout="3000">
      Hello, Quragé Link
    </v-snackbar>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  components: {},
  data: () => {
    return {
      inputMessage: '',
      message: '',
      address: '',
      receipt: {},
      isShowQurageLinkSuccessAlert: false
    }
  },
  mounted(): void {
    window.ethereum.enable().then(async () => {
      const accounts = await this.$web3.eth.getAccounts()
      this.address = accounts[0]
      await this.updateMessage()
    })
  },
  methods: {
    getValue(): Promise<string> {
      return this.$contracts.message.methods.getValue().call()
    },
    async setValue(value: string): Promise<void> {
      // eslint-disable-next-line no-console
      console.log(value, this.address)
      this.receipt = await this.$contracts.message.methods
        .setValue(value)
        // gas is tekitou
        .send({ from: this.address, gas: 50000 })
      // eslint-disable-next-line no-console
      console.log(this.receipt)
    },
    async updateMessage() {
      this.message = await this.getValue()
      // eslint-disable-next-line no-console
      console.log('updated', this.message)
    },
    async click() {
      await this.setValue(this.inputMessage)
      await this.updateMessage()
    },
    enableQurageLink() {
      const canvas = this.$refs.canvas as HTMLCanvasElement
      this.$qurageLink.linkWithQRCode(canvas, true).then(result => {
        this.address = result.address
        this.$updateProvider(window.ethereum.currentProvider)
        this.isShowQurageLinkSuccessAlert = true
      })
    }
  }
})
</script>
