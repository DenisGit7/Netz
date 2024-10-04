import classes from './Loader.module.css'

const Loader = () => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.cradle}>
          <div className={classes.dot}></div>
          <div className={classes.dot}></div>
          <div className={classes.dot}></div>
          <div className={classes.dot}></div>
        </div>
      </div>
    </>
  )
}

export default Loader
