const formDOM = document.querySelector('.login-form')
const nameDOM = document.querySelector('.name-input')
const questionDOM = document.querySelector('.question-input')
const answerDOM = document.querySelector('.answer-input')
const formAlertDOM = document.querySelector('.form-alert')

console.log("------^_^------");
formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = nameDOM.value
  const security_question = questionDOM.options[questionDOM.selectedIndex].text;
  const security_answer = answerDOM.value

  try {
    const {data} = await axios.post('/api/v1/auth/security_login', { name, security_question, security_answer })
    console.log(data)
    document.cookie = `token=${data.token}`;
    questionDOM.value = ''
    answerDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, ${data.user.name} logged in, access ${data.user.type}`
    formAlertDOM.classList.add('text-success')
    window.location.href = '/dashboard'
  } catch (error) {
    console.log(error)
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
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
