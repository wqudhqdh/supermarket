<template>
  <el-table
    :data="
      userlist.filter(
        (data) =>
          !search || data.username.includes(search)
      )
    "
    style="width: 100%"
  >
    <el-table-column prop="username" label="姓名" width="150">
    </el-table-column>
    <el-table-column prop="phone" label="电话" width="150"> </el-table-column>
    <el-table-column prop="email" label="邮箱" width="200"> </el-table-column>

    <el-table-column prop="level" label="权限" width="150"> </el-table-column>
    <el-table-column prop="account" label="账户余额" width="150">
    </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          type="text"
          placeholder="输入关键字搜索"
        />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { getAllUser, deleteUser } from "network/admin.js";
export default {
  name: "userManager",
  data() {
    return {
      userlist: [],
      search: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index,row) {
        console.log(row._id)
      deleteUser(row._id).then((res) => {
        if (res === "success") {
          alert("删除成功");
          this.userlist.splice(index,1);
        }
      });
    },
  },
  created() {
    let p = new Promise((resolve, reject) => {
      getAllUser().then((res) => {
        if (res != "error") {
          resolve(res);
        }
      });
    });
    p.then((value) => {
      this.userlist = value;
    });
  },
};
</script>
<style>
</style>