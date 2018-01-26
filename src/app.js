class App {
  constructor() {
    this.adapter = new Adapter('http://localhost:3000/api/v1/topics')
  }

  init() {
    this.adapter.getTopics(this.appendTopics)
    this.adapter.getCards()
    this.attachEventListeners()
  }

  appendTopics(json) {
    json.forEach(topic => {
      $('#topic-list').append(new Topic(topic).renderListItem());
    });
  }

  attachEventListeners() {
    //Rendering cards for topic in card pane on click
    $('#topic-list').on('click', '.topics button', e => {
      const id = e.target.dataset.id;
      const topic = Topic.findById(parseInt(id));
      $('#card-list').empty()
      let cardList = document.getElementById('card-list')

      topic.cards.forEach(function(c) {
        cardList.innerHTML += c.renderCardItem()

      })
      cardList.innerHTML += Card.renderNewCard()

      $('#card-list').attr("topic-id", topic.id)
      console.log(topic)
    })

    //edit not functional!
    // $('#card-list').on('click', '.edit-card', e => {
    //   let sizzile = event.target.parentElement.parentElement
    //   let sId = sizzile.dataset.id
    //   $('#card-list').empty()
    //   $('#card-list').append(Card.renderUpdateCard())
    //
    // })

    $('#card-list').on('click', '.delete-card', e => {

      let cardId = parseInt(event.target.parentElement.parentElement.dataset.id)

      let topicId = parseInt(event.target.parentElement.parentElement.parentElement.dataset.id)

      const topic = Topic.findById(topicId)

      fetch(`http://localhost:3000/api/v1/cards/${cardId}`, {
        method: 'DELETE'
      }).then(response => {



      })
    })

    $('#topic-search-bar').on('keyup', e => {
          $('#topic-list').empty()
          let input = e.target.value

          let searchResults = Topic.all.filter(function(t){
                return t['title'].toLowerCase().includes(input.toLowerCase())
              })

          for (let t of searchResults) {
            $('#topic-list').append(t.renderListItem())
          }
            })
          }
        }

    $('#create-topic-div').on('click', 'button', e => {
      $('#topic-list').empty()
      $('#topic-search-bar').removeAttr("style").hide();
      $('#topic-list').html(Topic.renderNewForm());
    });


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
          let topicDiv = document.getElementById('topic-list')
          topicDiv.innerHTML = ''
          Topic.all.forEach(function(t) {
            topicDiv.innerHTML += t.renderListItem()
          })
          $("#topic-search-bar").show();
        });

    })


    $('#update').on('submit', 'form', e => {
      e.preventDefault();
      const id = e.target.dataset.id;
      const topic = Topic.findById(parseInt(id));
      const title = $(e.target).find('input').val();
      const description = $(e.target).find('textarea').val();

      const bodyJSON = {
        title: title,
        description: description
      }

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
          $('#topic-list').empty()
          // $('#update').empty()
          // $('footer').css('display', 'block')
        });
    });


    $('#card-list').on('submit', 'form', e => {

      e.preventDefault();
      let clue = $(e.target).find('input').val();
      let answer = $(e.target).find('textarea').val();
      let topicId = parseInt(document.querySelector('#card-list').getAttribute('topic-id'))

      let newCardData = {
        title: clue,
        content: answer,
        topic_id: topicId
      };

      fetch(`http://localhost:3000/api/v1/cards`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(newCardData)
        })
        .then(res => res.json())
        .then(res => {
          //create a new card
          new Card(res)

          //find the card list div and empty it and the new form too
          let cardList = document.getElementById('card-list')
          cardList.innerHTML = ''
          $('#new-card').empty()

          //grab all the topic cards for that id
          let topicCards = Card.all.filter(function(c) {
            return c.topic_id === topicId
          })

          //add html to each topic card and append to the card list div
          topicCards.forEach (function(c) {
            cardList.innerHTML += c.renderCardItem()
          })

          //add the new form to the bottom
          cardList.innerHTML += Card.renderNewCard()

        })
    })
