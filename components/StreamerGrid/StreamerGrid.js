//StreamerGrid.js
import React from 'react'
import styles from '../../styles/StreamerGrid.module.css'
import Image from 'next/image'

const StreamerGrid = ({channels}) => {
  return (
    <div>
      <h1>{`Nate's Favorite Streamers`}</h1>
      {channels.map(renderGridItem)}
    </div>
  )
}

//Render Method
const renderGridItem = channel => (
  <div key={channel.id} className={styles.gridItem}>
    <Image layout="fill" src={channel.thumbnail_url} />
    <div className={styles.gridItemContent}>
      <p>{channel.display_name}</p>
      {channel.is_live && <p>🟢 Live Now!</p>}
      {!channel.is_live && <p>🔴 Offline :(</p>}
    </div>
  </div>
)


export default StreamerGrid