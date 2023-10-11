# Bankrupt

Este é um projeto de simulação do jogo Bankrupt

Ele roda 300 simulações do jogo coletando informações sobre o comportamento dos jogadores e seus perfis específicos trazendo um relatório sobre a porcentagem de vitórias de cada comportamento e do jogo em si.

O arquivo "results.txt" será enviado vazio e será populado com o resultado da simulação depois de rodar o projeto com o Node.

Para rodar o projeto você pode optar por se já tiver o <strong>Node</strong> instalado, ou rodar pelo <strong>Docker</strong>


### Para rodar se tiver o <strong>Node</strong> instalado:

<hr>
Instale as dependências do projeto:

```bash 
npm install 
```

E depois rode em ambiente de desenvolvimento com:

```bash
npm run dev
```

O console deverá expor os resultados da simulação

Após rodar a aplicação o arquivo "results.txt" irá ter a mesma mensagem do console informando o resultado da simulação

<hr>

<br>

### Para rodar se optou pelo <strong>Docker</strong>:

Você deverá ter o docker instalado em sua máquina 

Rode no terminal o seguinte comando:

```bash
docker run yurilopesm/bankrupt
```

O console deverá expor os resultados da simulação
