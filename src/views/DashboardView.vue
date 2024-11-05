<script setup>
import { ref, computed, onMounted } from "vue"
import Pagination from "../components/dashboard/Pagination.vue"
import DeleteModal from "../components/dashboard/DeleteModal.vue"
import ModifyModal from "../components/dashboard/ModifyModal.vue"
import { useEventStore } from '../stores/eventStore.js'

const eventStore = useEventStore()
const selectedEvent = ref(null)
const showModal = ref(false)
const currentPage = ref(1)
const itemsPerPage = 10

const openEditModal = (event) => {
    selectedEvent.value = event
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    selectedEvent.value = null
}

const handleEventUpdate = () => {
    eventStore.fetchEvents()
}

const totalPages = computed(() =>
    Math.ceil(eventStore.filteredEvents.length / itemsPerPage)
)

const eventsToShow = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return eventStore.filteredEvents.slice(start, end)
})

function handlePageChange(page) {
    currentPage.value = page
}

onMounted(() => {
    eventStore.fetchEvents()
})

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
}

</script>


<template>
    <div class="mt-8">
        <h3 class="text-3xl font-poppins font-medium text-navy">Event List</h3>

        <div class="mt-4">
            <div class="flex flex-wrap -mx-6">
                <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3">
                    <div class="flex justify-between px-5 py-6 bg-white rounded-xl shadow-sm">
                        <div class="mx-1">
                            <h4 class="font-bold font-nunito text-navy">Total events</h4>
                        </div>
                        <div class="mx-5 text-right">
                            <p class="font-bold font-nunito text-navy">
                                {{ eventStore.events.length }}
                            </p>
                        </div>
                    </div>
                </div>
                <Filter />
                <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3">
                    <div class="px-5 py-6 bg-primary rounded-xl shadow-sm">
                        <Router-link class="text-white font-semibold font-Poppins flex justify-center gap-5"
                            to="/admin/forms">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.34783 12.5764H0V7.33624H7.34783V0H12.5652V7.33624H20V12.5764H12.5652V20H7.34783V12.5764Z"
                                    fill="white" />
                            </svg>
                            Add new
                        </Router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8" />

        <div class="flex flex-col mt-8">
            <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div
                    class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-3xl">
                    <table class="min-w-full">
                        <thead>
                            <tr>
                                <th
                                    class="px-6 py-3 text-x  leading-4 tracking-wider text-left text-navy  font-bold border-b border-gray-200 bg-gray-50">
                                    Featured
                                </th>
                                <th
                                    class="px-6 py-3 text-x  leading-4 tracking-wider text-left text-navy  font-bold border-b border-gray-200 bg-gray-50">
                                    Title
                                </th>
                                <th
                                    class="px-6 py-3 text-x  leading-4 tracking-wider text-left text-navy  font-bold border-b border-gray-200 bg-gray-50">
                                    Description
                                </th>
                                <th
                                    class="px-6 py-3 text-x  leading-4 tracking-wider text-left text-navy  font-bold border-b border-gray-200 bg-gray-50">
                                    Slots
                                </th>
                                <th
                                    class="px-6 py-3 text-x  leading-4 tracking-wider text-left text-navy  font-bold border-b border-gray-200 bg-gray-50">
                                    Date & Time
                                </th>
                                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">
                            <tr v-for="(event, index) in eventsToShow" :key="index">
                                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                    <div>
                                        <svg v-if="event.isFeatured" width="20" height="20" viewBox="0 0 20 20"
                                            fill="none" xmlns="http://www.w3.org/2000/svg"
                                            style="fill: #374D5F; opacity: 1;">
                                            <path
                                                d="M16.8431 19.3807C16.7635 19.3807 16.6844 19.3564 16.617 19.3085L10 14.6115L3.38308 19.3086C3.2639 19.3932 3.10749 19.4042 2.97772 19.3371C2.84788 19.27 2.76636 19.1361 2.76636 18.99V1.00989C2.76636 0.794146 2.94124 0.619263 3.15698 0.619263H16.843C17.0587 0.619263 17.2337 0.794146 17.2337 1.00989V18.9901C17.2337 19.1361 17.1521 19.2701 17.0224 19.3372C16.9658 19.3663 16.9044 19.3807 16.8431 19.3807Z" />
                                        </svg>
                                        <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" style="fill: #374D5F; opacity: 0.0;">
                                            <path
                                                d="M16.8431 19.3807C16.7635 19.3807 16.6844 19.3564 16.617 19.3085L10 14.6115L3.38308 19.3086C3.2639 19.3932 3.10749 19.4042 2.97772 19.3371C2.84788 19.27 2.76636 19.1361 2.76636 18.99V1.00989C2.76636 0.794146 2.94124 0.619263 3.15698 0.619263H16.843C17.0587 0.619263 17.2337 0.794146 17.2337 1.00989V18.9901C17.2337 19.1361 17.1521 19.2701 17.0224 19.3372C16.9658 19.3663 16.9044 19.3807 16.8431 19.3807Z" />
                                        </svg>
                                    </div>
                                </td>
                                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                    <div class="text-sm font-medium leading-5 text-gray-900">
                                        {{ event.title }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                    <div class="relative">
                                        <svg @click="toggleDropdown" width="48" height="48" viewBox="0 0 48 48"
                                            fill="none" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer">
                                            <g clip-path="url(#clip0_102_5357)">
                                                <path d="M14 20L24 30L34 20H14Z" fill="#70ABAF" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_102_5357">
                                                    <rect width="48" height="48" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <div v-if="isDropdownOpen"
                                            class="absolute top-full left-0 mt-2 px-4 py-2 border border-gray-300 bg-white shadow-lg z-10">
                                            <div class="text-sm leading-5 text-gray-900">
                                                {{ event.description }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                    <div class="text-sm leading-5 text-gray-900">
                                        {{ event.participantsCount }}/{{ event.maxParticipants }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                    <div class="text-sm leading-5 text-gray-900">
                                        {{ new Date(event.eventDateTime).toLocaleString() }}
                                    </div>
                                </td>
                                <td
                                    class="px-2 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                                    <button class="py-3 mt-3 font-medium tracking-wide text-white focus:outline-none"
                                        @click="openEditModal(event)">
                                        <div class="bg-random-100 rounded-full p-3 inline-block">
                                            <svg width="33" height="34" viewBox="0 0 33 34" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_100_2800)">
                                                    <path
                                                        d="M24.5371 1.95186C26.4729 0.0160453 29.6121 0.0160453 31.5479 1.95186C33.4838 3.88768 33.4838 7.02688 31.5479 8.9627L24.5371 1.95186Z"
                                                        fill="#D75A4A" />
                                                    <path
                                                        d="M26.2896 11.5913L10.2317 27.6498L9.90332 30.6074L27.6045 12.9056L26.2896 11.5913Z"
                                                        fill="#ED8A19" />
                                                    <path
                                                        d="M6.39795 27.1021L9.35559 26.7736L25.4135 10.7151L22.7849 8.08655L6.72637 24.1444L6.39795 27.1021Z"
                                                        fill="#ED8A19" />
                                                    <path
                                                        d="M21.9087 7.2103L20.5938 5.89539L2.89258 23.5966L5.85022 23.2682L21.9087 7.2103Z"
                                                        fill="#ED8A19" />
                                                    <path
                                                        d="M30.233 10.277L31.5479 8.96274L24.5371 1.9519L23.2222 3.26682H23.2228L30.233 10.277Z"
                                                        fill="#C7CAC7" />
                                                    <path
                                                        d="M22.3464 4.14294L21.4702 5.01914L28.4811 12.0294L29.3572 11.1532L22.3464 4.14294Z"
                                                        fill="#C7CAC7" />
                                                    <path
                                                        d="M8.93801 28.0674L5.76411 28.42C5.74181 28.4225 5.71888 28.4237 5.69657 28.4237C5.69595 28.4237 5.69533 28.4237 5.69533 28.4237C5.67302 28.4237 5.6501 28.4225 5.62779 28.42C5.60362 28.4175 5.58379 28.4039 5.56087 28.3983C5.51625 28.3878 5.47349 28.3766 5.4326 28.3568C5.40161 28.3419 5.37497 28.324 5.34708 28.3048C5.31176 28.28 5.27954 28.2533 5.2498 28.2217C5.22625 28.1969 5.20704 28.1715 5.18783 28.143C5.16428 28.1077 5.14507 28.0712 5.12896 28.0309C5.11533 27.9974 5.10542 27.9646 5.09798 27.9286C5.09364 27.9088 5.08311 27.8921 5.08063 27.8716C5.07815 27.8481 5.08683 27.8264 5.08683 27.8035C5.08683 27.7799 5.07815 27.7588 5.08063 27.7353L5.43322 24.5614L2.25932 24.914C2.23639 24.9165 2.21284 24.9177 2.19053 24.9177C2.14158 24.9177 2.09635 24.9028 2.04987 24.8917L0.273926 32.3499L1.57893 31.0449C1.82122 30.8026 2.21284 30.8026 2.45513 31.0449C2.69742 31.2872 2.69742 31.6788 2.45513 31.9211L1.15013 33.2261L8.60464 31.4514C8.58852 31.3839 8.57799 31.3138 8.58605 31.2413L8.93801 28.0674Z"
                                                        fill="#FBCE9D" />
                                                    <path
                                                        d="M2.45509 31.0449C2.21281 30.8026 1.82118 30.8026 1.57889 31.0449L0.27389 32.3499L0 33.5L1.15009 33.2261L2.45509 31.9211C2.69676 31.6788 2.69676 31.2872 2.45509 31.0449Z"
                                                        fill="#38454F" />
                                                    <path
                                                        d="M30.2332 10.2769L23.223 3.26672H23.2224L22.3462 4.14292L29.357 11.1531L30.2332 10.2769Z"
                                                        fill="#F2ECBF" />
                                                    <path
                                                        d="M25.4136 10.7151L9.35573 26.7736L6.39809 27.102L6.72651 24.1444L22.785 8.08653L21.9088 7.21033L5.85031 23.2682L2.89267 23.5966L2.1906 24.2987L2.04932 24.8917C2.09579 24.9029 2.14041 24.9177 2.18998 24.9177C2.21229 24.9177 2.23583 24.9165 2.25876 24.914L5.43266 24.5614L5.08007 27.7353C5.0776 27.7589 5.08627 27.7806 5.08627 27.8035C5.08627 27.827 5.0776 27.8481 5.08007 27.8717C5.08255 27.8921 5.09309 27.9088 5.09742 27.9287C5.10486 27.964 5.11539 27.9981 5.12841 28.0309C5.14452 28.0706 5.16373 28.1077 5.18728 28.1431C5.20587 28.1709 5.22631 28.1976 5.24924 28.2218C5.27837 28.2527 5.31121 28.28 5.34653 28.3048C5.37379 28.324 5.40168 28.3426 5.43204 28.3568C5.47232 28.3761 5.51569 28.3878 5.56031 28.3984C5.58386 28.4039 5.60307 28.417 5.62723 28.4201C5.64954 28.4225 5.67185 28.4238 5.69478 28.4238H5.6954H5.69602H5.69726C5.71894 28.4238 5.74187 28.4225 5.7648 28.4201L8.9387 28.0675L8.58611 31.2414C8.57806 31.3145 8.58859 31.3839 8.6047 31.4514L9.20143 31.3095L9.90351 30.6081L10.2319 27.6504L26.2898 11.5919L25.4136 10.7151Z"
                                                        fill="#EBBA16" />
                                                    <path
                                                        d="M28.4808 12.0294L21.4699 5.01917L20.5938 5.89536L21.9087 7.21028L22.7849 8.08648L25.4135 10.7151L26.2897 11.5913L27.6046 12.9056L28.4808 12.0294Z"
                                                        fill="#F2ECBF" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_100_2800">
                                                        <rect width="33" height="33" fill="white"
                                                            transform="translate(0 0.5)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>


                                        </div>
                                    </button>
                                </td>
                                <td
                                    class="px-2 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                                    <DeleteModal :event="event" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Pagination :currentPage="currentPage" :totalPages="totalPages" @page-changed="handlePageChange" />
                </div>
            </div>
        </div>

        <ModifyModal v-if="showModal" :isVisible="showModal" :event="selectedEvent" @update:event="handleEventUpdate"
            @close="closeModal" />
    </div>
</template>
