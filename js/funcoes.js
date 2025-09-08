var tela = document.querySelector("canvas");
var desenhar = tela.getContext("2d");
var larguraRaquete = 10, alturaRaquete = 75;
var X_raquete1, Y_raquete1, X_raquete2, Y_raquete2;
var taxaDeMovimentoRaquete = 25, taxaDeMovimentoBola = 2;
var bateu, numeroBatidas, aumentoDeVelocidade = 0.2;
var horizontal = {};
var vertical = {};
var raioBola = 10, X_bola, Y_bola;
var renderizacaoBola;
var pontosRaquete1, pontosRaquete2, limitePontos;
var jogador1, jogador2;

//Linha do meio do campo
desenhar.fillStyle = "white";
desenhar.fillRect(0, 249, 1280, 3);
const todasPerguntas = [
  {
    pergunta: "Qual modelo atômico compara o átomo a uma esfera maciça?",
    alternativas: ["Thomson", "Bohr", "Dalton"],
    correta: "Dalton"
  },
  {
    pergunta: "Quem propôs o modelo do pudim de passas?",
    alternativas: ["Rutherford", "Thomson", "Bohr"],
    correta: "Thomson"
  },
  {
    pergunta: "Qual cientista descobriu o núcleo positivo do átomo?",
    alternativas: ["Bohr", "Rutherford", "Dalton"],
    correta: "Rutherford"
  },
  {
    pergunta: "Qual modelo introduziu camadas eletrônicas?",
    alternativas: ["Bohr", "Thomson", "Heisenberg"],
    correta: "Bohr"
  },
  {
    pergunta: "Qual modelo considera a dualidade onda-partícula do elétron?",
    alternativas: ["Bohr", "Schrödinger", "Dalton"],
    correta: "Schrödinger"
  },
  {
    pergunta: "Quem propôs o princípio da incerteza?",
    alternativas: ["Heisenberg", "Bohr", "Thomson"],
    correta: "Heisenberg"
  },
  {
    pergunta: "Qual modelo é baseado em orbitais probabilísticos?",
    alternativas: ["Schrödinger", "Rutherford", "Dalton"],
    correta: "Schrödinger"
  },
  {
    pergunta: "Qual modelo atômico foi o primeiro a incluir partículas subatômicas?",
    alternativas: ["Thomson", "Bohr", "Dalton"],
    correta: "Thomson"
  },
  {
    pergunta: "Qual cientista usou experimentos com lâminas de ouro?",
    alternativas: ["Rutherford", "Bohr", "Thomson"],
    correta: "Rutherford"
  },
  {
    pergunta: "Qual modelo considera que os elétrons não têm posição definida?",
    alternativas: ["Heisenberg", "Bohr", "Dalton"],
    correta: "Heisenberg"
  }
];

const perguntasAtomicas = [
  {
    pergunta: "Qual modelo propõe camadas eletrônicas?",
    alternativas: ["Thomson", "Bohr", "Rutherford"],
    correta: "Bohr"
  },
  {
    pergunta: "Quem comparou o átomo a um pudim de passas?",
    alternativas: ["Dalton", "Bohr", "Thomson"],
    correta: "Thomson"
  },
  {
    pergunta: "Quem descobriu o núcleo positivo?",
    alternativas: ["Rutherford", "Bohr", "Thomson"],
    correta: "Rutherford"
  },
  {
    pergunta: "Quem propôs o modelo da esfera maciça?",
    alternativas: ["Dalton", "Bohr", "Rutherford"],
    correta: "Dalton"
  }
];
function mostrarPergunta(callback) {
  const pergunta = perguntasAtomicas[Math.floor(Math.random() * perguntasAtomicas.length)];
  document.getElementById("texto-pergunta").innerText = pergunta.pergunta;

  const opcoesDiv = document.getElementById("opcoes-pergunta");
  opcoesDiv.innerHTML = "";

  pergunta.alternativas.forEach(alternativa => {
    const btn = document.createElement("button");
    btn.innerText = alternativa;
    btn.onclick = () => {
      document.getElementById("pergunta-container").style.display = "none";
      if (alternativa === pergunta.correta) {
        alert("✅ Resposta correta! Ponto validado.");
        callback(true);
      } else {
        alert("❌ Resposta incorreta. Ponto não contabilizado.");
        callback(false);
      }
    };
    opcoesDiv.appendChild(btn);
  });

  document.getElementById("pergunta-container").style.display = "flex";
}


