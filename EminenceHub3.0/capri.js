// Pesquisa

const anime = document.getElementById("anime");
const botao = document.getElementById("botao");
const resultado = document.getElementById("resultado");

// Cadastro

const form = document.getElementById("formAnime");
const nomeAnime = document.getElementById("nomeAnime");
const episodiosCadastro = document.getElementById("episodiosCadastro");
const mensagem = document.getElementById("mensagem");
const listaAnimes = document.getElementById("listaAnimes");

// Lista dos animes cadastrados

let animesCadastrados = [];

// Pesquisa

function pesquisarAnime() {
  const pesquisa = anime.value.trim().toLowerCase();

  if (pesquisa === "shadow") {
    resultado.textContent =
      "Você escolheu a Eminência nas Sombras. I Am Atomic.";

    return;
  }

  const animeEncontrado = animesCadastrados.find(function (item) {
    return item.nome.toLowerCase() === pesquisa;
  });

  if (animeEncontrado) {
    resultado.textContent =
      animeEncontrado.nome +
      " possui " +
      animeEncontrado.episodios +
      " episódios.";
  } else {
    resultado.textContent = "Anime não encontrado na Shadow Garden.";
  }
}

botao.addEventListener("click", pesquisarAnime);

// Cadastro

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = nomeAnime.value.trim();

  const episodios = episodiosCadastro.value;

  console.log("Nome:", nome);

  console.log("Episódios:", episodios);

  if (nome === "" || episodios === "") {
    mensagem.textContent = "Preencha todos os campos.";

    mensagem.className = "erro";
  } else {
    const novoAnime = {
      nome: nome,
      episodios: episodios,
    };

    animesCadastrados.push(novoAnime);

    const item = document.createElement("p");

    item.textContent = nome + " - " + episodios + " episódios";

    listaAnimes.appendChild(item);

    mensagem.textContent = "Anime cadastrado com sucesso!";

    mensagem.className = "sucesso";

    nomeAnime.value = "";
    episodiosCadastro.value = "";
  }
});
