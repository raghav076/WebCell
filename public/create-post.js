const formDOM = document.querySelector('.post-form')
const nameInputDOM = document.querySelector('.name-input')
const descriptionInputDOM = document.querySelector('.description-input')
const secretInputDOM = document.querySelector('.secret-input')
const formAlertDOM = document.querySelector('.form-alert')


console.log("------^_^------");
window.getCookie = function(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}


formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const token = window.getCookie('token')
  const name = nameInputDOM.value
  const description = descriptionInputDOM.value
  const secret = secretInputDOM.value

  try {
    const {data} = await axios.post('/api/v1/post', { name, description, secret_code:secret } , { headers: {
        Authorization: `Bearer ${token}`
    }})
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `Whoop whoop, post created, here is your flag : ${data.Flag}`
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
