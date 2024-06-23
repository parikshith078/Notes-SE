import { writable } from 'svelte/store'

type NoteData = {
	id: string
	text: string
	createdAt: Date
	modifiedAt: Date
}[]

export const notesDataStore = writable<NoteData>()
