document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5669 //Enter the id from the fetched image here

  imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  likeURL = `https://randopic.herokuapp.com/likes/`

  commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL).then(res => res.json()).then(image => renderImage(image));
})

function renderImage(image){
  //const imgSrc = document.getElementById('image');
  const nameTag = document.getElementById('name');
  const likesCount = document.getElementById('likes');
  const likeButton = document.getElementById('like_button');
  const commentForm = document.getElementById('comment_form');
  const inputField = document.getElementById('comment_input');
  const commentList = document.getElementById('comments');

  //imgSrc.innerHTML = `<img src="${image.url}" id="image" data-id="${image.id}"/>`
  nameTag.innerText = `${image.name}`;
  likesCount.innerText = `${image.like_count}`;
  
  image.comments.forEach(comment => {
    const commentItem = document.createElement('li');
    commentItem.innerText = `${comment.content}`;
    commentList.appendChild(commentItem);
  });

  commentForm.addEventListener("submit", (e) => {
    event.preventDefault();
    let input = inputField.value;
    const comment = document.createElement('li');
    comment.innerText = input;
    commentList.appendChild(comment);
    updateCommentsOnBackend(image, input)
    inputField.value = "";
  })

  likeButton.addEventListener("click", (e) => {
    image.like_count += 1;
    likesCount.innerText = `${image.like_count}`;
    updateLikesOnBackend(image);
  })
}

function updateCommentsOnBackend(image, input){
  fetch(commentsURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      image_id: image.id,
      content: input
    })
  }
)};

function updateLikesOnBackend(image, input){
  fetch(likeURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      image_id: image.id,
      like_count: image.like_count
    })
  }
)};