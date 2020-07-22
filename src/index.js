  let imageId = 5661 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  fetchData();
})

function fetchData() {
  fetch(imageURL)
  .then(res => res.json())
  .then(json => {
    imageCard(json),
    commentCard(json),
    likeCard(json)
  })
}

function imageCard(img) {
  let imgCrd = document.getElementById('image')
  imgCrd.id = img.id;
  imgCrd.src = img.url;
  
  let imgName = document.getElementById('name')
  imgName.innerText = img.name
  
}

function commentCard(img) {
  let commentSec = document.getElementById('comments')
  img.comments.forEach(comment => {
    let li = document.createElement('li')
    li.innerHTML = `
      <p>${comment.content}</p>    
      <button class="delete" id="${comment.id}">Delete</button>  
    `
    commentSec.appendChild(li)
  })

  let deleteBtn = document.getElementsByClassName('delete')
  for (let btn of deleteBtn) { 
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      deleteComment(e.target.id)
  })}

  let Commentform = document.getElementsByTagName('form')[0]
  Commentform.addEventListener('submit', (e) => {
    e.preventDefault();
    const comment = e.target.comment_input.value
    let li = document.createElement('li')
    li.innerHTML += `
      <p>${comment}</p>
    `
    commentSec.appendChild(li)
    postComments(img, comment);
  })
  
}

function likeCard(img) {
  let likes = document.getElementById('likes')
  likes.innerText = img.like_count

  let likeButton = document.getElementById('like_button')
  likeButton.addEventListener('click', (e) => {
    likes.innerText++
    postLikes(img)
  })

}

function postLikes(img) {
  fetch(likeURL, {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "image_id": img.id
    })
  })
}

function postComments(img, comment) {
  fetch(commentsURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "image_id": img.id,
      "content": comment
    })
  })
}

function deleteComment(id) {
  fetch(`${commentsURL}/${id}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(json => {
    return json;
})
.then(alert("Comment Successfully Destroyed! Reload to remove Comment!"))
}