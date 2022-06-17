///**************info-part**************/

const fetchCountry = async(name) => {
    const url = `https://restcountries.com/v3.1/name/${name}`

try {
    const res = await fetch(url);
    if(!res.ok){
        renderError(`something went wrong:${res.status}`)
        throw new Error()
    }
    const data = await res.json();

    renderCountry(data[0])

} catch (error) {
   console.log(error); 
}

}

 const renderError = (err) => {
    const countriesDiv = document.querySelector('.countries')
    countriesDiv.innerHTML = `<h1 class="text-danger">${err}</h1>
    <img src="./img/404.png" alt="" /> `;
};



const renderCountry = (country) => {
    const countriesDiv = document.querySelector('.countries')

     console.log(country);//! buna bakarak const işlemi oluştururuz 

    const {capital, 
     name:{common},
     region,
     flags:{svg},
     languages,
     currencies,
   } = country;

   countriesDiv.innerHTML = `
         <div class="card shadow-lg" style="width: 18rem;">
         <img src="${svg}" class="card-img-top" alt="...">
         <div class="card-body">
         <h5 class="card-title">${common}</h5>
         <p class="card-text">${region}</p>
        </div>
         <ul class="list-group list-group-flush">
         <li class="list-group-item"><i class="fas fa-lg fa-landmark"></i>${capital}</li>
         <li class="list-group-item"><i class="fas fa-lg fa-comments"></i> ${Object.values(
        languages
        )}</li>
         <li class="list-group-item"><i class="fas fa-lg fa-money-bill-wave"></i> ${
        Object.values(currencies)[0].name
         }, ${Object.values(currencies)[0].symbol}</li>
        </ul>
        </div>`
   
}

////*********selected part *********/

const selectedPart = async () => {
    const link =  `https://restcountries.com/v3.1/all`;
    const res = await fetch(link);
    const data = await res.json();
    const select1 = document.querySelector('.select1');
     await data.forEach((country) => {
     select1.innerHTML += `<option class="countryName">${country.name.common}</option>`;
  });
   const input = document.querySelector(".input");
  input.querySelector("select").onchange = function () {
    fetchCountry(this.value.toLowerCase());
  };
}
    

