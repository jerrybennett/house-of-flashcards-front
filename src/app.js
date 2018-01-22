class App {
  constructor() {
    this.adapter = new Adapter('http://localhost:3000/api/v1/topics')
  }

  init(){
    this.adapter.getTopics(this.appendTopics)
    this.attachEventListeners()
  }

  appendTopics(json){
    json.forEach(topic => {
      $('#topic-list').append(new Topic(topic).renderListItem());
    });
  }

  attachEventListeners() {
    $('#topic-list').on('click', 'button', e => {
      const id = e.target.dataset.id;
      const topic = Topic.findById(parseInt(id));
      $('#topic-list').empty()
      $('#create-topic-div').empty()
      $('#update').html(topic.renderUpdateForm());

    });

    $('#create-topic-div').on('click', 'button', e => {
      $('#topic-list').empty()
      $('#create-topic-div').empty()
      $('#main').html(Topic.renderNewForm());
    });

    $('#create-topic-div').on('submit', 'form', e => {
      e.preventDefault();
      // grab input
      const title = $(e.target).find('input').val();
      const description = $(e.target).find('textarea').val();

      let newTopicData = {
        title: title,
        description: description
      }

      fetch(`http://localhost:3000/api/v1/topics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newTopicData)
      })
        .then(res => res.json())
        .then(updatedTopic => {
          console.log(updatedTopic),
          // getTopics(App.appendTopics)
          this.adapter.getTopics(this.appendTopics)
        });
    })

  // $('#create-topic-button').on('click', renderNewForm)


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
        .then(updatedTopic =>
          console.log(updatedTopic),
          $('#topic-list').empty(),
          $('#update').empty(),
        this.adapter.getTopics(this.appendTopics))

    });
  }
}
