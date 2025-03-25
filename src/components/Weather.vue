<template>
  <div class="weather" v-if="weatherData.adCode.city && weatherData.weather.weather">
    <span>{{ weatherData.adCode.city }}&nbsp;</span>
    <span>{{ weatherData.weather.weather }}&nbsp;</span>
    <span>{{ weatherData.weather.temperature }}℃</span>
    <span class="sm-hidden">
      &nbsp;{{
        weatherData.weather.winddirection?.endsWith("風")
          ? weatherData.weather.winddirection
          : weatherData.weather.winddirection + "風"
      }}&nbsp;
    </span>
    <span class="sm-hidden">{{ weatherData.weather.windpower }}&nbsp;級</span>
  </div>
  <div class="weather" v-else>
    <span>天氣數據獲取失敗</span>
  </div>
</template>

<script setup>
import { getAdcode, getWeather, getOtherWeather } from "@/api";
import { Error } from "@icon-park/vue-next";

// 高德開發者 Key
const mainKey = import.meta.env.VITE_WEATHER_KEY;

// 天氣數據
const weatherData = reactive({
  adCode: {
    city: null, // 城市
    adcode: null, // 城市編碼
  },
  weather: {
    weather: null, // 天氣現象
    temperature: null, // 實時氣溫
    winddirection: null, // 風向描述
    windpower: null, // 風力級別
  },
});

// 取出天氣平均值
const getTemperature = (min, max) => {
  try {
    // 計算平均值並四捨五入
    const average = (Number(min) + Number(max)) / 2;
    return Math.round(average);
  } catch (error) {
    console.error("計算溫度出現錯誤：", error);
    return "NaN";
  }
};

// 獲取天氣數據
const getWeatherData = async () => {
  try {
    // 獲取地理位置信息
    if (!mainKey) {
      console.log("未配置，使用備用天氣接口");
      const result = await getOtherWeather();
      console.log(result);
      const data = result.result;
      weatherData.adCode = {
        city: data.city.City || "未知地區",
        // adcode: data.city.cityId,
      };
      weatherData.weather = {
        weather: data.condition.day_weather,
        temperature: getTemperature(data.condition.min_degree, data.condition.max_degree),
        winddirection: data.condition.day_wind_direction,
        windpower: data.condition.day_wind_power,
      };
    } else {
      // 獲取 Adcode
      const adCode = await getAdcode(mainKey);
      console.log(adCode);
      if (adCode.infocode !== "10000") {
        throw "地區查詢失敗";
      }
      weatherData.adCode = {
        city: adCode.city,
        adcode: adCode.adcode,
      };
      // 獲取天氣信息
      const result = await getWeather(mainKey, weatherData.adCode.adcode);
      weatherData.weather = {
        weather: result.lives[0].weather,
        temperature: result.lives[0].temperature,
        winddirection: result.lives[0].winddirection,
        windpower: result.lives[0].windpower,
      };
    }
  } catch (error) {
    console.error("天氣信息獲取失敗:" + error);
    onError("天氣信息獲取失敗");
  }
};

// 報錯信息
const onError = (message) => {
  ElMessage({
    message,
    icon: h(Error, {
      theme: "filled",
      fill: "#efefef",
    }),
  });
  console.error(message);
};

onMounted(() => {
  // 調用獲取天氣
  getWeatherData();
});
</script>
