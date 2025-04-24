import { useEffect, useState } from "react"
import RafflePublicCard from "./RafflePublicCard"

const RafflesPublic = () => {
  const [RafflesPublic, setRafflesPublic] = useState([])

  const fetchRafflesPublic = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_URL}/api/raffles/public`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
  
      const data = await res.json()
      if (res.ok && data) {
        setRafflesPublic(data)
      } else {
        console.error("Error fetching raffles:", data)
      }
    } catch (err) {
      console.error("Error en el servidor", err)
    }
  }

  useEffect(() => {
    fetchRafflesPublic()
  }, [])


  return (
    <div className="px-4 py-6">
      <h1 className="text-center text-xl font-bold mt-8">Sorteos Publicos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {RafflesPublic.map((raffle) => (
          <RafflePublicCard key={raffle.id} raffle={raffle} />
        ))}
    </div>
    </div>
  )
}

export default RafflesPublic