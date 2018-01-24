class Card {
  constructor({title, content, topic: {id}}) {
    this.title = title
    this.content = content
    this.topic_id = id

    //find the topic based on the above id
    this.topic = Topic.all.find(function (topic) {
    	return topic.id === id;
    })
    //push to it's array
    this.topic.cards.push(this)
  // debugger
    Card.all.push(this)
  }

  static findById(id) {
    return this.all.find(card => card.id === id);
  }

  renderCardItem() {
    return `
    <div data-id=${this.id} class="flip-container" ontouchstart="this.classList.toggle('hover');">
  	 <div class="flipper">
     <div class="front">
       <h4>${this.title}</h4>
     </div>
     <div class="back">
       <p>${this.content}</p>
     </div>
    </div></div>`;
  }

  static renderNewCard() {
    return `<form id="new-card">
        <label>Clue</label>
        <p>
          <input id="card-title" type="text" value="" placeholder="Clue"/>
        </p>
        <label>Answer</label>
        <p>
          <textarea id="card-content"></textarea>
        </p>
        <button id="submit-card" type='submit'>Create Topic</button>
      </form>`;
  }

}

Card.all = []
