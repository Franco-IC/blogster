const btn = document.getElementById("password");
const show_eye = document.getElementById("show_eye");
const hide_eye = document.getElementById("hide_eye");

function password_show_hide() {
    hide_eye.classList.remove("d-none");
    if (btn.type === "password") {
        btn.type = "text";
        show_eye.classList.add("d-none");
    } else {
        btn.type = "password";
        show_eye.classList.remove("d-none");
        hide_eye.classList.add("d-none");
    }
}