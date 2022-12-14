import React from 'react'
import { useWindowSize } from 'usehooks-ts'
import Confetti from 'react-confetti'

export default function Conf() {
  const { width, height } = useWindowSize()
  return (
    <Confetti
      width={width}
      height={height}
    />
  )
}
