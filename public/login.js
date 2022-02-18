const formDOM = document.querySelector('.login-form')
const emailInputDOM = document.querySelector('.email-input')
const passwordInputDOM = document.querySelector('.password-input')
const formAlertDOM = document.querySelector('.form-alert')

console.log("------^_^------");
formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = emailInputDOM.value
  const password = passwordInputDOM.value

  try {
    const {data} = await axios.post('/api/v1/auth/login', { email, password })
    console.log(data)
    document.cookie = `token=${data.token}`;
    emailInputDOM.value = ''
    passwordInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, ${data.user.name} logged in, access ${data.user.type}`
    window.location.href = '/dashboard'
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.classList.add('text-danger')
    formAlertDOM.style.display = 'block'
    if (error.response) {
        formAlertDOM.innerHTML = error.response.data.msg;
      } else if (error.request) {
        formAlertDOM.innerHTML = 'server did not respond';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
  }
})
