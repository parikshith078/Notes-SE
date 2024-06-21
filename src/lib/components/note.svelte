<script lang="ts">
	export let note: {
		id: string
		text: string
	}
	export let activeIndex: number
  export let ind: number
</script>

<div
	class:bg-primary={activeIndex == ind}
	class="flex flex-col items-center gap-1 rounded-xl bg-gray-900 px-4 pb-4 pt-3 text-center text-xs"
>
	<p class="font-bold text-gray-400">Today, 3:01 PM</p>
	<p>{note.text}</p>
</div>
