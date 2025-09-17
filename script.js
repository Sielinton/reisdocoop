// Inicializa o Firebase (a config está no index.html)

// Função para embaralhar a lista
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Função chamada ao clicar no botão "Sortear Duplas"
function sortearDuplas() {
  let nomes = [];
  for (let i = 1; i <= 16; i++) {
    const nome = document.getElementById("name" + i).value.trim();
    if (nome) nomes.push(nome);
  }

  if (nomes.length < 16) {
    alert("Preencha todos os 16 nomes.");
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

// Função para mostrar as duplas com animação
function mostrarDuplasAnimadas(duplas) {
  const resultArea = document.getElementById("resultArea");
  resultArea.innerHTML = "<h2>Duplas Sorteadas:</h2>";
  let i = 0;

  function mostrarDupla() {
    if (i < duplas.length) {
      const dupla = duplas[i];

      // Mostra o primeiro nome
      const p1 = document.createElement("p");
      p1.textContent = `Dupla ${i + 1}: ${dupla[0]}`;
      p1.style.opacity = 0;
      p1.style.transition = "opacity 1s";
      resultArea.appendChild(p1);
      setTimeout(() => (p1.style.opacity = 1), 100);

      // Depois de 3 segundos, mostra o parceiro
      setTimeout(() => {
        const p2 = document.createElement("p");
        p2.textContent = `Parceiro: ${dupla[1]}`;
        p2.style.opacity = 0;
        p2.style.transition = "opacity 1s";
        resultArea.appendChild(p2);
        setTimeout(() => (p2.style.opacity = 1), 100);

        i++;
        setTimeout(mostrarDupla, 1000); // pequena pausa entre duplas
      }, 3000);
    }
  }

  mostrarDupla();
}

// Escuta atualizações no Firebase em tempo real
firebase
  .database()
  .ref("sorteio")
  .on("value", (snapshot) => {
    const data = snapshot.val();
    if (data && data.duplas) {
      mostrarDuplasAnimadas(data.duplas);
    }
  });
