import { openDB } from 'idb'

type LocalDBNote = {
	id: string
	dirty: boolean
	text: string
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

export async function updateItem(note: LocalDBNote) {
	console.log('Adding....')
	const db = await getDB()
	await db.put(STORENAME, note)
	db.close()
	console.log('Added')
}

export async function addItem(note: LocalDBNote) {
	console.log('Adding....')
	const db = await getDB()
	await db.add(STORENAME, note)
	db.close()
	console.log('Added')
}

export async function updateItems(notes: any[]) {
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

export async function addItems(notes: any[]) {
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
