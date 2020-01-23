var geolocation = new qq.maps.Geolocation("A5BBZ-UZHKW-NPQRW-RHBJU-KA5RQ-NNBXZ", "myapp");
var options = {timeout: 8000};
var index_adress_city = document.querySelector("#index_adress_city"); //获取元素
var index_adress_weather = document.querySelector("#index_adress_weather"); //获取元素
var index_adress_icon = document.querySelector("#index_adress_icon"); //获取元素
//定位成功
function showPosition(position) {
    console.log(position);
    index_adress_city.innerHTML = position.city.substring(0,2);
    window.localStorage.setItem("adress",position.city.substring(0,2))
    index_adress_icon.style.display = "inline-block";
    let adress = position.city.substring(0,2);
    //获取天气
    if(window.localStorage.getItem("weather")){
        console.log(JSON.parse(window.localStorage.getItem("weather")));
        let data = new Date();
        let year = data.getFullYear();
        let month = (data.getMonth()+1);
        let day = data.getDate();
        let time = data.getTime();
        let pastTime = window.localStorage.getItem("getWeatherTime");
        let timeDifference = parseInt((time-pastTime)/1000) //时间差
        let futureTime = 7*24*60*60 //未来时间
        if(timeDifference>futureTime){
            setWeather(adress);
        }else{
            console.log(timeDifference,futureTime)
        }
        let weather = JSON.parse(window.localStorage.getItem("weather"));
        let attr = "day_"+fuzhu(year)+fuzhu(month)+fuzhu(day);
        // 获取元素添加天气情况
        let index_adress_weather = document.querySelector("#index_adress_weather");
        index_adress_weather.innerHTML = weather[attr]["weather"]+weather[attr]["temperature"].split("~")[1];
        console.log(weather[attr]["weather"],weather[attr]["temperature"])
        console.log(index_adress_weather)
    }else{
        setWeather(adress);
    }
    //将小于10的数前面加0
    function fuzhu(num){
        if(num<=9){
            return 0+""+num;
        }else{
            return num.toString();
        }
    }
    //ajax跨域请求天气状况，和设置localStorage
    function setWeather(city){
            $.ajax({
            url:"http://v.juhe.cn/weather/index?cityname="+city+"&dtype=json&format=1&key=9e814962d9e6446e722fa080684e152c",
            dataType:"jsonp",
            success:function(data){
                console.log(data)
                // console.log(JSON.stringify(data["result"]["future"]))
                window.localStorage.setItem("weather",JSON.stringify(data["result"]["future"]));
            }
        })
            let data = new Date();
            let time =  data.getTime();
            window.localStorage.setItem("getWeatherTime",time);
    }
}   
//定位失败
function showErr() {
    var adress = window.localStorage.getItem("adress");
    if(adress){
        index_adress_city.innerHTML = adress;
    }else{
        index_adress_icon.style.display = "none";
        index_adress_weather.style.display = "inline-block";
        index_adress_city.innerHTML = "定位中..";
    }
    //获取天气
    if(window.localStorage.getItem("weather")){
        console.log(JSON.parse(window.localStorage.getItem("weather")));
        let data = new Date();
        let year = data.getFullYear();
        let month = (data.getMonth()+1);
        let day = data.getDate();
        let time = data.getTime();
        let pastTime = window.localStorage.getItem("getWeatherTime");
        let timeDifference = parseInt((time-pastTime)/1000) //时间差
        let futureTime = 7*24*60*60 //未来时间
        if(timeDifference>futureTime){
            setWeather(adress);
        }else{
            console.log(timeDifference,futureTime)
        }
        let weather = JSON.parse(window.localStorage.getItem("weather"));
        let attr = "day_"+fuzhu(year)+fuzhu(month)+fuzhu(day);
        // 获取元素添加天气情况
        let index_adress_weather = document.querySelector("#index_adress_weather");
        index_adress_weather.innerHTML = weather[attr]["weather"]+weather[attr]["temperature"].split("~")[1];
        console.log(weather[attr]["weather"],weather[attr]["temperature"])
        console.log(index_adress_weather)
    }else{
        setWeather(adress);
    }
    //将小于10的数前面加0
    function fuzhu(num){
        if(num<=9){
            return 0+""+num;
        }else{
            return num.toString();
        }
    }
    //ajax跨域请求天气状况，和设置localStorage
    function setWeather(city){
            $.ajax({
            url:"http://v.juhe.cn/weather/index?cityname="+city+"&dtype=json&format=1&key=9e814962d9e6446e722fa080684e152c",
            dataType:"jsonp",
            success:function(data){
                console.log(JSON.stringify(data["result"]["future"]))
                window.localStorage.setItem("weather",JSON.stringify(data["result"]["future"]));
            }
        })
            let data = new Date();
            let time =  data.getTime();
            window.localStorage.setItem("getWeatherTime",time);
    }
}
geolocation.getLocation(showPosition, showErr, options);
