import React from 'react'
import { MdLocationOn } from 'react-icons/md'
import { FaSuitcase } from 'react-icons/fa'
import { BsFillCalendarDateFill } from 'react-icons/bs'
import { clearJob } from '../redux/slices/jobSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

const Card = ({ job }) => {

    const dispatch = useDispatch()

    /* başvuru tipine karşılık gelen renkleri tanımladık. */
    const color = {
        'Devam Ediyor': 'green',
        'Mülakat': 'orange',
        Reddedildi: 'red',
    };

    const handleDelete = () => {

        /* API İSTEĞİ ATIP VERİTABININDAN KALDIR */
        axios.delete(`http://localhost:4500/jobs/${job.id}`)

        /* BAŞARILI OLURSA ARAYÜZÜ GÜNCELLE (STORE U GÜNCELLE) */
        .then(() => {
            toast.info('silme işlemi başarılı!')
            dispatch(clearJob(job.id))
        })

        /* BAŞARISIZ OLURSA UYARI VER! */
        .catch(() => {toast.err('silme işlemi başarısız!')})
    }

    return (
        <div className='card'>

            {/* ÜST KISIM */}
            <div className='top-area'>
                <div className="head">
                    <div className='letter'>
                        <span>{job.company[0]}</span>
                    </div>
                    <div className='info'>
                        <p>{job.position}</p>
                        <p>{job.company}</p>
                    </div>
                </div>
                <div>
                    <button onClick={handleDelete} class="button">
                        <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                    </button>
                </div>
            </div>


            {/* ALT KISIM */}
            <div className="body">
                <div className='field'>
                    <MdLocationOn />
                    <p>{job.location}</p>
                </div>
                <div className='field'>
                    <FaSuitcase />
                    <p>{job.type}</p>
                </div>
                <div className='field'>
                    <BsFillCalendarDateFill />
                    <p>{job.date}</p>
                </div>
                <div
                    className='status'>
                    <p
                        style={{
                            background: color[job.status],
                        }}
                    >
                        {job.status}</p>
                </div>
            </div>

        </div>
    )
}

export default Card