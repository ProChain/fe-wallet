<template>
  <div class="login">
    <div class="cancel" @click="close"></div>
    <div class="prochain-logo">
      <svg width="100px" height="100px" viewBox="0 0 53 53" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
              <g id="logo" sketch:type="MSLayerGroup" transform="translate(1.000000, 1.000000)">
                  <g id="XMLID_302_" transform="translate(18.112150, 13.822430)" fill="#FFFFFF" sketch:type="MSShapeGroup">
                      <g id="XMLID_60_">
                          <path d="M14.4420561,2.04953271 C12.964486,0.524299065 11.0579439,-0.238317757 8.81775701,-0.238317757 C6.9588785,-0.238317757 5.14766355,0.381308411 3.47943925,1.5728972 C3.38411215,0.33364486 2.76448598,-0.238317757 1.6682243,-0.238317757 C1.23925234,-0.238317757 0.762616822,-0.142990654 0.190654206,3.88578059e-16 C0.762616822,1.23925234 1.04859813,3.67009346 1.04859813,7.38785047 C1.04859813,9.43738318 1.00093458,12.011215 0.857943925,15.1570093 C0.714953271,18.3028037 0.66728972,20.3523364 0.66728972,21.353271 C0.66728972,22.0682243 0.714953271,22.5448598 0.762616822,22.735514 C0.810280374,22.9261682 0.953271028,23.1168224 1.14392523,23.2598131 C1.33457944,23.4028037 1.62056075,23.4981308 2.00186916,23.4981308 C2.66915888,23.4981308 3.47943925,23.2598131 4.33738318,22.7831776 C3.76542056,21.6392523 3.47943925,19.6373832 3.47943925,16.7775701 C3.47943925,16.1579439 3.47943925,15.5383178 3.5271028,14.8233645 C4.67102804,15.728972 6.19626168,16.2056075 8.05514019,16.2056075 C10.4383178,16.2056075 12.4401869,15.3476636 14.1560748,13.6794393 C15.8242991,12.011215 16.682243,10.0093458 16.682243,7.57850467 C16.682243,5.38598131 15.9196262,3.5271028 14.4420561,2.04953271 L14.4420561,2.04953271 Z M12.2018692,12.2495327 C11.1056075,13.3934579 9.67570093,13.917757 7.95981308,13.917757 C6.43457944,13.917757 5.0046729,13.4411215 3.57476636,12.4878505 L3.67009346,3.67009346 C5.29065421,2.57383178 6.81588785,2.00186916 8.29345794,2.00186916 C9.96168224,2.00186916 11.2962617,2.52616822 12.2971963,3.62242991 C13.3457944,4.67102804 13.8700935,6.14859813 13.8700935,7.95981308 C13.8700935,9.72336449 13.2981308,11.1056075 12.2018692,12.2495327 L12.2018692,12.2495327 Z"
                              id="XMLID_65_"></path>
                          <g id="XMLID_61_" transform="translate(4.766355, 0.953271)">
                              <path d="M3.19345794,1.7635514 C3.09813084,0.524299065 2.47850467,-0.0476635514 1.38224299,-0.0476635514 C0.953271028,-0.0476635514 0.476635514,0.0476635514 -0.0953271028,0.190654206 C0.476635514,1.42990654 0.762616822,3.86074766 0.762616822,7.57850467 C0.762616822,9.62803738 0.714953271,12.2018692 0.571962617,15.3476636 C0.428971963,18.4934579 0.381308411,20.5429907 0.381308411,21.5439252 C0.381308411,22.2588785 0.428971963,22.735514 0.476635514,22.9261682 C0.524299065,23.1168224 0.66728972,23.3074766 0.857943925,23.4504673 C1.04859813,23.5934579 1.33457944,23.688785 1.71588785,23.688785 C2.38317757,23.688785 3.19345794,23.4504673 4.05140187,22.9738318 C3.47943925,21.8299065 3.19345794,19.8280374 3.19345794,16.9682243 C3.19345794,16.3485981 3.19345794,15.728972 3.2411215,15.0140187 C3.19345794,15.0616822 3.3364486,3.05046729 3.19345794,1.7635514 L3.19345794,1.7635514 Z"
                                  id="XMLID_64_"></path>
                          </g>
                      </g>
                  </g>
                  <circle id="Oval-1" stroke="#FFFFFF" stroke-width="1.42990654" sketch:type="MSShapeGroup" cx="25.5" cy="25.5" r="25.5"></circle>
              </g>
          </g>
      </svg>
    </div>
    <div class="login-block title">{{title}}</div>
    <template>
      <div v-if="status == 1" class="login-block">
        <input type="text" class="login-address" readonly :value="keystore && keystore.address ? '' +keystore.address : ''"/>
      </div>
      <div v-else-if="status == 2" class="login-block">
        <div class="file-selector" @click="selectFile">{{fileTitle}}</div>
        <input id="jsonInput" type="file" class="none" @change="loadKeystore"/>
      </div>
    </template>
    <div class="login-block">
      <input type="password" class="login-password-input" placeholder="Password" v-model="password" @keyup.enter="handleClick"/>
      <div class="safety">
        <div>
          <img src="/static/icon-safety.png" class="login-warn-image"/>
          <span>ProChain does not store and retrieve passwords.</span>
        </div>
       <div>
         <span class="safety-remember">Please be sure to remember them.</span>
       </div>
      </div>
    </div>
    <div class="login-block">
      <button @click="handleClick" class="login-login-button">{{buttonTitle}}</button>
    </div>
    <div class="login-block seperator-div">
      <div class="seperator"></div>
      <div class="middle-circle-div">
        <div class="middle-circle">
          <div class="midle-text">OR</div>
        </div>
      </div>
      <div class="seperator"></div>
    </div>
    <div>
      <a class="login-change-status-link" @click="changeStatus">{{changeStatusTitle}}</a>
    </div>
  </div>
