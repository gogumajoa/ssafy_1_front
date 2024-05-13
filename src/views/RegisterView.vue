<template>
  <section class="section pb-5">
    <div class="container">
      <div class="row mb-8 align-items-end center justify-content-center">
        <div class="col-md-8" data-aos="fade-up">
          <h2>Register</h2>

          <div class="container-fluid justify-content-center py-5">
            <div class="login-page">
              <div class="container table py-5">
                <div class="form row-6">
                  <form name="register-form" class="register-form col">
                    <div class="form-item">
                      <label class="form-label my-3">아이디</label><br />
                      <input
                        type="text"
                        class="form-control"
                        id="id"
                        name="id"
                        placeholder="id"
                        v-model="user_id"
                      />
                    </div>
                    <div class="form-item">
                      <label class="form-label my-3">비밀번호 </label>
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="password"
                        v-model="user_pw"
                      />
                    </div>
                    <div class="form-item">
                      <label class="form-label my-3">이메일</label>
                      <input
                        type="text"
                        class="form-control"
                        id="email"
                        name="email"
                        placeholder="email"
                        v-model="user_email"
                      />
                    </div>
                    <div class="form-item">
                      <label class="form-label my-3">이름</label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        name="name"
                        placeholder="name"
                        v-model="user_name"
                      />
                    </div>
                  </form>
                  <br /><br />
                  <div
                    class="readmore d-block w-100 justify-content-center row"
                  >
                    <button
                      class="btn btn-link center"
                      id="btnRegister"
                      @click="register()"
                    >
                      회원 등록
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      user_id: "",
      user_pw: "",
      user_email: "",
      user_name: "",
    };
  },
  methods: {
    register() {
      if (this.user_id === "") {
        alert("ID를 입력하세요.");
        return;
      }
      if (this.user_pw === "") {
        alert("비밀번호를 입력하세요.");
        return;
      }
      if (this.user_email === "") {
        alert("이메일을 입력하세요.");
        return;
      }
      if (this.user_name === "") {
        alert("이름을 입력하세요.");
        return;
      }

      alert("회원가입 되었습니다.");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
