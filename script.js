async function carregarCatalogo() {
  const resposta = await fetch('catalogo.json');
  const catalogo = await resposta.json();
  return catalogo;
}

function filtrarCatalogo(catalogo, termo) {
  termo = termo.toLowerCase();
  return catalogo.filter(item =>
    item.artista.toLowerCase().includes(termo) ||
    item.album.toLowerCase().includes(termo)
  );
}

function exibirResultados(resultados) {
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

document.getElementById('busca').addEventListener('input', async function () {
  const termo = this.value;
  const catalogo = await carregarCatalogo();
  const resultados = filtrarCatalogo(catalogo, termo);
  exibirResultados(resultados);
});