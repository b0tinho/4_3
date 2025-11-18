const categoriesSelect = document.getElementById('categorySelect');
const output = document.getElementById('output');

document.getElementById('getCategoriesBtn').addEventListener('click', async () => {
  try {
    const res = await fetch('http://localhost:3000/jokebook/categories');
    const categories = await res.json();
    categoriesSelect.innerHTML = '';
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categoriesSelect.appendChild(option);
    });
    output.textContent = 'Kategorie załadowane.';
  } catch (err) {
    output.textContent = 'Błąd pobierania kategorii: ' + err;
  }
});

document.getElementById('getRandomJokeBtn').addEventListener('click', async () => {
  const category = categoriesSelect.value;
  if (!category) {
    output.textContent = 'Proszę wybrać kategorię żartu.';
    return;
  }
  try {
    const res = await fetch(`http://localhost:3000/jokebook/joke/${category}`);
    if (!res.ok) {
      const errorJson = await res.json();
      output.textContent = 'Błąd: ' + (errorJson.error || res.statusText);
      return;
    }
    const joke = await res.json();
    output.textContent = `Żart: ${joke.joke}\nOdpowiedź: ${joke.response}`;
  } catch (err) {
    output.textContent = 'Błąd pobierania żartu: ' + err;
  }
});
