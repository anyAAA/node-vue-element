
<template>
  <!-- 注册页面 -->
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">任港哲在线管理系统</span>
        <el-form
          :model="registerUser"
          :rules="rules"
          ref="registerForm"
          label-width="80px"
          class="registerForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="请输入email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="registerUser.password2" placeholder="请确认密码"></el-input>
          </el-form-item>

          <el-form-item label="选择身份">
            <el-select v-model="registerUser.identity" placeholder="请选择身份">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="员工" value="employee"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "register",
  component: {},
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: ""
      },
      rules: {
        // 需要验证的
        name: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur" // trigger 失去焦点的时候触发
          },
          {
            min: 2,
            max: 30,
            message: "长度要在2-30个字符之间",
            trigger: "blur"
          }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: "长度在6-30之间",
            trigger: "blur"
          }
        ],
        password2: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: "长度在6-30之间",
            trigger: "blur"
          },
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(registerForm) {
      this.$refs[registerForm].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/register  ", this.registerUser)
            .then(res => {
              // 注册成功
              this.$message({
                message: "账号注册成功",
                type: "success"
              });
            });
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>

<style lang="css" scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bj.jpg) no-repeat center center;
  background-size: 100% 125%;
}

.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  right: 9%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #ccc;
}
.submit_btn {
  width: 100%;
}
</style>
