"use client"

import {useState, useEffect} from "react"
import {Box,Container,Typography,Chip,Stack,Pagination,CircularProgress,Alert} from "@mui/material"
import NotificationCard from "@/components/NotificationCard"
import Navbar from "@/components/Navbar"

const TYPES = ["All","Placement","Result","Event"]

export default function HomePage() {
  const [notifs, setNotifs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("All")
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setLoading(true)
    let url = `/api/notifications?page=${page}&limit=10`
    if(filter !== "All") url += `&notification_type=${filter}`

    fetch(url).then(r=>r.json()).then(data=>{
      setNotifs(data.notifications || [])
      setHasMore((data.notifications || []).length === 10)
      setLoading(false)
    }).catch(e=>{
      console.log("fetch error",e)
      setErr("something went wrong")
      setLoading(false)
    })
  },[page,filter])

  return (
    <div style={{minHeight:"100vh",background:"#f5f5f5"}}>
      <Navbar/>
      <div style={{maxWidth:760,margin:"0 auto",padding:"24px 16px"}}>
        <Typography variant="h5" style={{fontWeight:700,marginBottom:16}}>All Notifications</Typography>

        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
          {TYPES.map(t=>(
            <Chip key={t} label={t}
              onClick={()=>{setFilter(t);setPage(1)}}
              color={filter===t?"primary":"default"}
              variant={filter===t?"filled":"outlined"}
            />
          ))}
        </div>

        {err && <Alert severity="error" style={{marginBottom:12}}>{err}</Alert>}

        {loading
          ? <div style={{textAlign:"center",marginTop:40}}><CircularProgress/></div>
          : notifs.length===0
            ? <Typography color="textSecondary">No notifications</Typography>
            : <>
                <Stack spacing={2}>
                  {notifs.map(n=><NotificationCard key={n.ID} notification={n}/>)}
                </Stack>
                <div style={{display:"flex",justifyContent:"center",marginTop:24}}>
                  <Pagination count={hasMore?page+1:page} page={page}
                    onChange={(_,v)=>setPage(v)} color="primary"/>
                </div>
              </>
        }
      </div>
    </div>
  )
}
