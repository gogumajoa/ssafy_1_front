<template>
  <div class="container">
    <div class="container-fluid text-sm-center p-5 bg-light">
      <!-- bg-light is background color & p-5 is padding -->
      <h1 class="display-2">삐따기 세상2</h1>
      <p class="lead">가입하세요.</p>
    </div>
    <h2 class="mb-3 mt-3">Register</h2>
    <div class="mb-3">
      <!-- 각각의 input 이 focus 를 가진 경우에만 반응하도록 해야하고, click 할 때마다 valid 확인 필요 -->
      <input
        type="email"
        class="form-control"
        placeholder="Enter Email"
        :class="{
          'is-valid': isAccountEmailFocusAndValid,
          'is-invalid': isAccountEmailFocusAndInValid,
        }"
        v-model="accountEmail"
        @input="validateEmail"
        @focus="isAccountEmailFocus = true"
      />
      <button @click="findByEmail" class="btn btn-primary">확인하기</button>
      <!-- 테스트 코드 -->
      <!-- {{isAccountEmailFocus}} - {{ isAccountEmailFocusAndValid }} - {{ isAccountEmailFocusAndInValid }} -->
      <div class="valid-feedback">Valid.</div>
      <div class="invalid-feedback">올바른 Email 을 입력해 주세요.</div>
      <div class="invalid-feedback">존재하는 이메일 입니다.</div>
    </div>
    <div class="mb-3">
      <input
        type="password"
        class="form-control"
        placeholder="Enter Password"
        :class="{
          'is-valid': isAccountPasswordFocusAndValid,
          'is-invalid': isAccountPasswordFocusAndInvalid,
        }"
        v-model="accountPassword"
        @input="validatePassword"
        @focus="isAccountPasswordFocus = true"
      />
      <div class="valid-feedback">Valid.</div>
      <div class="invalid-feedback">
        1개 이상의 특수문자, 대소문자 및 숫자를 포함하고 8자리 이상이여야
        합니다.
      </div>
    </div>
    <div class="mb-3">
      <input
        type="password"
        class="form-control"
        placeholder="Conform Password"
        :class="{
          'is-valid': isAccountPassword2FocusAndValid,
          'is-invalid': isAccountPassword2FocusAndInvalid,
        }"
        v-model="accountPassword2"
        @input="validatePassword2"
        @focus="isAccountPassword2Focus = true"
      />
      <div class="valid-feedback">Valid.</div>
      <div class="invalid-feedback">비밀번호가 일치하지 않습니다.</div>
    </div>

    <div class="mb-3">
      <input
        type="name"
        class="form-control"
        placeholder="Enter Account Name"
        :class="{
          'is-valid': isAccountNameFocusAndValid,
          'is-invalid': isAccountNameFocusAndInvalid,
        }"
        v-model="accountName"
        @input="validateAccountName"
        @focus="isAccountNameFocus = true"
      />
      <div class="valid-feedback">Valid.</div>
      <div class="invalid-feedback">올바른 이름을 입력해 주세요.</div>
    </div>
    <div>
      <button @click="register" class="btn btn-primary">가입하기</button>
    </div>
  </div>
</template>

<script setup>
import http from "@/common/axios.js";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const accountName = ref("");
const accountEmail = ref("");
const accountPassword = ref("");
const accountPassword2 = ref("");

// focus
const isAccountNameFocus = ref(false);
const isAccountEmailFocus = ref(false);
const isAccountPasswordFocus = ref(false);
const isAccountPassword2Focus = ref(false);

// validation
const isAccountNameValid = ref(false);
const isAccountEmailValid = ref(false);
const isAccountPasswordValid = ref(false);
const isAccountPassword2Valid = ref(false);

// // 회원 구분
// const groupCode = "001";
// const codeList = ref([]);
// const AccountClsf = ref("010"); // 일반회원 default

