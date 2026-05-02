# Notification System Design

## Stage 1

problem
there are too much notifiactions so its messy so we have to kind
of organize it by the priority of the notifiaction and show them 
according to the priority and also we have to consider the time period as the old is less priority and the new is more like that 

so the formula can be like 
Formula
score= 1/(1 + period in minutes)
so we can get the percentage and proceed
and i we have to heap as the notification keep on stacking it will be larger on the list so heap will we only check the new noti is bigger than the old one 
