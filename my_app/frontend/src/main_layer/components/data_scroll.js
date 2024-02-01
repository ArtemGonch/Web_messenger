import React, { useEffect, useState } from 'react'
import './Imgs.css'
import BtnRight from './BtnRight'
import BtnLeft from './BtnLeft'

const Data_scroll = () => {

    const [data_list, setdatalist] = useState([])

    useEffect(() => {
        ; (async () => {
            const data = await fetch('http://localhost:3001/data')
            const adds = await data.json()
            setdatalist(adds)
        })()
    }, [])

    const [Slideid, Setslideid] = useState(1)

    const Right = () => {
        if (Slideid !== data_list.length) {
            Setslideid(Slideid + 1)
        }
        else if (Slideid === data_list.length) {
            Setslideid(1)
        }
    }

    const Left = () => {
        if (Slideid !== 1) {
            Setslideid(Slideid - 1)
        }
        else if (Slideid === 1) {
            Setslideid(data_list.length)
        }
    }

    return (
        <div className='Imgs'>
            {data_list.map((obj, id) => {
                return (
                    <div key={obj.id} className={Slideid === id + 1 ? "slide active-anim" : "slide"}>
                        <img src={obj.image} alt='' />
                    </div>
                )
            }
            )}
            <div className='Btns'>
                <BtnRight move={Right} />
                <BtnLeft move={Left} />
            </div>
        </div>
    )
}
export { Data_scroll }