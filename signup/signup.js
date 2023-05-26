const validateForm = ({ email, password, gender, role }) => {

    const roles = ['admin', 'user'];

    if (email.length <= 0) return { msg: 'Invalid Email', sts: false };
    if (password.length <= 0) return { msg: 'Invalid Password', sts: false };
    if (gender == null) return { msg: 'Choose Gender', sts: false };
    if ((role.length <= 0) || !roles.includes(role)) return { msg: 'Select Role', sts: false };

    // Password validation using regex
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(password)) {
        return { msg: 'Invalid Password format', sts: false };
    }

    return { sts: 'success', msg: 'All fields are valid' };
};

function setupForm() {

    const err = document.getElementById('errMsg')
    err.style.display = 'none'

    const formSignup = document.getElementById('signup-link')

    formSignup.onsubmit = ev => {

        ev.preventDefault()

        const formData = new FormData(ev.target)

        const user = Object.fromEntries(formData.entries())

        const { sts, msg } = validateForm(user)

        if (sts) apiSignup(user, formSignup)
        else {
            err.style.display = 'block'
            err.innerHTML = `<strong>${msg}</strong>`
        }

    }
}

setupForm()

function apiSignup(user, form) {
    const headers = {
        'content-type': 'application/json'
    }
    axios.post('http://localhost:8081/user/', user, { headers })

        .then(res => {
            form.reset()
            showSuccessModal()
        }).catch(err => console.log(err))
}

function showSuccessModal() {
    const myModalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
}

