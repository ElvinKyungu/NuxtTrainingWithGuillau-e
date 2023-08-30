<template>
   <main class="">
		<div class="view view--1">
			<button class="unbutton button button--open" aria-label="Open other view">Page 2</button>
		</div>
		<div class="view view--2">
			<button class="unbutton button button--close" aria-label="Close current view">Page 1</button>
		</div>
		<!-- From https://codepen.io/sebastien-gilbert/pen/VwLzvGV?editors=1010 -->
		<!-- Edit the paths here: https://yqnn.github.io/svg-path-editor/ -->
		<svg class="overlay" width="50%" height="50%" viewBox="0 0 100 100" preserveAspectRatio="none">
			<path class="overlay__path" vector-effect="non-scaling-stroke" d="M 0 0 h 0 c 0 50 0 50 0 100 H 0 V 0 Z" />
		</svg>
	</main>
</template>
<script lang="ts">
// import { ref, onMounted } from 'vue';
import gsap from 'gsap';

export default {
  setup() {
    const frame = ref("");
    const overlayPath = ref(null);
    const landingEl = ref(null);
    const switchCtrl = ref(null);
    const backCtrl = ref(null);
    let isAnimating = false;
    let page = 1;

    const paths = {
      step1: {
        unfilled: 'M 0 0 h 0 c 0 50 0 50 0 100 H 0 V 0 Z',
        inBetween: 'M 0 0 h 33 c -30 54 113 65 0 100 H 0 V 0 Z',
        filled: 'M 0 0 h 100 c 0 50 0 50 0 100 H 0 V 0 Z',
      },
      step2: {
        filled: 'M 100 0 H 0 c 0 50 0 50 0 100 h 100 V 50 Z',
        inBetween: 'M 100 0 H 50 c 28 43 4 81 0 100 h 50 V 0 Z',
        unfilled: 'M 100 0 H 100 c 0 50 0 50 0 100 h 0 V 0 Z',
      },
    };

    const pageSwitchTimeline = gsap.timeline({
      paused: true,
      onComplete: () => (isAnimating = false),
    })
      .set(overlayPath.value, {
        attr: { d: paths.step1.unfilled },
      })
      .to(overlayPath.value, {
        duration: 0.8,
        ease: 'power3.in',
        attr: { d: paths.step1.inBetween },
      }, 0)
      .to(overlayPath.value, {
        duration: 0.2,
        ease: 'power1',
        attr: { d: paths.step1.filled },
        onComplete: () => switchPages(),
      })
      .set(overlayPath.value, {
        attr: { d: paths.step2.filled },
      })
      .to(overlayPath.value, {
        duration: 0.15,
        ease: 'sine.in',
        attr: { d: paths.step2.inBetween },
      })
      .to(overlayPath.value, {
        duration: 1,
        ease: 'power4',
        attr: { d: paths.step2.unfilled },
      });

    const switchPages = () => {
      if (page === 2) {
        frame.value.classList.add('frame--view-open');
        landingEl.value.classList.add('view--open');
      } else {
        frame.value.classList.remove('frame--view-open');
        landingEl.value.classList.remove('view--open');
      }
    };

    const reveal = () => {
      if (isAnimating) return;
      isAnimating = true;
      page = 2;
      pageSwitchTimeline.play(0);
    };

    const unreveal = () => {
      if (isAnimating) return;
      isAnimating = true;
      page = 1;
      pageSwitchTimeline.play(0);
    };

    onMounted(() => {
      switchCtrl.value.addEventListener('click', reveal);
      backCtrl.value.addEventListener('click', unreveal);
    });

    return {
      frame,
      overlayPath,
      landingEl,
      switchCtrl,
      backCtrl,
    };
  },
};
</script>
<style scoped>
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
	--color-text: #000;
    --color-bg-view-1: #9da0dd;
    --color-bg-view-2: #5d61b4;
    --color-link: #000;
    --color-link-hover: #000;
    --color-button: #000;
    --color-button-hover: #22267d;
	color: var(--color-text);
	background-color: var(--color-bg-view-1);
	font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
	font-weight: 500;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	overflow: hidden;
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
	outline: 2px solid #fff;
	background: transparent;
}

.unbutton {
	background: none;
	border: 0;
	padding: 0;
	margin: 0;
	font: inherit;
	cursor: pointer;
}

.unbutton:focus {
	outline: none;
}

main {
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 100vh;
}

.frame {
	grid-area: 1 / 1 / 2 / 2;
	padding: 1.5rem 2rem 10vh;
	text-align: center; 
	position: relative;
	z-index: 100;
	pointer-events: none;
}

.frame a {
	pointer-events: auto;
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

.button {
	color: var(--color-button);
	border-radius: 30px;
	min-width: 150px;
	padding: 1rem 2rem;
	border: 1px solid currentColor;
}

.button:hover,
.button:focus-visible {
	color: var(--color-button-hover);
}

.frame--view-open .button-open {
	opacity: 0;
	pointer-events: none;
}

.view {
	position: relative;
	grid-area: 1 / 1 / 2 / 2;
	display: grid;
	place-items: center;
}

.view--2 {
	background: var(--color-bg-view-2);
	pointer-events: none;
	opacity: 0;
}

.view.view--open {
	pointer-events: auto;
	opacity: 1;
}

.overlay {
	grid-area: 1 / 1 / 2 / 2;
	position: relative;
	z-index: 1000;
	pointer-events: none;
	width: 100%;
	height: 100%;
}

@media screen and (min-width: 53em) {
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
</style>