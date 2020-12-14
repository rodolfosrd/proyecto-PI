<template>
	
	<div>
		
		<h2>You are logged out!</h2>
	</div>

</template>


<script>
	
	export default {

		created () {
			localStorage.removeItem('user');
		}

	}
</script>