function sortearDuplas() {
    // Pegar os nomes dos inputs
    let nomes = [];
    for (let i = 1; i <= 16; i++) {
        let nome = document.getElementById('name' + i).value.trim();
        if (nome) {
            nomes.push(nome);
        }
    }

    if (nomes.length < 16) {
        alert("Por favor, preencha todos os 16 nomes.");
        return;
    }

    // Embaralhar os nomes para sortear as duplas
    nomes = shuffleArray(nomes);

    // Limpar a área de resultados
    let resultArea = document.getElementById('resultArea');
    resultArea.innerHTML = "";

    // Animação do sorteio
    let duplaIndex = 0;
    const sorteioInterval = setInterval(function() {
        if (duplaIndex < 8) {
            // Exibir o primeiro nome da dupla
            let nome1 = document.createElement('p');
            nome1.innerHTML = `Sorteando Dupla ${duplaIndex + 1}: ${nomes[duplaIndex * 2]}`;
            resultArea.appendChild(nome1);
            nome1.style.display = 'block';
            nome1.style.animation = 'fadeIn 1s forwards';

            // Esperar 3 segundos antes de exibir o parceiro
            setTimeout(function() {
                let nome2 = document.createElement('p');
                nome2.innerHTML = `Parceiro: ${nomes[duplaIndex * 2 + 1]}`;
                resultArea.appendChild(nome2);
                nome2.style.display = 'block';
                nome2.style.animation = 'fadeInPartner 1s forwards';

                duplaIndex++;
            }, 3000); // 3 segundos de espera

        } else {
            // Se já tiver exibido todas as duplas, parar o sorteio
            clearInterval(sorteioInterval);
        }
    }, 4000); // Intervalo de 4 segundos para cada nome (3 segundos + 1 segundo para animação)
}

// Função para embaralhar os nomes
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
