<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="搜索楼盘名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-input
        v-model="listQuery.fangxing"
        placeholder="房型"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-input
        v-model="listQuery.yongtu"
        placeholder="用途"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-input
        v-model="listQuery.loudong"
        placeholder="楼栋"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-input
        v-model="listQuery.louceng"
        placeholder="层数"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-divider content-position="left">条件筛选</el-divider>

      <el-select
        clearable
        v-model="listQuery.yaoshi"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
        placeholder="选择钥匙"
      >
        <el-option
          v-for="item in yaoshiOpt"
          :key="item.index"
          :label="item.name"
          :value="item.index"
        />
      </el-select>

      <el-select
        clearable
        v-model="listQuery.timetype"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
        placeholder="购买时间"
      >
        <el-option
          v-for="item in timeTypeOpt"
          :key="item.index"
          :label="item.name"
          :value="item.index"
        />
      </el-select>

      <el-select
        clearable
        v-model="listQuery.youxiao"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
        placeholder="是否有效"
      >
        <el-option
          v-for="item in statusOpt"
          :key="item.index"
          :label="item.name"
          :value="item.index"
        />
      </el-select>

      <el-select
        clearable
        v-model="listQuery.chushou"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
        placeholder="出售情况"
      >
        <el-option
          v-for="item in chushouOpt"
          :key="item.index"
          :label="item.name"
          :value="item.index"
        />
      </el-select>
      <el-select
        clearable
        v-model="listQuery.tz"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
        placeholder="选择特征"
      >
        <el-option v-for="item in tzOpt" :key="item.index" :label="item.name" :value="item.index"/>
      </el-select>


