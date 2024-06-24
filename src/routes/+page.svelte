<script lang="ts">
	import { FolderClosed, SquarePen } from 'lucide-svelte'
	import Note from '$lib/components/note.svelte'

	import { goto } from '$app/navigation'
	export let data

	let notesCount = data.notes.length
	function handleClick() {
		goto('/edit/new')
	}
	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			handleClick()
		}
	}
</script>

<main class="mx-auto flex min-h-screen max-w-[360px] flex-col items-center p-4">
	<button
		on:click={handleClick}
		on:keypress={handleKeyPress}
		class="mx-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary/70 px-4 py-6 text-xs font-light outline-0 ring-0 transition hover:translate-y-[-2px] hover:bg-primary focus:translate-y-[-2px] focus:bg-primary"
	>
		<SquarePen size="16px" class="font-light" />
		<span>New Note</span>
	</button>
	<section class="mt-6 w-full" id="notes">
		<div class="flex items-center justify-between text-xs font-bold text-gray-400">
			<div class="flex items-center gap-2 font-bold">
				<FolderClosed size="14px" class="font-normal" strokeWidth="3px" />
				<span>Open</span>
			</div>
			<p>{notesCount}</p>
		</div>
		<section class="mt-2 scroll-smooth pt-2 max-h-[80vh] space-y-4 overflow-y-scroll">
			{#each data.notes as note}
				<Note {note} />
			{/each}
		</section>
	</section>
</main>
