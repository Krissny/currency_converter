const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const fromCurr = document.querySelector('.from select')
const toCurr = document.querySelector('.to select')
const msg = document.querySelector('.finalMsg')

// to keep selected on start

// to add code js file
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === 'from' && currCode === 'USD'){
            newOption.selected = "selected";
        }
        else if(select.name === 'to' && currCode === 'INR'){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(e)=>{
        updateflag(e.target);
    } );
}
const updateflag = (element)=>{
    let currCode = element.value;
    let coutryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${coutryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;

};


btn.addEventListener('click', async(e)=>{
    e.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = async ()=>{
    let amount = document.querySelector('.amount input');
    let amtValue = amount.value;
    if(amtValue === "" || amtValue < 1){
        amtValue =1;
        amount.value = 1;
    }
    // console.log(fromCurr.value, toCurr.value);
    const url = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    // console.log(rate);
    // console.log(typeof(rate));
    let finalAmount = amtValue*rate;
    // console.log(finalAmount);
    msg.innerText = `${amtValue}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
}

window.addEventListener('load',()=>{
    updateExchangeRate();
})