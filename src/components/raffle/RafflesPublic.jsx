import { useEffect, useState } from "react"
import RafflePublicCard from "./RafflePublicCard"

const RafflesPublic = () => {
  const [rafflesPublic, setRafflesPublic] = useState([])

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

  const rafflesPublicPending = rafflesPublic.filter(r => r.status == 'pending')
  const rafflesPublicFinished = rafflesPublic.filter(r => r.status == 'finished')


  return (
    <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="shadow-md rounded-2xl p-4 bg-white">
        <h1 className="text-center text-xl font-bold mt-4">Sorteos Activos</h1>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-4">
          {rafflesPublicPending.map((raffle) => (
            <RafflePublicCard key={raffle.id} raffle={raffle} />
          ))}
        </div>
      </div>
      <div className="shadow-md rounded-2xl p-4 bg-white">
        <h1 className="text-center text-xl font-bold mt-4">Sorteos Finalizados</h1>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-4">
          {rafflesPublicFinished.map((raffle) => (
            <RafflePublicCard key={raffle.id} raffle={raffle} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RafflesPublic