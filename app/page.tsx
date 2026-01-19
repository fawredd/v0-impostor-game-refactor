"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

type GamePhase = "setup" | "starter" | "player-turn" | "reveal" | "next-player" | "complete"

const SPANISH_WORDS = [
  // Uso diario
  "Cuchara",
  "Tenedor",
  "Cuchillo",
  "Plato",
  "Vaso",
  "Taza",
  "Silla",
  "Mesa",
  "Cama",
  "Almohada",
  "Sábana",
  "Toalla",
  "Jabón",
  "Cepillo",
  "Peine",
  "Espejo",
  "Llave",
  "Puerta",
  "Ventana",
  "Escalera",
  "Lámpara",
  "Reloj",
  "Teléfono",
  "Billetera",
  "Mochila",
  "Paraguas",
  "Anteojos",
  "Zapatos",
  "Remera",
  "Pantalón",
  "Campera",
  "Gorra",
  "Heladera",
  "Cocina",
  "Horno",
  "Microondas",
  "Licuadora",
  "Plancha",
  "Aspiradora",
  "Escoba",
  // Deportes
  "Pelota",
  "Raqueta",
  "Red",
  "Arco",
  "Cancha",
  "Piscina",
  "Bicicleta",
  "Patines",
  "Skate",
  "Casco",
  "Guantes",
  "Silbato",
  "Medalla",
  "Trofeo",
  "Estadio",
  "Gimnasio",
  "Pesas",
  "Cinta",
  "Aro",
  "Trampolín",
  // Naturaleza
  "Árbol",
  "Flor",
  "Hoja",
  "Raíz",
  "Tronco",
  "Rama",
  "Pasto",
  "Bosque",
  "Selva",
  "Montaña",
  "Volcán",
  "Río",
  "Lago",
  "Mar",
  "Playa",
  "Arena",
  "Roca",
  "Cascada",
  "Cueva",
  "Desierto",
  "Nube",
  "Lluvia",
  "Trueno",
  "Relámpago",
  "Arcoíris",
  "Nieve",
  "Granizo",
  "Sol",
  "Luna",
  "Estrella",
  // Animales
  "Perro",
  "Gato",
  "Caballo",
  "Vaca",
  "Cerdo",
  "Oveja",
  "Gallina",
  "Pato",
  "Conejo",
  "Ratón",
  "León",
  "Tigre",
  "Elefante",
  "Jirafa",
  "Mono",
  "Oso",
  "Lobo",
  "Zorro",
  "Ciervo",
  "Canguro",
  "Delfín",
  "Ballena",
  "Tiburón",
  "Pulpo",
  "Tortuga",
  "Cocodrilo",
  "Serpiente",
  "Rana",
  "Águila",
  "Búho",
  "Loro",
  "Pingüino",
  "Flamenco",
  "Paloma",
  "Gorrión",
  // Insectos
  "Hormiga",
  "Abeja",
  "Avispa",
  "Mariposa",
  "Polilla",
  "Mosca",
  "Mosquito",
  "Araña",
  "Escarabajo",
  "Cucaracha",
  "Grillo",
  "Saltamontes",
  "Libélula",
  "Mariquita",
  "Oruga",
  "Ciempiés",
  "Escorpión",
  "Luciérnaga",
  "Mantis",
  "Cigarra",
]

const getRandomWord = () => {
  return SPANISH_WORDS[Math.floor(Math.random() * SPANISH_WORDS.length)]
}

