const postDOM = document.querySelector('.card')
const loadingDOM = document.querySelector('.loading-text')
const id = document.querySelector('.post_id').innerHTML
const isAdmin = document.querySelector('.user_type').innerHTML === 'admin'
const postAlertDOM = document.querySelector('.post-alert')

console.log("------^_^------");
window.getCookie = function(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

const showPost = async () => {
  loadingDOM.style.visibility = 'visible'
  const token = window.getCookie('token')
  try {
    const {
      data: { post },
    } = await axios.get(`/api/v1/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { name, description, status } = post
      var innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <hr>
                <p class="card-text">${description}</p>
            </div>`

            innerHTML += `<div class="card-footer">
                          ${status}
                      </div>`
      if(isAdmin){
        innerHTML += `<div class="card-footer">
                        <button class="btn btn-outline-success" onclick=acceptRequest(${id})>
                            Accept Request
                        </button>
                        <button class="btn btn-outline-danger" onclick=declineRequest(${id})>
                            Reject Request
                        </button>
                      </div>`
      } 
      
      
      postDOM.innerHTML = innerHTML
      
  } catch (error) {
      postDOM.classList.add('text-danger')
      postDOM.style.display = 'block'
      if (error.response) {
        postDOM.innerHTML = error.response.data.msg;
        } else if (error.request) {
          postDOM.innerHTML = 'server did not respond';
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
  }
  loadingDOM.style.visibility = 'hidden'
}


async function acceptRequest(post_id) {
  party.confetti(postDOM);
  const token = window.getCookie('token')
  try {
    const {data} = await axios.post(`/api/v1/post/adminaccept/${post_id}`,{}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    postAlertDOM.style.display = 'block'
    postAlertDOM.innerHTML = `Congratulations, post has been accepted. <br> Here is your final(😜) FLAG : ${data.Flag}. <br><br> Whats next you ask ?, Well we have bonus flags for you. Explore the code and maybe you can find the bonus flags and insure your win. Connect with the discord admins once you find them. <br><br> PS: Not for beginners. <br> 👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻`
    postAlertDOM.classList.add('text-success')
    showPost()
  } catch (error) {
    postAlertDOM.style.display = 'block'
    if (error.response) {
      postAlertDOM.innerHTML = error.response.data.msg;
      } else if (error.request) {
        postAlertDOM.innerHTML = 'server did not respond';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
  }
}

async function declineRequest(post_id) {
  const token = window.getCookie('token')
  try {
    const {data} = await axios.post(`/api/v1/post/adminreject/${post_id}`,{}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    postAlertDOM.style.display = 'block'
    postAlertDOM.textContent = `success, post rejected`
    postAlertDOM.classList.add('text-success')
  } catch (error) {
    postAlertDOM.style.display = 'block'
    if (error.response) {
      postAlertDOM.innerHTML = error.response.data.msg;
      } else if (error.request) {
        postAlertDOM.innerHTML = 'server did not respond';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
  }
  showPost()
}

showPost()

