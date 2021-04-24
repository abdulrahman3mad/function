const dropdown_icon = document.querySelector(".fa-caret-down")
const dropdown_list = document.getElementById("dropdown_list")

dropdown_icon.addEventListener("click", () => {
    dropdown_list.classList.toggle("none");
})