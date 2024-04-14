import { LocationDetailScreen } from 'app/features/location/location-detail'
import Head from 'next/head'
import Navbar from 'pages/nav/navbar'
import { H1 } from 'tamagui'

export default function Location() {
  return (
    <>
      <Head>
        <title>Weather</title>
      </Head>
      <Navbar />
      <LocationDetailScreen />
    </>
  )
}
