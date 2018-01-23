class Topic {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    Topic.all.push(this);
  }

  renderListItem() {
    return `
    <div data-id=${this.id} class='topics'>
      <h4>${this.title} <br>
        <button data-id=${this.id}>edit</button>
      </h4>
    </div>`;
  }

  static findById(id) {
    return this.all.find(topic => topic.id === id);
  }

  static renderNewForm() {
    return `<form id="new-topic">
        <label>Title</label>
        <p>
          <input id="title-input" type="text" value="" placeholder="Title"/>
        </p>
        <label>Description</label>
        <p>
          <textarea id="desc-input"></textarea>
        </p>
        <button id="submit" type='submit'>Create Topic</button>
      </form>`;
  }

  renderUpdateForm() {
    return `
    <form data-id=${this.id}>
      <label>Title</label>
      <p>
        <input type="text" value="${this.title}" />
      </p>
      <label>Description</label>
      <p>
        <textarea>${this.description}</textarea>
      </p>
      <button type='submit'>Save Topic</button>
    </form>
  `;
  }
}

Topic.all = [];
