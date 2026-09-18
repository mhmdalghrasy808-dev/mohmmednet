// script.js
// ملف الجافاسكريبت الخاص بالموقع
// يحتوي على: السلايدر، التحقق من النماذج، الإشعارات، والمودال

// ---------- تشغيل السلايدر (شريط الصور) ----------
var slideIndex = 0;
var slides = document.getElementsByClassName("wow-slide");
var dots = document.getElementsByClassName("dot");

function showSlide(n) {
  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  slides[n].classList.add("active");
  dots[n].classList.add("active");
}

function nextSlide() {
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  showSlide(slideIndex);
}

if (slides.length > 0) {
  showSlide(slideIndex);

  document.querySelector(".wow-next").addEventListener("click", nextSlide);
  document.querySelector(".wow-prev").addEventListener("click", prevSlide);

  for (var i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function () {
      var clickedIndex = Array.prototype.indexOf.call(dots, this);
      slideIndex = clickedIndex;
      showSlide(slideIndex);
    });
  }

  // تبديل تلقائي كل 4 ثواني
  setInterval(nextSlide, 4000);
}


// ---------- إعدادات بسيطة لمكتبة Toastr ----------
if (typeof toastr !== "undefined") {
  toastr.options.positionClass = "toast-top-left";
  toastr.options.closeButton = true;
  toastr.options.timeOut = 3000;
}


// ---------- التحقق من نموذج إنشاء حساب ----------
var registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("reg-name").value;
    var email = document.getElementById("reg-email").value;
    var phone = document.getElementById("reg-phone").value;
    var pass = document.getElementById("reg-password").value;
    var pass2 = document.getElementById("reg-password-confirm").value;
    var terms = document.getElementById("reg-terms").checked;

    var ok = true;

    if (name.length < 3) {
      document.getElementById("nameError").innerHTML = "الاسم يجب ألا يقل عن 3 أحرف";
      ok = false;
    } else {
      document.getElementById("nameError").innerHTML = "";
    }

    if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
      document.getElementById("emailError").innerHTML = "البريد الإلكتروني غير صحيح";
      ok = false;
    } else {
      document.getElementById("emailError").innerHTML = "";
    }

    if (phone.length < 9) {
      document.getElementById("phoneError").innerHTML = "رقم الهاتف يجب ألا يقل عن 9 أرقام";
      ok = false;
    } else {
      document.getElementById("phoneError").innerHTML = "";
    }

    if (pass.length < 6) {
      document.getElementById("passError").innerHTML = "كلمة المرور يجب ألا تقل عن 6 أحرف";
      ok = false;
    } else {
      document.getElementById("passError").innerHTML = "";
    }

    if (pass != pass2) {
      document.getElementById("pass2Error").innerHTML = "كلمتا المرور غير متطابقتين";
      ok = false;
    } else {
      document.getElementById("pass2Error").innerHTML = "";
    }

    if (terms == false) {
      ok = false;
      toastr.error("يجب الموافقة على الشروط والأحكام");
    }

    if (ok == true) {
      toastr.success("تم إنشاء الحساب بنجاح");
      registerForm.reset();
    } else {
      toastr.error("الرجاء تصحيح الأخطاء في النموذج");
    }
  });
}


// ---------- التحقق من نموذج تسجيل الدخول ----------
var loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var email = document.getElementById("login-email").value;
    var pass = document.getElementById("login-password").value;
    var ok = true;

    if (email.indexOf("@") == -1) {
      document.getElementById("loginEmailError").innerHTML = "البريد الإلكتروني غير صحيح";
      ok = false;
    } else {
      document.getElementById("loginEmailError").innerHTML = "";
    }

    if (pass.length < 6) {
      document.getElementById("loginPassError").innerHTML = "كلمة المرور غير صحيحة";
      ok = false;
    } else {
      document.getElementById("loginPassError").innerHTML = "";
    }

    if (ok == true) {
      toastr.success("تم تسجيل الدخول بنجاح");
      loginForm.reset();
    } else {
      toastr.error("تحقق من البريد الإلكتروني وكلمة المرور");
    }
  });
}


// ---------- إشعار عند إرسال نموذج التواصل ----------
var contactForm = document.querySelector(".main-contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    toastr.success("تم إرسال رسالتك بنجاح");
    contactForm.reset();
  });
}


// ---------- المودال الثاني: تحميل بيانات الفاتورة عبر Ajax (jQuery) ----------
$(document).ready(function () {
  $("#billDetailsModal").on("show.bs.modal", function () {
    $.get("../js/bill.json", function (data) {
      $("#billDetailsModal .modal-body").html(data.body);
    });
  });

  $("#termsModal").on("show.bs.modal", function () {
    $.get("../js/terms.html", function (data) {
      $("#termsModal .modal-body").html(data);
    });
  });
});
