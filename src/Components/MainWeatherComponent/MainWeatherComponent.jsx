import { Flex } from "antd";
import "./MainWeatherComponent.css";

export function MainWeatherComponent({ data, city }) {
  return (
    <div className="main-weather-widget">
      <Flex className="main-widget-icon-container">
        <img
          width={95}
          src={
            data?.icon
              ? require(`../../images/${data?.icon}.svg`)
              : require("../../images/01d.svg")
          }
          alt="sun"
        />
      </Flex>
      <div>
        <div>Today</div>
        <div className="main-weather-city">{city?.name}</div>
        <div>Temperature: {data?.temp} °C</div>
        <div>{data?.condition}</div>
      </div>
    </div>
  );
}
