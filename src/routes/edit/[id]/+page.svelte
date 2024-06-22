<script lang="ts">
	export let data

	let value = data.note.text
</script>

<div class="container mx-auto mt-10 h-screen max-w-3xl">
	<textarea
		class=" h-[80%] w-full resize-none rounded-xl bg-gray-700 p-8 text-lg leading-6 text-gray-200 shadow-lg outline-0 transition"
		placeholder="Enter a note...."
		bind:value
	/>
</div>
