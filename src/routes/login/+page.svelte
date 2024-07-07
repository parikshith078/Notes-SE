<script lang="ts">
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'
	import toast from 'svelte-french-toast'
	export let form

	let disabled = false

	const handelSubmit: SubmitFunction = () => {
		return async ({ update, result }) => {
			disabled = true
			switch (result.type) {
				case 'success':
					toast.success('Login successful!')
					update()
					disabled = false
					break
				case 'failure':
					if (form?.message) {
						toast.error(form.message)
					}
					update()
					disabled = false
					break
				case 'error':
					console.log('error')
					if (form?.message) {
						toast.error(form.message)
					}
					update()
					disabled = false
					break
				default:
					update()
					disabled = false
			}
		}
	}
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 text-white lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
			Sign in to your account
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form class="space-y-6" method="post" use:enhance={handelSubmit}>
			<div>
				<label for="username" class="block text-sm font-medium leading-6 text-white">Username</label
				>
				<div class="mt-2">
					<input
						id="username"
						name="username"
						type="text"
						required
						class="ring-gray-300 focus:ring-indigo-600 block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			<div>
				<div class="flex items-center justify-between">
					<label for="password" class="block text-sm font-medium leading-6 text-white"
						>Password</label
					>
				</div>
				<div class="mt-2">
					<input
						id="password"
						name="password"
						type="password"
						{disabled}
						autocomplete="current-password"
						required
						class="ring-gray-300 focus:ring-indigo-600 block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			<div>
				<button
					formaction="?/login"
					{disabled}
					class="hover:bg-indigo-500 focus-visible:outline-indigo-600 flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-gray-400"
					>Sign in</button
				>
			</div>
			<div>
				<button
					formaction="?/signup"
					{disabled}
					class="hover:bg-indigo-500 focus-visible:outline-indigo-600 flex w-full justify-center rounded-md border border-gray-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-gray-400"
					>Sign up</button
				>
			</div>
		</form>
	</div>
</div>
