export class TheCocktailDBSearch {
  async getCocktailByName(drinkName) {
    try {
      let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/${process.env.API_KEY}/search.php?s=${drinkName}`);
      let jsonifiedResponse = await response.json();

      if(jsonifiedResponse.drinks === null) {
        throw TypeError("Drink Does Not Exist Here!");
      } else {
        return jsonifiedResponse;
      }

      // console.log(jsonifiedResponse.drinks);

    } catch(error) {
      console.error("There was an error handling your request: " + error.message);
    }
  }
}

export class TheCocktailDBSpirits {
  async getCocktailBySpirit(spiritName) {
    try {
      let response2 = await fetch(`https://www.thecocktaildb.com/api/json/v1/${process.env.API_KEY}/filter.php?i=${spiritName}`);
      let jsonifiedResponse2 = await response2.json();
      return jsonifiedResponse2;
    } catch(error) {
      console.error("There was an error handling your request: " + error.message);
    }
  }
}
