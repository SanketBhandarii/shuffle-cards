
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface CardData {
  id: string
  content: string
  color: string
}

const STORAGE_KEY = 'shuffle-cards'

const darkColors = [
  'bg-gradient-to-br from-slate-800 to-slate-900',
  'bg-gradient-to-br from-gray-800 to-gray-900',
  'bg-gradient-to-br from-zinc-800 to-zinc-900',
  'bg-gradient-to-br from-neutral-800 to-neutral-900',
  'bg-gradient-to-br from-stone-800 to-stone-900',
  'bg-gradient-to-br from-blue-900 to-slate-900',
  'bg-gradient-to-br from-indigo-900 to-gray-900',
  'bg-gradient-to-br from-purple-900 to-slate-900',
  'bg-gradient-to-br from-violet-900 to-gray-900'
]

export function generateCardColor(): string {
  return darkColors[Math.floor(Math.random() * darkColors.length)]
}

export function loadCards(): CardData[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function saveCards(cards: CardData[]): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
  } catch {
    console.error('Failed to save cards')
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
