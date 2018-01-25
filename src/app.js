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

  // appendCards(json) {
  //   json.forEach(card => {
  //     $('#card-list').append(new Card(card).renderCardItem())
  //   });
  //   // cardList.append(Card.renderNewCard)
  // }

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

    $('#card-list').on('click', '.edit-card', e => {
      let sizzile = event.target.parentElement.parentElement
      let sId = sizzile.dataset.id
      $('#card-list').empty()
      $('#card-list').append(Card.renderUpdateCard())

    })

    $('.search').on('keyup', e => {
      //find all the topics who match the input entered
      //re render in pane
      $('#topic-list').empty()
      let input = e.target.value

      let searchResults = Topic.all.filter(function(t){
            return t['title'].toLowerCase().includes(input.toLowerCase())
          })

      for (let t of searchResults) {
        $('#topic-list').append(t.renderListItem())
        //
        // if (document.querySelector(`div [data-id="${t.id}"]`) != null) { document.querySelector(`div [data-id="${t.id}"]`).remove()}
      }

          // debugger
          // find the thing by id and set to var
          // document.querySelector('#topic-list').removeChild(`div dataset.id-${id}`)
        })
      }


    }

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


    //Submitting Update Topic form (no functionality yet?)
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



    //create new card and post to DB
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
