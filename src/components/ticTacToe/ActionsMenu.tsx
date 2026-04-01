import { useState, type MouseEvent } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'

type Props = {
    onNewGame: () => void
    disabled?: boolean
}

export default function ActionsMenu({ onNewGame, disabled }: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)
    const handleClose = () => setAnchorEl(null)

    return (
        <>
            <Button type="button" variant="outlined" onClick={handleOpen} disabled={disabled}>
                Actions
            </Button>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                    onClick={() => {
                        onNewGame()
                        handleClose()
                    }}
                >
                    New game
                </MenuItem>
            </Menu>
        </>
    )
}
