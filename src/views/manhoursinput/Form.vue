<template>
  <div class="product-info">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h3 class="display-5">Man Hours Input Infomation</h3>
      <router-link to="/product">Back</router-link>
    </div>

    <div class="container">
      <form @submit.prevent="save()">
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Input Type</label>
          <div class="col-sm-9">
            <select class="form-control" v-model="manhour.inputType">
              <option value="Daily" selected>Daily</option>
              <option value="Monthly">Monthly</option>
            </select>
            <div class="invalid-feedback text-left" v-if="errors.inputType">
              {{ errors.inputType }}
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Man Hour Act Code</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="manhour.actCode"
              v-bind:class="{ 'is-invalid': errors.actCode }" />
            <div class="invalid-feedback text-left" v-if="errors.actCode">
              {{ errors.actCode }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Project Code</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="manhour.pjCode"
              v-bind:class="{ 'is-invalid': errors.pjCode }" />
            <div class="invalid-feedback text-left" v-if="errors.pjCode">
              {{ errors.pjCode }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Project Sbno Code</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="manhour.pjSbno"
              v-bind:class="{ 'is-invalid': errors.pjSbno }" />
            <div class="invalid-feedback text-left" v-if="errors.pjSbno">
              {{ errors.pjSbno }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Process Code</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="manhour.processCode"
              v-bind:class="{ 'is-invalid': errors.processCode }" />
            <div class="invalid-feedback text-left" v-if="errors.processCode">
              {{ errors.processCode }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">YM</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="manhour.ym" v-bind:class="{ 'is-invalid': errors.ym }" />
            <div class="invalid-feedback text-left" v-if="errors.ym">
              {{ errors.ym }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Working Date</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="manhour.workingDate"
              v-bind:class="{ 'is-invalid': errors.workingDate }" :readonly="manhour.inputType === 'Monthly'" />
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
    };
  },
  methods: {
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
      }

      if (!this.manhour.pjCode) {
        this.errors.pjCode = "Project Code is required!!!";
        isValid = false;
      }

      if (!this.manhour.pjSbno) {
        this.errors.pjSbno = "PjSbno is required!!!";
        isValid = false;
      }

      if (!this.manhour.processCode) {
        this.errors.processCode = "Process Code is required!!!";
        isValid = false;
      } else if (isNaN(this.manhour.processCode)) {
        this.errors.processCode = "Process Code must be number!!!";
        isValid = false;
      }

      if (!this.manhour.ym) {
        this.errors.ym = "Year Month is required!!!";
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
      }

      return isValid;
    },
    save() {
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
            // Xử lý sau khi Promise được giải quyết
            // Có thể là chuyển hướng người dùng hoặc hiển thị thông báo thành công
          })
          .catch(error => {
            // Xử lý lỗi
            console.error('Error:', error);
            // Hiển thị thông báo lỗi cho người dùng
          });
      }
    }
    //,
    // save() {
    //   fetch('https://localhost:5001/api/v1/export/manhourinput', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // Bạn cần thêm các headers khác nếu API yêu cầu
    //     }
    //   })
    //     .then(response => {
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok ' + response.statusText);
    //       }
    //       return response.json(); // hoặc response.text() nếu API trả về dữ liệu dạng text
    //     })
    //     .then(data => {
    //       console.log(data);
    //       // Xử lý dữ liệu nhận được từ API tại đây
    //     })
    //     .catch(error => {
    //       console.error('There has been a problem with your fetch operation:', error);
    //       // Xử lý lỗi tại đây
    //     });

    // }
  },
};
</script>
