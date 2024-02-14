import React from 'react'
import styles from './Saves.module.css'

export default function Saves({history, checkPoint}) {
  return history.map((elem, index) => {
    return <div key={index} className={styles.button} onClick={() => checkPoint(index)}>Вернутся на {index + 1} ход</div>
  })
}
