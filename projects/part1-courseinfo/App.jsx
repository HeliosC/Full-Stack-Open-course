const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header course={course.name}/>
      <Content content={course.parts} />
      <Total total={course.parts.reduce((previous, current) => previous + current.exercises, 0)} />
    </div>
  )
}

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.content[0].name} exercises={props.content[0].exercises}/>
      <Part part={props.content[1].name} exercises={props.content[1].exercises}/>
      <Part part={props.content[2].name} exercises={props.content[2].exercises}/>
    </div>
  )
}

const Part = (props) => {
  return <p>
    {props.part} {props.exercises}
  </p>
}

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>
}


export default App