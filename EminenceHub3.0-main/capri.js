const anime = document.getElementById("anime");
const botao = document.getElementById("botao");
const resultado = document.getElementById("resultado");

const form = document.getElementById("formAnime");
const nomeAnime = document.getElementById("nomeAnime");
const episodiosCadastro = document.getElementById("episodiosCadastro");
const mensagem = document.getElementById("mensagem");
const listaAnimes = document.getElementById("listaAnimes");

const apiAnime = document.getElementById("apiAnime");
const fonteBusca = document.getElementById("fonteBusca");

let animesCadastrados = [];
let animesJSON = [];

function pesquisarLocal() {

    const pesquisa = anime.value.trim().toLowerCase();

    if (pesquisa === "shadow") {

        resultado.textContent =
            "Você escolheu a Eminência nas Sombras. I Am Atomic.";

        console.log("Shadow pesquisado");

        return;
    }

    const animeEncontrado = animesCadastrados.find(
        item => item.nome.toLowerCase() === pesquisa
    );

    resultado.textContent = animeEncontrado
        ? `${animeEncontrado.nome} possui ${animeEncontrado.episodios} episódios.`
        : "Anime não encontrado na Shadow Garden.";

    console.log("Pesquisa Local:", pesquisa);
}

function pesquisarJSON() {

    const pesquisa = anime.value.trim().toLowerCase();

    const animeEncontrado = animesJSON.find(
        item => item.nome.toLowerCase() === pesquisa
    );

    resultado.textContent = animeEncontrado
        ? `Nome: ${animeEncontrado.nome} | Gênero: ${animeEncontrado.genero} | Episódios: ${animeEncontrado.episodios}`
        : "Anime não encontrado no JSON.";

    console.log("Pesquisa JSON:", pesquisa);
}

function pesquisarAPI() {

    fetch(`https://api.tvmaze.com/search/shows?q=${anime.value}`)

        .then(resposta => resposta.json())

        .then(dados => {

            console.log("Dados da API:", dados);

            if (!dados.length) {

                apiAnime.innerHTML =
                    "<p>Nenhum resultado encontrado.</p>";

                return;
            }

            const animeAPI = dados[0].show;

            apiAnime.innerHTML = `
                <h3>${animeAPI.name}</h3>
                <p><strong>Status:</strong> ${animeAPI.status}</p>
                <p><strong>Idioma:</strong> ${animeAPI.language}</p>
                <p><strong>Tipo:</strong> ${animeAPI.type}</p>
            `;
        })

        .catch(erro => {

            console.log("Erro API:", erro);

            apiAnime.innerHTML =
                "<p>Erro ao acessar a API.</p>";
        });
}

botao.addEventListener("click", () => {

    resultado.textContent = "";
    apiAnime.innerHTML = "";

    if (fonteBusca.value === "local") {
        pesquisarLocal();
    } else if (fonteBusca.value === "json") {
        pesquisarJSON();
    } else {
        pesquisarAPI();
    }

});

form.addEventListener("submit", evento => {

    evento.preventDefault();

    const nome = nomeAnime.value.trim();
    const episodios = episodiosCadastro.value;

    console.log("Nome:", nome);
    console.log("Episódios:", episodios);

    if (!nome || !episodios) {

        mensagem.textContent =
            "Preencha todos os campos.";

        mensagem.className =
            "erro";

        return;
    }

    animesCadastrados.push({ nome, episodios });

    console.log("Anime cadastrado:", animesCadastrados);

    const item = document.createElement("p");

    item.textContent =
        `${nome} - ${episodios} episódios`;

    listaAnimes.appendChild(item);

    mensagem.textContent =
        "Anime cadastrado com sucesso!";

    mensagem.className =
        "sucesso";

    nomeAnime.value = "";
    episodiosCadastro.value = "";
});

fetch("animes.json")
    .then(resposta => resposta.json())
    .then(dados => {

        animesJSON = dados;

        console.log("JSON carregado:", dados);

    });