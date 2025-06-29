export const Filter = ({value, onChange}) => (
    <div>filter shown with 
        <input value={value} onChange={onChange} />
    </div>
)

export const PersonForm = (props) => (
    <form onSubmit={props.onSubmit}>
        <div>name: <input value={props.name} onChange={props.handleNameChange}/></div>
        <div>number: <input value={props.number} onChange={props.handlePhoneNumberChange}/></div>

        <div><button type="submit">add</button></div>
    </form>
)

export const Persons = ({persons, handleDelete}) => (
    <div>
        {persons.map(person => 
            <Person key={person.name} person={person} handleDelete={handleDelete}/>)
        }
    </div>
)

const Person = ({person, handleDelete}) => {
    return <p>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button></p>
}