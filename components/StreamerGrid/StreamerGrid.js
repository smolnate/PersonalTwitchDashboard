//StreamerGrid.js
import React from 'react'
import styles from '../../styles/StreamerGrid.module.css'
import Image from 'next/image'

const StreamerGrid = ({channels}) => {
  return (
    <div>
      <p></p>
      {channels.map(renderGridItem)}
    </div>
  )
}

//Actions
const removeChannelAction = () => {

}

//Render Method
const renderGridItem = channel => (
  <div key={channel.id} className={styles.gridItem}>
    <Image width='100px' height='100px' src={channel.thumbnail_url} />
    <div className={styles.gridItemContent}>
      <button onClick={removeChannelAction(channel.id)}>X</button>
      <p>{channel.display_name}</p>
      {channel.is_live && <a href={'http://twitch.tv/' + channel.broadcaster_login}> 🟢 Live Now! 🔗 </a>}
      {!channel.is_live && <p>🔴 Offline</p>}
    </div>
  </div>
)




export default StreamerGrid