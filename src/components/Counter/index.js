import './index.css'

const Counter = props => {
  const {activePageNumber, onIncreasePageNumber, onDecreasePageNumber} = props

  const onIncrement = () => {
    onIncreasePageNumber()
  }

  const onDecrement = () => {
    onDecreasePageNumber()
  }

  return (
    <div className="counter-container">
      <button type="button" onClick={onDecrement} className="counter-button">
        -
      </button>
      <div className="active-page-number">{activePageNumber}</div>
      <button type="button" onClick={onIncrement} className="counter-button">
        +
      </button>
    </div>
  )
}

export default Counter
