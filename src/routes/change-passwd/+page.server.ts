import { fail, redirect } from "@sveltejs/kit";
import { hash, verify } from "@node-rs/argon2";

import prisma from "$lib/prisma";
import type { Actions, PageServerLoad } from "../$types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, "/login");
};
export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const oldPassword = formData.get("password-old");
		const newPassword = formData.get("password-new");

		if (
			typeof oldPassword !== "string" ||
			oldPassword.length < 6 ||
			oldPassword.length > 255
		) {
			return fail(400, {
				message: "Invalid old password",
			});
		}

		if (
			typeof newPassword !== "string" ||
			newPassword.length < 6 ||
			newPassword.length > 255
		) {
			return fail(400, {
				message: "Invalid new password",
			});
		}
		const existingUser = await prisma.user.findUnique({
			where: {
				id: event.locals.user?.id,
			},
		});

		if (!existingUser) {
			return fail(400, {
				message: "Incorrect username or password",
			});
		}

		const validPassword = await verify(existingUser.passwordHash, oldPassword, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		});
		if (!validPassword) {
			return fail(400, {
				message: "Incorrect password",
			});
		}

		const passwordHash = await hash(newPassword, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		});

		await prisma.user
			.update({
				where: {
					id: existingUser.id,
				},
				data: {
					passwordHash,
				},
			})
			.catch(() =>
				fail(400, {
					message: "Error while updating password, try again later",
				}),
			);

		redirect(302, "/");
	},
};
