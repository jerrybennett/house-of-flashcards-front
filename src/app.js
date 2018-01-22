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
      $('#update').html(topic.renderUpdateForm());
    });

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
        .then(updatedTopic => console.log(updatedTopic));
    });
  }
}
