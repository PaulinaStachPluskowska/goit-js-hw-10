export function fetchCountries(name) {
    const param = new URLSearchParams({
      fields: 'name,capital,population,flags,languages',
    });

    return fetch(`https://restcountries.com/v3.1/name/${name}?${param}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      }
    );
  }
  
// export { fetchCountries };

