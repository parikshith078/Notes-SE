import { writable } from 'svelte/store'

let is_ctrl_down: boolean = false
let is_o_down: boolean = false

export const activeIndexStore = writable(-1)
export function on_key_down(event: KeyboardEvent): void {
	// diable repeat on hold
	if (event.repeat) return

	switch (event.key) {
		case 'Control':
			is_ctrl_down = true

			event.preventDefault()
			break

		case 'o':
			is_o_down = true

			event.preventDefault()
			break

		case '':
			is_o_down = true

			event.preventDefault()
			break

		case 'ArrowUp':
		case 'k':
			event.preventDefault()
			activeIndexStore.update((prev) => prev - 1)
			break

		case 'ArrowDown':
		case 'j':
			event.preventDefault()
			activeIndexStore.update((prev) => prev + 1)
			break
	}

	if (is_ctrl_down && is_o_down) {
		on_bind()
	}
}

export function on_key_up(event: KeyboardEvent): void {
	switch (event.key) {
		case 'Control':
			is_ctrl_down = false

			event.preventDefault()
			break

		case 'o':
			is_o_down = false

			event.preventDefault()
			break
	}
}

function on_bind() {
	console.log('conrol + o')
}
