import '../styles/AlertMessage.css'

interface AlertMessageProps {
  message: string
  type: 'error' | 'success'
}

function AlertMessage({ message, type }: AlertMessageProps) {
  return (
    <div className={`alert-message alert-message--${type}`}>
      {message}
    </div>
  )
}

export default AlertMessage