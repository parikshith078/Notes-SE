<script lang="ts">
	import { formatDate } from '$lib/utils.js'

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
			console.error('Failed to save changes')
			status = 'Error'
		}
	}

	const debouncedSaveChanges = () => {
		status = 'Unsaved'
		if (debounceTimeout) {
			clearTimeout(debounceTimeout)
		}
		debounceTimeout = setTimeout(saveChanges, 1000) // 5 seconds debounce time
	}
</script>

<div class="container mx-auto h-screen max-w-3xl">
	<div class="h-full rounded-xl py-2 shadow-2xl">
		<div class="relative mt-10 flex w-full items-center justify-between px-6 py-2">
			<p class="w-full text-center align-bottom font-semibold text-gray-400">
				{formatDate(data.note.createdAt)}
			</p>
			<p
				class="absolute right-4 top-[-2] rounded-md bg-gray-900 px-2 py-1 text-xs font-semibold text-gray-400"
			>
				{status}
			</p>
		</div>
		<textarea
			class="h-[90%] w-full resize-none bg-gray-700 p-8 text-lg leading-6 text-gray-200 outline-0 transition"
			placeholder="Enter a note...."
			bind:value
			on:input={debouncedSaveChanges}
		/>
	</div>
</div>
