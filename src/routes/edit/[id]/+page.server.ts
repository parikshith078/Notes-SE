import prisma from '$lib/prisma'
import { error, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) {
		redirect(302, '/login')
	}
	if (params.id == 'new') {
		const newNote = await prisma.note.create({
			data: {
				text: '',
				userId: locals.user.id
			}
		})

		throw redirect(302, '/edit/' + newNote.id)
	}
	const res = await prisma.note.findUnique({
		where: {
			id: params.id
		}
	})
	if (!res) {
		error(404, 'Page not found')
	}
	if (res.userId !== locals.user.id) {
		error(401, 'Permission denied')
	}
	return {
		note: res
	}
}
