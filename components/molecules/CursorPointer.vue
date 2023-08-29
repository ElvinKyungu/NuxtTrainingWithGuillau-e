<template>
    <svg class="cursor" width="100" height="100" viewBox="0 0 100 100">
			<defs>
				<filter id="cursor-filter" x="-50%" y="-50%" width="200%" height="200%" 
				filterUnits="objectBoundingBox">
					<feTurbulence type="fractalNoise" baseFrequency="0" numOctaves="1" result="warp" />
					<feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" />
				</filter>
			</defs>
			<circle class="cursor__inner" cx="50" cy="50" r="15"/>
		</svg>
		<svg class="cursor" style="opacity:0.7" width="100" height="100" viewBox="0 0 100 100" data-amt="0.13">
			<circle class="cursor__inner" cx="50" cy="50" r="15"/>
		</svg>
		<svg class="cursor" style="opacity:0.6" width="100" height="100" viewBox="0 0 100 100" data-amt="0.115">
			<circle class="cursor__inner" cx="50" cy="50" r="15"/>
		</svg>
		<svg class="cursor" style="opacity:0.5" width="100" height="100" viewBox="0 0 100 100" data-amt="0.1">
			<circle class="cursor__inner" cx="50" cy="50" r="15"/>
		</svg>
		<svg class="cursor" style="opacity:0.4" width="100" height="100" viewBox="0 0 100 100" data-amt="0.085">
			<circle class="cursor__inner" cx="50" cy="50" r="15"/>
		</svg>
		<svg class="cursor" style="opacity:0.3" width="100" height="100" viewBox="0 0 100 100" data-amt="0.07">
			<circle class="cursor__inner" cx="50" cy="50" r="15"/>
		</svg>
		<svg class="cursor" style="opacity:0.2" width="100" height="100" viewBox="0 0 100 100" data-amt="0.055">
			<circle class="cursor__inner" cx="50" cy="50" r="15"/>
		</svg>
		<svg class="cursor" style="opacity:0.1" width="100" height="100" viewBox="0 0 100 100" data-amt="0.04">
			<circle class="cursor__inner" cx="50" cy="50" r="15"/>
		</svg> 
</template>