import React from 'react'
import styles from './Elems.module.css'

export default function Elems({elems, click}) {    
    return elems.map((elem, index) => {
        return <div key={index} className={styles.elem} onClick={() => click(index)}>{elem}</div>
    })
}
