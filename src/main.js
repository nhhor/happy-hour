import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { TheCocktailDBSearch } from './../src/thecocktaildb-service.js';
import { TheCocktailDBSpirits } from './../src/thecocktaildb-service.js';



$(document).ready(function() {
  // This is where the recipe pulls up
  $('#getDrinkButton').click(function() {

    $("ul#drinkDetails").children().remove();
    $(".drink-image").children().remove();
    $("tbody.ingredient-list").children().remove();
    $("#drinkResults").fadeIn(1000);

    const drinkName = $('#drinkName').val();
    $('#drinkName').val("");


    (async () => {
      let theCocktailDB = new TheCocktailDBSearch();
      let response = await theCocktailDB.getCocktailByName(drinkName);

      if (response === "Sorry, that drink does not exist.") {
        $(".errors").show();
        $(".errors").text(response);
        $("#drinkResults").hide();
      } else {
        $(".errors").hide();
      }
      console.log(response);



      getElements(response);
    })();

    function getElements(response) {
      let keys = Object.keys(response.drinks[0]);
      let values = Object.values(response.drinks[0]);

      // DISPLAY DRINK IMAGE
      if (response.drinks[0].strDrinkThumb != null) {
        $(".drink-image").prepend("<img src="+response.drinks[0].strDrinkThumb+" width='80%'>");
      }

      // APPEND DRINK INFO
      for(let i = 1; i < (values.length-32); i++) {
        if(values[i] != null && values[i] != "" && keys[i] != "strInstructionsDE" && keys[i] != "strInstructionsES" && keys[i] != "strInstructionsFR" && keys[i] != "strInstructionsZH-HANS" && keys[i] != "strInstructionsZH-HANT" && keys[i] != "strDrinkThumb") {
          $("ul#drinkDetails").append("<li><span class='key'> " + (keys[i]).slice(3) + ":</span> " + values[i] +" </li>");
        }
      }


      function ingredientCheck(i) {
        if ((values[(i+15)]) === null) {
          return "to taste";
        } else {
          return (values[(i+15)]);
        }
      }

      // APPEND INGREDIENT TABLE
      for(let i = 21; i <(values.length-17); i++) {
        if(values[i] != null && values[i] != "") {
          $(".ingredient-list").append("<tr><th scope='row'>" + (i-20) + "</th><td>" + (values[i]) + "</td><td>" + ingredientCheck(i) + "</td></tr>");
        }
      }
    }
  });



  $("#spiritName").on("change",function() {
    let spiritName = this.value;
    // if (spiritName=="") {
    //   return;
    // } else {
    $("select#drinkList").children().remove();
    $("select#drinkList").append('<option value="" selected></option>');
    $(".select-drink").slideDown(1000);
    // let spiritName = "rum";
    // let spiritName = this.value;
    // $('#spiritName').val("");

    (async () => {
      let theCocktailDB2 = new TheCocktailDBSpirits();
      let response2 = await theCocktailDB2.getCocktailBySpirit(spiritName);
      getElements2(response2);
    })();

    function getElements2(response2) {
      // let keys2 = Object.keys(response2.drinks[0]);
      let values2 = Object.values(response2.drinks);
      // console.log("2nd API: ",values2);

      for(let i = 0; i <(values2.length); i++) {
        $("select#drinkList").append("<option value='"+values2[i].strDrink+"'>"+values2[i].strDrink+"</option>");
      }
    }

    // }

  });

  // This is where the recipe displays on select
  $('#drinkList').on("change",function() {
    let drinkName = this.value;
    $("#drinkResults").fadeIn(1000);

    $("ul#drinkDetails").children().remove();
    $(".drink-image").children().remove();
    $("tbody.ingredient-list").children().remove();



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

        $(".drink-image").prepend("<img src="+response.drinks[0].strDrinkThumb+" width='80%'>");
      }

      // APPEND DRINK INFO
      for(let i = 1; i < (values.length-32); i++) {
        if(values[i] != null && values[i] != "" && keys[i] != "strInstructionsDE" && keys[i] != "strInstructionsES" && keys[i] != "strInstructionsFR" && keys[i] != "strInstructionsZH-HANS" && keys[i] != "strInstructionsZH-HANT" && keys[i] != "strDrinkThumb") {
          $("ul#drinkDetails").append("<li><span class='key'> " + (keys[i]).slice(3) + ":</span> " + values[i] +" </li>");
        }
      }

      function ingredientCheck(i) {
        if ((values[(i+15)]) === null) {
          return "to taste";
        } else {
          return (values[(i+15)]);
        }
      }

      // APPEND INGREDIENT TABLE
      for(let i = 21; i <(values.length-17); i++) {
        if(values[i] != null && values[i] != "") {
          $(".ingredient-list").append("<tr><th scope='row'>" + (i-20) + "</th><td>" + (values[i]) + "</td><td>" + ingredientCheck(i) + "</td></tr>");
        }
      }
    }
  });


});
