export class TheCocktailDBSearch {
  async getCocktailByName(drinkName) {
    let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/${process.env.API_KEY}/search.php?s=${drinkName}`);
    let jsonifiedResponse = await response.json();
    return jsonifiedResponse;
  }
}

export class TheCocktailDBSpirits {
  async getCocktailBySpirit(spiritName) {
    let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/${process.env.API_KEY}/filter.php?i=${spiritName}`);
    let jsonifiedResponse2 = await response.json();
    return jsonifiedResponse2;
  }
}
