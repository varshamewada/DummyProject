let name_result = false;
let email_result = false;
let number_result = false;
let dob_result = false;
let gender_result = false;
let pass_result = false;
let cpass_result = false;

function setError(id, error) {
  const element = document.getElementById(id);
  element.getElementsByClassName("seterror")[0].innerHTML = error;
}

function clearError(id) {
  const element = document.getElementById(id);
  element.getElementsByClassName("seterror")[0].innerHTML = "";
}

function validateName() {
  let name = document.forms.sign_up_form.fullname.value;
  document.getElementById("name_id").setAttribute("maxlength", 25);
   const nameRegex =
    /^([a-zA-Z][a-zA-Z][a-zA-Z]+\s)+[a-zA-Z][a-zA-Z][a-zA-Z]+(\s*)+$/;
  if (!name || !name.match(nameRegex)) {
    setError(
      "name",
      "Full Name must have min 7 and max 25 characters , numbers & special characters are not allowed"
    );
    name_result = false;
    disableSubmitButton();
  } else {
    clearError("name");
    name_result = true;
    enableSubmitButton();
  }
}

function validateEmail() {
  const email = document.forms["sign_up_form"]["email"].value;
  const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z]{3,}(\.[a-zA-Z]{2,3})+$/;
 
  if (!email || !email.match(emailRegex)) {
    setError("email", "Please Enter a valid email!");
    email_result = false;
    disableSubmitButton();
  } else {
    clearError("email");
    email_result = true;
    enableSubmitButton();
}
}
function validateNumber() {
  const regExp1 = /(\d)\1{9}/;
  const regExp2 = /^[6-9][0-9]{9}$/;
  
  const phone = document.sign_up_form.phone.value;
  if (!phone || regExp1.test(phone) || !regExp2.test(phone)) {
    setError("phone", "Please Enter a valid phone number");
    number_result = false;
    disableSubmitButton();
  } else  {
    clearError("phone");
    number_result = true;
    enableSubmitButton();
 }

}

function setDateMaxMinValue() {
  const current = new Date();
  let dd = current.getDate();
  let mm = current.getMonth() + 1;
  const yyyy = current.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  const maxDate = yyyy + "-" + mm + "-" + dd;
  const minDate = "1900-01-01";
  document.getElementById("mydate").setAttribute("max", maxDate);
  document.getElementById("mydate").setAttribute("min", minDate);
}

window.onload = setDateMaxMinValue();

function validateDOB() {
  const dob = document.sign_up_form.dob.value;

  if (!dob) {
    setError("dob", "Please Enter DOB!");
    dob_result = false;
    disableSubmitButton();
  } else {
    clearError("dob");
    dob_result = true;
    enableSubmitButton();
  }
}

function validateGender() {
  const genders = document.getElementsByName("gender");
  if (genders[0].checked || genders[1].checked) {
    clearError("gender");
    gender_result = true;
    enableSubmitButton();
  } else {
    setError("gender", "You must select your gender!");
    gender_result = false;
    disableSubmitButton();
  }
}

function validatePassword() {
  const password = document.sign_up_form.password.value;
  const confirm_password = document.sign_up_form.cpassword.value;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  if (!password || !password.match(passwordRegex) ) {
    setError(
      "password",
      "Password must have one uppercase,one lowercase,numbers,special character, min 8 and max 15 characters"
    );
    pass_result = false;
    disableSubmitButton();
  } else  {
    clearError("password");
    pass_result = true;
    enableSubmitButton();
  } 

  if (password === confirm_password) {
    validateConfirmPassword();
  }
  if (pass_result && cpass_result) {
    validateConfirmPassword();
  }
}

function validateConfirmPassword() {
  const password = document.sign_up_form.password.value;
  const confirm_password = document.sign_up_form.cpassword.value;
 
  if (confirm_password === password) {
    clearError("cpassword");
    cpass_result = true;
    enableSubmitButton();
  } else {
    setError("cpassword", "password & Confirm Password do not matched");
    cpass_result = false;
    disableSubmitButton();
  }
}

function validateAddress() {
  document.getElementById("address_id").setAttribute("maxlength", 100);
}

function disableSubmitButton() {
  const btn = document.getElementById("submitId");
  btn.setAttribute("disabled", true);
}

window.onload = disableSubmitButton();

function enableSubmitButton() {
  if (checkForm()) {
    document.getElementById("submitId").removeAttribute("disabled");
   }
}

function checkForm() {
  if (
    name_result &&
    email_result &&
    number_result &&
    dob_result &&
    gender_result &&
    pass_result &&
    cpass_result
  ) {
    return true;
  } else {
    return false;
  }
}
