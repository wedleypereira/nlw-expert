import { ChangeEvent, useState } from 'react'
import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

interface Note {
  id: string,
  date: Date,
  content: string
}

export function App() {
  const [busca, setBusca] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notasLocalStorage = localStorage.getItem('notes')

    if(notasLocalStorage) {
      return JSON.parse(notasLocalStorage)
    }

    return []
  })

  function onNotaCriada(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const arrayNotas = [newNote, ...notes]

    setNotes(arrayNotas)

    localStorage.setItem('notes', JSON.stringify(arrayNotas))
  }

  function onNotaDeletada(id: string) {
    const notesArray = notes.filter(note => {
      return note.id !== id
    })

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function verificaBusca(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value

    setBusca(query)
  }

  const notasFiltradas = busca != '' 
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(busca.toLocaleLowerCase())) 
    : notes

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
      <img src={logo} alt='NLW Expert'/>
      
      <form className='w-full'>
        <input 
          type="text"
          placeholder='Busque suas notas...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
          onChange={verificaBusca}
        />
      </form>

      <div className='h-px bg-slate-700'/>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]'>
        <NewNoteCard onNotaCriada = {onNotaCriada}/>

        {notasFiltradas.map(note => {
          return <NoteCard key={note.id} note={note} onNotaDeletada={onNotaDeletada}/>
        })}
      </div>
    </div>
  )
}
