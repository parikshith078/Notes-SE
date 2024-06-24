<script lang="ts">
	import { DropdownMenu } from 'bits-ui'
	import { fly } from 'svelte/transition'
	import { User } from 'lucide-svelte'
</script>

<div class="absolute bottom-5 right-5 md:right-10">
	<DropdownMenu.Root open loop>
		<DropdownMenu.Trigger
			class="rounded-full bg-gray-900 p-3 shadow-lg outline-none transition hover:translate-y-[-1px] hover:bg-primary focus:translate-y-[-1px] focus:bg-primary"
			><User size="24px" /></DropdownMenu.Trigger
		>
		<DropdownMenu.Content
			side="bottom"
			class="space-y-2 rounded-md border border-gray-200/20 bg-gray-900 p-3 text-right text-gray-200 outline-none"
			align="end"
			transition={fly}
			sideOffset={8}
		>
			<DropdownMenu.Item
				class="rounded-sm p-2 outline-none ring-0 transition  hover:translate-y-[-2]  hover:bg-gray-700 focus:translate-y-[-2]  focus:bg-gray-700"
			>
				<button class=" outline-none ring-0">Change Password</button>
			</DropdownMenu.Item>
			<DropdownMenu.Item
				class="rounded-sm p-2 outline-none ring-0 transition  hover:translate-y-[-2]  hover:bg-gray-700 focus:translate-y-[-2]  focus:bg-gray-700"
			>
				<form method="post" action="/logout">
					<button class="text-[#E46962] outline-none ring-0"> Logout </button>
				</form>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