<el-select
        clearable
        v-model="listQuery.zj"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
        placeholder="证件"
      >
        <el-option
          v-for="item in zjOpt"
          :key="item.index"
          :label="item.name"
          :value="item.index"
        />
      </el-select>
      <el-select
        clearable
        v-model="listQuery.zhuangxiu"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
        placeholder="装修情况"
      >
        <el-option
          v-for="item in zhuangxiuOpt"
          :key="item.index"
          :label="item.name"
          :value="item.index"
        />
      </el-select>

      <el-select
        clearable
        v-model="listQuery.admin_id"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
        placeholder="归属人"
      >
        <el-option v-for="item in admin" :key="item.id" :label="item.username" :value="item.id"/>
      </el-select>
      <el-divider content-position="left">操作</el-divider>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>

      <!-- <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >隐藏特征</el-checkbox>-->

      <el-tag>今日新增:{{day}}</el-tag>
      <el-tag type="success">本周新增:{{week}}</el-tag>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :row-class-name="tableRowClassName"
      @row-dblclick="focushandel"
    >
      <el-table-column align="center" label="ID" width="40">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="楼盘名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="购买时间">
        <template slot-scope="scope">
          <span>{{ scope.row.timetype|timeview}}</span>
        </template>
      </el-table-column>

      <el-table-column width="50px" align="center" label="钥匙">
        <template slot-scope="scope">
          <span>{{ scope.row.yaoshi|ysview}}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="showReviewer" width="50px" align="center" label="首勘">
        <template slot-scope="scope">
          <span>{{ scope.row.shoukan }}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" label="特征">
        <template slot-scope="scope">
          <span>{{ scope.row.tz|tzMap}}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="证件">
        <template slot-scope="scope">
          <span>{{ scope.row.zj|zjMap}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center" label="状态" width="50px ">
        <template slot-scope="scope">
          <span>{{ scope.row.youxiao|yxMap }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" label="租/售" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.chushou|xzMap }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" label="房型">
        <template slot-scope="scope">
          <span>{{ scope.row.fangxing }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="90px" align="center" label="建筑面积">
        <template slot-scope="scope">
          <span>{{ scope.row.jianmian }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column min-width="50px" align="center" label="低价">
        <template slot-scope="scope">
          <span>{{ scope.row.fangjia }}</span>
        </template>
      </el-table-column> -->

      <el-table-column min-width="50px" align="center" label="报价">
        <template slot-scope="scope">
          <span>{{ scope.row.baojia }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="90px" align="center" label="面积/单价">
        <template slot-scope="scope">
          <span>{{ scope.row.mianprice }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="90px" align="center" label="装修">
        <template slot-scope="scope">
          <span>{{ scope.row.zhuangxiu|zxMap }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="90px" align="center" label="公私">
        <template slot-scope="scope">
          <span>{{ scope.row.gongsi|gsMap }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" label="委托时间">
        <template slot-scope="scope">
          <span>{{ scope.row.youxiaotime|timeSub}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" label="到期时间">
        <template slot-scope="scope">
          <span>{{ scope.row.youxiaotime|timeSubend }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="70px" align="center" label="楼栋">
        <template slot-scope="scope">
          <span>{{ scope.row.loudong }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="50px" align="center" label="层数">
        <template slot-scope="scope">
          <span>{{ scope.row.louceng }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="70px" align="center" label="总层数">
        <template slot-scope="scope">
          <span>{{ scope.row.zongceng }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="90px" align="center" label="用途">
        <template slot-scope="scope">
          <span>{{ scope.row.yongtu }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="140px" label="房屋编号">
        <template slot-scope="scope">
          <span>{{ scope.row.to_number }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="140px" label="归属人">
        <template slot-scope="scope">
          <span>{{ scope.row.get_admin.username }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="140px" label="最新跟进时间">
        <template slot-scope="scope">
          <span
            v-if="scope.row.follow_time"
          >{{ scope.row.follow_time|parseTime("{y}-{m}-{d} {h}:{i}:{s}") }}</span>
          <span v-else>暂无跟进</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="查看" min-width="150" fixed="right">
        <template slot-scope="scope">
          <router-link :to="'/example/edit/'+scope.row.id">
            <el-button type="primary" size="small">查看</el-button>
          </router-link>
           <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { fetchList, postIdByfocus ,getIdByDel} from "@/api/housing";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "ArticleList",
  components: { Pagination },
  filters: {
    timeSub(str) {
      if (str !== null) {
        return str.substr(0, 10);
      }
    },
    timeSubend(str) {
      if (str !== null) {
        return str.substring(25, 35);
      }
    },
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    zjMap(status) {
      const statusMap = {
        1: "证在银行",
        2: "证在手上",
        3: "其他"
      };
      return statusMap[status];
    },

    tzMap(status) {
      const statusMap = {
        1: "全程房",
        2: "托管房",
        3: "精耕房",
        3: "普通房"
      };
      return statusMap[status];
    },


  tzMap(status) {
      const statusMap = {
        1: "全程房",
        2: "托管房",
        3: "精耕房",
        3: "普通房"
      };
      return statusMap[status];
    },

    timeview(status) {
      const statusMap = {
        1: "不满两年",
        2: "满两年",
        3: "满五唯一"
      };
      return statusMap[status];
    },

    yxMap(status) {
      const statusMap = {
        1: "有效",
        2: "无效"
      };
      return statusMap[status];
    },
    xzMap(status) {
      const statusMap = {
        1: "出售",
        2: "出租",
        3: "其他"
      };
      return statusMap[status];
    },
    zxMap(status) {
      const statusMap = {
        1: "毛坯",
        2: "简单装修",
        3: "中等装修",
        4: "精装修",
        5: "豪华装修",
        6: "其他"
      };
      return statusMap[status];
    },
    gsMap(status) {
      const statusMap = {
        1: "公盘",
        2: "独家"
      };
      return statusMap[status];
    },
    ysview(str) {
      if (str === 1) {
        return "有";
      } else {
        return "无";
      }
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      admin: [],
      listQuery: {
        page: 1,
        limit: 20
      },
      day: 0,
      week: 0,
      showReviewer: false,

      tzOpt: [
        {
          index: 1,
          name: "全程房"
        },
        {
          index: 2,
          name: "托管房"
        },
        {
          index: 3,
          name: "精耕房"
        },
        {
          index: 4,
          name: "普通房"
        }
      ], 
      yaoshiMap:[

        {
            index: 1,
          name: "有"
        },
          {
            index: 2,
          name: "无"
        }
      ],
      //特征
      timeTypeOpt: [
        {
          index: 1,
          name: "不满两年"
        },
        { index: 2, name: "满两年" },
        { index: 3, name: "满五唯一" }
      ], //购买时间
      statusOpt: [
        {
          index: 1,
          name: "有效"
        },
        {
          index: 2,
          name: "无效"
        }
      ], //状态
      gongsiOpt: [
        {
          index: 1,
          name: "公盘"
        },
        { index: 2, name: "私盘" }
      ], //公私
      taxOpt: [
        { index: 1, name: "净收" },
        {
          index: 2,
          name: "买家承担"
        },
        {
          index: 3,
          name: "各付各的"
        }
      ], //税费
      commissionOpt: [
        { index: 1, name: "付佣" },
        {
          index: 2,
          name: "不付"
        }
      ], //付佣
      paywayOpt: [
        { index: 1, name: "不限" },
        {
          index: 2,
          name: "一次性"
        },
        {
          index: 3,
          name: "按揭"
        }
      ], //付佣
      rightsOpt: [
        { index: 1, name: "商品房" },
        {
          index: 2,
          name: "商住两用"
        },
        {
          index: 3,
          name: "经济适用"
        },
        {
          index: 4,
          name: "公房"
        },
        {
          index: 5,
          name: "其他"
        },
        {
          index: 6,
          name: "自建楼"
        },
        {
          index: 7,
          name: "宅基地"
        }
      ], //产权
      zjOpt: [
        { index: 1,
         name: "证在银行" },
        {
          index: 2,
          name: "证在手上"
        },
        {
          index: 3,
          name: "其他"
        }
      ], //证件

      yaoshiOpt: [
        { index: 1, name: "有" },
        {
          index: 2,
          name: "无"
        }
      ], //钥匙
      chushouOpt: [
        { index: 1, name: "出售" },
        {
          index: 2,
          name: "出租"
        },
        {
          index: 3,
          name: "空置"
        }
      ], //现状
      zhuangxiuOpt: [
        { index: 1, name: "毛坯" },
        {
          index: 2,
          name: "简单装修"
        },
        {
          index: 3,
          name: "中等装修"
        },
        {
          index: 4,
          name: "精装修"
        },
        {
          index: 5,
          name: "豪华装修"
        },
        {
          index: 6,
          name: "其他"
        }
      ], //装修
      householdOpt: [
        { index: 1, name: "无" },
        {
          index: 2,
          name: "送部分"
        },
        {
          index: 3,
          name: "全送"
        },
        {
          index: 4,
          name: "其他"
        }
      ],
      sourceOpt: [
        { index: 1, name: "上门" },
        {
          index: 2,
          name: "来电"
        },
        {
          index: 3,
          name: "驻守"
        },
        {
          index: 4,
          name: "贴条"
        },
        {
          index: 5,
          name: "朋友"
        },
        {
          index: 6,
          name: "老客户介绍"
        },
        {
          index: 7,
          name: "网络"
        },
        {
          index: 8,
          name: "扫街"
        }
      ], //信息来源
      entrustOpt: [
        { index: 1, name: "未签" },
        {
          index: 2,
          name: "签约"
        },
        {
          index: 3,
          name: "独家"
        },
        {
          index: 4,
          name: "贴条"
        },
        {
          index: 5,
          name: "限时"
        },
        {
          index: 5,
          name: "收购"
        }
      ], //委托
      belongOpt: [
        { index: 1, name: "买卖" },
        {
          index: 2,
          name: "继承"
        },
        {
          index: 3,
          name: "赠与"
        },
        {
          index: 4,
          name: "拍卖"
        },
        {
          index: 5,
          name: "司法"
        }
      ] //权属来源
    };
  },
  created() {
    this.getList();
  },
  methods: {
    focushandel(row, column, event) {
      var str = "此操作将设置数据为重要数据状态,是否继续";
      if (row.focus === 2) {
        str = "此操作将取消重要数据状态,是否继续";
      }
      this.$confirm(str, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          postIdByfocus(row).then(res => {
            console.log(res);
          });
          this.$message({
            type: "success",
            message: "设置成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.focus === 1) {
        return "warning-row";
      } else if (row.focus === 2) {
        return "success-row";
      }
      return "";
    },
    handleDelete({ $index, row }) {
      this.$confirm("确定要删除?", "提醒", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
           getIdByDel(row.id).then(res=>{

          })
          this.list.splice($index, 1);
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data;
        this.admin = response.gouadmin;
        this.total = response.data.total;
        this.day = response.day;
        this.week = response.week;

        this.listLoading = false;
      });
    }
  }
};
</script>
<style scoped>
.app-container >>> .el-table {
  font-size: 10px;
}
.app-container >>> .el-table--medium th {
  padding: 1px 0;
}
.app-container >>> .el-table--medium td {
  padding: 1px 0;
}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

