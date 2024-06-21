<script lang="ts">
	import { FolderClosed, SquarePen } from 'lucide-svelte'
	import Note from '$lib/components/note.svelte'
	let dummyData = [
		{
			id: '1',
			text: 'Remember to buy milk.'
		},
		{
			id: '2',
			text: 'Complete the assignment by Thursday.'
		},
		{
			id: '3',
			text: 'Call the plumber to fix the sink.'
		},
		{
			id: '4',
			text: 'Schedule a meeting with the team for next week. a meeting with the team for next week.'
		},
		{
			id: '5',
			text: 'Book flight tickets for the conference.'
		}
	]

	let notesCount = 15
	let activeDiv = '1'
</script>

<main class="mx-auto min-h-screen max-w-[360px] p-4">
	<div
		class="mx-2 flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-6 text-xs font-light"
		class:bg-primary={activeDiv == 'add-btn'}
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
			{#each dummyData as note}
				<Note {activeDiv} {note} />
			{/each}
		</section>
	</section>
</main>
