"use client"

import { useState, useCallback } from "react"

const STORAGE_KEY = "read_notif_ids"

export function useReadState() {
  const [, refresh] = useState(0)

  const markRead = useCallback((id: string) => {
    const existing: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
    if (!existing.includes(id)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, id]))
      refresh(v => v + 1)
    }
  }, [])

  const isRead = useCallback((id: string): boolean => {
    const existing: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
    return existing.includes(id)
  }, [])

  return { markRead, isRead }
}
