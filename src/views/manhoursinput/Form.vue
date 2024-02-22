<template>
  <div class="product-info">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h3 class="display-5">Man Hours Input Infomation</h3>
      <router-link to="/product">Back</router-link>
    </div>

    <div class="container">
      <form @submit.prevent="save()" @reset.prevent="cancel()">
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Input Type</label>
          <div class="col-sm-9">
            <select class="form-control" v-model="manhour.inputType" :disabled="this.isChangeDataPutAPI.flag == true">
              <option value="Daily" selected>Daily</option>
              <option value="Monthly">Monthly</option>
            </select>
            <div class="invalid-feedback text-left" v-if="errors.inputType">
              {{ errors.inputType }}
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Act Code</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="manhour.actCode"
              v-bind:class="{ 'is-invalid': errors.actCode }" :readonly="this.isChangeDataPutAPI.flag == true"/>
            <div class="invalid-feedback text-left" v-if="errors.actCode">
              {{ errors.actCode }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Project Code</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="manhour.pjCode"
              v-bind:class="{ 'is-invalid': errors.pjCode }" :readonly="this.isChangeDataPutAPI.flag == true"/>
            <div class="invalid-feedback text-left" v-if="errors.pjCode">
              {{ errors.pjCode }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Project Sbno</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="manhour.pjSbno"
              v-bind:class="{ 'is-invalid': errors.pjSbno }" :readonly="this.isChangeDataPutAPI.flag == true"/>
            <div class="invalid-feedback text-left" v-if="errors.pjSbno">
              {{ errors.pjSbno }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Process Code</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="manhour.processCode"
              v-bind:class="{ 'is-invalid': errors.processCode }" :readonly="this.isChangeDataPutAPI.flag == true" />
            <div class="invalid-feedback text-left" v-if="errors.processCode">
              {{ errors.processCode }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">YM</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="manhour.ym" v-bind:class="{ 'is-invalid': errors.ym }"
              :readonly="this.isChangeDataPutAPI.flag == true" />
            <div class="invalid-feedback text-left" v-if="errors.ym">
              {{ errors.ym }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Working Date</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="manhour.workingDate"
              v-bind:class="{ 'is-invalid': errors.workingDate }" :readonly="manhour.inputType === 'Monthly' || this.isChangeDataPutAPI.flag == true" />
            <div class="invalid-feedback text-left" v-if="errors.workingDate">
              {{ errors.workingDate }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Actual ManHour</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="manhour.actualManHour"
              v-bind:class="{ 'is-invalid': errors.actualManHour }" />
            <div class="invalid-feedback text-left" v-if="errors.actualManHour">
              {{ errors.actualManHour }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label"></label>
          <div class="col-sm-9 text-left">
            <button type="submit" class="btn btn-primary">Save</button> &nbsp;
            <button type="reset" class="btn btn-danger">Cancel</button>
            <div style="height: 16px;"></div>
            <div v-if="info.msg_success" class="alert alert-success" role="alert">
              Insert success!!!
            </div>
            <div v-if="info.msg_error" class="alert alert-danger" role="alert">
              Insert Fail!!!
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "productForm",
  data() {
    return {
      errors: {
        inputType: "",
        actCode: "",
        pjCode: "",
        pjSbno: "",
        processCode: "",
        ym: "",
        workingDate: "",
        actualManHour: ""
      },
      manhour: {
        inputType: "Daily",
        actCode: "",
        pjCode: "",
        pjSbno: "",
        processCode: "",
        ym: "",
        workingDate: new Date().toISOString().slice(0, 19) + 'Z',
        actualManHour: ""
      },
      info: {
        msg_success: "",
        msg_error: ""
      },
      isChangeDataPutAPI: {
        flag: "",
      }
    };
  },
  mounted() {
    // Được gọi sau khi component đã được mount vào DOM
    console.log('Component has been mounted!');
    // Tại đây, bạn có thể thực hiện yêu cầu dữ liệu hoặc các thao tác DOM khác
    this.loadData();
  },
  methods: {
    loadData() {
      // Yêu cầu dữ liệu hoặc thực hiện các thao tác khởi tạo tại đây
      if (this.$route.params.selectedItem) {
        this.isChangeDataPutAPI.flag = true;

        console.log(this.$route.params.selectedItem);
        this.manhour = this.$route.params.selectedItem;
        this.manhour.inputType = "Daily";
      }
    },
    validate() {
      var isValid = true;
      this.errors = {
        inputType: "",
        actCode: "",
        pjCode: "",
        pjSbno: "",
        processCode: "",
        ym: "",
        workingDate: "",
        actualManHour: ""
      };

      if (!this.manhour.inputType) {
        this.errors.inputType = "Input Type is required!!!";
        isValid = false;
      }

      if (!this.manhour.actCode) {
        this.errors.actCode = "Act Code is required!!!";
        isValid = false;
      } else if (this.manhour.actCode.length > 10) {
        this.errors.actCode = "Act Code must be less than 10 characters!!!";
      }

      if (!this.manhour.pjCode) {
        this.errors.pjCode = "Project Code is required!!!";
        isValid = false;
      } else if (this.manhour.pjCode.length > 20) {
        this.errors.pjCode = "Project Code must be less than 20 characters!!!";
        isValid = false;
      }

      if (!this.manhour.pjSbno) {
        this.errors.pjSbno = "PjSbno is required!!!";
        isValid = false;
      } else if (this.manhour.pjSbno.length > 2) {
        this.errors.pjSbno = "Project Sbno  must be less than 2 characters!!!";
        isValid = false;
      }

      if (!this.manhour.processCode) {
        this.errors.processCode = "Process Code is required!!!";
        isValid = false;
      } else if (isNaN(this.manhour.processCode)) {
        this.errors.processCode = "Process Code must be number!!!";
        isValid = false;
      } else if (this.manhour.processCode.length > 10) {
        this.errors.processCode = "Process Code must be less than 10 characters!!!";
        isValid = false;
      }

      if (!this.manhour.ym) {
        this.errors.ym = "Year Month is required!!!";
        isValid = false;
      } else if (this.manhour.ym.length > 6) {
        this.errors.ym = "YM must be less than 6 characters!!!";
        isValid = false;
      }

      if (!this.manhour.workingDate && this.manhour.inputType == 'Daily') {
        this.errors.workingDate = "WorkingDate is required!!!";
        isValid = false;
      }

      if (!this.manhour.actualManHour) {
        this.errors.actualManHour = "Actual Man Hour is required!!!";
        isValid = false;
      } else if (isNaN(this.manhour.actualManHour)) {
        this.errors.actualManHour = "Actual Man Hour must be number!!!";
        isValid = false;
      } else if (this.manhour.actualManHour.length > 11) {
        this.errors.actualManHour = "Actual Man Hour must be less than 11 characters!!!";
        isValid = false;
      }

      return isValid;
    },
    create() {
      console.log(JSON.stringify(this.manhour));
      if (this.validate()) {
        // Sử dụng fetch API để thực hiện yêu cầu POST
        fetch("https://localhost:5001/api/v1/export/manhourinput", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Thêm headers khác nếu cần
          },
          body: JSON.stringify(this.manhour) // chuyển đổi object manhour thành chuỗi JSON
        })
          .then(response => {
            if (!response.ok) {
              // Nếu phản hồi không thành công, đẩy lỗi vào Promise
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Chuyển đổi phản hồi thành JSON
          })
          .then(data => {
            // Xử lý dữ liệu JSON từ phản hồi
            console.log('Success:', data);
            this.manhour = {
              inputType: "Daily",
              actCode: "",
              pjCode: "",
              pjSbno: "",
              processCode: "",
              ym: "",
              workingDate: new Date().toISOString().slice(0, 19) + 'Z',
              actualManHour: ""
            };

            this.info.msg_success = true;
            setTimeout(() => {
              this.info.msg_success = "";
            }, 2000);


          })
          .catch(error => {
            // Xử lý lỗi
            console.error('Error:', error);
            // Hiển thị thông báo lỗi cho người dùng
            this.info.msg_error = true;
            setTimeout(() => {
              this.info.msg_error = "";
            }, 2000);

          });
      }
    },
    update() {
      console.log(JSON.stringify(this.manhour));
      if (this.validate()) {
        // Sử dụng fetch API để thực hiện yêu cầu POST
        fetch("https://localhost:5001/api/v1/export/manhourinput", {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Thêm headers khác nếu cần
          },
          body: JSON.stringify(this.manhour) // chuyển đổi object manhour thành chuỗi JSON
        })
          .then(response => {
            if (!response.ok) {
              // Nếu phản hồi không thành công, đẩy lỗi vào Promise
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Chuyển đổi phản hồi thành JSON
          })
          .then(data => {
            // Xử lý dữ liệu JSON từ phản hồi
            console.log('Success:', data);
            this.manhour = {
              inputType: "Daily",
              actCode: "",
              pjCode: "",
              pjSbno: "",
              processCode: "",
              ym: "",
              workingDate: new Date().toISOString().slice(0, 19) + 'Z',
              actualManHour: ""
            };

            this.info.msg_success = true;
            setTimeout(() => {
              this.info.msg_success = "";
            }, 2000);
            this.$router.push({ name: 'product.list'});


          })
          .catch(error => {
            // Xử lý lỗi
            console.error('Error:', error);
            // Hiển thị thông báo lỗi cho người dùng
            this.info.msg_error = true;
            setTimeout(() => {
              this.info.msg_error = "";
            }, 2000);

          });
      }
    },
    save() {
      if (this.$route.params.selectedItem) {
        this.update();
      } else {
        this.create();
      }
    },
    cancel() {
      this.manhour = {
        inputType: "Daily",
        actCode: "",
        pjCode: "",
        pjSbno: "",
        processCode: "",
        ym: "",
        workingDate: new Date().toISOString().slice(0, 19) + 'Z',
        actualManHour: ""
      };

    }
  },
};
</script>
