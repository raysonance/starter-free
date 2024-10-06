import { LocationScreen } from 'app/features/location/locations'
import Head from 'next/head'
import Navbar from 'pages/nav/navbar'
import { H1 } from 'tamagui'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - JAMB CBT Practice: Kintergon</title>
        <Navbar />
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
      </Head>

      <body>
        <h1>Privacy Policy</h1>
        <p>
          <strong>Effective Date</strong>: 10/6/2024
        </p>

        <p>
          At <strong>JAMB CBT Practice: Kintergon</strong>, we respect your privacy and are
          committed to protecting your personal information. This Privacy Policy outlines how we
          collect, use, and safeguard your information when you use our app.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          When you sign up for <strong>JAMB CBT Practice: Kintergon</strong>, we collect the
          following personal information:
        </p>
        <ul>
          <div>
            <strong>Email Address</strong>: For account creation, communication, and app access.
          </div>
          <div>
            <strong>Username</strong>: For identification within the app.
          </div>
          <li>
            <strong>Password</strong>: For securing your account.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>The personal information we collect is used for the following purposes:</p>
        <ul>
          <li>To create and manage your account.</li>
          <li>To provide access to the app’s features.</li>
          <li>To communicate with you regarding app updates, changes, or issues.</li>
        </ul>
        <p>
          We do <strong>not</strong> share, sell, or rent your personal information with any third
          parties unless required by law.
        </p>

        <h2>3. Data Security</h2>
        <p>
          We take reasonable precautions to protect your personal information. Your password is
          stored securely and encrypted using industry-standard methods. However, no method of
          transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2>4. User Responsibilities</h2>
        <p>
          You are responsible for maintaining the confidentiality of your password and account.
          Please notify us immediately if you suspect any unauthorized use of your account.
        </p>

        <h2>5. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted in the
          app, and we encourage you to review this policy periodically.
        </p>

        <h2>6. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p>
          <strong>Email</strong>: kintergon@gmail.com
        </p>
      </body>
    </>
  )
}
