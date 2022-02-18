const postsDOM = document.querySelector('.posts')
const loadingDOM = document.querySelector('.loading-text')

console.log("------^_^------");

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
      data: { posts },
    } = await axios.get('/api/v1/post/admin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    if (posts.length < 1) {
      postsDOM.innerHTML = '<h5 class="empty-list">No posts in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    } 
    const allposts = posts
      .map((post) => {
        const { name, post_id } = post
        return `<div class="col col-12">
                    <div class="single-post">
                    <a href="/post/${post_id}"  class="edit-link"><h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
                    </a>
                    </div>
                </div>`
      })
      .join('')
    postsDOM.innerHTML = allposts
  } catch (error) {
    postsDOM.classList.add('text-danger')
    postsDOM.style.display = 'block'
    if (error.response) {
        postsDOM.innerHTML = error.response.data.msg;
      } else if (error.request) {
        postsDOM.innerHTML = 'server did not respond';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
  }
  loadingDOM.style.visibility = 'hidden'
}

showposts()