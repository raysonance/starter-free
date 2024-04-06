import { useState } from 'react'
import styles from './navbar.module.css'
import { Nav } from 'tamagui'
import Link from 'next/link'

function Navbar() {
  // adding the states
  const [isActive, setIsActive] = useState(false)
  //add the active class
  const toggleActiveClass = () => {
    setIsActive(!isActive)
  }
  //clean up function to remove the active class
  const removeActive = () => {
    setIsActive(false)
  }
  return (
    <div className="App">
      <header className="App-header">
        <Nav
          style={{
            backgroundColor: 'transparent',
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 40,
            minHeight: 70,
          }}
        >
          {/* logo */}
          <Link href="/" style={{ fontSize: 30 }}>
            Dev.
          </Link>
          <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
            <li onClick={removeActive}>
              <Link href="/">Home</Link>
            </li>
            <li onClick={removeActive}>
              <Link href="/location/locations">My locations</Link>
            </li>
          </ul>
          <div
            className={`${styles.hamburger} ${isActive ? styles.active : ''}`}
            onClick={toggleActiveClass}
          >
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
          </div>
        </Nav>
      </header>
    </div>
  )
}
export default Navbar
