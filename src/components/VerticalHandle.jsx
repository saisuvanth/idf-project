import React, { useState, useEffect, useCallback } from 'react'
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { DragHandle, ExpandLess } from '@mui/icons-material';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		width: 2,
		background: '#557A8F',
		cursor: 'e-resize',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	collapsedRoot: {
		cursor: 'pointer',
	},
	icon: {
		color: theme.palette.primary.main,
		transform: 'translate(0, -2px)',
	},
	iconBox: {
		zIndex: 10,
		padding: theme.spacing(1, 1, 0.1, 1),
		transform: 'translate(-40%, 0) rotate(-90deg)',
		width: 20,
		height: 15,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		background: '#85A2B3',
		position: 'relative',
		borderRadius: '20px 20px 0 0',
	},
}))


const VerticalHandle = ({ boxWidth, onDrag, minSize = 0, minMapSize = 20 / 100 * window.innerWidth }) => {
	const [isDragging, setIsDragging] = useState(false)
	const [initialWidth, setInitialWidth] = useState(minSize * 2)
	const classes = useStyles();

	const handleMouseMove = useCallback(e => {
		const windowWidth = window.innerWidth
		let w = e.clientX < minMapSize ?
			windowWidth - minMapSize :
			windowWidth - e.clientX
		w = w < minSize ? 0 : w
		onDrag(w)
	}, [onDrag, minMapSize, minSize])

	const handleMouseDown = useCallback(e => {
		setIsDragging(true)
		const w = window.innerWidth - e.clientX
		setInitialWidth(initialWidth < minSize ? minSize : w)
	}, [initialWidth, minSize])

	const handleMouseUp = useCallback(() => {
		setIsDragging(false)
	}, [])

	useEffect(() => {
		const remove = () => {
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseup', handleMouseUp)
			window.removeEventListener('mousedown', handleMouseDown)
		}
		const add = () => {
			window.addEventListener('mousedown', handleMouseDown)
			window.addEventListener('mousemove', handleMouseMove)
			window.addEventListener('mouseup', handleMouseUp)
		}
		if (isDragging) add()
		else remove()
		return remove
	}, [isDragging, handleMouseMove, handleMouseDown, handleMouseUp])

	return (
		<Box
			draggable={false}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			className={clsx(classes.root, (boxWidth < 10) && classes.collapsedRoot)}
			onClick={() => ((boxWidth < 10) && (() => onDrag(30 / 100 * window.innerWidth)))}
		>
			<Box draggable={false} className={classes.iconBox}>
				{!(boxWidth < 10) ?
					<DragHandle className={classes.icon} /> :
					<ExpandLess className={classes.icon} />
				}
			</Box>
		</Box>
	)

}

export default VerticalHandle