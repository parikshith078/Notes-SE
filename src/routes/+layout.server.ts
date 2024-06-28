// src/routes/+page.server.ts

import prisma from '$lib/prisma'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals, depends }) => {
	depends('data:notes')
	if (!locals.user) {
		return {
			notes: [],
			user: null
		}
	}
	const res = await prisma.note.findMany({
		where: {
			userId: locals.user?.id
		},
		orderBy: {
			createdAt: 'desc'
		}
	})

	return {
		notes: res,
		user: locals.user
	}
}
