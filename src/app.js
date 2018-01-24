class App {
  constructor() {
    this.adapter = new Adapter('http://localhost:3000/api/v1/topics')
  }

  init() {
    this.adapter.getTopics(this.appendTopics)
    this.adapter.getCards(this.appendCards)
    this.attachEventListeners()
  }

  appendTopics(json) {
    json.forEach(topic => {
      $('#topic-list').append(new Topic(topic).renderListItem());
    });
  }

  appendCards(json) {
    json.forEach(card => {
      $('#card-list').append(new Card(card).renderCardItem())
    });
    // cardList.append(Card.renderNewCard)
  }

  attachEventListeners() {
    //Rendering cards for topic in card pane on click
    $('#topic-list').on('click', '.topics button', e => {
      const id = e.target.dataset.id;
      const topic = Topic.findById(parseInt(id));


      $('#card-list').empty()

      this.appendCards(topic.cards)
      // debugger
      $('#card-list').attr("topic-id", topic.id)
      console.log(topic)
    })

    //Create a new topic button is clicked
    $('#create-topic-div').on('click', 'button', e => {
      $('#topic-list').empty()
      $('#card-list').empty()
      $('footer').css('display', 'none');
      $('#create-new').html(Topic.renderNewForm());
    });

    //Submitting a new topic form and POSTing to db
    $('#create-new').on('submit', 'form', e => {
      e.preventDefault();
      const title = $(e.target).find('input').val();
      const description = $(e.target).find('textarea').val();

      let newTopicData = {
        title: title,
        description: description
      };

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
          this.adapter.getTopics(this.appendTopics)
        });

    })


    //Submitting Update Topic form (no functionality yet)
    $('#update').on('submit', 'form', e => {
      e.preventDefault();
      const id = e.target.dataset.id;
      const topic = Topic.findById(parseInt(id));
      const title = $(e.target).find('input').val();
      const description = $(e.target).find('textarea').val();

      const bodyJSON = {
        title,
        description
      };
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
          this.adapter.getTopics(this.appendTopics)
        });
    });



    //create new card and post to DB
    $('#card-list').on('submit', 'form', e => {

      e.preventDefault();
      // debugger
      let clue = $(e.target).find('input').val();
      let answer = $(e.target).find('textarea').val();
      let topicId = parseInt(document.querySelector('#card-list').getAttribute('topic-id'))
      let newCardData = {
        title: clue,
        content: answer,
        topic_id: topicId
      };
      console.log(newCardData)
      fetch(`http://localhost:3000/api/v1/cards`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(newCardData)
        })
        .then(res => res.json())
        .then(res => new Card(res))
      // .then(res => {
      // $('#new-card').empty()
      this.adapter.getCards(this.appendCards);

    })
  }


}
