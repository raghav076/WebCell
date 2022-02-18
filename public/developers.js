const devsDOM = document.querySelector('.developers')
const loadingDOM = document.querySelector('.loading-text')

window.getCookie = function(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}


console.log("------^_^------");
const showposts = async () => {
  loadingDOM.style.visibility = 'visible'
  const token = window.getCookie('token')
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
        return `<div class="col col-12 col-lg-3 col-md-6">
        <div class="card-group">
          <div class="card">
            <img class="bd-placeholder-img card-img-top" src="/img.jpeg" alt="Card image cap" width="100%" xmlns="http://www.w3.org/2000/svg"
            role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
            </div>
            <div class="card-footer">
              <button class="btn btn-default">
                <a href="${links}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-github"
                    viewBox="0 0 16 16">
                    <path
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
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