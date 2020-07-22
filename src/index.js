let imageId = 5658 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
  const likeURL = `https://randopic.herokuapp.com/likes/`;
  const commentsURL = `https://randopic.herokuapp.com/comments/`;

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');

  fetch(imageURL)
    .then((res) => res.json())
    .then((json) => postImg(json));
});

function postImg(data){
  const img = document.getElementById('image');
  img.src = data.url;

  const name = document.getElementById('name');
  name.innerText = data.name;

  const like = document.getElementById('likes');
  like.innerText = data.like_count;

  const word = document.getElementById('comments');
  data.comments.forEach((e) => {

    let li = document.createElement('li');
    li.innerText = e.content;
    word.appendChild(li);
  });

  const btn = document.getElementById('like_button');
  btn.addEventListener("click", (e)=>{
    data.like_count++ ;
    like.innerText = data.like_count;
        addLike(data);
  })
}

function addLike(data){
  fetch (likeURL, {
    method: "POST",
    headers: {
      "Accept": 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify ({
      image_id: data.id ,
      likes: data.like_count
    })
  });
}
