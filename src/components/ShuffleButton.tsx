
'use client'

import { motion } from 'framer-motion'
import { Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShuffleButtonProps {
  onShuffle?: () => void
}

export default function ShuffleButton({ onShuffle }: ShuffleButtonProps) {
  const handleShuffle = () => {
    const event = new CustomEvent('shuffleCards')
    window.dispatchEvent(event)
    onShuffle?.()
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={handleShuffle}
        className="bg-slate-800 hover:bg-slate-700 text-white border border-gray-600 px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200"
      >
        <motion.div
          animate={{ rotate: 0 }}
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <Shuffle size={20} />
        </motion.div>
        Shuffle Cards
      </Button>
    </motion.div>
  )
}
