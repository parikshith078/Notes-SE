import { openDB } from 'idb'

type LocalDBNote = {
	id: string
	dirty: boolean
	isNew: boolean
	isDeleted: boolean
	text: string
	userId: string
	createdAt: Date
	modifiedAt: Date
}

const STORENAME = 'notes'

async function getDB() {
	const db = await openDB('notesDB', 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(STORENAME)) {
				db.createObjectStore(STORENAME, { keyPath: 'id' })
			}
		}
	})

	return db
}

export async function updateOne(note: LocalDBNote) {
	console.log('Adding....')
	const db = await getDB()
	await db.put(STORENAME, note)
	db.close()
	console.log('Added')
}

export async function getNoteById(noteId: string) {
	const db = await getDB()
	const note = await db.get(STORENAME, noteId)
	if (note) {
		return note as LocalDBNote
	}
	return undefined
}

export async function addOne(note: LocalDBNote) {
	console.log('Adding....')
	const db = await getDB()
	await db.add(STORENAME, note)
	db.close()
	console.log('Added')
}

export async function updateItems(notes: LocalDBNote[]) {
	console.log('Adding....')
	const db = await getDB()
	const tx = db.transaction(STORENAME, 'readwrite')
	const txList = []
	notes.map((item) => {
		txList.push(tx.store.put(item))
	})
	txList.push(tx.done)

	await Promise.all(txList)
	db.close()
	console.log('Added')
}

export async function addnews(notes: LocalDBNote[]) {
	console.log('Adding....')
	const db = await getDB()
	const tx = db.transaction(STORENAME, 'readwrite')
	const txList = []
	notes.map((item) => {
		txList.push(tx.store.add(item))
	})
	txList.push(tx.done)

	await Promise.all(txList)
	console.log('Added')
	db.close()
}

export async function getItems() {
	console.log('Fetching....')
	const db = await getDB()
	const data = await db.getAll('notes')
	console.log('Done')
	db.close()
	return data
}
