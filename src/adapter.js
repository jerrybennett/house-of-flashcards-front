class Adapter {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getTopics(callback) {
    return fetch('http://localhost:3000/api/v1/topics')
      .then(res => res.json())
      .then(res => {callback(res)})
  }

  getCards(callback) {
    return fetch('http://localhost:3000/api/v1/cards')
      .then(res => res.json())
      .then(res => {callback(res)
      console.log(res)})
  }
}
