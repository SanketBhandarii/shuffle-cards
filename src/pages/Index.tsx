
'use client'

import CardStack from '@/components/CardStack'
import ShuffleButton from '@/components/ShuffleButton'

const Index = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Shuffle Cards</h1>
          <p className="text-gray-400">Interactive digital flashcards</p>
        </div>
        <CardStack />
        <ShuffleButton />
      </div>
    </main>
  )
}

export default Index
