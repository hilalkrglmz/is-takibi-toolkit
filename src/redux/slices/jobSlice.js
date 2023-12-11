import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    mainJobs:[], // API DEN GELEN ASLA FİLTRELEMEDİĞİMİZ
    jobs: [],//FİLTRELEME SONUCU ELDE ETTİKLERİMİZİ AKTARDIĞIMIZ
    isLoading: false,
    isError: false
}


const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {

        /* yüklenme durumunu günceller */
        setLoading: (state) => {
            state.isLoading = true;
        },

        /* API den gelen verileri state a aktarır. */
        setJobs: (state, action) => {
            state.isLoading = false,
            state.isError = false,
            state.jobs = action.payload;
            state.mainJobs= action.payload;

        },

        /* hata durumunu günceller */
        setError: (state) => {
            state.isLoading = false,
            state.isError = true
        },


        /* yeni iş oluşturur */

        createJob: (state, action) => {
            state.jobs.push(action.payload);
        },

        /* aratılan şirket ismine göre filtreleme yapma */

        filterBySearch: (state, action) => {
            /* 1.ARAMA TERİMİNİ KÜÇÜK HARFE ÇEVİR
               2.ARAMA TERİMİNİ İÇEREN İŞLERİ FİLTRELE */
            const query = action.payload.text.toLowerCase()

            const filtered= state.mainJobs.filter((job) => 
            job[action.payload.field].toLowerCase().includes(query)
            );   
            
            /* state i güncelle */
            state.jobs = filtered;
        },

        /* sıralama */

        sortJobs: (state, action) => {
            switch(action.payload){
                case 'a-z':
                state.jobs.sort((a,b) => 
                a.company.localeCompare(b.company))
                    break;
                case 'z-a':
                    state.jobs.sort((a,b) => 
                b.company.localeCompare(a.company))
                    break;
                case 'En yeni':
                    state.jobs.sort((a,b) => new Date(b.date) - new Date(a.date))
                    break;
                case 'En eski':
                    state.jobs.sort((a,b) => new Date(a.date) - new Date(b.date))
                    break;
                default:
                    break;
            }
        },

        /* sıfırlama */
        clearFilters : (state) => {
            state.jobs= state.mainJobs
        },

        /* iş silme */
        clearJob : (state,action) => {
            state.jobs = state.jobs.filter((i) => i.id !== action.payload); 
        }

    },
})

export const { setLoading, 
    setJobs, setError, createJob, 
    filterBySearch, sortJobs, clearFilters, clearJob } = jobSlice.actions;

export default jobSlice.reducer;