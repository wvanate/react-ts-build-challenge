import { Paper } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faO } from '@fortawesome/free-solid-svg-icons'

type Props = {
    squareId: number
    existingMovePlayerId: 1 | 2 | undefined
    gameResults: string | undefined
    onClick: () => void
}

export default function Square({ existingMovePlayerId, gameResults, onClick }: Props) {
    const disabled = Boolean(existingMovePlayerId) || Boolean(gameResults)

    return (
        <Paper
            elevation={3}
            onClick={disabled ? undefined : onClick}
            sx={{
                height: 110,
                display: 'grid',
                placeItems: 'center',
                cursor: disabled ? 'not-allowed' : 'pointer',
                userSelect: 'none',

                bgcolor: 'var(--surface)',
                color: 'var(--surface-text)',
                border: '1px solid var(--surface-border)',
                boxShadow: 'var(--shadow)',

                transition: 'transform 120ms ease, border-color 120ms ease',
                '&:hover': disabled
                    ? undefined
                    : {
                        transform: 'translateY(-1px)',
                        borderColor: 'var(--accent-border)',
                    },
            }}
        >
            {existingMovePlayerId === 1 && <FontAwesomeIcon icon={faX} size="2x" />}
            {existingMovePlayerId === 2 && <FontAwesomeIcon icon={faO} size="2x" />}
        </Paper>
    )
}
