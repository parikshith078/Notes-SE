<script lang="ts">
	import { goto, invalidate } from '$app/navigation'
	import { formatDate } from '$lib/utils.js'
	import { Trash, Home } from 'lucide-svelte'
	import { Dialog } from 'bits-ui'
	import { onDestroy } from 'svelte'
	import { fade, fly } from 'svelte/transition'

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
      invalidate('data:notes')
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

	// Delete empty notes on exit
	onDestroy(async () => {
		if (value == '') {
			await deleteNote()
		}
	})
</script>

<div class="container mx-auto h-screen max-w-3xl">
	<div class="relative h-full rounded-xl py-2 shadow-2xl">
		<div class="absolute right-4 flex gap-4 text-gray-400">
			<a href="/" class="bg-gray-900 px-4 py-2 transition hover:text-gray-200">
				<Home size="20" />
			</a>
			<Dialog.Root>
				<Dialog.Trigger>
					<button class="rounded-lg bg-gray-900 px-4 py-2 transition hover:text-[#F56565]">
						<Trash size="20" />
					</button>
				</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Overlay
						transition={fade}
						transitionConfig={{ duration: 150 }}
						class="fixed inset-0 z-50 bg-gray-700/80"
					/>
					<Dialog.Content
						transition={fly}
						class="rounded-card-lg bg-background shadow-popover fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] border border-gray-200/20 p-5 text-gray-200 outline-none sm:max-w-[490px] md:w-full"
					>
						<Dialog.Title
							class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
							>Confirm Deletion</Dialog.Title
						>
						<Dialog.Description class="mt-4 text-center"
							>Are you sure you want to delete this note? This action cannot be undone.
						</Dialog.Description>
						<div class="mt-4 flex justify-around">
							<Dialog.Close class="rounded-md bg-gray-900 px-4 py-2">Close</Dialog.Close>
							<Dialog.Close
								class="rounded-md bg-gray-900 px-4 py-2 text-[#F56565]"
								on:click={deleteNote}>Confirm</Dialog.Close
							>
						</div>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
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
