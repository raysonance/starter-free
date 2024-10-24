import { LocationScreen } from 'app/features/location/locations'
import Head from 'next/head'
import Navbar from 'pages/nav/navbar'
import { H1 } from 'tamagui'

export default function Delete() {
  return (
    <>
      <style>
        {`
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          padding: 20px;
          max-width: 800px;
          margin: auto;
          background-color: #f4f4f4;
        }
        h1 {
          color: #333;
          text-align: center;
          margin-bottom: 20px;
        }
        h2 {
          color: #555;
          margin-top: 20px;
        }
        p, ul {
          color: #666;
        }
        ul {
          margin-left: 20px;
            list-style-type: circle;

          
        }
        strong {
          color: #333;
        }
          div {
          padding: 10px;
          }
        p {
          margin-bottom: 10px;
        }
          li {
          }
        a {
          color: #007BFF;
        }
      `}
      </style>
      <Head>
        <title>Delete Your Account</title>
      </Head>
      <h2>Steps to Delete Your Account in Jamb 2025</h2>

      <ol>
        <li>
          <strong>Prepare an Email</strong>
          <br />
          Open your email application and compose a new email.
        </li>
        <li>
          <strong>Subject Line</strong>
          <br />
          In the subject line, write: <em>Account Deletion Request - [Your Username]</em>.
        </li>
        <li>
          <strong>Email Body</strong>
          <br />
          In the body of the email, include the following details:
          <ul>
            <div>Your username</div>
            <div>The email address associated with your account</div>
            <div>
              A brief request to delete your account (e.g. I would like to request the deletion of
              my account.).
            </div>
          </ul>
        </li>
        <li>
          <strong>Send the Email</strong>
          <br />
          Send the email to <a href="mailto:kintergon@gmail.com">kintergon@gmail.com</a>. Please
          ensure all details are correct before sending.
        </li>
        <div>
          <strong>Confirmation</strong>
          <br />
          Once we receive your request, we will confirm the deletion of your account
          via email.
        </div>
      </ol>
    </>
  )
}
