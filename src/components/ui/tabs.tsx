"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

type TabsContextType = {
  value: string
  setValue: (v: string) => void
}

const TabsContext = createContext<TabsContextType | null>(null)

export function Tabs({ defaultValue, value, onValueChange, children }: {
  defaultValue?: string
  value?: string
  onValueChange?: (v: string) => void
  children: React.ReactNode
}) {
  const [internal, setInternal] = useState<string>(defaultValue || (value ?? ''))

  // sync controlled value if provided
  useEffect(() => {
    if (typeof value === 'string') setInternal(value)
  }, [value])

  const setValue = (v: string) => {
    setInternal(v)
    onValueChange?.(v)
  }

  return (
    <TabsContext.Provider value={{ value: internal, setValue }}>
      <div>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className || 'flex gap-2'}>{children}</div>
}

export function TabsTrigger({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = useContext(TabsContext)
  if (!ctx) return null

  const active = ctx.value === value

  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={() => ctx.setValue(value)}
      className={className || `${active ? 'bg-primary text-white' : 'bg-white/5 text-muted-foreground'} px-4 py-2 rounded-full`}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)
  if (!ctx) return null

  return <div hidden={ctx.value !== value}>{ctx.value === value ? children : null}</div>
}

export default Tabs
