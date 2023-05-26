const homeLink = document.getElementById("home-link");
homeLink.addEventListener("click", reloadPage);
function reloadPage() {
  window.location.reload();
}

document.getElementById("login-link").addEventListener("click", function() {
  window.location.href = "../Loginpage/login.html";
});

document.getElementById("register-link").addEventListener("click", function() {
  window.location.href = "../signup/signup.html";
});

document.getElementById("logout-link").addEventListener("click", function() {
  window.location.href = "../signup/signup.html";
});

function showAboutUs() {
  const container = document.getElementById("about-us-container");
  container.style.display = "block";
}



