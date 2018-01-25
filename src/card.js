class Card {
  constructor( { title, content, topic } ) {

    this.title = title
    this.content = content
    this.topic_id = topic.id

    this.topic = Topic.all.filter(function(t) {
      return t.id === topic.id;
    })
    // debugger
    this.topic[0].cards.push(this)

    Card.all.push(this)
  }

  static findById(id) {
    return this.all.find(card => card.id === id);
  }

  renderCardItem() {
    return `
    <div data-id=${this.topic_id} class="flip-container" ontouchstart="this.classList.toggle('hover');">
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
    return `<div id='new-card-form-div'>
    <details>
    <summary>Create New Card</summary>
      <form id="new-card">
        <label>Clue</label>
        <p>
          <input id="card-title" type="text" value="" placeholder="Clue"/>
        </p>
        <label>Answer</label>
        <p>
          <textarea id="card-content"></textarea>
        </p>
        <button id="submit-card" type='submit'>Create Card</button>
      </form>
      </details>
      </div>
      `;
  }

}

Card.all = []
