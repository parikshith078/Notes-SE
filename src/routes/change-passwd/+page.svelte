<script lang="ts">
	import { enhance } from '$app/forms'
	export let form
	let newPass = ''
	let newPassRep = ''
</script>

<h1 class="my-5 text-center text-2xl">Change Password</h1>
<form
	class="mx-auto flex w-72 flex-col justify-center gap-3"
	method="post"
	use:enhance
>
	<label for="password-old">Current Password</label>
	<input required type="password" class="p-2 text-gray-900" name="password-old" id="old-password" />
	<br />
	<label for="password-new ">New Password</label>
	<input
		required
		class="p-2 text-gray-900"
		type="password"
		name="password-new"
		id="password-new"
		bind:value={newPass}
	/><br />
	<label for="password-rep">Repeat New Password</label>
	<input
		required
		class="p-2 text-gray-900"
		type="password"
		name="password-rep"
		id="password-rep"
		bind:value={newPassRep}
	/><br />
	{#if form?.message}
		<p class="text-center text-white">{form.message}</p>
	{/if}
	{#if newPass !== newPassRep}
		<p class="text-center text-white">Passwords note match</p>
	{/if}
	<button
		disabled={newPass !== newPassRep}
		class="rounded-lg bg-primary p-2 hover:bg-primary/70 disabled:bg-gray-200"
	>
		Change Password
	</button>
</form>
