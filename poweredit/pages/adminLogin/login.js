let username = document.querySelector('.username')
let password = document.querySelector('.password')
let errorMsg = document.querySelector('.errorMsg')

document.querySelector('.login_button').onclick = function () {
    let payload = {
        username: username.value,
        password: password.value
    }

    fetch(window.location.origin + '/api/auth/login', {
        method: 'POST',
        //redirect: 'follow',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg == 'verified') {
            window.location.href = window.location.origin + '/dashboard'
        } else {
            errorMsg.innerHTML = 'INVALID LOGIN'
            errorMsg.style.display = 'block'
        }
    })
    .catch(error => {
        errorMsg.innerHTML = 'SERVER ERROR'
        errorMsg.style.display = 'block'
    })
}