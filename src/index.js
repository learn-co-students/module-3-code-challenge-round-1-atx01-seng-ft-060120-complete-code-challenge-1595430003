document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5657

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getPic(imageId);

});

function getPic(imageId) {
  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
  .then(response => response.json())
  .then(pic => picInfo(pic, imageId));
};

function picInfo(pic, imageId){
  const title = document.getElementById("name")
    title.innerText = `
    ${pic.name}
    `
  const likes = document.getElementById("likes")
    likes.innerText = `
    ${pic.like_count}
    `

  const likeButton = document.getElementById("like_button")
    likeButton.addEventListener("click", e => {
      pic.like_count++
      const updatedLikes = likes.innerText = `
      ${pic.like_count}
      `
      console.log(updatedLikes)
      increaseLikes(imageId, updatedLikes)
    })
  pic.comments.forEach(comment => makeListOfComments(comment))
};

function makeListOfComments(comment){
  const comments = document.getElementById("comments")
  const commentLi = document.createElement("li")
  commentLi.innerHTML = `
  ${comment.content}
  `
  comments.appendChild(commentLi)
}

function increaseLikes(imageId, updatedLikes){
  const likeObject = {
    "like-count": updatedLikes
  }
  fetch(`https://randopic.herokuapp.com/images/${imageId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(
      likeObject
    )
  })
  .then(response => response.json())
  .then(object => console.log(object))
}


  



