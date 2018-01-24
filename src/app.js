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
    // $('#topic-list').on('click', 'button', e => {
    //   const id = e.target.dataset.id;
    //   const topic = Topic.findById(parseInt(id));
    //   $('#topic-list').empty()
    //   $('footer').css('display', 'none');
    //   $('#update').html(topic.renderUpdateForm());
    // });

    $('#topic-list').on('click', '.topics', e => {
      const id = e.target.dataset.id;
      const topic = Topic.findById(parseInt(id));
      $('#topic-list').empty()
      $('footer').css('display', 'none');
      $('#card-list h1').text(`${topic.title}`);
      console.log(e);
    })

    $('#create-topic-div').on('click', 'button', e => {
      $('#topic-list').empty()
      $('footer').css('display', 'none');
      $('#create-new').html(Topic.renderNewForm());
    });

    $('#create-new').on('submit', 'form', e => {
      e.preventDefault();
      // grab input
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
        .then(res => {
          console.log(res)
          $('#topic-list').empty()
          $('#update').empty()
          $('footer').css('display', 'block')
          this.adapter.getTopics(this.appendTopics)});
    });
  }
}
