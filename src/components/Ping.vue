<template>
<div>
    <button type="button" class="btn btn-primary">{{ msg }}</button>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Ping',
    data: function () {
        return {
            msg: "ping"
        }
    },
    methods: {
        getMessage() {
            const path = 'http://localhost:8085/v1/persons';
            axios.get(path)
                .then((res) => {
                    this.msg = res.data;
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.error(error);
                });
        },
    },
    created: function () {
        this.getMessage();
    },
}
</script>
