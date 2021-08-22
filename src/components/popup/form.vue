<template>
  <div v-if="showModal">
    <div id="modal" class="modal-mask" transition="modal">
      <div class="modal-container">
        <div style="position:relative;">
          <div class="close-icon" @click="hide()">
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
          <div class="modal-header text-center">
            <h3>Feedback</h3>
          </div>

          <div class="modal-body">
            <!-- <label class="form-label">
            Name
            <input class="form-control" v-model="name" />
          </label>
          <label class="form-label">
            Email
            <input class="form-control" v-model="email" />
          </label>
          <label class="form-label">
            Comment
            <textarea rows="5" class="form-control" v-model="comment"></textarea>
            </label>-->
            <vue-form :state="formstate" @submit.prevent="onSubmit">
              <h3 class="w-100 text-left mb-3 form-title">Feedback Form</h3>
              <validate
                auto-label
                class="form-group required-field"
                :class="fieldClassName(formstate.name)"
              >
                <label class="w-100 text-gray text-left">Name</label>
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  required
                  v-model.lazy="model.name"
                />

                <field-messages
                  name="name"
                  show="$touched || $submitted"
                  class="form-control-feedback"
                >
                  <div slot="required" class="error">
                    Name is a required field
                  </div>
                </field-messages>
              </validate>

              <validate
                auto-label
                class="form-group required-field"
                :class="fieldClassName(formstate.email)"
              >
                <label class="w-100 text-gray text-left">Email</label>
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  required
                  v-model.lazy="model.email"
                />

                <field-messages
                  auto-label
                  name="email"
                  show="$touched || $submitted"
                  class="form-control-feedback"
                >
                  <div slot="required" class="error">
                    Email is a required field
                  </div>
                  <div slot="email" class="error">Email is invalid</div>
                </field-messages>
              </validate>

              <field class="form-group">
                <label class="w-100 text-gray text-left">Comments</label>
                <textarea
                  name="comments"
                  class="form-control"
                  maxlength="500"
                  v-model.lazy="model.comments"
                ></textarea>
                <small class="form-text text-muted w-100 text-left"
                  >Enter no more than 500 characters.</small
                >
              </field>

              <div class="py-2 text-center">
                <button class="modal-default-button" type="submit">
                  Submit
                </button>
              </div>
            </vue-form>
          </div>

          <!-- <div class="modal-footer text-center d-flex justify-content-center">
          <button class="modal-default-button" @click="savePost()">Save</button>
          </div>-->
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
        name: '',
        email: '',
        comments: ''
      }
    }
  },
  methods: {
    show() {
      this.showModal = true
    },
    hide() {
      this.showModal = false
    },
    savePost: function() {
      // Insert AJAX call here...
      this.hide()
    },
    fieldClassName: function(field) {
      if (!field) {
        return ''
      }
      if ((field.$touched || field.$submitted) && field.$valid) {
        return 'has-success'
      }
      if ((field.$touched || field.$submitted) && field.$invalid) {
        return 'has-danger'
      }
    },
    onSubmit: function(e) {
      e.preventDefault()

      var datas = {
        name: this.model.name,
        email: this.model.email,
        comment: this.model.comments
      }

      console.log(datas)

      $.ajax({
        type: 'POST',
        data: datas,
        url: 'https://rnd.ipsb.com.my/index.php',
        dataType: 'json',
        success: function(data) {
          //data will contain the vote count echoed by the controller i.e.
          var result = confirm('Your feedback has succesfully been sent!')

          if (result) {
            this.showModal = false
          } else {
            this.showModal = false
          }
        },
        error: function(e) {
          console.log('error' + JSON.stringify(e, null, 2))
          var result = confirm(
            'Opsss!! Something wrong with the form. Please try again later.'
          )

          if (result) {
            this.showModal = false
          } else {
            this.showModal = false
          }
        }
      })
    }
  }
}
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
  width: 100%;
  max-width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 25px;
  background-color: #191919;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
.modal-header {
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: unset;
}
.modal-header h3 {
  margin-top: 0;
  font-size: 30px;
  font-weight: bold;
  line-height: 1.2;
  color: #fab900;
}
.text-yellow {
  color: #f1c40f;
}
.text-black {
  color: black;
}
.text-gray {
  color: #6c757d;
}
.modal-body {
  margin: 10px 0 0px;
}

.text-right {
  text-align: right;
}
.close-icon {
  position: absolute;
  top: -10px;
  right: -10px;
  cursor: pointer;
}
.form-label {
  display: block;
  margin-bottom: 1em;
  font-size: 16px;
  color: black;
  text-align: left;
}
.form-title {
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
  color: #fab900;
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
  border: none;
  border-bottom: 1px solid #707070;
  border-radius: unset;
  background: #191919;
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
  color: #000000;
  border-radius: 4px;
  padding: 10px 25px;
  border: none;
  outline: none;
}
.required-field > label::after {
  content: '*';
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
    z-index: 1111;
  }
}
</style>
