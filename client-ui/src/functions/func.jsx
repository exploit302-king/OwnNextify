export const priceCalculator = (price, onSale, discount) =>{
  let salePrice = 0
  if(onSale){
    salePrice = price - (price * discount / 100)

  }
  else{
    salePrice = price
  }
  return salePrice
}

export const dollarconversion = (price) =>{

  return (price / 277.62).toFixed(2);
}