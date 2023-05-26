const signup = document.getElementById("sign-up-page")
signup.addEventListener("click", function (event) {
    window.location.href = "../signup/signup.html"
});


const validateForm = ({ email, password }) => {

    if (email.length <= 0) return { msg: 'invalid email', sts: false }
    if (password.length <= 0) return { msg: 'invalid password', sts: false }

    return { sts: 'success', msg: 'all fields are valid' }
}

function setupForm() {

    const err = document.getElementById('errMsg')
    err.style.display = 'none'

    const formSignup = document.getElementById('formLogin')

    formSignup.onsubmit = ev => {

        ev.preventDefault()
        const formData = new FormData(ev.target)

        const user = Object.fromEntries(formData.entries())
        console.log(user)

        const { sts, msg } = validateForm(user)

        if (sts) apiLogin(user, formSignup)
        else {
            err.style.display = 'block'
            err.innerHTML = `<strong>${msg}</strong>`
        }
    }
}

setupForm()

function apiLogin(user, form) {
    const headers = {
        'content-type': 'application/json'
    }
    console.log("inside api")
    axios.post('http://localhost:8081/user/loginv2', user, { headers })
        .then(httpResponse => {
            form.reset()

            console.log(httpResponse.data.bd)
            return httpResponse.data

        }).then(data => {
        console.log(data)
        const { role, id } = data.bd
        localStorage.setItem("userId", id)
        if (role === 'admin') window.location.href = '../dashboard/admin/viewAllEvents.html'
        else window.location.href = '../dashboard/users/userdashboard.html'
    })
        .catch(err => {
            console.log(err)
            const errDv = document.getElementById('errMsg')
            errDv.style.display = 'block'
            errDv.innerHTML = `<strong>${err.response.data.msg}</strong>`
        })
}
