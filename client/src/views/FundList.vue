<template>
  <div class="fillContainer">
    <div class="ad">
      <el-form :inline="true" ref="add_data" :model="search_data">
        <!-- 筛选 -->
        <el-form-item label="按照时间筛选:">
          <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
          <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="handleSearch()">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRgiht">
          <el-button
            type="primary"
            size="small"
            icon="view"
            v-if="user.identity == 'manager'"
            @click="handleAdd()"
          >添加</el-button>
          <el-button type="primary" size="small" icon="el-icon-view" v-else disabled>非管理员无法添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length>0"
        :data="tableData"
        style="width: 100%;"
        max-height="450"
        border
      >
        <el-table-column label="序号" width="70" align="center" type="index"></el-table-column>
        <el-table-column label="创建时间" width="250" align="center" prop="date">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收支类型" width="150" align="center" prop="type"></el-table-column>
        <el-table-column label="收支描述" width="180" align="center" prop="describe"></el-table-column>
        <el-table-column label="收入" width="170" align="center" prop="income">
          <template slot-scope="scope">
            <span style="color:#00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支出" width="170" align="center" prop="expend">
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column label="现金账户" width="170" align="center" prop="cash">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="220" align="center" prop="remark"></el-table-column>

        <!-- 管理员操作部分 -->
        <el-table-column
          label="操作"
          width="320"
          v-if="user.identity=='manager'"
          align="center"
          prop="operation"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              icon="edit"
              type="warning"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              icon="delete"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>

        <!-- 非管理员操作部分 -->
        <el-table-column
          label="操作"
          width="320"
          v-else
          align="center"
          prop="operation"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              icon="edit"
              type="warning"
              @click="handleEdit(scope.$index, scope.row)"
              disabled
            >编辑</el-button>
            <el-button
              size="small"
              icon="delete"
              type="danger"
              disabled
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <DiaLog :dialog="dialog" :formData="formData" @update="getProfile"></DiaLog>
  </div>
</template>

<script>
import DiaLog from "@/components/DiaLog.vue";
export default {
  name: "fundList",
  components: { DiaLog },
  data() {
    return {
      search_data: {
        startTime: "",
        endTime: ""
      },
      filterTableData: [],
      paginations: {
        page_index: 1, // 当前位于哪一页
        total: 0, // 总数
        page_size: 5, // 一页显示多少条
        page_sizes: [5, 15, 20, 25], // 每页显示多少条
        layout: "total,sizes,prev,pager,next,jumper" // 翻页属性
      },
      tableData: [],
      allTableData: [],
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      dialog: {
        show: false,
        title: "",
        option: "edit"
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.getProfile(); // 获取个人信息
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios
        .get("/api/profiles")
        .then(res => {
          this.allTableData = res.data;
          this.filterTableData = res.data;
          // 设置分页数据
          this.setPaginations();
        })
        .catch(err => {
          console.log(err);
        });
    },
    setPaginations() {
      // 分页属性设置
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      // 设置默认的分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    // 编辑
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    handleDelete(index, row) {
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
        this.$message({
          message: "数据删除成功",
          type: "delete"
        });
        this.getProfile();
      });
    },
    handleAdd() {
      // 添加
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      this.formData = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
    },
    // 处理 页码 条 大小
    handleSizeChange(page_size) {
      // 切换 size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      // 设置默认的分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    // 当前 页 变动
    handleCurrentChange(page) {
      // 获取当前页
      let index = this.paginations.page_size * (page - 1);
      // 数据的总数
      let nums = this.paginations.page_size * page;
      // 容器
      let tables = [];

      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    },

    handleSearch() {
      // 筛选
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        this.getProfile();
        return;
      }

      const sTime = this.search_data.startTime.getTime();
      const eTime = this.search_data.endTime.getTime();

      this.allTableData = this.filterTableData.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= sTime && time <= eTime;
      });
      // 分页数据
      this.setPaginations();
    }
  }
};
</script>


<style lang="css" scoped>
.fillContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRgiht {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>