function getBrowserLanguage() {
  return navigator.language || navigator.userLanguage;
}

function loadTranslations(lang) {
  fetch('/data/translations.json')
    .then((response) => response.json())
    .then((data) => {
      if (!data.hasOwnProperty(lang)) {
        console.error(`Language "${lang}" is not supported. Defaulting to English.`);
        lang = 'en';
      }
      const elements = document.querySelectorAll('.trans');
      elements.forEach((element) => {
        const id = element.getAttribute('id');
        if (!data[lang].hasOwnProperty(id)) {
          console.warn(
            `Translation for "${id}" not found in "${lang}" language. Defaulting to English.`
          );
          element.innerHTML = data['en'][id];
        } else {
          element.innerHTML = data[lang][id];
        }
      });
    })
    .catch((error) => console.error(error));
    //test
}
