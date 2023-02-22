function validform() {
    var name = document.getElementById("name").value;
    console.log(name)

    var name = document.getElementById("password").value;
    console.log(password)

    var reg_name = /^[a-z]+$/i;
    var reg_password = /^[a-z]{10;100}/i;

    if (reg_name.test(name) == false) {
        alert("Ошибка в данных ФИО")
    }
    if (reg_password.test(password) == false) {
        alert("Ошибка в данных пароль")
    }
}
document.querySelector(".save").addEventListener("click", validform);

//test=document.querySelectorAll("input");
//console.log(test);
