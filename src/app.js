class App {
  constructor() {
    this.adapter = new Adapter('http://localhost:3000/api/v1/topics')
  }

  init(){
    this.adapter.getTopics(this.appendTopics)
    this.adapter.getCards(this.appendCards)
    this.attachEventListeners()
  }

  appendTopics(json){
    json.forEach(topic => {
      $('#topic-list').append(new Topic(topic).renderListItem());
    });
  }

  appendCards(json) {
    json.forEach(card => {
      debugger
      $('#card-list').append(new Card(card).renderListItem());
    });
  }

  attachEventListeners() {
    // $('#topic-list').on('click', 'button', e => {
    //   const id = e.target.dataset.id;
    //   const topic = Topic.findById(parseInt(id));
    //   $('#topic-list').empty()
    //   $('footer').css('display', 'none');
    //   $('#update').html(topic.renderUpdateForm());
    // });


    //Rendering cards for topic in card pane on click
    $('#topic-list').on('click', '.topics', e => {
      const id = e.target.dataset.id;
      const topic = Topic.findById(parseInt(id));
      $('footer').css('display', 'block');
      //JS

      console.log(topic)

      // let cards = topic.findCards();
      // let card_container = document.getElementById("card-list").innerHTML = `<h1>${topic.title}
      //     <button type="button" id="create-card">Create Card</button></h1>`
      // for (const card in cards) {
      //   card_container.appendChild(card.renderCardItem())
      // }
      // document.getElementById('create-card').addEventListener('click', e=> {
      //   console.log(e)
      //   document.getElementById("card-list").appendChild(renderNewCard())
      // })
    })




    //Create a new topic button is clicked
    $('#create-topic-div').on('click', 'button', e => {
      $('#topic-list').empty()
      $('footer').css('display', 'none');
      $('#create-new').html(Topic.renderNewForm());
    });

    //Submitting a new topic form and POSTing to db
    $('#create-new').on('submit', 'form', e => {
      e.preventDefault();
      const title = $(e.target).find('input').val();
      const description = $(e.target).find('textarea').val();

      let newTopicData = { title: title, description: description };

      fetch(`http://localhost:3000/api/v1/topics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newTopicData)
      })
      .then(res => res.json()).then(res => new Topic(res))
      .then(res => {
        console.log(res),
        $('#topic-list').empty()
        $('footer').css('display', 'block')
        $('#create-new').empty()
      this.adapter.getTopics(this.appendTopics)});

    })


    //Submitting Update Topic form (no functionality yet)
    $('#update').on('submit', 'form', e => {
      e.preventDefault();
      const id = e.target.dataset.id;
      const topic = Topic.findById(parseInt(id));
      const title = $(e.target).find('input').val();
      const description = $(e.target).find('textarea').val();

      const bodyJSON = { title, description };
      fetch(`http://localhost:3000/api/v1/topics/${topic.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(bodyJSON)
      })
        .then(res => res.json())
        .then(res => {
          console.log(res)
          $('#topic-list').empty()
          $('#update').empty()
          $('footer').css('display', 'block')
          this.adapter.getTopics(this.appendTopics)});
    });
  }
}
