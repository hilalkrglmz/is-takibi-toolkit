import React, { useEffect } from 'react'
import { statusOpt, typeOpt } from '../constant'
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createJob, setError, setJobs, setLoading } from '../redux/slices/jobSlice';

const AddJob = () => {
  const state = useSelector((store) => store.jobSlice)
  const navigate = useNavigate();
  const dispatch = useDispatch()

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    /* inputtan verileri alır */
    const data = Object.fromEntries(formData.entries())

    /* işe id ve oluşturulma tarihi ekle */

    data.id = v4();
    data.date = new Date().toLocaleDateString();

    /* hem apı ye hem store a işi ekle. */
    /* ekleme güncelleme silme işlemleri önce API ye eklenir 
    orası başarılı olursa store güncellenir */
    axios.post("http://localhost:4500/jobs", data)
      .then(() => {
        navigate('/');
        dispatch(createJob(data));
        toast.success("İş başarıyla kaydedildi.")
      })

      /* iş ekleme sonrasında form içini sıfırlamak için */

      e.target.reset();

  }

  console.log(state)

  return (
    <div className='add-page'>

      <section className='add-sec'>
        <h2>Yeni İş Ekle</h2>
        <form onSubmit={handleSubmit} action="">
          <div>
            <label htmlFor="">Pozisyon</label>
            <input
              list='positions'
              name='position'
              type="text"
              required />

            <datalist id='positions'>
              {state.jobs.map((job) => (
                <option value={job.position} />
              ))}            
              </datalist>

          </div>

          <div>
            <label htmlFor="">Şirket</label>
            <input name='company' type="text" required list='companies'/>

            <datalist id='companies'>
              {state.jobs.map((job) => (
                <option value={job.company} />
              ))}            
              </datalist>
          </div>

          <div>
            <label htmlFor="">Lokasyon</label>
            <input name='location' type="text" required list='locations'/>
            <datalist id='locations'>
              {state.jobs.map((job) => (
                <option value={job.location} />
              ))}            
              </datalist>
          </div>

          <div>
            <label>Durum</label>
            <select name="status" required>
              <option value={''} hidden>Seçiniz</option>
              {statusOpt.map((i) => (
                <option>{i}</option>
              )
              )}
            </select>
          </div>

          <div>
            <label>Tür</label>
            <select name="type" required>
              <option value={''} hidden>Seçiniz</option>
              {typeOpt.map((i) => (
                <option>{i}</option>
              )
              )}</select>
          </div>

          <div>
            <button type='submit' class="bookmarkBtn">
              <span class="IconContainer">
                <svg viewBox="0 0 384 512" height="0.9em" class="icon"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path></svg>
              </span>
              <p class="text">Kaydet</p>
            </button>
          </div>


        </form>
      </section>

    </div>
  )
}

export default AddJob