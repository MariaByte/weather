<script>
import axios from 'axios';
import { resolveTransitionHooks } from 'vue'

export default {
    data() {
        return {
            city: "",
            error: "",
            info: null
        }
    },
    computed: {
        cityName() {
            return "«" + this.city + "»"
        },
        showTemp() {
            return "Температура: " + Math.round(this.info.main.temp) + "°"
        },
        showFeelsLike() {
            return "Ощущается как: " + Math.round(this.info.main.feels_like) + "°"
        },
        showMinTemp() {
            return "Минимальная температура: " + this.info.main.temp_min.toFixed(2) + "°"
        },
        showMaxTemp() {
            return "Максимальная температура: " + this.info.main.temp_max.toFixed(2) + "°"
        },
        backgroundColor() {
            let cold = 'linear-gradient(160deg, rgb(9, 98, 121) 58%,rgb(2, 0, 36) 86%)';
            let hot = 'linear-gradient(159deg, rgb(240, 178, 17) 53%,rgb(9, 98, 121) 93%)';
            let medium = 'linear-gradient(154deg, rgb(126, 139, 69) 54%,rgb(9, 98, 121) 93%,rgb(9, 98, 121) 98%)';
            if (this.info.main.temp < 0) {
                return {
                'background': cold
                }
            }
            else if (this.info.main.temp > 15){
                return {
                'background': hot
                }
            }
            else {
                return {
                'background': medium
                }
            }
            
        }
    },
    methods: {
        getWeather() {
            if(this.city.trim().length < 2) {
                this.error = "Нужно название более одного символа"
                this.info = null
                return false
            }

            this.error=""
            
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${process.env.VUE_APP_WEATHER_API_KEY}`)
            .then(res => this.info = res.data)
            .catch(err => {
                if (err.response.data.cod == "404")
                this.error = "Информация о городе не найдена";
                this.info = null;
                return false
            }
            )
        }
    }
}
</script>

<template>
    <div class="wrapper" :style="[info != null ? backgroundColor: '']">
        <h1> поГОДНОЕ приложение</h1>
        <p> Узнать погоду в {{ city == "" ? "вашем городе" : cityName }} </p>
        <input type="text" v-model="city" placeholder="Введите город">
        <button v-if="city != ''" @click="getWeather()">Получить погоду</button>
        <button disabled v-else>Сначала введите город</button>
        <p class="error"> {{  error  }} </p>
        <div v-if="(info != null) && (error == '')"> 
            <p> {{ showTemp }}</p>
            <p> {{ showFeelsLike }}</p>
            <p> {{ showMinTemp }}</p>
            <p> {{ showMaxTemp }}</p>
        </div>
    </div>
</template>

<style scoped>

.error {
    color: #d03939;
}
.wrapper {
    width: 900px;
    height: 500px;
    border-radius: 50px;
    padding: 20px;
    background: #1f0f24;
    /* background: linear-gradient(160deg, rgb(9, 98, 121) 58%,rgb(2, 0, 36) 86%); */
    /* background: linear-gradient(158.83deg, rgb(240, 178, 17) 53.483%,rgb(9, 98, 121) 93.061%); */
    /* background: linear-gradient(153.77deg, rgb(126, 139, 69) 54.119%,rgb(9, 98, 121) 93.328%,rgb(9, 98, 121) 97.941%); */
    text-align: center;
    color: #fff;
}

.wrapper h1 {
    margin-top: 50px;
}

.wrapper p {
    margin-top: 20px;
}

.wrapper input {
    margin-top: 30px;
    background: transparent;
    border: 0;
    border-bottom: 2px solid #110813;
    color: #fcfcfc;
    font-size: 14px;
    padding: 5px 8px;
    outline: none;
}

.wrapper input:focus{
    border-bottom-color: #6e2d7d;
}


.wrapper button:disabled {
    background: #5f4b15;
    cursor: not-allowed;
}
.wrapper button {
    background: #e3bc4b;
    color: #fff;
    border-radius: 10px;
    border: 2px solid #b99935;
    padding: 10px 15px;
    margin-left: 20px;
    cursor: pointer;
    transition: transform 500ms ease;
}
.wrapper button:hover {
    transform: scale(1.1) translateY(-5px);
}
</style>
