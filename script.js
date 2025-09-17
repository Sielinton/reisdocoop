function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function sortearDuplas() {
  let nomes = [];
  for (let i = 1; i <= 16; i++) {
    const nome = document.getElementById("name" + i).value.trim();
    if (nome) nomes.push(nome);
  }

  if (nomes.length < 16) {
    alert("Preencha todos os nomes");
    return;
  }

  nomes = shuffleArray(nomes);
  const duplas = [];

  for (let i = 0; i < 8; i++) {
    duplas.push([nomes[i * 2], nomes[i * 2 + 1]]);
  }

  // Envia as duplas para o Firebase
  firebase.database().ref("sorteio").set({
    timestamp: Date.now(),
    duplas: duplas
  });
}

function mostrarDuplas(duplas) {
  const resultArea = document.getElementById("resultArea");
  resultArea.innerHTML = "<h2>Duplas Sorteadas:</h2>";
  let i = 0;

  function mostrarDupla() {
    if (i < duplas.length) {
      const dupla = duplas[i];
      const p1 = document.createElement("p");
      p1.textContent = `Dupla ${i + 1}: ${dupla[0]}`;
      resultArea.appendChild(p1);

      setTimeout(() => {
        const p2 = document.createElement("p");
        p2.textContent = `Parceiro: ${dupla[1]}`;
        resultArea.appendChild(p2);
        i++;
        setTimeout(mostrarDupla, 1000);
      }, 3000);
    }
  }

  mostrarDupla();
}

// Listener para atualizações no Firebase
firebase.database().ref("sorteio").on("value", (snapshot) => {
  const data = snapshot.val();
  if (data && data.duplas) {
    mostrarDuplas(data.duplas);
  }
});
