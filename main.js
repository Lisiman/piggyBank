// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCExvDd1dEzq60mOWFvJqiGYr5B0o6lboU",
  authDomain: "piggybank-c1217.firebaseapp.com",
  databaseURL: "https://piggybank-c1217.firebaseio.com",
  projectId: "piggybank-c1217",
  storageBucket: "piggybank-c1217.appspot.com",
  messagingSenderId: "303000424442",
  appId: "1:303000424442:web:7520fd1ee5e76241af9e43",
  measurementId: "G-JL234LQLBP"
};
var clothesTotal = 0.00;
var foodTotal = 0.00;
var transTotal = 0.00;
var funMoney = 0.00;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var allSpendingRef = database.ref('allSpending');
// console.log("hey");
//here is the code to listen to the Form Submit
document.getElementById('moneyForm').addEventListener('submit', submitForm);
//a function called submitForm
function submitForm(e) {
  e.preventDefault(); //prevent from submit to HTML page
  var type = getRadioInputVal('moneyType');
  var amount = getInputVal('moneyAmount');
  //console.log(type);
  if (type == "clothes" || type == "makeup" || type == "entertainment") {
    console.log("hey you chose clothes, makeup or entertainment");
    addFunValue();
  }
  if (type == "clothes") {
    addClothValue();
  }
  if (type == "foodDrinks") {
    addFoodValue();
  }
  if (type == "transportation") {
    addTranValue();
  }
  //save messages
  saveMessage(type, amount);
  document.getElementById('moneyForm').reset();
  // window.location.href = "main.html";
}

function getInputVal(id) {
  return document.getElementById(id).value;
}

function getRadioInputVal() {
  var radios = document.getElementsByName('choice');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
      break;
    }
  }
}

function addFunValue() {
  var thisAmount = parseFloat(getInputVal('moneyAmount'));
  funMoney = funMoney + thisAmount;
  //funMoney.toFixed(2);
  humanize(funMoney);
  console.log("this fun Amount=" + thisAmount);
  console.log("funMoney=" + funMoney);
  //write into database
  var newMessageRef = firebase.database().ref('funMoney/').push();
  newMessageRef.set({
    funMoney: funMoney
  });
}

function addClothValue() {
  console.log("add clothes value");
  var thisAmount = parseFloat(getInputVal('moneyAmount'));
  clothesTotal = clothesTotal + thisAmount;
  humanize(clothesTotal);
  // clothesTotal.toFixed(2);
  console.log("this cloth Amount=" + thisAmount);
  console.log("clothesTotal=" + clothesTotal);
  //write into database
  var newMessageRef = firebase.database().ref('clothesMoney/').push();
  newMessageRef.set({
    clothesTotal: clothesTotal
  });

}

function addFoodValue() {
  console.log("add food value");
  var thisAmount = parseFloat(getInputVal('moneyAmount'));
  foodTotal = foodTotal + thisAmount;
  humanize(foodTotal);
  // foodTotal.toFixed(2);
  console.log("thisAmount=" + thisAmount);
  console.log("foodTotal=" + foodTotal);
  //write into database
  var newMessageRef = firebase.database().ref('clothesMoney/').push();
  newMessageRef.set({
    foodTotal: foodTotal
  });
}

function addTranValue() {
  console.log("add trans value");
  var thisAmount = parseFloat(getInputVal('moneyAmount'));
  transTotal = transTotal + thisAmount;
  humanize(transTotal);
  // transTotal.toFixed(2);
  console.log("thisAmount=" + thisAmount);
  console.log("this trans Total=" + transTotal);
  //write into database
  var newMessageRef = firebase.database().ref('transMoney/').push();
  newMessageRef.set({
    transMoney: transTotal
  });
}


//save the messages to the database
function saveMessage(type, amount) {
  var newMessageRef = firebase.database().ref('allSpending/').push();
  newMessageRef.set({
    type: type,
    amout: amount
  });
}

function humanize(x) {
  return x.toFixed(2).replace(/\.?0*$/, '');
}