let perguntasRestantes = [...todasPerguntas];
function iniciarJogo()
{
    document.getElementById("play").disabled = true;
    
    jogador1 = prompt("Apelido do Jogador 1:");
    jogador2 = prompt("Apelido do Jogador 2:");
    limitePontos = prompt("Quantidade máxima de pontos para vitória:");

    pontosRaquete1 = 0;
    pontosRaquete2 = 0;
    document.getElementById("jogador1").innerHTML = jogador1;
    document.getElementById("jogador2").innerHTML = jogador2;
    document.getElementById("pontos_raquete1").innerHTML = pontosRaquete1;
    document.getElementById("pontos_raquete2").innerHTML = pontosRaquete2;

    X_raquete1 = 50;
    Y_raquete1 = 200;
    X_raquete2 = 1230;
    Y_raquete2 = 200;
    
    X_bola = 640;
    Y_bola = 250;
    horizontal["esquerda"] = Math.floor(Math.random() * 2) == 0 ? false : true;
    horizontal["direita"] = !horizontal["esquerda"];
    vertical["cima"] = Math.floor(Math.random() * 2) == 0 ? false : true;
    vertical["baixo"] = !vertical["cima"]; 

    bateu = false;
    numeroBatidas = 0;
    taxaDeMovimentoBola = 2;

    desenharRaquete1();
    desenharRaquete2();

    renderizacaoBola = setInterval(movimentarBola, 10);
}


function finalizarJogo(vencedor)
{
    if(vencedor == 1)
    {
        var jogadorVencedor = jogador1;
    }
    else
    {
        var jogadorVencedor = jogador2;
    }
    alert(`Parabéns, ${jogadorVencedor}!! Você venceu!\n\nPlacar: ${pontosRaquete1}x${pontosRaquete2}`);

    document.getElementById("play").disabled = false;
}


function movimentarBola()
{
    renderizarTela();

    if(horizontal["esquerda"])
    {
        X_bola -= taxaDeMovimentoBola;
        
        //Testando se a bola invadiu o campo da raquete 1
        if(X_bola - raioBola <= 0)
        {
            contabilizarPonto(2);
        }
        
        //Testando colisão da raquete 1 na extremidade de cima da bola
        if((Y_bola - raioBola <= Y_raquete1 + alturaRaquete) && (Y_bola - raioBola >= Y_raquete1))
        {
            if((X_bola >= X_raquete1) && (X_bola <= X_raquete1 + larguraRaquete))
            {
                horizontal["esquerda"] = false;
                horizontal["direita"] = true;
                bateu = true;
            }
        }

        //Testando colisão da raquete 1 na extremidade de baixo da bola
        if((Y_bola + raioBola >= Y_raquete1) && (Y_bola + raioBola <= Y_raquete1 + alturaRaquete))
        {
            if((X_bola >= X_raquete1) && (X_bola <= X_raquete1 + larguraRaquete))
            {
                horizontal["esquerda"] = false;
                horizontal["direita"] = true;
                bateu = true;
            }
        }
    }
    else
    {
        X_bola += taxaDeMovimentoBola;
        
        //Testando se a bola invadiu o campo da raquete 2
        if(X_bola + raioBola >= 1280)
        {
            contabilizarPonto(1);
        }

        //Testando colisão da raquete 2 na extremidade de cima da bola
        if((Y_bola - raioBola <= Y_raquete2 + alturaRaquete) && (Y_bola - raioBola >= Y_raquete2))
        {
            if((X_bola >= X_raquete2) && (X_bola <= X_raquete2 + larguraRaquete))
            {
                horizontal["esquerda"] = true;
                horizontal["direita"] = false;
                bateu = true;
            }
        }

        //Testando colisão da raquete 2 na extremidade de baixo da bola
        if((Y_bola + raioBola >= Y_raquete2) && (Y_bola + raioBola <= Y_raquete2 + alturaRaquete))
        {
            if((X_bola >= X_raquete2) && (X_bola <= X_raquete2 + larguraRaquete))
            {
                horizontal["esquerda"] = true;
                horizontal["direita"] = false;
                bateu = true;
            }
        }

    }

    if(vertical["cima"])
    {
        Y_bola -= taxaDeMovimentoBola;
        if(Y_bola - raioBola <= 0)
        {
            vertical["cima"] = false;
            vertical["baixo"] = true;
        }
    }
    else
    {
        Y_bola += taxaDeMovimentoBola;
        if(Y_bola + raioBola >= 500)
        {
            vertical["cima"] = true;
            vertical["baixo"] = false;
        }
    }

    if(bateu)
    {
        numeroBatidas++;
        bateu = false;
    }

    if((numeroBatidas >= 5) && (taxaDeMovimentoBola <= 5))
    {
        numeroBatidas = 0;
        taxaDeMovimentoBola += aumentoDeVelocidade;
        console.log(taxaDeMovimentoBola);
    }
}

