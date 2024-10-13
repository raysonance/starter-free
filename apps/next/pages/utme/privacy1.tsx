import Head from 'next/head'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Formulae</title>
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
        <h1>Privacy Policy for Formulae</h1>

        <p>
          At Formulae, we prioritize your privacy. This Privacy Policy explains how we manage any
          data that may be collected by third-party advertising services when you use our app.
        </p>

        <h2>1. No Direct Data Collection</h2>
        <p>
          Formulae does not collect any personal information from users. This includes but is not
          limited to:
        </p>
        <ul>
          <li>Email addresses</li>
          <li>Usernames</li>
          <li>Passwords</li>
          <li>Device information</li>
          <li>Location data</li>
          <li>Usage statistics</li>
        </ul>

        <h2>2. Third-Party Advertisements</h2>
        <p>
          Our app may display ads provided by third-party advertising services such as Google AdMob.
          These services may collect information about your device, including:
        </p>
        <ul>
          <li>Device type and settings</li>
          <li>Operating system</li>
          <li>IP address</li>
          <li>Advertising ID</li>
        </ul>
        <p>
          This data is collected by the third-party services to provide personalized or
          non-personalized ads. We do not have access to or control over the data collected by these
          third parties.
        </p>

        <h2>3. Data Security</h2>
        <p>
          Although we do not collect any personal data, third-party ad services may collect certain
          information. We recommend reviewing the privacy policies of these services to understand
          how your data is handled:
        </p>
        <ul>
          <li>
            <a href="https://policies.google.com/privacy">Google AdMob Privacy Policy</a>
          </li>
        </ul>

        <h2>4. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be reflected on this
          page. We encourage users to review this policy periodically for any updates.
        </p>

        <h2>5. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, feel free to contact us
          at favourgilead@gmail.com.
        </p>
      </body>
    </>
  )
}
