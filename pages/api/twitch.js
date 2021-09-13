// This is where all the logic for your Twitch API will live!
export default async (req, res) => {
  try {
    
    if (req.method === 'POST') {
      const { data } = req.body

      const channelData = await getTwitchChannel(data)

      if (channelData) {
        console.log("channel data: ", channelData)
        res.status(200).json({data: channelData})
      }

      res.status(404).send()
    }
  } catch (error) {
    console.warn(error.message)
    res.status(500).send()
  }
}