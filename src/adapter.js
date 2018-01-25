class Adapter {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getTopics(callback) {
    return fetch('http://localhost:3000/api/v1/topics')
      .then(res => res.json())
      .then(res => {callback(res)
      })
  }
  getCards() {
    return fetch('http://localhost:3000/api/v1/cards')
      .then(res => res.json())
      .then(res => {
        res.forEach(function(card) {
          new Card (card)
        })
      })
  }

}
