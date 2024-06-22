// src/routes/+page.server.ts

import prisma from '$lib/prisma'

export async function load() {
	const res = await prisma.note.findMany()

	return {
		notes: res
	}
}