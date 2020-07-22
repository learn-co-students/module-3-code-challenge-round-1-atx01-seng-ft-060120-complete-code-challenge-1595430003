let imageId = 5659 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {

    doEverything();

});

function doEverything() {
  fetch(imageURL)
  .then(res => res.json())
  .then(img => renderImageInfo(img));
};

function renderImageInfo(img) {

  // image
  imageDisplay = document.getElementById("image");
  imageDisplay.src = img.url;

  // name
  imageName = document.getElementById("title-name");
  imageName.innerText = img.name;

  // likes
  imageLikes = document.getElementById("likes");
  imageLikes.innerText = img.like_count;

  // comments
  imageCommentsList = document.getElementById("comments");

  for (const comment of img.comments) {
    imageComment = document.createElement("li");
    imageComment.innerHTML = comment.content

    imageCommentsList.appendChild(imageComment);
  };

  // add button functionality

  likeButton = document.getElementById("like_button");
  likeButton.addEventListener("click", (e) => {
    addLike(img);
  });

  commentForm = document.getElementById("comment_form");
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    renderComment(img, imageCommentsList);
    commentForm.reset();
  });
};

function renderComment(json, commentsList) {
  input = document.getElementById("comment_input").value;
  newComment = document.createElement("li");
  newComment.innerText = input;
  commentsList.appendChild(newComment);

  const data = {
    image_id: json.id,
    content: input
  }

  fetch(commentsURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

function addLike(json) {
  const likes = document.getElementById("likes")
  newLikes = (parseInt(likes.innerText) + 1).toString()
  likes.innerText = newLikes;

  const data = {
    image_id: json.id,
    like_count: newLikes
  };

  fetch(likeURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  });
};