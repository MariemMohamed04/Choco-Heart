//////////////////////////////////////////////////////////////

// Signup Starts
var nameSignUp = document.getElementById("signupName");
var emailSignUp = document.getElementById("signupEmail");
var passSignUp = document.getElementById("signupPass");
var btnSignup = document.getElementById("signupBtn");
var userData;

// Check Local Storage
if (localStorage.getItem("users") == null) {
  userData = [];
} else {
  userData = JSON.parse(localStorage.getItem("users"));
}

// Signup
function signUp() {
  var isValid = isValidate();
  var exists = isExist();

  if (isValid && !exists) {
    var signUp = {
      name: nameSignUp.value,
      email: emailSignUp.value,
      password: passSignUp.value,
    };
    userData.push(signUp);
    localStorage.setItem("users", JSON.stringify(userData));
    document.getElementById("message").innerHTML = '<span class="text-success m-3">Success</span>';
  }
  else {
    document.getElementById("message").innerHTML = '<span class="text-danger m-3">Incorrect Data! Please re-enter your Data Or Already Existing Email</span>';
  }
}

// Validate User Name
function nameRule() {
  var ruleName = document.getElementById("ruleName");
  var regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;

  if (regex.test(nameSignUp.value) == true && nameSignUp.value != "") {
    nameSignUp.classList.add("is-valid");
    nameSignUp.classList.remove("is-invalid");
    return true;
  }
  else {
    nameSignUp.classList.add("is-invalid");
    nameSignUp.classList.remove("is-valid");
    document.getElementById("ruleName").innerHTML = '<span class="text-danger">Name must include at least 4 letters.</span>';
    return false;
  }
}

// Validate User E-mail
function emailRule() {
  var ruleEmail = document.getElementById("ruleEmail");  
  var regex = /@[a-z]{5,10}(\.com)$/;

  if (regex.test(emailSignUp.value) == true && emailSignUp.value != "") {
    emailSignUp.classList.add("is-valid");
    emailSignUp.classList.remove("is-invalid");
    return true;
  }
  else {
    emailSignUp.classList.add("is-invalid");
    emailSignUp.classList.remove("is-valid");
    document.getElementById("ruleEmail").innerHTML = '<span class="text-danger">Email must be written as : name@example.com</span>';
    return false;
  }
}

// Validate User Password
function passRule() {
  var rulePass = document.getElementById("rulePass");  
  var regex = /^.{5,15}$/;

  if (regex.test(passSignUp.value) == true && passSignUp != "") {
    passSignUp.classList.add("is-valid");
    passSignUp.classList.remove("is-invalid");
    return true;
  }
  else {
    passSignUp.classList.add("is-invalid");
    passSignUp.classList.remove("is-valid");
    document.getElementById("rulePass").innerHTML = '<span class="text-danger">Password must contain at least 5 numbers.</span>';
    return false;
  }
}

// Existed Email
function isExist() {
  for (var i = 0; i < userData.length; i++) {
    if (userData[i].email.toLowerCase() == emailSignUp.value.toLowerCase()) {
      emailSignUp.classList.add("is-invalid");
      emailSignUp.classList.remove("is-valid");
      document.getElementById("message").innerHTML = '<span class="text-danger m-3">Email already exists!</span>';
      return true;
    }
  }
  return false;
}

// Check All Validations Function
function isValidate() {
  nameRule();
  emailRule();
  passRule();

  if (nameRule() == true && emailRule() == true && passRule() == true) {
    return true;
  }
  else {
    return false;
  }
}

// Signup Ends

//////////////////////////////////////////////////////////////

// Login Starts

var emailLogin = document.getElementById("loginEmail");
var passLogin = document.getElementById("loginPass");
var btnLogin = document.getElementById("loginBtn");
var userName = localStorage.getItem("sessionUserName");

// Login
function logIn() {
  if (emailLogin.value == "" || passLogin.value == "") {
    document.getElementById("message").innerHTML = '<span class="text-danger m-3">All inputs are required!</span>';
    return false;
  }

  for (var i = 0; i < userData.length; i++) {
    if (userData[i].email.toLowerCase() == emailLogin.value.toLowerCase() && userData[i].password.toLowerCase() == passLogin.value.toLowerCase()) {
      localStorage.setItem("sessionUserName", userData[i].name);
      btnLogin.setAttribute("href", "welcome.html");
    }
    else {
      document.getElementById("message").innerHTML = '<span class="text-danger m-3">Incorrect Data! Please re-enter your Data</span>';
    }
  }
  
}

// Login Ends

//////////////////////////////////////////////////////////////

// Welcome
function welcome() {
  document.getElementById("nameOfUser").innerHTML = "Welcome " + userName;
}

//////////////////////////////////////////////////////////////

// for logout
function logOut() {
  localStorage.removeItem("sessionUserName");
}
