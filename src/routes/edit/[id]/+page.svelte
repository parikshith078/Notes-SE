<script lang="ts">
	import { goto } from '$app/navigation'
	import { formatDate } from '$lib/utils.js'
	import { redirect } from '@sveltejs/kit'
	import { X, Home } from 'lucide-svelte'

	export let data

	let value = data.note.text
	let id = data.note.id
	let debounceTimeout: NodeJS.Timeout | null = null
	let status: 'Unsaved' | 'Saving...' | 'Saved' | 'Error' = 'Saved'
	const saveChanges = async () => {
		status = 'Saving...'
		const response = await fetch('/api/updateNote', {
			method: 'POST',
			body: JSON.stringify({ value, id }),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (response.ok) {
			console.log('Changes saved successfully')
			status = 'Saved'
		} else {
			status = 'Error'
			console.error('Failed to save changes')
		}
	}

	const deleteNote = async () => {
		const response = await fetch('/api/deleteNote', {
			method: 'POST',
			body: JSON.stringify({ id }),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (response.ok) {
			console.log('Note deleted successfully')
			goto('/')
		} else {
			console.error('Failed to deleteNote')
		}
	}

	const debouncedSaveChanges = () => {
		status = 'Unsaved'
		if (debounceTimeout) {
			clearTimeout(debounceTimeout)
		}
		debounceTimeout = setTimeout(saveChanges, 1000) // 1 seconds debounce time
	}
</script>

<div class="container mx-auto h-screen max-w-3xl">
	<div class="relative h-full rounded-xl py-2 shadow-2xl">
		<div class="absolute right-4 flex gap-4 text-gray-400">
			<a href="/" class="bg-gray-900 px-4 py-2 transition hover:text-gray-200">
				<Home size="20" />
			</a>
			<button on:click={deleteNote} class="bg-gray-900 px-4 py-2 transition hover:text-[#F56565]">
				<X size="24" />
			</button>
		</div>
		<div class="relative mt-10 flex w-full items-center justify-between px-6 py-2">
			<p class="w-full text-center align-bottom font-semibold text-gray-400">
				{formatDate(data.note.createdAt)}
			</p>
			<p
				class="absolute right-6 top-4 rounded-md bg-gray-900 px-2 py-1 text-xs font-semibold text-gray-400"
			>
				{status}
			</p>
		</div>
		<textarea
			class="h-[90%] w-full resize-none bg-gray-700 p-8 text-lg leading-6 text-gray-200 outline-none outline-0 ring-0 transition"
			placeholder="Enter a note...."
			bind:value
			on:input={debouncedSaveChanges}
		/>
	</div>
</div>
