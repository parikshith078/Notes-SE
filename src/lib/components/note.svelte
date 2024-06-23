<script lang="ts">
	import { goto } from '$app/navigation'
	import { formatDate } from '$lib/utils'
	export let note: {
		id: string
		text: string
		createdAt: Date
		modifiedAt: Date
	}
	function handleClick() {
		goto('/edit/' + note.id)
	}
	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			handleClick()
		}
	}
</script>

<button
	on:keypress={handleKeyPress}
	class="flex flex-col w-full outline-0 focus:bg-primary items-center gap-1 rounded-xl bg-gray-900 px-4 pb-4 pt-3 text-center text-xs"
	on:click={handleClick}
>
	<p class="font-bold text-gray-400">{formatDate(note.createdAt)}</p>
	<p>{note.text}</p>
</button>
