import { Button, Flex, Input, Spin } from "antd";
import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { UIbox } from "./Components/Boxes/Box";
import getDayIndices from "./utils/getIndices";
import { MainWeatherComponent } from "./Components/MainWeatherComponent/MainWeatherComponent";

function App() {
  const [city, setCity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const inputRef = useRef();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const city = inputRef.current.input.value;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=6557810176c36fac5f0db536711a6c52`
    ).then((resp) => resp.json());

    console.log(await response);
    if (response.cod === "200") {
      setCity(response.city);

      let wetherData = [];
      const dayIndices = getDayIndices(response);

      for (let i = 0; i < 4; i++) {
        const singleItem = response?.list?.[dayIndices[i]];

        if (singleItem) {
          wetherData.push({
            key: singleItem?.dt,
            day: singleItem?.dt_txt,
            icon: singleItem?.weather?.[0]?.icon,
            temp: Math.round(singleItem?.main?.temp - 273),
            condition: singleItem?.weather?.[0]?.main,
          });
        }
      }

      setData(wetherData);
    }
    setIsLoading(false);
  }, []);

  const onKeyDownHandler = useCallback((event) => {
    if (event.which === 13) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Spin spinning={isLoading}>
      <div className="weather-main">
        <Input
          defaultValue="multan"
          style={{ width: 200, marginTop: 12 }}
          ref={inputRef}
          placeholder="enter city name"
          onKeyDown={onKeyDownHandler}
        />
        <div className="widget-container">
          <MainWeatherComponent data={data?.[0]} city={city} />
          <Flex gap={20} className="widget-weather-days">
            {data?.map((item) => (
              <UIbox key={item?.key} data={{ ...item }} />
            ))}
          </Flex>
        </div>
      </div>
    </Spin>
  );
}

export default App;
