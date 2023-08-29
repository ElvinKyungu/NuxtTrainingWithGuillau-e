<template>
	<MoleculesCursorPointer />
    <nav class="flex gap-4 text-white font-semibold justify-center items-center">
        <NuxtLink to="/">Accueil</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/service">Services</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
    </nav>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

/**
 * Linear interpolation
 * @param {Number} a - first value to interpolate
 * @param {Number} b - second value to interpolate 
 * @param {Number} n - amount to interpolate
 */
const lerp = (a :number, b : number, n : number) => (1 - n) * a + n * b;

/**
 * Gets the cursor position
 * @param {Event} ev - mousemove event
 */
const getCursorPos = (ev) => {
	return { 
		x : ev.clientX, 
		y : ev.clientY 
	};
};


const cursor = ref({ x: 0, y: 0 });

onMounted(() => {
	window.addEventListener('mousemove', ev => {
		cursor.value = getCursorPos(ev);
	});
});

const CursorElement = class {
	DOM = {
		el: null,
		inner: null,
		feTurbulence: null
	};

	radiusOnEnter = 40;
	opacityOnEnter = 1;
	radius;
	renderedStyles = {
		tx: { previous: 0, current: 0, amt: 0.15 },
		ty: { previous: 0, current: 0, amt: 0.15 },
		radius: { previous: 20, current: 20, amt: 0.15 },
		opacity: { previous: 1, current: 1, amt: 0.15 }
	};
	bounds;
	filterId = '#cursor-filter';
	primitiveValues = { turbulence: 0 };
	filterTimeline;

	constructor(DOM_el) {
		this.DOM.el = DOM_el;
		this.DOM.inner = this.DOM.el.querySelector('.cursor__inner');
		this.DOM.feTurbulence = document.querySelector(`${this.filterId} > feTurbulence`);

		this.createFilterTimeline();

		this.opacity = this.DOM.el.style.opacity;
		this.DOM.el.style.opacity = 0;

		this.bounds = this.DOM.el.getBoundingClientRect();

		this.radiusOnEnter = this.DOM.el.dataset.radiusEnter || this.radiusOnEnter;
		this.opacityOnEnter = this.DOM.el.dataset.opacityEnter || this.opacityOnEnter;
		for (const key in this.renderedStyles) {
			this.renderedStyles[key].amt = this.DOM.el.dataset.amt || this.renderedStyles[key].amt;
		}

		this.radius = this.DOM.inner.getAttribute('r');
		this.renderedStyles['radius'].previous = this.renderedStyles['radius'].current = this.radius;
		this.renderedStyles['opacity'].previous = this.renderedStyles['opacity'].current = this.opacity;

		const onMouseMoveEv = () => {
			this.renderedStyles.tx.previous = this.renderedStyles.tx.current = cursor.value.x - this.bounds.width / 2;
				this.renderedStyles.ty.previous = this.renderedStyles.ty.previous = cursor.value.y - this.bounds.height / 2;
				this.DOM.el.style.opacity = this.opacity;
				requestAnimationFrame(() => this.render());
				window.removeEventListener('mousemove', onMouseMoveEv);
			};
			window.addEventListener('mousemove', onMouseMoveEv);
		}

		enter() {
			this.renderedStyles['radius'].current = this.radiusOnEnter;
			this.renderedStyles['opacity'].current = this.opacityOnEnter;

			this.filterTimeline.restart();
		}

		leave() {
			this.renderedStyles['radius'].current = this.radius;
			this.renderedStyles['opacity'].current = this.opacity;

			this.filterTimeline.progress(1).kill();
		}

		createFilterTimeline() {
			this.filterTimeline = gsap.timeline({
				paused: true,
				onStart: () => {
					this.DOM.inner.style.filter = `url(${this.filterId}`;
				},
				onUpdate: () => {
					this.DOM.feTurbulence.setAttribute('baseFrequency', this.primitiveValues.turbulence);
				},
				onComplete: () => {
					this.DOM.inner.style.filter = 'none';
				}
			})
			.to(this.primitiveValues, {
				duration: .5,
				ease: 'sine.in',
				startAt: { turbulence: 1 },
				turbulence: 0
			});
		}

		render() {
			this.renderedStyles['tx'].current = cursor.value.x - this.bounds.width / 2;
			this.renderedStyles['ty'].current = cursor.value.y - this.bounds.height / 2;

			for (const key in this.renderedStyles) {
				this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
			}

			this.DOM.el.style.transform = `translateX(${(this.renderedStyles['tx'].previous)}px) translateY(${this.renderedStyles['ty'].previous}px)`;
			this.DOM.inner.setAttribute('r', this.renderedStyles['radius'].previous);
			this.DOM.el.style.opacity = this.renderedStyles['opacity'].previous;

			requestAnimationFrame(() => this.render());
		}
	};

