'use client'

import { useState, useCallback } from 'react'

export function useProjects(initial = []) {
  const [projects, setProjects] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProjects = useCallback(async (category = null) => {
    setLoading(true)
    setError(null)
    try {
      const url = category && category !== 'All'
        ? `/api/projects?category=${category.toLowerCase()}`
        : '/api/projects'
      const res = await fetch(url)
      const data = await res.json()
      setProjects(data.projects || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const createProject = async (payload) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (res.ok) {
      setProjects((prev) => [data.project, ...prev])
      return { success: true, project: data.project }
    }
    return { success: false, error: data.error }
  }

  const updateProject = async (id, payload) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (res.ok) {
      setProjects((prev) => prev.map((p) => (p.id === id ? data.project : p)))
      return { success: true, project: data.project }
    }
    return { success: false, error: data.error }
  }

  const deleteProject = async (id) => {
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id))
      return { success: true }
    }
    const data = await res.json()
    return { success: false, error: data.error }
  }

  return { projects, loading, error, fetchProjects, createProject, updateProject, deleteProject }
}
