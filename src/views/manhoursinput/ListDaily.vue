<template>
  <div>
    <!-- Search Form -->
    <div class="container mt-5">
      <div class="toast custom-toast " v-bind:class="{'d-none': this.showMsg.msgSuccess}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000"
        style="position: fixed; top: 20px; right: 20px; min-width: 250px">
        <div class="toast-body">
          <i class="bi-check-circle-fill"></i>
          Success Toast!
        </div>
      </div>
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
  </div>
</template>


<script>

export default {
  data() {
    return {
      manHourInput: [],
      currentPage: 1,
      rowsPerPage: 60,
      showMsg: {
        msgSuccess: true,
        msgFailure: "",
      },
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
    this.showMsg.msgSuccess = true;
    console.log(this.showMsg.msgSuccess)
    this.load(); // Gọi phương thức khi component được mounted
    if (this.$route.params.msgUpdate) {
      this.showMsg.msgSuccess = false;
      setTimeout(() => {
        this.showMsg.msgSuccess = true;
      },3000)
    } else {
      this.showMsg.msgFailure = false;

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

<style scoped>
.custom-toast {
  background-color: #5cb85c;
  /* Màu nền toast */
  color: white;
  /* Màu chữ */
  border-radius: 20px;
  /* Bo tròn góc */
  padding: 10px 20px;
  /* Padding cho toast */
  display: flex;
  /* Để các items nằm trên một hàng */
  align-items: center;
  /* Căn giữa các items theo chiều dọc */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  margin-top: 150px;
  /* Bóng đổ nhẹ */
}

.custom-toast .bi-check-circle-fill {
  font-size: 1.5rem;
  /* Điều chỉnh kích thước icon */
  margin-right: 10px;
  /* Khoảng cách giữa icon và text */
}

.custom-toast img {
  height: 24px;
  /* Điều chỉnh kích thước icon Android */
  margin-left: 10px;
  /* Khoảng cách giữa text và icon Android */
}
</style>