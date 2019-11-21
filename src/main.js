import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { TheCocktailDBSearch } from './../src/thecocktaildb-service.js';
import { TheCocktailDBSpirits } from './../src/thecocktaildb-service.js';

$(document).ready(function() {
  $('#getDrinkButton').click(function() {

    $("ul#drinkDetails").children().remove();
    $("tbody.ingredient-list").children().remove();



    const drinkName = $('#drinkName').val();
    $('#drinkName').val("");

    (async () => {
      let theCocktailDB = new TheCocktailDBSearch();
      let response = await theCocktailDB.getCocktailByName(drinkName);
      getElements(response);
    })();

    function getElements(response) {
      let keys = Object.keys(response.drinks[0]);
      let values = Object.values(response.drinks[0]);

      // DISPLAY DRINK IMAGE
      if (response.drinks[0].strDrinkThumb != null) {
        $("ul#drinkDetails").prepend("<HR><img src="+response.drinks[0].strDrinkThumb+" width='300px'>");
      }

      // APPEND DRINK INFO
      for(let i = 1; i < (values.length-32); i++) {
        if(values[i] != null && keys[i] != "strInstructionsDE" && keys[i] != "strInstructionsES" && keys[i] != "strInstructionsFR" && keys[i] != "strInstructionsZH-HANS" && keys[i] != "strInstructionsZH-HANT" && keys[i] != "strDrinkThumb") {
          $("ul#drinkDetails").append("<li><span class='key'> " + (keys[i]).slice(3) + ":</span> " + values[i] +" </li>");
        }
      }

      // APPEND INGREDIENT TABLE
      for(let i = 21; i <(values.length-17); i++) {
        if(values[i] != null) {
          $(".ingredient-list").append("<tr><th scope='row'>" + (i-20) + "</th><td>" + (values[i]) + "</td><td>" + (values[(i+15)]) + "</td></tr>");
        }
      }
    }
  });


  $('#getListButton').click(function() {

    $("ul#spiritDetails").children().remove();


    // let spiritName = "rum";
    let spiritName = $('#spiritName').val();
    $('#spiritName').val("");

    (async () => {
      let theCocktailDB2 = new TheCocktailDBSpirits();
      let response2 = await theCocktailDB2.getCocktailBySpirit(spiritName);
      getElements2(response2);
    })();

    function getElements2(response2) {
      let keys2 = Object.keys(response2.drinks[0]);
      let values2 = Object.values(response2.drinks);
      console.log("2nd API: ",values2);

      for(let i = 0; i <(values2.length); i++) {
        $("#spiritDetails").append("<li>" + values2[i].strDrink + "</li>")
      }
    }
  });
});
