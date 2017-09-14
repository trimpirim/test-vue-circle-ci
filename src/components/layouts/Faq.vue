<template>

</template>

<script>


export default {
    name:"faq",
    beforeCreate() {
      
    },
    created() {
        $(document).ready(function() {
            $("#templatemo_menu a").removeClass("current");
            $("#faq_tab").addClass("current");
        });
    }
}
</script>

<style scoped></style>