

class Card {
  constructor(title, content, topic_id) {
    this.title = title
    this.content = content
    this.topic_id = topic_id

    //find the topic based on the above id
    this.topic = Topic.all.find(topic_id)
    //push to it's array
    this.topic.cards.push(this)

    cardStore.push(this)
  }

  renderCardItem() {
    return `
    <div data-id=${this.id} class='cards'>
    <h4> ${this.title} </h4>
    </div>`;
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

let cardStore = []
