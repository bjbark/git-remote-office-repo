select a.cvic_idcd  , a.cvic_code , a.cvic_name , a.invc_numb  , a.line_seqn , a.item_idcd , a.item_name
     , a.mold_idcd  , a.cycl_time 
	 , a.cavity
	 , a.indn_qntt  , a.prod_qntt  , (a.prod_qntt / a.indn_qntt) * 100 as prod_rate
	 , a.shot   	, a.strt_time  , a.endd_time
	 , a.time_diff
	 , a.time_diff / a.shot as cycl_time2
from (
select a.cvic_idcd  , cv.cvic_code , cv.cvic_name , a.invc_numb  , a.line_seqn , a.item_idcd , i.item_name
     , ia.mold_idcd , ia.cycl_time 
	 , m.cavity
	 , a.indn_qntt  , sum(cast(d.param1 as unsigned)) as prod_qntt , count(d.timepoint) as shot
	 , min(d.timepoint) as strt_time , max(d.timepoint) as endd_time
	 , TIMESTAMPDIFF(minute, str_to_date(min(d.timepoint),'%Y%m%d%H%i%s'), str_to_date(max(d.timepoint),'%Y%m%d%H%i%s')) AS time_diff
from   pror_item a
       left outer join item_mast  i  on a.item_idcd   = i.item_idcd
       left outer join item_adon  ia on a.item_idcd   = ia.item_idcd
	   left outer join wt_conv    c  on a.cvic_idcd   = c.cvic_idcd
	   left outer join cvic_mast  cv on a.cvic_idcd   = cv.cvic_idcd
	   left outer join mold_mast  m  on ia.mold_idcd  = m.mold_idcd
	   left outer join wt_data_in d  on c.device = d.device  and c.ch = d.ch and d.timepoint between a.work_strt_dttm and a.work_endd_dttm 
where '20190905' between substring(a.work_strt_dttm,1,8) and substring(a.work_endd_dttm,1,8)
group by a.cvic_idcd  , cv.cvic_code , cv.cvic_name , a.invc_numb  , a.line_seqn , a.item_idcd , i.item_name
     , ia.mold_idcd   , ia.cycl_time  , m.cavity
	 , a.indn_qntt  
order by cv.cvic_code	 
) a

