
// Parando o comportamento padrão do formulario ao clicar no icone de lupa
document.querySelector('#buscar').addEventListener('submit', async (event) =>{
    event.preventDefault()

    //pegando nome (valor) da cidade pelo input
    const cidadeInput = document.querySelector("#nome-cidade").value 

    //validando o valor do input -> se o usuario está buscando algo
    if(!cidadeInput){
        return exibirAlerta('Você precisa buscar uma cidade válida')
    }

    const apiKey = "0823f08333626f873ba160ea4141dceb"
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cidadeInput)}&appid=${apiKey}&units=metric&lang=pt_br`
//encodeURI -> Auxilia em cidades que contem acentos
//parametros da API:
//&units=metric -> muda para graus celcius
//&lang=pt_br` -> muda a linguagem para portugues

    const results = await fetch (apiUrl);
    const json = await results.json()

    if(json.cod === 200){ //se o código for igual a 200 -> sucesso : exibir as informações
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windspeed: json.wind.speed,
            humidity: json.main.humidity,


         })
    }else{ //caso o código de resposta não de ok
        exibirAlerta(`Não foi possível localizar...
            <img src="./assets/images/undraw_space-exploration_dhu1.png">
            
            `)

    }

})

function showInfo(json){
    exibirAlerta('')

    //as infomações são exibidas aqui
    document.querySelector('#clima').classList.add('show')

    document.querySelector("#titulo").innerHTML = `${json.city} , ${json.country}`

    document.querySelector('#temp-value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', '.')} <sup>c°</sup>`

    document.querySelector('#temp_descricao').innerHTML = `${json.description}`
    document.querySelector('#temp-img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}10d@2x.png`);
    document.querySelector('#temp-max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', '.')} <sup>c°</sup>`
    document.querySelector('#temp-min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', '.')} <sup>c°</sup>`
    document.querySelector('#humidade').innerHTML = `${json.temp.humidity}%`
    document.querySelector('#vento').innerHTML = `${json.temp.wind.speed.toFixed(1)} km/h`

}

function exibirAlerta(msg){
    document.querySelector('#alert').innerHTML = msg
}