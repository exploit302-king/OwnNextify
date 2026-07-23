import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center mt-[270px] flex-row gap-2">
      <div className="w-4 h-4 rounded-full dark:bg-blue-200 bg-blue-950 animate-bounce" />
      <div className="w-4 h-4 rounded-full dark:bg-blue-200 bg-blue-950 animate-bounce [animation-delay:-.3s]" />
      <div className="w-4 h-4 rounded-full dark:bg-blue-200 bg-blue-950 animate-bounce [animation-delay:-.5s]" />
    </div>

  )
}

export default Loader
