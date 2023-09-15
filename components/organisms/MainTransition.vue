<template>
	<div class="flex justify-between items-center h-screen px-8">
		<div class="relative w-[52%]">
			<img src="../../assets/gavitanium.png" class="absolute img-loading -top-12 z-10" alt="">
			<h1 class="text-8xl text-white font-thin flex gap-4">
				<span class="animate-text z-20">Elvin </span>
				<div class="flex">
					<span class="animate-text z-0">K</span>
					<span class="animate-text z-20">yungu</span>
				</div>
			</h1>
		</div>
		<div class="relative">
			<img src="../../assets/Capture.png" class="mt-[20%]" alt="Elvin Kyungu">
		</div>
	</div>
</template>
<script>
  import { gsap } from 'gsap'
import SplitType from 'split-type'
if (process.client) {
    // Utilisez SplitType ici
    const ourText = new SplitType('span.animate-text', { types: 'chars' })
    const chars = ourText.chars;
    const imgAnimate = ref();
	
    gsap.fromTo(
        chars,
        { 
            y: 100,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 2,
            ease: 'power4.out',
        }
    )
}

</script>