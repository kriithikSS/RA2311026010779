"use client"

import {Card,CardContent,Typography,Chip,Box} from "@mui/material"
import {useReadState} from "@/hooks/useReadState"

const colors: any = {Placement:"primary", Result:"warning", Event:"success"}

export default function NotificationCard({notification:n, rank}:any) {
  const {isRead,markRead} = useReadState()
  const read = isRead(n.ID)

  return (
    <Card onClick={()=>markRead(n.ID)} style={{
      cursor:"pointer",
      borderLeft: read ? "4px solid #ccc" : "4px solid #1976d2",
      background: read ? "#fff" : "#f0f7ff"
    }}>
      <CardContent>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
          {rank && <span style={{fontSize:12,color:"#888"}}>#{rank}</span>}
          <Chip label={n.Type} color={colors[n.Type]||"default"} size="small"/>
          {!read && <div style={{
            marginLeft:"auto",width:8,height:8,
            borderRadius:"50%",background:"#1976d2"
          }}/>}
        </div>
        <Typography variant="body1">{n.Message}</Typography>
        <Typography variant="caption" color="textSecondary">
          {new Date(n.Timestamp).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  )
}
