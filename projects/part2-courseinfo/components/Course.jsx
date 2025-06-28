const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content content={course.parts} />
      <Total total={course.parts.reduce((previous, current) => previous + current.exercises, 0)} />
    </div>
  );
};

const Header = ({title}) => {
  return <h1>{title}</h1>
}

const Content = ({content}) => {
  return (
    <div>
      {content.map(({id, name, exercises}) => 
        <Part key={id} name={name} exercises={exercises}/>
      )}
    </div>
  )
}

const Part = ({name, exercises}) => {
  return <p>
    {name} {exercises}
  </p>
}

const Total = ({total}) => {
  return <b>Total of {total} exercices</b>
}

export default Course