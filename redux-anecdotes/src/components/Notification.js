import { connect } from 'react-redux'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (props.notification.show) {
    return (
      <div style={style}>
        {props.notification.message}
      </div>
    )
  }
  return (
    <>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)