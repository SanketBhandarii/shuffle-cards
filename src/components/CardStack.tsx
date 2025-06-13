
'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Card from './Card'
import { loadCards, saveCards, generateCardColor, shuffleArray } from '../lib/utils'

interface CardData {
  id: string
  content: string
  color: string
}

export default function CardStack() {
  const [cards, setCards] = useState<CardData[]>([])

  const shuffleCards = useCallback(() => {
    setCards(prev => {
      const shuffled = shuffleArray(prev)
      saveCards(shuffled)
      return shuffled
    })
  }, [])

  useEffect(() => {
    const savedCards = loadCards()
    if (savedCards.length > 0) {
      setCards(savedCards)
    } else {
      const initialCards = Array.from({ length: 5 }, (_, i) => ({
        id: `card-${i}`,
        content: '',
        color: generateCardColor()
      }))
      setCards(initialCards)
      saveCards(initialCards)
    }
  }, [])

  useEffect(() => {
    const handleShuffle = () => shuffleCards()
    window.addEventListener('shuffleCards', handleShuffle)
    return () => window.removeEventListener('shuffleCards', handleShuffle)
  }, [shuffleCards])

  const moveToBack = () => {
    setCards(prev => {
      const newCards = [...prev.slice(1), prev[0]]
      saveCards(newCards)
      return newCards
    })
  }

  const updateCard = (id: string, content: string) => {
    setCards(prev => {
      const newCards = prev.map(card => 
        card.id === id ? { ...card, content } : card
      )
      saveCards(newCards)
      return newCards
    })
  }

  const cardStackProps = [
    { scale: 1, yOffset: 0, xOffset: 0, zIndex: 50 },
    { scale: 0.95, yOffset: 8, xOffset: -25, zIndex: 40 },
    { scale: 0.9, yOffset: 16, xOffset: 25, zIndex: 30 },
    { scale: 0.85, yOffset: 24, xOffset: -20, zIndex: 20 },
    { scale: 0.8, yOffset: 32, xOffset: 20, zIndex: 10 }
  ]

  return (
    <div className="relative w-full max-w-sm mx-auto h-64 flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            id={card.id}
            content={card.content}
            color={card.color}
            isTop={index === 0}
            {...cardStackProps[index]}
            onUpdate={updateCard}
            onMoveToBack={moveToBack}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
