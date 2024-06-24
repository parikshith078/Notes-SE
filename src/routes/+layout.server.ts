// src/routes/+page.server.ts

import prisma from '$lib/prisma'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return {
			notes: []
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
		notes: res
	}
}
