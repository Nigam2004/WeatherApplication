
const apiKeay = "d8996d719979c10a0eaef11af7644c09"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
const searchBox = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const icon = document.getElementById("icon")
console.log(icon.src)

async function checkData(city) {
    try {
        const res = await fetch(apiUrl + city + `&APPID=${apiKeay}`)
        if (res.status == 404) {
            document.querySelector(".error").style.display = "block"
            document.querySelector(".content").style.display = "none"
        } else {

            var data = await res.json()
            console.log(data)
            document.getElementById("city").innerHTML = data.name;
            document.getElementById("temperature").innerHTML = Math.round(data.main.temp) + "°C"
            
            document.getElementById("humidity").innerHTML = data.main.humidity + "%"
            document.getElementById("wind").innerHTML = data.wind.speed + " km/h"
            document.getElementById("description").innerHTML= "Description:"+ data.weather[0].description
            document.getElementById("unitChange").addEventListener("click",()=>{ unitChange()})
              function unitChange(){
                const farhenite=(9/5*data.main.temp)+32 +'°F '
                document.getElementById("temperature").innerHTML=farhenite
                console.log(farhenite)
              }
             
            if (data.weather[0].main == "Clouds") {
                icon.src = `./images/clouds.png`
            } else if (data.weather[0].main == "Clear") {
                icon.src = `"./images/clear.png"`
            } else if (data.weather[0].main == "Rain") {
                icon.src = `./images/rain.png`
            } else if (data.weather[0].main == "Drizzle") {
                icon.src = `./images/drizzle.png`
            } else if (data.weather[0].main == "Mist") {
                icon.src = `./images/mist.png`
            } else if (data.weather[0].main == "Snow") {
                icon.src = `./images/snow.png`
            }
            
                document.querySelector(".content").style.display = "block"
                document.querySelector(".error").style.display = "none"
        }


    } catch (error) {
        console.log(error)
    }


}
searchBtn.addEventListener("click", () => {
    checkData(searchBox.value)
})