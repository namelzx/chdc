<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">新增</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="序号" width="220">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
    
      <el-table-column align="center" label="需求描述">
        <template slot-scope="scope">{{ scope.row.desc}}</template>
      </el-table-column>


      <el-table-column align="center" label="发布时间" min-width="80">
        <template slot-scope="scope">{{ scope.row.create_time|parseTime("{y}-{m}-{d} {h}:{i}:{s}") }}</template>
      </el-table-column>


      <el-table-column align="center" label="发布人" min-width="80">
        <template slot-scope="scope">
                <span v-if="scope.row.get_admin">
            {{ scope.row.get_admin.username}}
            </span>
            <span v-else>该员工已经被删除</span>
            </template>
      </el-table-column>
     

      <el-table-column align="center" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'修改需求':'添加需求'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-input type="textarea" :rows="2" placeholder="输入需求信息" v-model="role.desc"></el-input>
      </el-form>
      <div style="text-align:right;">
         <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from "path";
import { deepClone } from "@/utils";
import { mapGetters } from "vuex";

import {
  getRoutes,
  getRoles,
  addRole,
  deleteRole,
  updateRole
} from "@/api/role";
import { getDataByDetail, postDataByAdd, getIdByDel } from "@/api/demand";

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
      dialogVisible: false,
      dialogType: "new",
      checkStrictly: false,
      defaultProps: {
        children: "children",
        label: "title"
      },
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
    computed: {
    ...mapGetters(["sidebar", "avatar", "device", "name", "info"])
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
  
  created() {
    this.getData();
  },
  methods: {
    async getRoutes() {
      const res = await getRoutes();
      this.serviceRoutes = res.data;
      this.routes = this.generateRoutes(res.data);
    },
    async getRoles() {
      const res = await getRoles();
      this.rolesList = res.data;
    },
    getData() {
      getDataByDetail(this.listQuery).then(res => {
        console.log(res);
        this.rolesList = res.data.data;
        console.log(this.rolesList);
      });
    },

    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = "/") {
      const res = [];

      for (let route of routes) {
        // skip some route
        if (route.hidden) {
          continue;
        }

        const onlyOneShowingChild = this.onlyOneShowingChild(
          route.children,
          route
        );

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild;
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title
        };

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path);
        }
        res.push(data);
      }
      return res;
    },
    generateArr(routes) {
      let data = [];
      routes.forEach(route => {
        data.push(route);
        if (route.children) {
          const temp = this.generateArr(route.children);
          if (temp.length > 0) {
            data = [...data, ...temp];
          }
        }
      });
      return data;
    },
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
    
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.routes);
        this.$refs.tree.setCheckedNodes(this.generateArr(routes));
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false;
      });
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
    generateTree(routes, basePath = "/", checkedKeys) {
      const res = [];

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path);

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(
            route.children,
            routePath,
            checkedKeys
          );
        }

        if (
          checkedKeys.includes(routePath) ||
          (route.children && route.children.length >= 1)
        ) {
          res.push(route);
        }
      }
      return res;
    },
    async confirmRole() {
     this.role.admin_id=this.info.id
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
