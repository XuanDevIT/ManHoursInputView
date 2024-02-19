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
            <select  class="form-control" v-model="manhour.inputType">
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
            <input  type="text" class="form-control" v-model="manhour.actCode"
              v-bind:class="{ 'is-invalid': errors.actCode }" />
            <div class="invalid-feedback text-left" v-if="errors.actCode">
              {{ errors.actCode }}
            </div>
          </div>
        </div>
        
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Project Code</label>
          <div class="col-sm-9">
            <input  type="text" class="form-control" v-model="manhour.pjCode"
              v-bind:class="{ 'is-invalid': errors.pjCode }" />
            <div class="invalid-feedback text-left" v-if="errors.pjCode">
              {{ errors.pjCode }}
            </div>
          </div>
        </div>
        
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Project Sbno Code</label>
          <div class="col-sm-9">
            <input  type="text" class="form-control" v-model="manhour.pjSbno"
              v-bind:class="{ 'is-invalid': errors.pjSbno }" />
            <div class="invalid-feedback text-left" v-if="errors.pjSbno">
              {{ errors.pjSbno }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Process Code</label>
          <div class="col-sm-9">
            <input  type="text" class="form-control" v-model="manhour.processCode"
              v-bind:class="{ 'is-invalid': errors.processCode }" />
            <div class="invalid-feedback text-left" v-if="errors.processCode">
              {{ errors.processCode }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">YM</label>
          <div class="col-sm-9">
            <input  type="text" class="form-control" v-model="manhour.ym"
              v-bind:class="{ 'is-invalid': errors.ym }" />
            <div class="invalid-feedback text-left" v-if="errors.ym">
              {{ errors.ym }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Working Date</label>
          <div class="col-sm-9">
            <input  type="text" class="form-control" v-model="manhour.workingDate"
              v-bind:class="{ 'is-invalid': errors.workingDate }" />
            <div class="invalid-feedback text-left" v-if="errors.workingDate">
              {{ errors.workingDate }}
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Actual ManHour</label>
          <div class="col-sm-9">
            <input  type="text" class="form-control" v-model="manhour.actualManHour"
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
        inputType: "",
        actCode: "",
        pjCode: "",
        pjSbno: "",
        processCode: "",
        ym: "",
        workingDate: "",
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

      if (!this.manhour.workingDate) {
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
      this.validate();
      console.log(this.validate());
    },
  },
};
</script>
