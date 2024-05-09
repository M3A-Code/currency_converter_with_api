let btn = document.querySelector("button");
let from = document.querySelector('#from');
let to = document.querySelector('#to');
let finalValue = document.querySelector('.finalValue');
let inputValue = document.querySelector('#amount')

let data = new XMLHttpRequest();
data.open("GET" , "https://v6.exchangerate-api.com/v6/3156163a9c591c903428646a/latest/USD");
data.send();

data.onload = function(){
  // get data as an object from server
  let dataObjOne = JSON.parse(this.responseText);
  let dataObjTwo = JSON.parse(this.responseText);
  
  // get conversion object
  let DataOne = dataObjOne.conversion_rates;
  let DataTwo = dataObjTwo.conversion_rates;

  // get convertion object as a list to use in for loop 
  let numOfDataOne = Object.keys(dataObjOne.conversion_rates);
  let numOfDataTwo = Object.keys(dataObjTwo.conversion_rates);
  
  for(let i=0; i<numOfDataOne.length;i++){
    let option = document.createElement("option");
    let options = document.createTextNode(numOfDataOne[i]);
    option.appendChild(options);
    from.appendChild(option)
  }
  for(let i=0; i<numOfDataTwo.length;i++){
    let option = document.createElement("option");
    let options = document.createTextNode(numOfDataTwo[i])
    option.appendChild(options);
    to.appendChild(option)
  }

  btn.onclick = function(){
    let valueToConvert = +inputValue.value;
    let cureencyFrom = from.value;
    let cureencyTo = to.value;

      for(let i=0;i<numOfDataOne.length;i++){
        if(cureencyFrom === numOfDataOne[i]){
          let converion = (valueToConvert / DataOne[cureencyFrom]);
          for(let i=0 ; i<numOfDataTwo.length;i++){
            if(cureencyTo === numOfDataTwo[i]){
              let toCurrency = DataTwo[cureencyTo];
              let total = converion * toCurrency;
              console.log(total.toFixed("2"));
              finalValue.innerHTML = `${valueToConvert} ${cureencyFrom} >>> ${total.toFixed("2")} ${cureencyTo}`;
            }
          }
        }
      }
  }
}


