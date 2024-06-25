import { error, json, redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import prisma from '$lib/prisma'

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		error(401, 'Permission denied')
	}

	const { id } = await request.json()

	await prisma.note.delete({
		where: {
			id: id,
			userId: locals.user.id
		}
	})
	return json({ id }, { status: 201 })
}
