<template>
  <div class="mibao">
    <div class="contain">
      <el-form
        :model="submitMibao"
        ref="submitForm"
        label-width="210px"
        class="submitForm"
      >
        <el-form-item label="请输入密码以验证" prop="password">
          <el-input
            type="password"
            v-model="submitMibao.password"
            placeholder="请输入密码以验证"
          ></el-input>
        </el-form-item>
        <el-form-item label="您可以选择更改你的密保问题1" prop="question1">
          <el-input
            type="text"
            v-model="submitMibao.question1"
            :placeholder="question1"
            :disabled="question1Disabled"
          ></el-input>
          <div
            class="editQuestion"
            @click="editQuestion('question1Disabled', $event)"
            v-show="question1Disabled"
          >
            修改
          </div>
        </el-form-item>
        <el-form-item label="请输入答案" prop="answer1">
          <el-input
            type="text"
            v-model="submitMibao.answer1"
            placeholder="请输入答案"
          ></el-input>
        </el-form-item>
        <el-form-item label="您可以选择更改你的密保问题2" prop="question2">
          <el-input
            type="text"
            v-model="submitMibao.question2"
            :placeholder="question2"
            :disabled="question2Disabled"
          ></el-input>
          <div
            class="editQuestion"
            @click="editQuestion('question2Disabled', $event)"
            v-show="question2Disabled"
          >
            修改
          </div>
        </el-form-item>
        <el-form-item label="请输入答案" prop="answer2">
          <el-input
            type="text"
            v-model="submitMibao.answer2"
            placeholder="请输入答案"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="submitbtn"
            @click="submitForm('submitForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Mibao",
  data() {
    return {
      submitMibao: {
        question1: "",
        question2: "",
        password: "",
        answer1: "",
        answer2: "",
        email: this.$store.getters.user.email,
        userid: this.$store.getters.user.id,
      },
      question1: "",
      question2: "",
      question1Disabled: true,
      question2Disabled: true,
    };
  },
  activated() {
    this.getQusetion();
  },
  methods: {
    submitForm(Form) {
      this.$axios
        .post(
          `/api/users/editmibao/${this.$store.getters.user.id}`,
          qs.stringify(this.submitMibao)
        )
        .then((res) => {
          if (res) {
            this.$message({
              type: "success",
              message: res.data,
            });
            this.submitMibao = {
              qusetion1: "",
              question2: "",
              password: "",
              answer1: "",
              answer2: "",
              email: this.$store.getters.user.email,
              userid: this.$store.getters.user.id,
            };
            this.question1Disabled = true;
            this.question2Disabled = true;
            this.getQusetion();
          } else {
            this.$message({
              type: "warning",
              message: "密码不正确",
            });
          }
        });
    },
    editQuestion(type, e) {
      e.stopPropagation();
      this[type] = false;
    },
    getQusetion() {
      const { email } = this.$store.getters.user;
      this.$axios.get(`/api/users/getencrypted/${email}`).then((res) => {
        let { question1, question2 } = res.data;
        this.question1 = question1 ?? "请尽快注册你的密保问题";
        this.question2 = question2 ?? "请尽快注册你的密保问题";
        this.question2Disabled = question2 ? true : false;
        this.question1Disabled = question1 ? true : false;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.mibao {
  width: 85%;
  margin-left: 15%;
  height: 100%;

  background-color: rgb(212, 211, 211);
  /* //box-sizing: border-box; */
}
.mibao .contain {
  width: 80%;
  height: 100%;
}
.mibao .submitForm {
  width: 100%;
  height: 200px;
  padding: 100px 0 0 200px;
}
.mibao .submitForm .el-form-item {
  width: 500px;
  height: 50px !important;
}
.submitbtn {
  margin-left: 231px;
}
.editQuestion {
  position: absolute;
  top: 0px;
  right: -60px;
  width: 50px;
  height: auto;
  text-align: center;
  color: #999;
  border-radius: 10px;
  background-color: #f5f7fa;
  cursor: pointer;
  border: 0;
}
</style>
