<template>
  <section class="section pb-5">
    <div class="container">
      <div class="row mb-8 align-items-end center justify-content-center">
        <div class="col-md-8" data-aos="fade-up">
          <h2>Info</h2>
          <form action="#">
            <div class="row g-5">
              <div class="col">
                <div class="form-item">
                  <label class="form-label my-3">아이디 </label><br />
                </div>
                <div class="form-item">
                  <label class="form-label my-3">이메일 </label><br />
                </div>
                <div class="form-item">
                  <label class="form-label my-3">이름 </label><br />
                  {{}}
                </div>
              </div>
            </div>
          </form>
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
