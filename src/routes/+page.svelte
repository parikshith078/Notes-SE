<script lang="ts">
	import { FolderClosed, SquarePen } from 'lucide-svelte'
	import { activeIndexStore } from '$lib/keybinding'
	import Note from '$lib/components/note.svelte'

	import { on_key_up, on_key_down } from '$lib/keybinding'
	export let data

	let notesCount = 15
	activeIndexStore.subscribe((val) => {
		if (val < -1) {
			activeIndexStore.set(data.notes.length - 1)
		} else if (val >= data.notes.length) {
			activeIndexStore.set(-1)
		}
	})
</script>

<svelte:window on:keydown={on_key_down} on:keyup={on_key_up} />
<main class="mx-auto min-h-screen max-w-[360px] p-4">
	<div
		class="mx-2 flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-6 text-xs font-light"
		class:bg-primary={$activeIndexStore == -1}
	>
		<SquarePen size="16px" class="font-light" />
		<span>New Note</span>
	</div>
	<section class="mt-6" id="notes">
		<div class="flex items-center justify-between text-xs font-bold text-gray-400">
			<div class="flex items-center gap-2 font-bold">
				<FolderClosed size="14px" class="font-normal" strokeWidth="3px" />
				<span>Open</span>
			</div>
			<p>{notesCount}</p>
		</div>
		<section class="mt-4 space-y-4">
			{#each data.notes as note, ind}
				<Note activeIndex={$activeIndexStore} {note} {ind} />
			{/each}
		</section>
	</section>
</main>
