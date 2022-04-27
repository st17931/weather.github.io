const displayTime = document.getElementById("time");
const displayDate = document.getElementById("dateDay");
const displayMoreDetail = document.getElementById("moreDetails");
const displayFutureTelecast = document.getElementById("futureTelecast");

const dayNames = ["sunday","monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames = ["Jan","Feb","March","April","May","Jun","July","August","September","October","November","December"]
const API_KEY = "2f57ff3d901267e930351ead0c820640";




setInterval(()=>{
 const time = new Date();
 const month = time.getMonth();
 const date = time.getDate();
 const day = time.getDay();
 const hour = time.getHours();
 const hourIn12HourFormate = hour>=13 ? hour%12:hour;
 const amPm = hour>=12?"PM":"AM";
 const minutes = time.getMinutes();
 displayTime.innerHTML=hourIn12HourFormate + ":" + minutes + `<span id="am-pm">${amPm}</span>`;
 displayDate.innerHTML=dayNames[day] + "," + date + monthNames[month];

},1000);

getWeatherData();
function getWeatherData(){
    navigator.geolocation.getCurrentPosition((sucess)=>{
        let{latitude,longitude} = sucess.coords;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res=>res.json()).then(data=>{
            console.log(data);
            showWheatherData(data);
        })

    })
}

function showWheatherData(data){
    let{humidity,pressure,sunrise,sunset,wind_speed}=data.current;
    displayMoreDetail.innerHTML=`<div class="flex-items">
    <div id="humid">Humidity</div>
    <div>${humidity}</div>
</div>
<div class="flex-items">
    <div id="press">Pressure</div>
    <div>${pressure}</div>
</div>
<div class="flex-items">
    <div id="ws">Wind Speed</div>
    <div>${wind_speed}</div>
</div>
<div class="flex-items">
    <div id="ss">Sun Set</div>
    <div>${window.moment(sunset*1000).format("HH:mm a")}</div>
</div>
<div class="flex-items">
    <div id="sr">Sun Rise</div>
    <div>${window.moment(sunrise*1000).format("HH:mm a")}</div>
</div>`

let otherDayForCast = "";
data.daily.forEach((day,idx) => {
    otherDayForCast+=`<div class="items">
    <img src=" http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" class="weatherIcon" />
    <div class="day">${window.moment(day.dt*1000).format("ddd")}</div>
    <div class="night">${day.temp.night}</div>
    <div clas="day">${day.temp.day}</div>
</div>`
});
displayFutureTelecast.innerHTML=otherDayForCast;
    
}