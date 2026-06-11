import React from 'react'

const MobileLayout = ({children}: { children: React.ReactNode }) => {
  return (
        <div
      className="h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/wallpapers/iphone.png')" }}
    >{children}</div>
  )
}

export default MobileLayout