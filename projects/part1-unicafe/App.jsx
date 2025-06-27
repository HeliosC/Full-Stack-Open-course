import { useState } from 'react'

const Title = ({title}) => <h1>{title}</h1>

const ButtonStatistic = ({name, handleClick}) => <button onClick={handleClick}>{name}</button>

const StatisticLine = ({name, value}) => (
  <tr>
    <th>{name}</th>
    <td>{value}</td>
  </tr>
)

const Statisitcs = ({statistics, isEmpty}) => {
  if(isEmpty) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <table><tbody>
      {statistics.map(({name, value}) => 
        <StatisticLine key={name} name={name} value={value}/>
      )}
    </tbody></table>
  )
}

const App = () => {
  // enregistrer les clics de chaque bouton dans un état différent
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const totalReview = good + neutral + bad
  let average = (good - bad) / totalReview
  let positiveRatio = 100 * good / totalReview

  if (totalReview == 0) {
    average = "/"
    positiveRatio = "/"
  }

  const statistics = [
    {name: "good", value: good},
    {name: "neutral", value: neutral},
    {name: "bad", value: bad},
    {name: "all", value: totalReview},
    {name: "average", value: average},
    {name: "positive", value: positiveRatio + " %"},
  ]

  return (
    <div>
      <Title title={"Give feedback"}/>
      <ButtonStatistic name={"good"} handleClick={() => setGood(good + 1)}/>
      <ButtonStatistic name={"neutral"} handleClick={() => setNeutral(neutral + 1)}/>
      <ButtonStatistic name={"bad"} handleClick={() => setBad(bad + 1)}/>

      <Title title={"Statisitcs"}/>
      <Statisitcs statistics={statistics} isEmpty={totalReview == 0} />
    </div>
  )
}

export default App