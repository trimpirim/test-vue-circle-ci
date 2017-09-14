<template>

</template>

<script>


export default {
    name:"teach",
    beforeCreate() {
      
    },
    created() {
        $(document).ready(function() {
            $("#templatemo_menu a").removeClass("current");
            $("#teach_tab").addClass("current");
        });
    }
}
</script>

<style scoped></style>