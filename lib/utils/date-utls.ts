export function isExpiringSoon(expiresAt: Date | undefined, daysThreshold = 7): boolean {
  if (!expiresAt) return false

  const now = new Date()
  const diffTime = expiresAt.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays <= daysThreshold && diffDays >= 0
}

export function isLongStanding(createdAt: Date, daysThreshold = 180): boolean {
  const now = new Date()
  const diffTime = now.getTime() - createdAt.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays >= daysThreshold
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export function getDaysUntilExpiration(expiresAt: Date | undefined): number | null {
  if (!expiresAt) return null

  const now = new Date()
  const diffTime = expiresAt.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function getDaysSinceCreation(createdAt: Date): number {
  const now = new Date()
  const diffTime = now.getTime() - createdAt.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
