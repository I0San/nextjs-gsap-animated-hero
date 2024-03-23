import React from 'react'
import styles from './index.module.css'
import Icon from '../icons'

export default function Navigation() {
    return (
        <nav className={styles.nav}>
            <div>
                <div className="svg-container">
                    <Icon name="globe" />
                </div>
                <div>Globe Express</div>
            </div>
            <div>
                <div className={styles.active}>Home</div>
                <div>Holidays</div>
                <div>Destinations</div>
                <div>Flights</div>
                <div>Offers</div>
                <div>Contact</div>
                <div className="svg-container">
                    <Icon name="search" />
                </div>
                <div className="svg-container">
                    <Icon name="user" />
                </div>
            </div>
        </nav>
    )
}