const Cursor = class {
DOM = {
elements: null
};
cursorElements = [];

constructor(Dom_elems, triggerSelector = 'a') {
this.DOM.elements = Dom_elems;

[...this.DOM.elements].forEach(el => this.cursorElements.push(new CursorElement(el)));

[...document.querySelectorAll(triggerSelector)].forEach(link => {
link.addEventListener('mouseenter', () => this.enter());
link.addEventListener('mouseleave', () => this.leave());
});
}

enter() {
	for (const el of this.cursorElements) {
		el.enter();
	}
}

leave() {
	for (const el of this.cursorElements) {
		el.leave();
	}
}
};

onMounted(() => {
	const cursorElements = document.querySelectorAll('.cursor');
	const cursor = new Cursor(cursorElements);
});


</script>

<style>
	 *,
*::after,
*::before {
	box-sizing: border-box;
}

:root {
	font-size: 15px;
}

body {
	margin: 0;
    --color-text: #919191;
    --color-text-alt: #747474;
    --color-bg: #0f0e0e;
    --color-link: #e5e5e5;
    --color-link-hover: #d6cecb;
    color: var(--color-text);
    background: var(--color-bg);
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
    font-weight: 500;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    --cursor-stroke: white;
}

a {
	text-decoration: none;
	color: var(--color-link);
	outline: none;
}

a:hover {
	color: var(--color-link-hover);
	outline: none;
}

/* Better focus styles from https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible */
a:focus {
	/* Provide a fallback style for browsers
	 that don't support :focus-visible */
	outline: none;
	background: lightgrey;
}

a:focus:not(:focus-visible) {
	/* Remove the focus indicator on mouse-focus for browsers
	 that do support :focus-visible */
	background: transparent;
}

a:focus-visible {
	/* Draw a very noticeable focus style for
	 keyboard-focus on browsers that do support
	 :focus-visible */
	outline: 2px solid white;
	background: transparent;
}

main {
	height: 100vh;
	display: flex;
	flex-direction: column;
}

.frame {
	padding: 1.5rem 2rem 10vh;
	text-align: center; 
	position: relative;
}

.frame__title {
	margin: 0;
	font-size: 1rem;
	font-weight: 500;
}

.frame__links {
	margin: 0.5rem 0 2rem;
}

.frame__links a:not(:last-child) {
	margin-right: 1rem;
}

.menu {
	flex: 1;
	display: grid;
	place-items: center;
	align-self: center;
	grid-gap: 7vw;
	font-size: 2rem;
	font-family: "Goudy Old Style", Garamond, "Big Caslon", "Times New Roman", serif;
	
}

.cursor {
	display: none;
}

@media screen and (min-width: 53em) {
	.menu {
		font-size: 4vw;
		grid-auto-flow: column;
		max-width: min-content;
	}
	.frame {
		padding: 1.5rem 2rem 0;
		display: grid;
		grid-template-columns: auto 1fr auto;
		grid-template-areas: 'title links sponsor';
		grid-gap: 3vw;
		justify-content: space-between;
		text-align: left;
	}
	.frame__links {
		margin: 0;
	}
}

@media (any-pointer:fine) {
	.cursor {
		position: fixed;
		top: 0;
		left: 0;
		display: block;
		pointer-events: none;
		z-index: 10000;
	}

	.cursor__inner {
		fill: none;
		stroke: var(--cursor-stroke);
		stroke-width: 1px;
	}

	.no-js .cursor {
		display: none;
	}

}
</style>
