class Card {
  constructor( { id, title, content, topic } ) {

    this.id = id
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
    return `<div data-id=${this.topic_id}>
    <div class="flip-container" onclick="this.classList.toggle('checked');">
  	 <div class="flipper">
     <div class="front">
       <h4>${this.title}</h4>
     </div>
     <div class="back">
       <p>${this.content}</p>
     </div>
    </div>
    </div>
    <div data-id=${this.id}>
      <span><i class="material-icons edit-card">mode_edit</i></span>
      <span><i class="material-icons">delete</i></span>
    </div>
    </div>`;
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

  renderUpdateCard() {
    return `
    <form data-id=${this.id}>
      <label>Title</label>
      <p>
        <input type="text" value="${this.title}" />
      </p>
      <label>Content</label>
      <p>
        <textarea>${this.content}</textarea>
      </p>
      <button type='submit'>Save Card</button>
    </form>
  `;
  }

}

Card.all = []
