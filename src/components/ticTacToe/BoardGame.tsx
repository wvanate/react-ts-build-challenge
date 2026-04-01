import { useEffect, useMemo, useState } from 'react'
import { Container, Grid, Typography, Box } from '@mui/material'
import ActionsMenu from './ActionsMenu'
import Square from './Square'

type PlayerMoves = { id: 1 | 2; selectedMovesArr: number[] }
type GameResult = 'Draw' | `Winner is ${1 | 2}` | undefined

const SQUARE_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const

const WINNING_COMBOS: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]

export default function BoardGame() {
    const [totalMoveCounter, setTotalMoveCounter] = useState<number>(0)
    const [gameResults, setGameResults] = useState<GameResult>(undefined)
    const [playersTurn, setPlayersTurn] = useState<1 | 2>(1)
    const [playersMovesState, setPlayersMovesState] = useState<PlayerMoves[]>([
        { id: 1, selectedMovesArr: [] },
        { id: 2, selectedMovesArr: [] },
    ])

    const occupiedSquares = useMemo(() => {
        const map = new Map<number, 1 | 2>()
        for (const player of playersMovesState) {
            for (const sq of player.selectedMovesArr) map.set(sq, player.id)
        }
        return map
    }, [playersMovesState])

    const handleMoves = (squareId: number) => {
        // block moves if game over or square already taken
        if (gameResults) return
        if (occupiedSquares.has(squareId)) return

        setPlayersMovesState((prev) =>
            prev.map((p) =>
                p.id === playersTurn
                    ? { ...p, selectedMovesArr: [...p.selectedMovesArr, squareId] }
                    : p,
            ),
        )
        setTotalMoveCounter((c) => c + 1)
        setPlayersTurn((t) => (t === 1 ? 2 : 1))
    }

    useEffect(() => {
        let hasWinner = false

        for (const player of playersMovesState) {
            for (const combo of WINNING_COMBOS) {
                const matches = player.selectedMovesArr.filter((sq) => combo.includes(sq))
                if (matches.length === 3) {
                    setGameResults(`Winner is ${player.id}`)
                    hasWinner = true
                    break
                }
            }
            if (hasWinner) break
        }

        if (!hasWinner && totalMoveCounter === 9) {
            setGameResults('Draw')
        }
    }, [playersMovesState, totalMoveCounter])

    const resetGame = () => {
        setTotalMoveCounter(0)
        setGameResults(undefined)
        setPlayersTurn(1)
        setPlayersMovesState([
            { id: 1, selectedMovesArr: [] },
            { id: 2, selectedMovesArr: [] },
        ])
    }

    return (
        <Container maxWidth="sm" sx={{ pt: 10, pb: 6, textAlign: 'center' }}>

            <Typography
                variant="h2"
                component="h1"
                sx={{ mb: 2 }}
            >
                Tic Tac Toe
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    mb: 3,
                    flexWrap: 'wrap',
                }}
            >
                <Typography sx={{ opacity: 0.8 }}>
                    {gameResults
                        ? gameResults
                        : `Player ${playersTurn}'s turn (${playersTurn === 1 ? 'X' : 'O'})`}
                </Typography>
                <ActionsMenu onNewGame={resetGame} />
            </Box>

            <Grid container spacing={2}>
                {SQUARE_IDS.map((squareId) => {
                    const existingMoveId = occupiedSquares.get(squareId)
                    return (
                        <Grid key={squareId} size={4}>
                            <Square
                                squareId={squareId}
                                existingMovePlayerId={existingMoveId}
                                gameResults={gameResults}
                                onClick={() => handleMoves(squareId)}
                            />
                        </Grid>
                    )
                })}
            </Grid>

        </Container>
    )
}