const isAccountNameFocusAndValid = computed(
  () => isAccountNameFocus.value && isAccountNameValid.value
);
const isAccountNameFocusAndInvalid = computed(
  () => isAccountNameFocus.value && !isAccountNameValid.value
);
const isAccountEmailFocusAndValid = computed(
  () => isAccountEmailFocus.value && isAccountEmailValid.value
);
const isAccountEmailFocusAndInValid = computed(
  () => isAccountEmailFocus.value && !isAccountEmailValid.value
);
const isAccountPasswordFocusAndValid = computed(
  () => isAccountPasswordFocus.value && isAccountPasswordValid.value
);
const isAccountPasswordFocusAndInvalid = computed(
  () => isAccountPasswordFocus.value && !isAccountPasswordValid.value
);
const isAccountPassword2FocusAndValid = computed(
  () => isAccountPassword2Focus.value && isAccountPassword2Valid.value
);
const isAccountPassword2FocusAndInvalid = computed(
  () => isAccountPassword2Focus.value && !isAccountPassword2Valid.value
);

// const getCodeList = async () => {
//   let params = {
//     groupCode: groupCode, // reactive X
//   };

//   try {
//     let { data } = await http.get("/codes", { params }); // params : params shorthand property, Not JSON request
//     console.log("AccountsPage: data : ");
//     console.log(data);

//     codeList.value = data;
//   } catch (error) {
//     console.log("AccountsPage: error : ");
//     console.log(error);
//     alert("서버에 문제가 발생했습니다.");
//   }
// };
const findByEmail = async () => {
  let { data } = await http.post("/accounts/" + accountEmail.value);
  console.log(data);
  try {
    if (data.result == "1") console.log("사용 가능한 아이디입니다");
  } catch (error) {
    // LoginController 에서 ResponseEntity 로 404 보내면 여기로 떨어진다.
    console.log("LoginVue: error : ");
    console.log(error);
    // this.$alertify.error('로그인 과정에서 오류가 발생했습니다.');
    alert("내부에 이미 존재하는 아이디입니다");
  }
};
const register = async () => {
  if (
    !isAccountEmailValid.value ||
    !isAccountPasswordValid.value ||
    !isAccountPassword2Valid.value
  )
    return;

  let registerObj = {
    accountName: accountName.value,
    accountEmail: accountEmail.value,
    accountPassword: accountPassword.value,
  };

  try {
    let { data } = await http.post("/Accounts", registerObj); // JSON Request, { params : registerObj } X params 를 쓰면 get => query string
    console.log("AccountsPage: data : ");
    console.log(data.result);

    alert("회원가입을 축하합니다. 로그인 페이지로 이동합니다.");
    router.push("/login");
    // let $this = this;
    // $alertify.alert("회원가입을 축하합니다. 로그인 페이지로 이동합니다", function () {
    //    $$router.push("/login");
    // });
  } catch (error) {
    console.log("AccountsPage: error : ");
    console.log(error);
    // $alertify.error("서버에 문제가 발생했습니다.");
    alert("서버에 문제가 발생했습니다.");
  }
};

const validateAccountName = () => {
  isAccountNameValid.value = accountName.value.length > 0 ? true : false;
  console.log(isAccountNameValid.value);
};
const validateEmail = () => {
  // ^ 시작일치, $ 끝 일치
  // {2, 3} 2개 ~ 3개
  // * 0회 이상, + 1회 이상
  // [-_.] - 또는 _ 또는 .
  // ? 없거나 1회
  let regexp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  isAccountEmailValid.value = regexp.test(accountEmail.value) ? true : false;
  console.log(isAccountEmailValid.value);
};
const validatePassword = () => {
  let patternEngAtListOne = new RegExp(/[a-zA-Z]+/); // + for at least one
  let patternSpeAtListOne = new RegExp(/[~!@#$%^&*()_+|<>?:{}]+/); // + for at least one
  let patternNumAtListOne = new RegExp(/[0-9]+/); // + for at least one

  isAccountPasswordValid.value =
    patternEngAtListOne.test(accountPassword.value) &&
    patternSpeAtListOne.test(accountPassword.value) &&
    patternNumAtListOne.test(accountPassword.value) &&
    accountPassword.value.length >= 8
      ? true
      : false;
};
const validatePassword2 = () => {
  isAccountPassword2Valid.value =
    accountPassword.value == accountPassword2.value ? true : false;
};
</script>
