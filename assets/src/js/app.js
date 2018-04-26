class BeerAPI {
  constructor() {
    this.apiUrl = "https://api.punkapi.com/v2/beers";
  }

  searchByName(name, callback) {
    const url = this.apiUrl;
    const params = {
      beer_name: name
    };

    $.getJSON(url, params)
      .done(data => {
        callback(data);
      })
      .fail(response => {
        callback(null);
      });
  }
}

class BeerSearch {
  constructor() {
    this.BeerAPI = new BeerAPI();
    this.elements = {
      form: $("#search-form"),
      input: $("#search-input"),
      results: $("#results")
    };

    this.registerEvents();
  }

  registerEvents() {
    this.elements.form.on("submit", e => {
      e.preventDefault();
      const userInput = this.elements.input.val().trim();

      this.BeerAPI.searchByName(userInput, data => {
        this.showResults(data);
        console.log(data);
      });
    });
  }

  showResults(data) {
    this.elements.results.html("");

    if (data.length === 0) {
      this.showError("I am sorry but this beer was not found in the database");
    } else {
      $("#error").remove();
      data.forEach(beer => {
        this.elements.results.append(`
           <div class="card mb-3">
              <div class="card-body">
                <h4 class="card-title">${beer.name}</h4>
                <p class="card-text">${beer.description}</p>
             </div>
          </div>
        `);
      });
    }
  }

  showError(message) {
    let alert = $("#error");

    if (alert.length === 0) {
      this.elements.form.before(
        '<div class="alert alert-info" id="error"></div>'
      );
      alert = $("#error");
    }

    alert.text(message);
  }
}

const beerForm = new BeerSearch();
