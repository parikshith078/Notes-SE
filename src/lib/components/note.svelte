<script lang="ts">
	import { goto } from '$app/navigation'
	import { formatDate } from '$lib/utils'
	export let note: {
		id: string
		text: string
		createdAt: Date
		modifiedAt: Date
	}
	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			goto('/edit/' + note.id)
		}
	}
</script>

<a
	href={'/edit/' + note.id}
	on:keypress={handleKeyPress}
	class="flex w-full flex-col items-center gap-1 rounded-xl bg-gray-900 px-4 pb-4 pt-3 text-center text-xs outline-none outline-0 transition hover:translate-y-[-2px] hover:bg-primary focus:translate-y-[-2px] focus:bg-primary"
>
	<p class="font-bold text-gray-400">{formatDate(note.createdAt)}</p>
	<p>{note.text}</p>
</a>
