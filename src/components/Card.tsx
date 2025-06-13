import { motion } from 'framer-motion'
import { useState, useRef } from 'react'

interface CardProps {
  id: string
  content: string
  color: string
  isTop: boolean
  zIndex: number
  scale: number
  yOffset: number
  xOffset: number
  onUpdate: (id: string, content: string) => void
  onMoveToBack: () => void
}

export default function Card({
  id,
  content,
  color,
  isTop,
  zIndex,
  scale,
  yOffset,
  xOffset,
  onUpdate,
  onMoveToBack
}: CardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(content)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleClick = () => {
    if (isTop && !isEditing) {
      setIsEditing(true)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }

  const handleSave = () => {
    onUpdate(id, text)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === 'Escape') {
      setText(content)
      setIsEditing(false)
    }
  }

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.y > 50 || info.offset.x > 100 || info.offset.x < -100) {
      onMoveToBack()
    }
  }

  return (
    <motion.div
      layout
      drag={isTop && !isEditing}
      dragConstraints={{ left: -200, right: 200, top: -50, bottom: 100 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05, rotate: 5 }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale,
        y: yOffset,
        x: xOffset,
        opacity: 1,
        zIndex,
        rotate: 0
      }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className={`absolute w-72 h-56 rounded-2xl shadow-2xl cursor-pointer ${color} border border-gray-700/50`}
      onClick={handleClick}
      style={{ zIndex }}
    >
      <div className="p-6 h-full flex items-center justify-center">
        {isEditing ? (
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-white placeholder-gray-400 text-lg text-center resize-none outline-none"
            placeholder="Enter your text..."
          />
        ) : (
          <div className="text-white text-lg text-center leading-relaxed">
            {content || 'Click to edit'}
          </div>
        )}
      </div>
      {isTop && !isEditing && (
        <div className="absolute bottom-4 right-4 text-xs text-gray-400">
          Drag to shuffle • Click to edit
        </div>
      )}
    </motion.div>
  )
}