export default function ImpostorGame() {
  const [phase, setPhase] = useState<GamePhase>("setup")
  const [players, setPlayers] = useState<string[]>([])
  const [secretWord, setSecretWord] = useState("")
  const [impostor, setImpostor] = useState("")
  const [starter, setStarter] = useState("")
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [inputNames, setInputNames] = useState("")
  const [inputWord, setInputWord] = useState("")
  const [impostorRevealed, setImpostorRevealed] = useState(false)
  const [wordHidden, setWordHidden] = useState(false)

  const generateRandomWord = () => {
    setInputWord(getRandomWord())
    setWordHidden(true)
  }

  const toggleWordVisibility = () => {
    setWordHidden(!wordHidden)
  }

  const startGame = () => {
    const nameList = inputNames
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n.length > 0)

    if (nameList.length < 3) {
      alert("Mínimo 3 jugadores")
      return
    }

    if (!inputWord.trim()) {
      alert("Ingresa una palabra secreta")
      return
    }

    const shuffledPlayers = [...nameList].sort(() => Math.random() - 0.5)
    const selectedImpostor = shuffledPlayers[Math.floor(Math.random() * shuffledPlayers.length)]
    const selectedStarter = shuffledPlayers[Math.floor(Math.random() * shuffledPlayers.length)]

    setPlayers(shuffledPlayers)
    setSecretWord(inputWord.trim())
    setImpostor(selectedImpostor)
    setStarter(selectedStarter)
    setImpostorRevealed(false)
    setPhase("starter")
  }

  const continueToGame = () => {
    setCurrentPlayerIndex(0)
    setPhase("player-turn")
  }

  const revealRole = () => {
    setPhase("reveal")
    setTimeout(() => {
      setPhase("next-player")
    }, 3000)
  }

  const nextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1)
      setPhase("player-turn")
    } else {
      setPhase("complete")
    }
  }

  const revealImpostor = () => {
    setImpostorRevealed(true)
  }

  const resetGame = () => {
    setPhase("setup")
    setPlayers([])
    setSecretWord("")
    setImpostor("")
    setStarter("")
    setCurrentPlayerIndex(0)
    setInputWord("")
    setImpostorRevealed(false)
    setWordHidden(false)
    // inputNames is NOT reset - names are remembered
  }

  const currentPlayer = players[currentPlayerIndex]
  const isCurrentPlayerImpostor = currentPlayer === impostor

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Setup Phase */}
        {phase === "setup" && (
          <Card className="bg-white/95 backdrop-blur">
            <CardContent className="pt-6 space-y-6">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-2">🕵️ El Impostor</h1>
                <p className="text-muted-foreground">
                  Un jugador es el impostor. Los demás reciben la palabra secreta.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Participantes (uno por línea):</label>
                <Textarea
                  value={inputNames}
                  onChange={(e) => setInputNames(e.target.value)}
                  placeholder="María&#10;Juan&#10;Carlos&#10;Ana"
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Palabra secreta:</label>
                <div className="flex gap-2">
                  <Input
                    value={inputWord}
                    onChange={(e) => {
                      setInputWord(e.target.value)
                      setWordHidden(false)
                    }}
                    placeholder="ej: Pizza"
                    className="flex-1"
                    type={wordHidden ? "password" : "text"}
                  />
                  {wordHidden && (
                    <Button
                      type="button"
                      onClick={toggleWordVisibility}
                      variant="outline"
                      size="icon"
                      className="shrink-0 bg-transparent"
                      title="Mostrar palabra"
                    >
                      👁️
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={generateRandomWord}
                    variant="outline"
                    size="icon"
                    className="shrink-0 bg-transparent"
                    title="Generar palabra aleatoria"
                  >
                    🎲
                  </Button>
                </div>
              </div>

              <Button onClick={startGame} className="w-full" size="lg">
                Empezar Juego
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Starter Announcement */}
        {phase === "starter" && (
          <Card className="bg-white/95 backdrop-blur">
            <CardContent className="pt-6 space-y-6 text-center">
              <div className="space-y-4">
                <div className="text-6xl">👉</div>
                <h2 className="text-2xl font-bold">Comienza la ronda:</h2>
                <p className="text-4xl font-bold text-purple-600">{starter}</p>
              </div>
              <Button onClick={continueToGame} className="w-full" size="lg">
                Continuar
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Player Turn - Show name, they tap to reveal */}
        {phase === "player-turn" && (
          <Card className="bg-white/95 backdrop-blur">
            <CardContent className="pt-6 space-y-6 text-center">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Jugador {currentPlayerIndex + 1} de {players.length}
                </p>
                <h2 className="text-2xl font-bold mb-4">Es tu turno:</h2>
                <p className="text-4xl font-bold text-purple-600 mb-8">{currentPlayer}</p>
                <p className="text-muted-foreground">Toca el botón para ver tu rol (los demás no deben mirar)</p>
              </div>
              <Button onClick={revealRole} className="w-full" size="lg">
                Ver mi rol
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Reveal Phase - Shows role for 3 seconds */}
        {phase === "reveal" && (
          <Card className="bg-white/95 backdrop-blur">
            <CardContent className="pt-6 pb-6">
              <div className="text-center space-y-4">
                {isCurrentPlayerImpostor ? (
                  <>
                    <div className="text-8xl mb-4">🕵️‍♂️</div>
                    <h2 className="text-3xl font-bold text-red-600">Eres el IMPOSTOR</h2>
                    <p className="text-muted-foreground">No conoces la palabra secreta</p>
                  </>
                ) : (
                  <>
                    <div className="text-8xl mb-4">📌</div>
                    <h2 className="text-xl font-medium text-muted-foreground mb-2">La palabra secreta es:</h2>
                    <p className="text-5xl font-bold text-green-600">{secretWord}</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Player Transition */}
        {phase === "next-player" && (
          <Card className="bg-white/95 backdrop-blur">
            <CardContent className="pt-6 space-y-6 text-center">
              <div className="space-y-4">
                <div className="text-6xl">✅</div>
                <p className="text-lg text-muted-foreground">Pasa el teléfono al siguiente jugador</p>
              </div>
              <Button onClick={nextPlayer} className="w-full" size="lg">
                {currentPlayerIndex < players.length - 1 ? "Siguiente Jugador" : "Finalizar"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Game Complete */}
        {phase === "complete" && (
          <Card className="bg-white/95 backdrop-blur">
            <CardContent className="pt-6 space-y-6 text-center">
              <div className="space-y-4">
                <div className="text-8xl">🎮</div>
                <h2 className="text-3xl font-bold">¡Todos han visto su rol!</h2>
                <p className="text-muted-foreground">Ahora comienza la discusión. ¡Encuentren al impostor!</p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm font-medium">Recordatorio:</p>
                  <p className="text-sm text-muted-foreground">
                    El jugador <span className="font-bold">{starter}</span> comienza la ronda
                  </p>
                </div>
                {!impostorRevealed ? (
                  <Button onClick={revealImpostor} variant="secondary" className="w-full" size="lg">
                    Revelar Impostor
                  </Button>
                ) : (
                  <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg space-y-2">
                    <div className="text-6xl">🕵️‍♂️</div>
                    <p className="text-lg font-medium text-red-800">El impostor era:</p>
                    <p className="text-4xl font-bold text-red-600">{impostor}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Palabra secreta: <span className="font-bold">{secretWord}</span>
                    </p>
                  </div>
                )}
              </div>
              <Button onClick={resetGame} variant="outline" className="w-full bg-transparent" size="lg">
                Nuevo Juego
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
