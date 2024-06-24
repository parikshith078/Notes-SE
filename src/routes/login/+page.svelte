<script lang="ts">
	import { enhance } from '$app/forms'
</script>

<h1 class="mt-5 text-center">Sign in</h1>
<form class="mx-auto flex w-72 flex-col justify-center gap-3" method="post" use:enhance>
	<label for="username">Username</label>
	<input class="p-2 text-gray-900" name="username" id="username" /><br />
	<label for="password ">Password</label>
	<input class="p-2 text-gray-900" type="password" name="password" id="password" /><br />
	<button class="rounded-lg bg-primary p-2 hover:bg-primary/70">Continue</button>
</form>
