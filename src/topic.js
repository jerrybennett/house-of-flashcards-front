class Topic {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    Topic.all.push(this);
  }

  renderListItem() {
    return `
    <li>
      <h3>${this.title}
        <button data-id=${this.id}>edit</button>
      </h3>
    </li>`;
  }

  static findById(id) {
    return this.all.find(topic => topic.id === id);
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
