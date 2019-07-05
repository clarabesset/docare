const btn = document.getElementById("btn_toggle_nav_mobile");
const nav = document.getElementById("menu_mobile");

btn.onclick = function(evt) {
  console.log(evt);
  nav.classList.toggle("is-active");
};
