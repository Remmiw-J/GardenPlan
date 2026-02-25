import { createFileRoute } from '@tanstack/react-router'
import { GardenCanvas } from '../components/GardenCanvas'

export const Route = createFileRoute('/')({ component: GardenCanvas })
