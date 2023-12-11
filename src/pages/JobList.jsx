import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setError, setJobs, setLoading } from '../redux/slices/jobSlice';
import Loader from '../components/Loader';
import Card from '../components/Card';
import Filter from '../components/Filter';

const JobList = () => {

  const dispatch = useDispatch()

  const state = useSelector((store) => store.jobSlice)


  /* API den verileri alıp store a aktarır */
  const fetchData = () => { 
    dispatch(setLoading())

    axios.get('http://localhost:4500/jobs')
      .then((res) => dispatch(setJobs(res.data)))
      .catch(() => dispatch(setError()))
  }
 

  /* bileşen ekrana basıldığında verileri çeker */
  useEffect(() => {
    fetchData()
    
  }, [])

  return (
    <div className='list-page'>
      
      <Filter jobs={state.jobs}/>

      {

        state.isLoading ?
          <Loader />
          : state.isError ?
            <p className='error'>Üzgünüz veriler alınamadı {''}
              <button onClick={fetchData} type="button" class="button">
                <span class="button__text">Yenile</span>
                <span class="button__icon">
                  <img className='svg' src="refresh.svg" alt="" />
                </span>
              </button>

            </p>
            :
            (
              <div className='job-list'>
                {state.jobs?.map((job) => <Card key={job.id} job={job} />)}
              </div>
            )


      }

    </div>
  )
}

export default JobList