function mostrarPergunta(callback) {
  if (perguntasRestantes.length === 0) {
    perguntasRestantes = [...todasPerguntas]; // Reinicia se todas foram usadas
  }

  const indice = Math.floor(Math.random() * perguntasRestantes.length);
  const pergunta = perguntasRestantes[indice];
  perguntasRestantes.splice(indice, 1); // Remove a pergunta usada

  document.getElementById("texto-pergunta").innerText = pergunta.pergunta;

  const opcoesDiv = document.getElementById("opcoes-pergunta");
  opcoesDiv.innerHTML = "";

  pergunta.alternativas.forEach(alternativa => {
    const btn = document.createElement("button");
    btn.innerText = alternativa;
    btn.onclick = () => {
      document.getElementById("pergunta-container").style.display = "none";
      if (alternativa === pergunta.correta) {
        alert("✅ Resposta correta! Ponto validado.");
        callback(true);
      } else {
        alert("❌ Resposta incorreta. Ponto não contabilizado.");
        callback(false);
      }
    };
    opcoesDiv.appendChild(btn);
  });

  document.getElementById("pergunta-container").style.display = "flex";
}
function contabilizarPonto(time) {
  clearInterval(renderizacaoBola);

  mostrarPergunta(function(pontoValidado) {
    if (pontoValidado) {
      if (time === 1) {
        pontosRaquete1++;
      } else {
        pontosRaquete2++;
      }
    }

    document.getElementById("pontos_raquete1").innerHTML = pontosRaquete1;
    document.getElementById("pontos_raquete2").innerHTML = pontosRaquete2;

    if ((pontosRaquete1 >= limitePontos) || (pontosRaquete2 >= limitePontos)) {
      finalizarJogo(time);
    } else {
      setTimeout(() => {
        X_bola = 640;
        Y_bola = 250;
        horizontal["esquerda"] = !horizontal["esquerda"];
        horizontal["direita"] = !horizontal["direita"];
        taxaDeMovimentoBola = 2;
        numeroBatidas = 0;
        renderizacaoBola = setInterval(movimentarBola, 10);
      }, 1000);
    }
  });
}

function desenharBola()
{
    desenhar.beginPath();
    desenhar.fillStyle = "black";
    desenhar.arc(X_bola, Y_bola, raioBola, 0, 2*Math.PI);
    desenhar.fill();

    desenhar.beginPath();
    desenhar.fillStyle = "#dbdbdb";
    desenhar.arc(X_bola, Y_bola, raioBola-1, 0, 2*Math.PI);
    desenhar.fill();
}

function desenharRaquete1()
{
    desenhar.fillStyle = "#de6e28";
    desenhar.fillRect(X_raquete1, Y_raquete1, larguraRaquete, alturaRaquete);
}

function desenharRaquete2()
{
    desenhar.fillStyle = "#4989ad";
    desenhar.fillRect(X_raquete2, Y_raquete2, larguraRaquete, alturaRaquete);
}

function captarMovimento(evento)
{
    var codigo = evento.keyCode;

    switch(codigo)
    {
        //Cima -> Raquete 1
        case 87:
            if(Y_raquete1 > 0)
            {
                Y_raquete1 -= taxaDeMovimentoRaquete;
            }
            break;
        
        //Baixo -> Raquete 1
        case 83:
            if(Y_raquete1 + alturaRaquete < 500)
            {
                Y_raquete1 += taxaDeMovimentoRaquete;
            }
            break;
        
        //Baixo -> Raquete 2
        case 40:
            if(Y_raquete2 + alturaRaquete < 500)
            {
                Y_raquete2 += taxaDeMovimentoRaquete;
            }
            break;
        
        //Cima -> Raquete 2
        case 38:
            if(Y_raquete2 > 0)
            {
                Y_raquete2 -= taxaDeMovimentoRaquete;
            }
            break;
    }

    renderizarTela();

    return false;
}


function renderizarTela()
{
    limparTela();
    desenharRaquete1();
    desenharRaquete2();
    desenharBola();
} 


function limparTela()
{
    desenhar.fillStyle = "#1A5C8A";
    desenhar.fillRect(0, 0, 1280, 500);
    desenhar.fillStyle = "white";
    desenhar.fillRect(0, 249, 1280, 3);
}

document.onkeydown = captarMovimento;