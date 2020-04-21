<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="40">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="50px"  align="center" label="钥匙">
        <template slot-scope="scope">
          <span>{{ scope.row.yaoshi}}</span>
        </template>
      </el-table-column>

      <el-table-column width="50px"  align="center" label="首勘">
        <template slot-scope="scope">
          <span>{{ scope.row.shoukan }}</span>
        </template>
      </el-table-column>

      <el-table-column width="50px" align='center' label="特征">
        <template slot-scope="scope">
           <span>{{ scope.row.tz }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align='center' label="是否有效" width="70px ">
        <template slot-scope="scope">
           <span>{{ scope.row.youxiao }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="50px" label="租/售" align='center'>
        <template slot-scope="scope">
             <span>{{ scope.row.chushou }}</span>
        </template>
      </el-table-column>

       <el-table-column align='center' min-width="130px" label="房屋编号">
       <template slot-scope="scope">
           <span>{{ scope.row.to_number }}</span>
        </template>
      </el-table-column>

        <el-table-column min-width="50px" align='center' label='楼栋'>
         <template slot-scope="scope">
           <span>{{ scope.row.loudong }}</span>
        </template>
      </el-table-column>

        <el-table-column min-width="50px" align='center' label='层数'>
           <template slot-scope="scope">
           <span>{{ scope.row.louceng }}</span>
        </template>
      </el-table-column>


        <el-table-column min-width="60px" align='center' label='总层数'>
            <template slot-scope="scope">
           <span>{{ scope.row.zongceng }}</span>
        </template>
      </el-table-column>

          <el-table-column min-width="80px" align='center' label='房型'>
     <template slot-scope="scope">
           <span>{{ scope.row.fangxing }}</span>
        </template>
        
      </el-table-column>

          <el-table-column min-width="70px" align='center' label='建筑面积'>
        <template slot-scope="scope">
           <span>{{ scope.row.jianmian }}</span>
        </template>
        
      </el-table-column>


          <el-table-column min-width="50px" align='center' label='房价'>
         <template slot-scope="scope">
           <span>{{ scope.row.fangjia }}</span>
        </template>
        
      </el-table-column>

        <el-table-column min-width="50px" align='center' label='报价'>
       <template slot-scope="scope">
           <span>{{ scope.row.baojia }}</span>
        </template>
      </el-table-column>

        <el-table-column min-width="80px" align='center' label='面积/单价'>
       <template slot-scope="scope">
           <span>{{ scope.row.mianprice }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <router-link :to="'/example/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/housing'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
      
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