</template>

<script>
import {
  KEYSTORE_KEY, 
  ETH_LOGIN_VIEW, 
  ETH_BACKUP_VIEW,
  ETH_ACCOUNT_VIEW,
  STORE_CHANGE_VIEW,
  STORE_CREATE_ACCOUNT,
  STORE_GET_ACCOUNT,
  STORE_IMPORT_ACCOUNT,
  ETH_ALERDY_LOGIN_TITLE,
  ETH_LOGIN_TITLE,
  ETH_CREATE_TITLE,
  ETH_CREATE_LINK_TITLE,
  ETH_LOGIN_LINK_TITLE,
  ETH_CHANGE_LINK_TITLE,
  ETH_CREATE_BUTTON_TITLE,
  ETH_LOGIN_BUTTON_TITLE,
  ETH_FILE_TITLE
} from '@/config';
import { mapGetters } from 'vuex';
import { exportAccount } from '@/utils';
export default {
  name: ETH_LOGIN_VIEW,
  data () {
    let keystore = localStorage.getItem(KEYSTORE_KEY);
    keystore = !!keystore ? JSON.parse(keystore) : null;
    return {
      //1: 已登录过，2: 未登录过， 3: 想创建新账户
      status: !!keystore ? 1 : 2,
      title: !!keystore ? ETH_ALERDY_LOGIN_TITLE : ETH_LOGIN_TITLE,
      changeStatusTitle: !!keystore ? ETH_CHANGE_LINK_TITLE : ETH_CREATE_LINK_TITLE,
      buttonTitle: ETH_LOGIN_BUTTON_TITLE,
      fileTitle: ETH_FILE_TITLE,
      keystore,
      password: ''
    }
  },

  props: {
    close: {type: Function, required: true}
  },

  computed: {
    ...mapGetters({
      account: STORE_GET_ACCOUNT
    })
  },

  methods: {
    handleClick () {
      this.status == 3 ? this.create() : this.login();
      window.event.stopPropagation();
      return;
    },

    login () {
      if (this.validate()) {
        let successed = true;
        this.$store.commit(STORE_IMPORT_ACCOUNT, {
          keystore: this.keystore,
          password: this.password,
          fail: e => {
            successed = false;
            let message = '您的KeyStore文件格式不正确！';
            if (e.message.indexOf('wrong password') > -1) {
              message = '您的密码不正确!';
            }
            this.$notify({
              title: '错误',
              message,
              type: 'error'
            });
          }
        });
        if (successed) {
          localStorage.setItem(KEYSTORE_KEY, JSON.stringify(this.keystore));
          this.$store.commit(STORE_CHANGE_VIEW, {view: ETH_ACCOUNT_VIEW});
        }
      }
    },

    validate () {
      let valid = true;
      if (!this.password || !this.password.trim()) {
        this.$notify({
          title: '警告',
          message: '您输入的密码不能为空或含有空格！',
          type: 'warning'
        });
        valid = false;
      } else if (!this.keystore) {
        this.$notify({
          title: '警告',
          message: '您的keystore文件不能为空！',
          type: 'warning'
        });
        valid = false;
      }
      return valid;
    },

    create () {
      if (!this.password || !this.password.trim()) {
        this.$notify({
          title: '警告',
          message: '您输入的密码不能为空或含有空格！',
          type: 'warning'
        });
        return;
      }
      this.$store.commit(STORE_CREATE_ACCOUNT);
      this.keystore = exportAccount(this.account, this.password);
      localStorage.setItem(KEYSTORE_KEY, JSON.stringify(this.keystore));
      this.$store.commit(STORE_CHANGE_VIEW, {view: ETH_BACKUP_VIEW});
    },

    changeStatus () {
      if (this.status == 1) {
        this.status = 2;
        this.title = ETH_LOGIN_TITLE;
        this.changeStatusTitle = ETH_CREATE_LINK_TITLE;
        this.buttonTitle = ETH_LOGIN_BUTTON_TITLE;
      } else if (this.status == 2) {
        this.status = 3;
        this.title = ETH_CREATE_TITLE;
        this.changeStatusTitle = ETH_LOGIN_LINK_TITLE;
        this.buttonTitle = ETH_CREATE_BUTTON_TITLE;
      } else {
        this.status = 2;
        this.title = ETH_LOGIN_TITLE;
        this.changeStatusTitle = ETH_CREATE_LINK_TITLE;
        this.buttonTitle = ETH_LOGIN_BUTTON_TITLE;
      }
      this.fileTitle = ETH_FILE_TITLE;
    },

    selectFile () {
      document.getElementById('jsonInput').click();
    },

    loadKeystore () {
      let fileInput = document.getElementById('jsonInput');
      if (fileInput.files && fileInput.files.length > 0) {
        let reader = new FileReader();
        let file = fileInput.files[0];
        reader.onload = function (conponentThis) {
          return function () {
            let keystoreStr = this.result;
            if (keystoreStr) {
              conponentThis.fileTitle = file.name;
              try {
                conponentThis.keystore = JSON.parse(keystoreStr);
              } catch (e) {
                this.$notify({
                  title: '错误',
                  message: '您上传的keystore文件不是JSON格式',
                  type: 'error'
                });
              }
            }
          };
        }(this);
        reader.readAsText(file);
      }
    }
  }
}
</script>

