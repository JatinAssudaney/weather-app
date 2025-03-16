import DayClearIcon from "../assets/icons/day/clear.svg";
import DayCloudyIcon from "../assets/icons/day/cloudy.svg";
import DayRainIcon from "../assets/icons/day/rain.svg";
import DaySnowIcon from "../assets/icons/day/snow.svg";
import DayStormIcon from "../assets/icons/day/storm.svg";
import DayWindyIcon from "../assets/icons/day/windy.svg";
import NightClearIcon from "../assets/icons/night/clear.svg";
import NightCloudyIcon from "../assets/icons/night/cloudy.svg";
import NightRainIcon from "../assets/icons/night/rain.svg";
import NightSnowIcon from "../assets/icons/night/snow.svg";
import NightStormIcon from "../assets/icons/night/storm.svg";
import NightWindyIcon from "../assets/icons/night/windy.svg";
import { TemperatureCode, TemperatureCodeKey, WeatherCondition } from "@/types";

export const getTemperatureIcon = (
  code: TemperatureCodeKey,
  isDay: boolean
): React.ReactNode => {
  const style = {
    width: 100,
    height: 100,
  };

  const weather = TemperatureCode[code];
  switch (weather) {
    case WeatherCondition.CLEAR:
      return isDay ? (
        <DayClearIcon {...style} />
      ) : (
        <NightClearIcon {...style} />
      );
    case WeatherCondition.CLOUDY:
      return isDay ? (
        <DayCloudyIcon {...style} />
      ) : (
        <NightCloudyIcon {...style} />
      );
    case WeatherCondition.RAIN:
      return isDay ? <DayRainIcon {...style} /> : <NightRainIcon {...style} />;
    case WeatherCondition.SNOW:
      return isDay ? <DaySnowIcon {...style} /> : <NightSnowIcon {...style} />;
    case WeatherCondition.STORM:
      return isDay ? (
        <DayStormIcon {...style} />
      ) : (
        <NightStormIcon {...style} />
      );
    case WeatherCondition.WINDY:
      return isDay ? (
        <DayWindyIcon {...style} />
      ) : (
        <NightWindyIcon {...style} />
      );
    default:
      return isDay ? (
        <DayClearIcon {...style} />
      ) : (
        <NightClearIcon {...style} />
      );
  }
};
