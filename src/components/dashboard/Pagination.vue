<script setup>
import { computed } from 'vue'

const props = defineProps({
    currentPage: Number,
    totalPages: Number,
})

const emit = defineEmits(['page-changed'])

const pages = computed(() => {
    const pagesArray = [];
    for (let i = 1; i <= props.totalPages; i++) {
        pagesArray.push(i)
    }
    return pagesArray
})

function goToPage(page) {
    if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
        emit('page-changed', page)
    }
}

</script>

<template>
    <div class="grid min-h-[60px] w-full place-items-end p-6 lg:overflow-visible bg-white">
        <nav>
            <ul class="flex">
                <li>
                    <a class="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-transparent p-0 text-sm text-gray-500 transition duration-150 ease-in-out hover:bg-secondary"
                        href="#" @click.prevent="goToPage(currentPage - 1)"
                        :aria-disabled="currentPage === 1 ? 'true' : 'false'" aria-label="Previous">
                        <span class="material-icons text-sm">keyboard_arrow_left</span>
                    </a>
                </li>

                <li v-for="page in pages" :key="page">
                    <a :class="[
                        'mx-1 flex h-9 w-9 items-center justify-center rounded-full p-0 text-sm transition duration-150 ease-in-out',
                        page === currentPage
                            ? 'bg-primary text-white shadow-md'
                            : 'border border-primary bg-transparent text-gray-500 hover:bg-secondary'
                    ]" href="#" @click.prevent="goToPage(page)">
                        {{ page }}
                    </a>
                </li>

                <li>
                    <a class="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-transparent p-0 text-sm text-gray-500 transition duration-150 ease-in-out hover:bg-secondary"
                        href="#" @click.prevent="goToPage(currentPage + 1)"
                        :aria-disabled="currentPage === totalPages ? 'true' : 'false'" aria-label="Next">
                        <span class="material-icons text-sm">keyboard_arrow_right</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
@font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url('https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.woff') format('woff');
}

.material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
}
</style>