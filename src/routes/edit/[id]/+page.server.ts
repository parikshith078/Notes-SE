import prisma from '$lib/prisma'
import { error } from '@sveltejs/kit'

export async function load({ params }: { params: { id: string } }) {
	const res = await prisma.note.findUnique({
		where: {
			id: params.id
		}
	})
	if (!res) {
		error(404, 'Page not found')
	}
	return {
		note: res
	}
}
