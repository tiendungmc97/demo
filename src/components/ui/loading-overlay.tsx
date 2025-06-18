import type React from "react"

interface LoadingOverlayProps {
  isLoading: boolean
  children: React.ReactNode
  className?: string
  message?: string
}

export function LoadingOverlay({ isLoading, children, className, message }: LoadingOverlayProps) {
  return (
    <div className={`relative ${className ?? ""}`}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <div>Loading...</div>
            {message && <p className="text-sm text-gray-600">{message}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
