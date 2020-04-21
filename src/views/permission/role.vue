<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">新增</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="序号" width="220">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column align="center" label="管理员名称" width="220">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column align="center" label="所属角色">
        <template slot-scope="scope">{{ scope.row.roles|rolefle }}</template>
      </el-table-column>

       <el-table-column align="center" label="查看手机" width="80">
        <template slot-scope="scope">{{ scope.row.is_phone|view }}</template>
      </el-table-column>

        <el-table-column align="center" label="删除房源" width="80">
        <template slot-scope="scope">{{ scope.row.is_del|view }}</template>
      </el-table-column>

           <el-table-column align="center" label="编辑房源" width="80">
        <template slot-scope="scope">{{ scope.row.is_edit|view }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作"  fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'修改管理员':'添加管理员'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="管理员">
          <el-input v-model="role.username" placeholder="管理员名称"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="role.password" type="password" placeholder="输入密码"/>
        </el-form-item>
        <el-form-item label="所属角色">
          <el-select v-model="role.roles" placeholder="管理员权限">
            <el-option
              v-for="item in roleOp"
              :key="item.roles"
              :label="item.name"
              :value="item.roles"
            ></el-option>
          </el-select>
        </el-form-item>

        

        <el-form-item label="权限组">
          <el-checkbox v-model="role.is_phone">查看手机</el-checkbox>
          <el-checkbox v-model="role.is_edit">编辑房源</el-checkbox>
          <el-checkbox v-model="role.is_del">删除房源</el-checkbox>
            <el-checkbox v-model="role.is_price">查看低价</el-checkbox>
        </el-form-item>
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
import {
  getRoutes,
  getRoles,
  addRole,
  deleteRole,
  updateRole
} from "@/api/role";
import { getDataByDetail, postDataByAdd ,getIdByDel} from "@/api/admin";

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
  filters:{
    rolefle(str){
      if(str==='editor'){
        return '普通员工'
      }else{
        return '管理员'
      }
    },
    view(str){
      if(str===1){
        return '有';
      }else{
        return '无'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes;
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


        if (this.role.is_price === 0) {
        this.role.is_price = false;
      } else {
        this.role.is_price = true;
      }
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

           getIdByDel(row.id).then(res=>{

          })
          console.log(row)
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
      postDataByAdd(this.role).then(res => {
        this.dialogVisible=false
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
