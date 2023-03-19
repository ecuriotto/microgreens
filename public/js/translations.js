function getBrowserLanguage() {
  return navigator.language || navigator.userLanguage;
}

function loadTranslations(lang) {
  fetch('../data/translations.json')
    .then((response) => response.json())
    .then((data) => {
      const elements = document.querySelectorAll('.trans');
      elements.forEach((element) => {
        const id = element.getAttribute('id');
        console.log(id);
        element.innerHTML = data[lang][id];
      });
    })
    .catch((error) => console.error(error));
}

// Add event listeners to the Italian and English buttons
document.getElementById('btn-italian').addEventListener('click', function () {
  loadTranslations('it');
});

document.getElementById('btn-english').addEventListener('click', function () {
  loadTranslations('en');
});

window.addEventListener('load', function () {
  let lang = getBrowserLanguage().split('-')[0]; // Get the language code (e.g. "en" or "it")
  console.log(lang);
  loadTranslations(lang);
});
