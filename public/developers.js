const devsDOM = document.querySelector('.developers')
const loadingDOM = document.querySelector('.loading-text')
// Load posts from /api/posts

window.getCookie = function(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

const showposts = async () => {
  loadingDOM.style.visibility = 'visible'
  const token = window.getCookie('token')
  console.log(token)
  try {
    const {
      data: { devs },
    } = await axios.get('/api/v1/info/getDevs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    if (devs.length < 1) {
      devsDOM.innerHTML = '<h5 class="empty-list">No Devs in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    } 
    const allposts = devs
      .map((dev) => {
        const { name, links } = dev
        return `<div class="col col-12 col-lg-6 col-md-6">
        <div class="card-group">
            <div class="card">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="140"
                    xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap"
                    preserveAspectRatio="xMidYMid slice" focusable="false">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
                </svg>
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-default">
                        <a href="${links}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                class="bi bi-telegram" viewBox="0 0 16 16">
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
                            </svg>
                        </a>
                    </button>
                </div>
            </div>
        </div>
    </div>`
      })
      .join('')
    devsDOM.innerHTML = allposts
  } catch (error) {
    devsDOM.style.display = 'block'
    if (error.response) {
      devsDOM.innerHTML = error.response.data.msg;
      } else if (error.request) {
        devsDOM.innerHTML = 'server did not respond';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
  }
  loadingDOM.style.visibility = 'hidden'
}

showposts()