$(document).ready(() => {
  const app = new App();
  app.init();




  // .then(json => {
  //   json.forEach(topic => {
  //     $('#topic-list').append(new Topic(topic).renderListItem());
  //   });
  // });



  function makeTopic() {
  let titleInput = document.getElementById('title-input').value;
  let descInput = document.getElementById('desc-input').value;
  fetch('http://localhost:3000/api/v1/topics', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      title: titleInput,
      description: descInput
    })
  }).then(res => res.json()).then(resp => new Topic(resp));

    document.getElementById('body-input').value = '';
    document.getElementById('title-input').value = '';
  }
  let submitBtn = document.getElementById('submit')
  submitBtn.addEventListener('click', makeTopic)
});
