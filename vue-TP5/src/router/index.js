import {createRouter , createWebHistory} from 'vue-router';

import addJob from '@/views/AddJobs.vue';
import displayJob from '@/views/DisplayJobs.vue';
import editJob from '@/views/EditJob.vue';
import JobDetail from '@/views/JobDetails.vue'


const router = createRouter({
    history : createWebHistory(import.meta.env.BASE_URL),
    routes : [
        {
            path : '/AddJob',
            name : 'addJob',
            component : addJob,
        },
        {
            path : '/display',
            name : 'display',
            component : displayJob,
        },
        {
            path : '/edit',
            name : 'edit',
            component : editJob,
        },
        { 
          path: '/detail/:id',
          component: JobDetail,
          props: true 
        },
    ]
})


export default router;              