let catalogo = [];

async function carregarCatalogo() {
  const resposta = await fetch('catalogo.json');
  catalogo = await resposta.json();
}

function filtrarCatalogo(termo) {
  termo = termo.toLowerCase();
  return catalogo.filter(item =>
    item.artista.toLowerCase().includes(termo) ||
    item.album.toLowerCase().includes(termo)
  );
}

function mostrarSugestoes(termo) {
  const sugestoes = document.getElementById('sugestoes');
  sugestoes.innerHTML = '';

  if (termo.length < 2) return;

  const resultados = filtrarCatalogo(termo).slice(0, 5);
  resultados.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.artista} - ${item.album}`;
    li.onclick = () => {
      document.getElementById('busca').value = `${item.artista} - ${item.album}`;
      mostrarResultados([item]);
      sugestoes.innerHTML = '';
    };
    sugestoes.appendChild(li);
  });
}

function mostrarResultados(resultados) {
  const container = document.getElementById('resultados');
  container.innerHTML = '';

  if (resultados.length === 0) {
    container.innerHTML = '<p>Nenhum álbum encontrado.</p>';
    return;
  }

  resultados.forEach(item => {
    const div = document.createElement('div');
    div.className = 'album';
    div.innerHTML = `
      <strong>${item.artista}</strong> - ${item.album} ${item.ano ? `(${item.ano})` : ''}
      <br>
      <a href="${item.link}" target="_blank">🔗 Acessar no MEGA</a>
    `;
    container.appendChild(div);
  });
}

document.getElementById('busca').addEventListener('input', function () {
  const termo = this.value;
  mostrarSugestoes(termo);
});

document.getElementById('busca').addEventListener('keypress', async function (e) {
  if (e.key === 'Enter') {
    const termo = this.value;
    const resultados = filtrarCatalogo(termo);
    mostrarResultados(resultados);
    document.getElementById('sugestoes').innerHTML = '';
  }
});

carregarCatalogo();
