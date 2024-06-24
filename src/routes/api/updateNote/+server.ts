import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import prisma from '$lib/prisma'

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		error(401, 'Permission denied')
	}

	const { value, id } = await request.json()

	await prisma.note.update({
		where: {
			id: id,
			userId: locals.user.id
		},
		data: {
			text: value
		}
	})
	return json({ id }, { status: 201 })
}
