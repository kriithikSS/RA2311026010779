"use client"

import {useState,useEffect} from "react"
import {Typography,Chip,Stack,Slider,CircularProgress,Alert} from "@mui/material"
import NotificationCard from "@/components/NotificationCard"
import Navbar from "@/components/Navbar"
import {getTopN} from "@/lib/scorer"

const TYPES = ["All","Placement","Result","Event"]

export default function PriorityPage() {
  const [allData, setAllData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")
  const [topN, setTopN] = useState(10)
  const [type, setType] = useState("All")

  useEffect(()=>{
    setLoading(true)
    // using page=1 limit=10 same as all page since that works
    fetch("/api/notifications?page=1&limit=10")
      .then(r=>{
        if(!r.ok) throw new Error("api error "+r.status)
        return r.json()
      })
      .then(d=>{
        const list = d.notifications || []
        console.log("priority got",list.length,"items")
        setAllData(list)
        setLoading(false)
      })
      .catch(e=>{
        console.log("priority fetch err",e)
        setErr("couldn't load: "+e.message)
        setLoading(false)
      })
  },[])

  const filtered = type==="All" ? allData : allData.filter((x:any)=>x.Type===type)
  const topItems = getTopN(filtered, topN)

  return (
    <div style={{minHeight:"100vh",background:"#f5f5f5"}}>
      <Navbar/>
      <div style={{maxWidth:760,margin:"0 auto",padding:"24px 16px"}}>
        <Typography variant="h5" style={{fontWeight:700,marginBottom:4}}>Priority Inbox</Typography>
        <Typography variant="body2" color="textSecondary" style={{marginBottom:20}}>
          Ranked by type weight and how recent they are
        </Typography>

        <div style={{marginBottom:20,maxWidth:300}}>
          <Typography gutterBottom>Top: {topN}</Typography>
          <Slider value={topN} onChange={(_,v)=>setTopN(v as number)}
            min={5} max={20} step={5}
            marks={[{value:5,label:"5"},{value:10,label:"10"},{value:15,label:"15"},{value:20,label:"20"}]}
          />
        </div>

        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
          {TYPES.map(t=>(
            <Chip key={t} label={t}
              onClick={()=>setType(t)}
              color={type===t?"primary":"default"}
              variant={type===t?"filled":"outlined"}
            />
          ))}
        </div>

        {err && <Alert severity="error" style={{marginBottom:12}}>{err}</Alert>}

        {loading
          ? <div style={{textAlign:"center",marginTop:40}}><CircularProgress/></div>
          : topItems.length===0
            ? <Typography color="textSecondary">no notifications found</Typography>
            : <Stack spacing={2}>
                {topItems.map((item,i)=>(
                  <NotificationCard key={item.ID} notification={item} rank={i+1}/>
                ))}
              </Stack>
        }
      </div>
    </div>
  )
}
