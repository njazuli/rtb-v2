<template>
  <div v-if="showModal">
    <div id="modal" class="modal-mask" transition="modal">
      <div class="modal-container">
        <div style="position:relative;">
          <div style="position:absolute;top: -40px;right: -40px;cursor:pointer;" @click="hide()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f1c40f"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <div class="modal-header">
            <h3>FeedBack Form</h3>
          </div>

          <div class="modal-body">
            <div style="width:100%;text-align:center;" class="text-center">
              <h2>Success!</h2>
              <p>Your feedback has succesfully been sent!</p>
              <p>Thank you for the feedback.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      showModal: false,
      formstate: {},
      model: {
        name: "",
        email: "",
        comments: ""
      }
    };
  },
  methods: {
    show() {
      this.showModal = true;
    },
    hide() {
      this.showModal = false;
    }
  }
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 25px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #f1c40f;
}
.text-yellow {
  color: #f1c40f;
}
.text-black {
  color: black;
}
.modal-body {
  margin: 10px 0 0px;
}

.text-right {
  text-align: right;
}

.form-label {
  display: block;
  margin-bottom: 1em;
  font-size: 16px;
  color: black;
  text-align: left;
}

.form-label > .form-control {
  margin-top: 0.5em;
}
.form-group label {
  text-align: left;
}
.form-control {
  display: block;
  width: 100%;
  padding: 0.5em 1em;
  line-height: 1.5;
  border: 1px solid #ddd;
}

.modal-enter,
.modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modal-footer {
  margin: 0 auto;
  text-align: center;
  width: 100%;
}
.modal-default-button {
  background: #f1c40f;
  color: white;
  border-radius: 4px;
  padding: 10px 25px;
  border: none;
  outline: none;
}
.required-field > label::after {
  content: "*";
  color: red;
  margin-left: 0.25rem;
}
.error {
  color: red;
}
.success {
  color: green;
}
@media screen and (max-width: 600px) {
  .modal-container {
    width: 90%;
  }
}
</style>