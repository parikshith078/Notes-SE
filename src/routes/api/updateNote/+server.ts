import { json } from '@sveltejs/kit'
import type { RequestEvent } from './$types'
import prisma from '$lib/prisma'

export async function POST({ request }: RequestEvent) {
	const { value, id } = await request.json()

	await prisma.note.update({
		where: {
			id: id
		},
		data: {
			text: value
		}
	})
	console.log('Update done\n')
	return json({ id }, { status: 201 })
}
