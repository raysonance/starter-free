import { UserDetailScreen } from 'app/features/user/detail-screen'
import Head from 'next/head'
import Navbar from 'pages/nav/navbar'
import { H1 } from 'tamagui'

export default function Page() {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Navbar />
      <UserDetailScreen />
    </>
  )
}
