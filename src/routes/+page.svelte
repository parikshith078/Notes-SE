<script lang="ts">
	import { FolderClosed, SquarePen } from 'lucide-svelte'
	import Note from '$lib/components/note.svelte'

	import { on_key_up, on_key_down } from '$lib/keybinding'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	export let data

  let addButton: HTMLButtonElement

	let notesCount = data.notes.length
	function handleClick() {
		goto('/edit/new')
	}
	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			handleClick()
		}
	}

  onMount(()=>{
    if(addButton){
      addButton.focus()
    }
  })
</script>

<svelte:window on:keyup={on_key_up} />
<main class="mx-auto flex min-h-screen max-w-[360px] flex-col items-center p-4">
	<button
    bind:this={addButton}
		on:click={handleClick}
		on:keypress={handleKeyPress}
		class="mx-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-6 text-xs font-light outline-0 focus:bg-primary"
	>
		<SquarePen size="16px" class="font-light" />
		<span>New Note</span>
	</button>
	<section class="mt-6" id="notes">
		<div class="flex items-center justify-between text-xs font-bold text-gray-400">
			<div class="flex items-center gap-2 font-bold">
				<FolderClosed size="14px" class="font-normal" strokeWidth="3px" />
				<span>Open</span>
			</div>
			<p>{notesCount}</p>
		</div>
		<section class="mt-4 space-y-4">
			{#each data.notes as note}
				<Note {note} />
			{/each}
		</section>
	</section>
</main>
