'use client'
import React from 'react'
import { LayoutGroup } from "framer-motion"

function FramerLayout({ children }) {
  return (
    <LayoutGroup>
      {children}
    </LayoutGroup>
  )
}

export default FramerLayout