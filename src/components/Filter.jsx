import React, { useEffect, useState } from 'react'
import { sortOpt, statusOpt, typeOpt } from '../constant'
import { useDispatch } from 'react-redux'
import { clearFilters, filterBySearch, sortJobs } from '../redux/slices/jobSlice'

const Filter = ({ jobs }) => {
const dispatch = useDispatch()
const [text, setText] = useState('')


/* bu şekilde filtreleme yaparsak her tul vuruşunda 
filtreleme yapar bu da binlerce veriyle çalışılan bir projede
performans sorunu oluşturur. */
/* Olması gereken: Kullanıcı yazma işlemini bitirdiğinde 
1 kere filtreleme işlemi yapılmalı. */
/* Bunun için: Yazma işlemnin kesildiği anın yakalandığı
Debounce kavramını aklımıza getirmemi gerekir.
Debouncing: Belirli bir gecikme süresi boyunca bekler 
ve bu süre zarfında yeni bir çağğrı yapılmazsa işlevi çalıştırır.

*/
useEffect(() => {

    /*bir sayaç başlat işlemi sayaç durunca yap  */
    const timer = setTimeout(
        () => dispatch(filterBySearch({field:'company', text})), 500);

    /* eğer yazma işlemi tamamlanmadan sayaç çalışırsa sayaco her harf vuruşunda sıfırla */
    return () => clearTimeout(timer);

} ,[text])

    return (
            <section className='filter-sec'>
                <h2>Filtreleme Formu</h2>
                <form>
                    <div>
                        <label>Şirket ismine göre ara</label>
                        <input
                            onChange={(e) => setText(e.target.value) }
                            list='positions'
                            name='position'
                            type="text"
                             />

                        <datalist id='positions'>
                            {jobs.map((job) => (
                                <option value={job.company} />
                            ))}
                        </datalist>

                    </div>
                    <div>
                        <label>Durum</label>
                        <select onChange={
                            (e) => dispatch(filterBySearch(
                                {field:"status", 
                                text: e.target.value}))} name="status">
                            <option hidden>Seçiniz</option>
                            {statusOpt.map((i) => (
                                <option>{i}</option>
                            )
                            )}
                        </select>
                    </div>
                    <div>
                        <label>Sırala</label>
                        <select 
                        onChange={(e) => dispatch(sortJobs(e.target.value))} 
                        name="type">
                        
                        {sortOpt.map((i) => (
                        <option>{i}</option>
                        ))}
                        </select>
                    </div>
                    <div>
                        <label>Tür</label>
                        <select onChange={
                            (e) => dispatch(filterBySearch(
                                {field:"type", 
                                text: e.target.value}))} 
                            name="type">
                            <option hidden>Seçiniz</option>
                            {typeOpt.map((i) => (
                                <option>{i}</option>
                            )
                            )}
                        </select>
                    </div>
                    <div>
            <button type='reset' onClick={() => dispatch(clearFilters())} class="bookmarkBtn">
              <span class="IconContainer">
                <svg viewBox="0 0 384 512" height="0.9em" class="icon"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path></svg>
              </span>
              <p class="text">Filtreleri Sıfırla</p>
            </button>
          </div>
                </form>
            </section>
        
    )
}

export default Filter