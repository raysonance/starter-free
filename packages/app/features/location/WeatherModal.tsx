import { Card, ColorTokens, Image, Paragraph, Progress, SizeTokens, XStack, YStack } from '@my/ui'
import React, { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'

export function formatDate(dateString: string | undefined, daily?: string): string {
  if (dateString) {
    const date = parseISO(dateString)
    const value = !daily ? format(date, 'EEE, dd MMMM, HH:mm') : format(date, 'EEE, dd MMMM')
    return value
  }
  return ''
}
type Props = { weather?: WeatherData['forecast']['forecastday'][0] | undefined }
export function WeatherModal(props: Props) {
  const { weather } = props
  console.log(weather?.day.avgtemp_c, 'lll')
  return (
    <YStack>
      <Card
        size={'$7'}
        mt={'$4'}
        $platform-web={{ width: '70%' }}
        $sm={{ width: '100%' }}
        als={'center'}
        py={'$3'}
        // bc={'$blue5Light'}
        elevate
      >
        <XStack jc={'space-between'} ac="center" ml={'$4'}>
          <YStack $platform-web={{ gap: '$3' }}>
             <Paragraph size={'$1'} color={'$gray10Light'}>
              {formatDate(weather?.date, '1')}
            </Paragraph>
             <Paragraph size={'$10'}>{weather?.day.avgtemp_c}°C</Paragraph>
             <Paragraph $sm={{size: '$2' }}>{weather?.day.condition.text}</Paragraph>
            {/*  <Paragraph $sm={{size: '$2' }}>
              Feels like  <Paragraph $sm={{size: '$2' }} fow={'700'}> {weather?.day.feelslike_c}°C</Paragraph>
            </Paragraph> */}
          </YStack>
          <YStack>
            <Image
              ml={'$2'}
              source={{
                width: 200,
                height: 150,
                uri: 'https:' + `${weather?.day.condition.icon}`,
              }}
              resizeMode="cover"
            />
          </YStack>
        </XStack>
        <Astro
          sunrise={weather?.astro.sunrise}
          sunset={weather?.astro.sunset}
          moon_phase={weather?.astro.moon_phase}
        />
      </Card>
    </YStack>
  )
}

type AstroProps = {
  sunrise?: string
  sunset?: string
  moon_phase?: string
}

const Astro = (props: AstroProps) => {
  const { sunrise, sunset, moon_phase } = props
  return (
    <XStack jc={'space-between'} ac="center" m={'$4'}>
      <YStack ai={'center'} jc={'center'}>
         <Paragraph $sm={{size: '$2' }} color={'$gray10Light'}>Sunrise</Paragraph>
         <Paragraph $sm={{size: '$2' }}>{sunrise}</Paragraph>
      </YStack>
      <YStack ai={'center'} jc={'center'}>
         <Paragraph $sm={{size: '$2' }} color={'$gray10Light'}>Moon Phase</Paragraph>
         <Paragraph $sm={{size: '$2' }}>{moon_phase}</Paragraph>
      </YStack>
      <YStack ai={'center'} jc={'center'}>
         <Paragraph $sm={{size: '$2' }} color={'$gray10Light'}>Sunset</Paragraph>
         <Paragraph $sm={{size: '$2' }}>{sunset}</Paragraph>
      </YStack>
    </XStack>
  )
}

type SecondProps = {
  max?: number
  min?: number
  uv?: number
  pressure?: number
}

const SecondRow = (props: SecondProps) => {
  const { max, min, uv, pressure } = props
  const [size, setSize] = useState(1)
  const [color, setColor] = useState('$gray10Dark')
  const [progress, setProgress] = useState(0)
  const sizeProp = `$${size}` as SizeTokens
  const colorProp = `$${color}` as ColorTokens

  useEffect(() => {
    if (uv) {
      const timer = setTimeout(() => {
        setProgress(uv * 10)
        if (uv > 6) {
          setColor('red10')
        } else if (uv <= 2) {
          setColor('green10')
        } else {
          setColor('yellow10')
        }
      }, 1000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [])
  return (
    <XStack jc={'space-between'} ac="center" m={'$4'}>
      <YStack ai={'center'} jc={'center'}>
         <Paragraph $sm={{size: '$2' }} color={'$gray10Light'}>t° max, min</Paragraph>
         <Paragraph $sm={{size: '$2' }}>
           <Paragraph $sm={{size: '$2' }} color={'$gray10Light'}>↑</Paragraph>
          {max}° <Paragraph $sm={{size: '$2' }} color={'$gray10Light'}>↓</Paragraph>
          {min}°
        </Paragraph>
      </YStack>
      <YStack ai={'center'} jc={'center'}>
         <Paragraph $sm={{size: '$2' }} color={'$gray10Light'}>UV index</Paragraph>
        <Progress size={sizeProp} value={progress}>
          <Progress.Indicator animation="bouncy" bc={colorProp} />
        </Progress>
         <Paragraph $sm={{size: '$2' }}>{uv}</Paragraph>
      </YStack>
      <YStack ai={'center'} jc={'center'}>
         <Paragraph $sm={{size: '$2' }} color={'$gray10Light'}>Pressure</Paragraph>
         <Paragraph $sm={{size: '$2' }}>
          {pressure}
           <Paragraph $sm={{size: '$2' }} color={'$gray10Light'}> mmHg</Paragraph>
        </Paragraph>
      </YStack>
    </XStack>
  )
}

type ThirdProps = {
  precipitation?: number
  humidity?: number
  wind?: number
  winddir?: string
}

const ThirdRow = (props: ThirdProps) => {
  const { precipitation, humidity, wind, winddir } = props
  return (
    <XStack jc={'space-between'} ac="center" m={'$4'}>
      <YStack ai={'center'} jc={'center'}>
         <Paragraph $sm={{size: '$2' }} color={'$gray10Light'}>Precipprob</Paragraph>
         <Paragraph $sm={{size: '$2' }}>{precipitation}%</Paragraph>
      </YStack>
      <YStack ai={'center'} jc={'center'}>
         <Paragraph $sm={{size: '$2' }} color={'$gray10Light'}>Humidity</Paragraph>
         <Paragraph $sm={{size: '$2' }}>{humidity}%</Paragraph>
      </YStack>
      <YStack ai={'center'} jc={'center'}>
         <Paragraph $sm={{size: '$2' }} color={'$gray10Light'}>Wind</Paragraph>
         <Paragraph $sm={{size: '$2' }}>
          {wind} m/h {winddir}
        </Paragraph>
      </YStack>
    </XStack>
  )
}

export default WeatherModal

export interface WeatherData {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    tz_id: string
    localtime_epoch: number
    localtime: string
  }
  current: {
    last_updated_epoch: number
    last_updated: string
    temp_c: number
    temp_f: number
    is_day: number
    condition: {
      text: string
      icon: string
      code: number
    }
    wind_mph: number
    wind_kph: number
    wind_degree: number
    wind_dir: string
    pressure_mb: number
    pressure_in: number
    precip_mm: number
    precip_in: number
    humidity: number
    cloud: number
    feelslike_c: number
    feelslike_f: number
    vis_km: number
    vis_miles: number
    uv: number
    gust_mph: number
    gust_kph: number
  }
  forecast: {
    forecastday: {
      date: string
      date_epoch: number
      day: {
        maxtemp_c: number
        maxtemp_f: number
        mintemp_c: number
        mintemp_f: number
        avgtemp_c: number
        avgtemp_f: number
        maxwind_mph: number
        maxwind_kph: number
        totalprecip_mm: number
        totalprecip_in: number
        totalsnow_cm: number
        avgvis_km: number
        avgvis_miles: number
        avghumidity: number
        daily_will_it_rain: number
        daily_chance_of_rain: number
        daily_will_it_snow: number
        daily_chance_of_snow: number
        condition: {
          text: string
          icon: string
          code: number
        }
        uv: number
      }
      astro: {
        sunrise: string
        sunset: string
        moonrise: string
        moonset: string
        moon_phase: string
        moon_illumination: number
        is_moon_up: number
        is_sun_up: number
      }
      hour: {
        time_epoch: number
        time: string
        temp_c: number
        temp_f: number
        is_day: number
        condition: {
          text: string
          icon: string
          code: number
        }
        wind_mph: number
        wind_kph: number
        wind_degree: number
        wind_dir: string
        pressure_mb: number
        pressure_in: number
        precip_mm: number
        precip_in: number
        snow_cm: number
        humidity: number
        cloud: number
        feelslike_c: number
        feelslike_f: number
        windchill_c: number
        windchill_f: number
        heatindex_c: number
        heatindex_f: number
        dewpoint_c: number
        dewpoint_f: number
        will_it_rain: number
        chance_of_rain: number
        will_it_snow: number
        chance_of_snow: number
        vis_km: number
        vis_miles: number
        gust_mph: number
        gust_kph: number
        uv: number
      }[]
    }[]
  }
}
