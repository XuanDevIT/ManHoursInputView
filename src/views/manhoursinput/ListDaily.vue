<template>
  <div>
    <!-- Search Form -->
    <div class="container mt-5">
      <h2>Search</h2>
      <form @submit.prevent="load()">
        <div class="row">
          <div class="col-md-4 form-group">

            <input type="text" v-model="obSearch.actCode" class="form-control" id="actCode" name="actCode" maxlength="10"
              placeholder="Enter Act Code">
          </div>
          <div class="col-md-4 form-group">
            <input type="text" v-model="obSearch.pjCode" class="form-control" id="pjCode" name="pjCode" maxlength="20"
              placeholder="Enter Project Code">
          </div>
          <div class="col-md-4 form-group">
            <input type="text" v-model="obSearch.pjSbno" class="form-control" id="pjSbno" name="pjSbno" maxlength="2"
              placeholder="Enter Project Subnumber">
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 form-group">
            <input type="number" v-model="obSearch.processCode" class="form-control" id="processCode" name="processCode"
              placeholder="Enter Process Code" min="0">
          </div>
          <div class="col-md-4 form-group">
            <input type="text" v-model="obSearch.ymFrom" class="form-control" id="ymFrom" name="ymFrom"
              placeholder="YM From">
          </div>
          <div class="col-md-4 form-group">
            <input type="text" v-model="obSearch.ymTo" class="form-control" id="ymTo" name="ymTo" placeholder="YM To">
          </div>
        </div>
        <button type="submit" class="btn btn-primary mb-3">Search</button>
      </form>
    </div>


    <div class="product-list">
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h2 class="display-5">ManHoursInput Management</h2>
        <p><router-link to="/product/create">Add New</router-link></p>
      </div>

      <div class="container">
        <div class="card-deck mb-3 text-center">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Act Code</th>
                <th scope="col">Project Code</th>
                <th scope="col">Project Sbno</th>
                <th scope="col">Process Code</th>
                <th scope="col">YM</th>
                <th scope="col">Working Date</th>
                <th scope="col">Actual ManHour</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in paginatedData" :key="item.id" @dblclick="handleRowDblClick(item)">
                <th scope="row">{{ (currentPage - 1) * rowsPerPage + index + 1 }}</th>
                <td>{{ item.actCode }}</td>
                <td>{{ item.pjCode }}</td>
                <td>{{ item.pjSbno }}</td>
                <td>{{ item.processCode }}</td>
                <td>{{ item.ym }}</td>
                <td>{{ item.workingDate }}</td>
                <td>{{ item.actualManHour }}</td>
              </tr>
            </tbody>
          </table>

          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click="changePage(currentPage - 1)">Previous</a>
              </li>
              <li class="page-item" :class="{ active: page === currentPage }" v-for="page in totalPages" :key="page">
                <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click="changePage(currentPage + 1)">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div>
    <!-- Other components -->
    <button @click="showToast">Show Toast</button>
    <!-- Toast component -->
    <Toast v-if="show" :title="toastTitle" :message="toastMessage" :type="toastType" />
  </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      manHourInput: [],
      currentPage: 1,
      rowsPerPage: 60,
      showConfirmModal: false,
      selectedItem: {
        inputType: "Daily",
        actCode: "",
        pjCode: "",
        pjSbno: "",
        processCode: "",
        ym: "",
        workingDate: new Date().toISOString().slice(0, 19) + 'Z',
        actualManHour: ""
      },
      obSearch: {
        actCode: "",
        pjCode: "",
        pjSbno: "",
        processCode: "",
        ymFrom: "",
        ymTo: ""
      }

    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.manHourInput.length / this.rowsPerPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      return this.manHourInput.slice(start, end);
    }
  },
  mounted() {
    this.load(); // Gọi phương thức khi component được mounted
    if (this.$route.params.msgUpdate) {
      console.log(this.$route.params.msgUpdate);
    } else {
      console.log(this.$route.params.msgUpdate);

    }
  },
  methods: {
    load() {
      const params = Object.entries(this.obSearch)
        .filter(([key, value]) => value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      const url = `https://localhost:5001/api/v1/manhourinput?${params}`;
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Bạn cần thêm các headers khác nếu API yêu cầu
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json(); // hoặc response.text() nếu API trả về dữ liệu dạng text
        })
        .then(data => {
          this.manHourInput = data.data.manHourInput;
          // Xử lý dữ liệu nhận được từ API tại đây
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
          // Xử lý lỗi tại đây
        });

    },
    changePage(pageNumber) {
      if (pageNumber < 1 || pageNumber > this.totalPages) {
        return;
      }
      this.currentPage = pageNumber;
    },
    handleRowDblClick(item) {
      // Đưa dữ liệu của hàng vào object
      this.selectedItem = item;

      this.$router.push({ name: 'product.create', params: { selectedItem: item } });
      //this.$router.push('/product/create');
    },
  }
}

</script>
