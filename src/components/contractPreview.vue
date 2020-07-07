<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <div style="margin-top: 30vh;text-align: center;" v-if="verify">
      <span>
        为了保证您签约的电子合同与纸质版的合同具有相同法律效应，使用此服务必须进行实名认证。去
        <a href="/Setting/userAttestation" style="color: #5daf34">实名认证</a>
      </span>
    </div>
    <iframe :src="previewUrl" frameborder="0" width="100%" style="height: 99vh" v-else></iframe>
  </div>
</template>
<script>
import api from '@/fetch/api'

export default {
  data() {
    return {
      previewUrl: '',
      verify: false,
      fullscreenLoading: false
    }
  },
  created() {
    this.fullscreenLoading = true
    let data = {
      projectBaseId: this.$route.params.projectBaseId,
      invoiceVerificationId: this.$route.params.invoiceVerificationId,
    }
    if (this.$route.params.method === 'download') {
      api.downloadTemplate(data).then(res => {
        this.previewUrl = res.dataList[0]
        this.fullscreenLoading = false
      }).catch(res => this.$message.error(res.errorMsg))
    } else if (this.$route.params.method === 'view') {
      api.contractSign(data).then(res => {
        if (res.errorCode !== '200') return this.$message.error(res.errorMsg)
        this.previewUrl = res.sign_url
        this.fullscreenLoading = false
      }).catch(res => {
        this.$message.error(res.errorMsg)
        if (res.errorCode === '4003') {
          this.verify = true
          this.fullscreenLoading = false
        }
      })
    }
  },
  mounted() {
    let udesk_btn = document.getElementById('udesk_btn')
    udesk_btn.style.display = 'none'
  }
}
</script>