<style scoped>
  .login {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
  }

  .cancel {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 26px;
    height: 26px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAABOCAYAAAA+VQYvAAABgGlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kc8rRFEUxz8GjRiNolhYvISVEaMmNhYjvwqL8ZRfm5k3v9S88XrvSbJVtooSG78W/AVslbVSRErKzprYoOe8mamZZM7t3PO533vP6d5zwaNmNN2q6gE9a5uR0bAyOzeveF+ooQoPzfiimmVMTo+olLXPeyrceBtwa5U/96/VxROWBhU1woOaYdrCY8ITq7bh8o5wk5aOxoXPhLtMuaDwnavH8vzqcirP3y6bamQIPA3CSqqEYyWspU1dWF5Ou55Z0Qr3cV/iS2RnpiW2ibdiEWGUMArjDDNEiF4GZA4RIEi3rCiT35PLn2JZcjWZDdYwWSJFGpsuUVekekJiUvSEjAxrbv//9tVK9gXz1X1hqH52nPcO8G7Dz5bjfB05zs8xVD7BZbaYv3wI/R+ibxW19gPwb8D5VVGL7cLFJrQ8GlEzmpMqxT3JJLydQv0cNN5A7UK+Z4V9Th5AXZevuoa9feiU8/7FX/SUZ7LLNiuFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB4ElEQVRYhe2Wv0rdQRCFv6RyCxHsLiQQrIJNLBLFTuws0+YFNJDOIs+gKFj6ED6DL5DCBwiEwCWkC4QUJ2WKDNzLzc7dGdHlQvaUvzlzvh/L7B8YGjI9qX2U9AJ4DnwqpfyOBElaA94A01LK18X6U6dvAjwDDi0gAjm0nknN44HugJ/ARgs2B9mwnruar7p0TsDt4jJGPE1QKygDaYK8QCuFISGQAyMDCYMqMDIQ8KfuwbU6S9dlGLqMd5cNmwmIer2pex2BAFjtltnZ+Krm80CfgWkLUoFNgW8t/9DQ0NASSdqT9F7SeqJn3Xr2anXvrNsGdoDTCMw8p9aznQHdAN/5+7xdCpuDTKznpuZbdvEtBlyWUn5lPU1QKygDaYK8QCuFISGQAyMDCYMqMDIQWMGX6uMvXZdh6DLeXTZsJiDq9abuXQQCYLVLZmfjW89b+8uXko7vcU0cS9oJg4aGhob+laQjSReSNhM9m9ZzVKt7h+o+cABcR2Dmubae/QzoCvgCbLVgc5At67mq+ZZdfIsBJ6WUH1lPE9QKykCaIC/QSmFICOTAyEDCoAqMDARW8KX6+EvXZRi6jHeXDZsJiHq9qfsYgQBY7YTZ2fjB89b+clfS+T2uiTNJB2HQ0P+pP+79w1v9e2qQAAAAAElFTkSuQmCC");
    cursor: pointer;
  }

  .prochain-logo {
    margin-top: 50px;
    vertical-align: middle;
  }

  .title {
    margin-top: 50px !important;
  }

  .login-block {
    width: 94%;
    margin-top: 15px;
    font-size: 14px;
    text-align: center;
    color: hsla(0,0%,100%,.9);
  }

  .login-address {
    width: calc(100% - 64px);
    color: hsla(0,0%,100%,.9);
    padding: 10px 30px;
    background: hsla(0,0%,100%,.05);
    border: 1px solid hsla(0,0%,72%,.26);
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: inherit;
    text-align: inherit;
    line-height: inherit;
  }

  .seperator-div {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .middle-circle-div {
    margin: 0 10px;
  }

  .middle-circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid hsla(226,5%,53%,.7);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .midle-text {
    font-family: Arial;
    font-size: 12px;
    font-weight: 700;
    color: #81848e;
    text-align: center;
    padding: 5px;
  }

  .seperator {
    width: 100%;
    background: hsla(226,5%,53%,.7);
    height: 1px;
  }

  .file-selector {
    width: 100%;
    height: auto;
    color: #000;
    background: linear-gradient(#e5e5e5,#9b9b9b);
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .login-password-input {
    width: calc(100% - 4px);
    padding-top: 10px;
    padding-bottom: 10px;
    background: hsla(0,0%,100%,0);
    border: 1px solid #6a6d79;
    font-size: inherit;
    text-align: inherit;
    line-height: inherit;
    color: inherit;
  }

  .login-warn-image {
    width: 12px;
    height: 16px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 0;
    vertical-align: middle;
    border: 0;
  }

  .safety {
    padding: 5px 0;
    background: hsla(0,0%,100%,.1);
    font-size: 12px;
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: flex-start;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .safety-remember {
    margin-left: 36px;
  }

  .login-login-button {
    width: 100%;
    background: #15a7dc;
    color: #fff;
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: inherit;
    text-align: inherit;
    line-height: inherit;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border: 0;
    cursor: pointer;
  }

  .login-change-status-link {
    color: #94d6ee !important;
    font-size: inherit;
    text-align: center;
    cursor: pointer;
  }
</style>
