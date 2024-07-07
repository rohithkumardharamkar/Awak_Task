document.getElementById("user").value = localStorage.getItem("user") || '';//if values are in local storage place  them in there fields else empty
document.getElementById("pwd").value = localStorage.getItem("pwd") || '';

function login() {
    let user = document.getElementsByTagName("input")[0];//email field reference
    let pwd = document.getElementsByTagName("input")[1];//password field reference
    let uservalue = user.value//email value
    let pwdvalue = pwd.value//password value
    let err = document.getElementsByTagName("span")[1];//error show field  reference
    let stat = document.getElementsByTagName("span")[2];//login show field  reference
    let loader = document.getElementsByClassName("loader")[0];//loader
    stat.innerText=""

    if (uservalue == "" && pwdvalue == "")//If both fields are Empty
    {
        err.innerText = "Email and Password both are required"
        pwd.style.border = "1px solid red"
        user.style.border = "1px solid red"
        return
    }
    else {
        if (uservalue == "")//If username is empty
        {
            user.style.border = "1px solid red"
            err.innerText = "Email is required"
            return
        }
        else {
            let pattern = /^[a-z0-9]+[.]?[a-z0-9]+[@][a-z]{3,}[.](com|in)$/i
            if (pattern.test(uservalue)) {
                user.style.border = "1px solid green"
                err.innerText = ""


            }
            else {
                err.innerText = "Invalid Email "
                user.style.border = "1px solid red"
                return
            }


        }
        if (pwdvalue == "")//if password is empty
        {
            pwd.style.border = "1px solid red"
            err.innerText = "Password is required"
            return

        }
        else {

            let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#%*?&])[A-Za-z\d@$#!%*?&]{6,}$/
            if (pwdvalue.length > 6 && pattern.test(pwdvalue)) {
                pwd.style.border = "1px solid green"

            }
            else {
                err.innerText = err.innerText + " " + "Invalid Password "
                pwd.style.border = "1px solid red"
                return
            }

        }
    }
    save()
    loader.style.display = "block"//display the loader

    if (err.innerText == "") {

        setTimeout(() => {
            let data = fetchdata();
            console.log(data);
            loader.style.display = "none"//hiding the loader
            stat.innerText = "Login Success"//login success message

        }, 2000)// settimeout to show the loading effect

    }
}

function toggle() {
    let status = document.getElementsByTagName("input")[2].checked
    if (status)//if true then type of the password field will be changed to text and if false it will be changed to password type
    {
        pwd.type = "text"
    }
    else {
        pwd.type = "password"
    }
}
function save() //saving the data to local storage
{
    let savestatus = document.getElementsByTagName("input")[3].checked
    if (savestatus) {
        localStorage.setItem("user", user.value)
        localStorage.setItem("pwd", pwd.value)
    }
    else {
        localStorage.setItem("user", "")
        localStorage.setItem("pwd", "")
    }
}
let fetchdata = async () => {
    try {
        let fdata = await fetch("https://jsonplaceholder.typicode.com/posts",
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    "username": user.value,
                    "password": pwd.value
                })
            }
        )
        let jsondata = await fdata.json()


        user.value = ""
        pwd.value = ""
        return jsondata
    }
    catch (err) {
       
        console.log("err");
    }
}