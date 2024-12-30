import { Typography } from "antd";
import "./Box.css";
import getWeekday from "../../utils/getWeekday";

export function UIbox({ data }) {
  return (
    <div className="weather-box">
      <div>
        <Typography.Text strong>
          <b>{getWeekday(data?.day)}</b>
        </Typography.Text>
      </div>

      <div>
        <img
          src={
            data?.icon
              ? require(`../../images/${data?.icon}.svg`)
              : require("../../images/01d.svg")
          }
          alt="sun"
        />
      </div>
      <div>{data?.temp} °C</div>
    </div>
  );
}
