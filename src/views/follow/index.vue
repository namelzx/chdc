<template>
  <div class="app-container">
    <!-- <el-button type="primary" @click="handleAddRole">新增</el-button>

 <el-select
        clearable
        v-model="listQuery.admin_id"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
        placeholder="归属人"
      >
        <el-option v-for="item in adminlist" :key="item.id" :label="item.username" :value="item.id"/>
    </el-select>-->

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column align="center" label="跟进内容" min-width="50">
        <template slot-scope="scope">{{ scope.row.str }}</template>
      </el-table-column>
      <el-table-column align="center" label="所属房源">
        <template slot-scope="scope">
          <router-link :to="'/example/edit/'+scope.row.housing_id">
            {{scope.row.housing_id}}-
            <span v-if="scope.row.housing">{{ scope.row.housing.name}}</span>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
      </el-table-column>
      <el-table-column align="center" label="跟进时间" min-width="80">
        <template slot-scope="scope">{{ scope.row.create_time| parseTime('{y}-{m}-{d} {h}:{i}')}}</template>
      </el-table-column>

      <el-table-column align="center" label="归属人" width="80">
        <template slot-scope="scope">
  <span v-if="scope.row.admin">{{ scope.row.admin.username}}</span>
  <span v-else>该员工已经被删除</span>
</template>
      </el-table-column>
    </el-table>
   
  </div>
</template>

<script>
import path from "path";
import { deepClone } from "@/utils";
import { mapGetters } from "vuex";

import { GetFollow } from "@/api/housing";
import { constants } from "crypto";

const defaultRole = {
  key: "",
  name: "",
  description: "",
  routes: []
};

export default {
  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      adminlist: [],
      dialogVisible: false,
      dialogType: "new",
      checkStrictly: false,
      defaultProps: {
        children: "children",
        label: "title"
      },
      info: {},
      roleOp: [
        {
          roles: "admin",
          name: "管理员"
        },
        {
          roles: "editor",
          name: "普通员工"
        }
      ],
      listQuery: {
        page: 1,
        limit: 20
      }
    };
  },
  filters: {
    rolefle(str) {
      if (str === "editor") {
        return "普通员工";
      } else {
        return "管理员";
      }
    },
    view(str) {
      if (str === 1) {
        return "有";
      } else {
        return "无";
      }
    }
  },
  computed: {
    ...mapGetters(["sidebar", "roles", "device", "name", "info", "admin"])
  },
  created() {
    this.getData();
    //如果不是超级管理员那么只显示当前用户数据
    if (this.roles[0] !== "admin") {
      this.listQuery.admin_id = this.info.id;
    }
  },
  methods: {
    async getRoutes() {
      const res = await getRoutes();
      this.serviceRoutes = res.data;
    },
    async getRoles() {
      const res = await getRoles();
      this.rolesList = res.data;
    },
    getData() {
      GetFollow(this.listQuery).then(res => {
        this.rolesList = res.data.data;
        // this.adminlist=res.gouadmin
      });
    },

    handleFilter() {
      this.listQuery.page = 1;
      this.getData();
    },
    // Reshape the routes structure so that it looks the same as the sidebar

    handleAddRole() {
      this.role = Object.assign({}, defaultRole);
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([]);
      }
      this.dialogType = "new";
      this.dialogVisible = true;
    },
    handleEdit(scope) {
      this.dialogType = "edit";
      this.dialogVisible = true;
      this.checkStrictly = true;
      this.role = deepClone(scope.row);
      if (this.role.is_phone === 0) {
        this.role.is_phone = false;
      } else {
        this.role.is_phone = true;
      }

      if (this.role.is_edit === 0) {
        this.role.is_edit = false;
      } else {
        this.role.is_edit = true;
      }
      if (this.role.is_del === 0) {
        this.role.is_del = false;
      } else {
        this.role.is_del = true;
      }
    },
    handleDelete({ $index, row }) {
      this.$confirm("确定要删除?", "提醒", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          getIdByDel(row.id).then(res => {});
          console.log(row);
          this.rolesList.splice($index, 1);
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(err => {
          console.error(err);
        });
    },

    async confirmRole() {
      this.role.admin_id = this.name;
      postDataByAdd(this.role).then(res => {
        this.dialogVisible = false;
        this.getData();
        this.$message({
          type: "success",
          message: "操作成功"
        });
      });
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null;
      const showingChildren = children.filter(item => !item.hidden);

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0];
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path);
        return onlyOneChild;
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return onlyOneChild;
      }

      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
