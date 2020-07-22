  let imageId = 5662 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {

  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  getImageData()

});

function getImageData(){
  fetch(imageURL)
  .then(response => response.json())
  .then(json => {
    console.log(json);
    addImage(json)
  })
};

function addImage(image){
  const img = document.getElementById('image');
  img.src = image.url;

  document.getElementById("name").innerText = image.name;

  let likeCount = image["like_count"]
  document.getElementById("likes").innerText = likeCount;

  const likeButton = document.getElementById("like_button");

  likeButton.addEventListener('click', () => {
    console.log('click');
    postLikes();
    document.getElementById("likes").innerText = likeCount += 1;
  });

  commentsFiller(image)

};

function commentsFiller(image){

  const commentForm = document.getElementById('comment_form');

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    postComment();
  });

  for(const comment of image.comments){
    createLi(comment)
  };
};

function createLi(comment){
  const commentsUl = document.getElementById("comments");
  const commentLi = document.createElement('li');

  commentLi.innerHTML = `
    ${comment.content}
    <button>Delete</button>
  `;

  const deleteButton = commentLi.getElementsByTagName('button')[0];

  deleteButton.addEventListener('click', () => {
    console.log('test');
    
    deleteComment(comment);
    commentsUl.removeChild(commentLi);
  });

  // commentLi.innerText = comment.content;
  commentsUl.appendChild(commentLi);
};

function postLikes(){
  fetch(likeURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "image_id": imageId
    })
  })
};

function postComment(){
  const commentContent = document.getElementById('comment_input').value;

  console.log(commentContent);

  fetch(commentsURL, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "image_id": imageId,
      "content": commentContent
    })
  })
  .then(response => response.json())
  .then(json => {
    createLi(json);
    document.getElementById('comment_input').value = ""
  })
};

function deleteComment(comment){
  fetch(`${commentsURL}/${comment.id}`, {
    method: 'DELETE',
  })
};

