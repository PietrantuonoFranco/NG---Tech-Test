interface AlertMessageProps {
  message: string
  type: 'error' | 'success'
}

function AlertMessage({ message, type }: AlertMessageProps) {
  const styles = {
    error: {
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      color: '#dc2626',
    },
    success: {
      background: 'rgba(16, 185, 129, 0.1)',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      color: '#059669',
    }
  }

  return (
    <div style={{
      padding: '12px 16px',
      background: styles[type].background,
      border: styles[type].border,
      borderRadius: '6px',
      color: styles[type].color,
      fontSize: '0.9rem',
      fontWeight: '500',
      animation: 'fadeIn 200ms ease-out'
    }}>
      {message}
    </div>
  )
}

export default AlertMessage