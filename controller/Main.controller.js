sap.ui.define([
    "sap/ui/core/mvc/Controller",
    // Os elementos de tela são inicializados sobre demanda para garantir a performance da aplicação.
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("jogovelha.controller.Main", {
            onInit: function () {
                this.vez = 'X'; //Igual ME no ABAP. 
                // Matriz de possibilidade de vitória.
                this.vitorias_possiveis = [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9],
                    [1, 5, 9],
                    [3, 5, 7],
                    [1, 4, 7],
                    [2, 5, 8],
                    [3, 6, 9]
                ];

            },
            onClickCasa: function (oEvent) {
                //obter referencia do objeto que foi clicado    
                let casa = oEvent.getSource();
                // obter imagem atual
                let imagem = casa.getSrc();

                //verifica se imagem é branco.
                if (imagem == "../img/branco.png") {

                    //Comando para adicionar imagem
                    casa.setSrc("../img/" + this.vez + ".png");

                    // Logica para verificar ganhador do jogo
                    // desvio condicional

                    if (this.temVencedor() == true) {
                        //alert(this.vez + " Ganhou");
                        MessageBox.success(this.vez + "Ganhou");
                        return;
                    }


                    if (this.vez == 'X') {
                        this.vez = 'O';
                        // chamar funcao de jogada do computador
                        this.JogadaComputador();
                    } else {
                        this.vez = 'X';
                    }

                }



            },

            temVencedor: function () {
                if (this.casasIguais(1, 2, 3) || this.casasIguais(4, 5, 6) || this.casasIguais(7, 8, 9) ||
                    this.casasIguais(1, 4, 7) || this.casasIguais(2, 5, 8) || this.casasIguais(3, 6, 9) ||
                    this.casasIguais(1, 5, 9) || this.casasIguais(3, 5, 7)

                ) {
                    return true;

                }

            },

            casasIguais: function (a, b, c) {

                let casaA = this.byId("casa" + a);
                let casaB = this.byId("casa" + b);
                let casaC = this.byId("casa" + c);

                //Obtenho imagens da tela
                let imgA = casaA.getSrc();
                let imgB = casaB.getSrc();
                let imgC = casaC.getSrc();

                //Verificação se imagens são igual
                //desvio condicional = if

                if ((imgA == imgB) && (imgB == imgC) && (imgA !== "../img/branco.png")) {
                    return true;
                }
            },
            JogadaComputador: function () {
                //definir parametros iniciais (pontuação)
                // Lista de pontos para x
                let ListaPontosX = [];
                let listaPontosO = [];

                //Lista de Jogadas Possiveis

                let jogadaInicial = []; // Inicio do jogo
                let jogadaVitoria = []; // vitoria é certa
                let jogadaRisco = []; // risco de perder
                let tentativa_vitoria = []; // aumenta chance de vitoria

                //Calculo da pontuação de cada possibilidade de vitoria
                // loop em cada possibilidade vitória
                this.vitorias_possiveis.forEach((combinacao) => {

                    //zera pontos iniciais

                    let pontosX = 0;
                    let pontosO = 0;
                    //debugger
                    // dentro das vitorias possiveis, fazer um loop para verificar cada casa daquela combinação.

                    combinacao.forEach((posicao) => {
                        let casa = this.byId("casa" + posicao);
                        let img = casa.getSrc();

                    });

                    //dar pontuacao de acordo com quem jogo
                    if (img == '../img/X.png') pontosX++;
                    if (img == '../img/O.png') pontosO++;


                }
                ),

                    // jogar com base na maior pontuação (ou maior prioridade pra não perder)
                    // para cada possibilidade de vitoria  do jogador 0, ver quantos pontos  X tem na mesma combinação
                    // Loop na lista de pontos do 0.
                    listaPontosO.forEach((posicao, index) => {
                        // ver quantos pontos o jogador 0 tem
                        switch (posicao) {
                            case 0:
                                // ver se X tem 2 pontos, porque é onde to perdendo.
                                if (listaPontosX[index] == 2) {
                                    jogadaRisco.push(this.vitorias_possiveis[index]);
                                } else if (listaPontosX[index] == 1) {
                                    jogadaInicial.push(this.vitorias_possiveis[index]);

                                }
                                break;
                            case 1: // Jogada Neutra
                                if (listaPontosX[index] == 1) {
                                    jogadaInicial.push(this.vitorias_possiveis[index]);

                                } else if (listaPontosX[index] == 0) {
                                    tentativa_vitoria.push(this.vitorias_possiveis[index]);
                                }
                                break;
                            case 2: // vitoria mais certa
                                if (listaPontosX[index] == 0) {
                                    jogadaVitoria.push(this.vitorias_possiveis[index]);

                                }


                        }
                    }
                    );

                // jogar na combinação de maior prioridade

                if (jogadaVitoria.length > 0) {
                    // jogar nas combinações de vitoria
                    this.jogadaIA(jogadaVitoria);
                } else if (jogadaRisco.length > 0) {
                    // jogar aonde posso perder 
                    this.jogadaIA(jogadaRisco);
                } else if (tentativa_vitoria > 0) {
                    //Jogar onde posso tentar ganhar
                    this.jogadaIA(tentativa_vitoria);
                } else if (jogadaInicial.length > 0) {
                    //jogada neutra
                    this.jogadaIA(jogadaInicial);

                }


            },
            jogadaIA: function (dados) {
                // Separar numeros das casas que posso jogar
                let numeros = [];

                // verificar se casa possivel se ser jogada está vazia
                // loop nas combinações para ver se casa está vazia.
                dados.forEach((combinacao) => {
                    //verificar se casa está vazia
                    let casa = this.byId("casa" + num);
                    let img = casa.getSrc();
                    if (img == '../img/Branco.png') {
                        numeros.push(num);
                    }

                }


                )
                //jogada aleatoria nos valores possiveis
                this.jogadaAleatoriaIA(numeros);

            },
            jogadaAleatoriaIA: function(numeros){
                // math random gera numero aleatorio entre 0 e 1.
                // math.floor pega apenas a parte inteira do numero
                let numeroAleatorio = Math.random() * numeros.length;
                let numeroInteiro = math.floor(numeroAleatorio);
                let jogada = numeros[numeroInteiro];
                let casa = this.byId ("casa" + jogada);
                casa.setSrc("../img/O.png");

                if (this.temVencedor() == true) {
                    alert(this.vez + " Ganhou");
                } 


                if (this.temVencedor() == true) {
                    //alert(this.vez + " Ganhou");
                    MessageBox.success(this.vez + "Ganhou");
                    return;
                } else {

                    this.vez = 'X';
                }

                
            }

            //debugger comando para debugar.


        });
    });
