/*

call project_work_sum_1('DW-1942')

*/


drop procedure if exists project_work_sum_1 ; 


CREATE procedure `project_work_sum_1`(
       _pjod_idcd varchar(50)
    )  
begin	


select *
     , case rNum when 1 then (select wkct_name from wkct_mast r where x.wkct_idcd = r.wkct_idcd) else null end as wkct_name
from (	 
select pjod_idcd
     , wkct_idcd
     , (CASE @val WHEN wkct_idcd THEN @rownum:=@rownum+1    /* 공정별 첫번째 행을 찾기 위해 공정이 변경될 때 1로 */
                 ELSE @rownum:=1 END) as rNum
     , (@val:=wkct_idcd) temp
	 , (select wkct_name from wkct_mast r where a.wkct_idcd = r.wkct_idcd) as wkct_name
	 , yyyymm
	 , sum('d01') as 'd01' , sum('d02') as 'd02' , sum('d03') as 'd03' , sum('d04') as 'd04' , sum('d05') as 'd05'
	 , sum('d06') as 'd06' , sum('d07') as 'd07' , sum('d08') as 'd08' , sum('d09') as 'd09' , sum('d10') as 'd10'
	 , sum('d11') as 'd11' , sum('d12') as 'd12' , sum('d13') as 'd13' , sum('d14') as 'd14' , sum('d15') as 'd15'
	 , sum('d16') as 'd16' , sum('d17') as 'd17' , sum('d18') as 'd18' , sum('d19') as 'd19' , sum('d20') as 'd20'
	 , sum('d21') as 'd21' , sum('d22') as 'd22' , sum('d23') as 'd23' , sum('d24') as 'd24' , sum('d25') as 'd25'
	 , sum('d26') as 'd26' , sum('d27') as 'd27' , sum('d28') as 'd28' , sum('d29') as 'd29' , sum('d30') as 'd30'
	 , sum('d31') as 'd31' 
	 , sum('d01') + sum('d02') + sum('d03') + sum('d04') + sum('d05') +
	   sum('d06') + sum('d07') + sum('d08') + sum('d09') + sum('d10') +
	   sum('d11') + sum('d12') + sum('d13') + sum('d14') + sum('d15') +
	   sum('d16') + sum('d17') + sum('d18') + sum('d19') + sum('d20') +
	   sum('d21') + sum('d22') + sum('d23') + sum('d24') + sum('d25') +
	   sum('d26') + sum('d27') + sum('d28') + sum('d29') + sum('d30') +
	   sum('d31') as dtot
from (select pjod_idcd
           , wkct_idcd
           , substring(invc_date,1,6) as yyyymm
           , substring(invc_date,7,2) as wday
		   , case when substring(invc_date,7,2) = '01' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd01'
		   , case when substring(invc_date,7,2) = '02' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd02'
		   , case when substring(invc_date,7,2) = '03' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd03'
		   , case when substring(invc_date,7,2) = '04' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd04'
		   , case when substring(invc_date,7,2) = '05' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd05'
		   , case when substring(invc_date,7,2) = '06' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd06'
		   , case when substring(invc_date,7,2) = '07' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd07'
		   , case when substring(invc_date,7,2) = '08' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd08'
		   , case when substring(invc_date,7,2) = '09' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd09'
		   , case when substring(invc_date,7,2) = '10' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd10'
		   , case when substring(invc_date,7,2) = '11' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd11'
		   , case when substring(invc_date,7,2) = '12' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd12'
		   , case when substring(invc_date,7,2) = '13' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd13'
		   , case when substring(invc_date,7,2) = '14' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd14'
		   , case when substring(invc_date,7,2) = '15' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd15'
		   , case when substring(invc_date,7,2) = '16' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd16'
		   , case when substring(invc_date,7,2) = '17' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd17'
		   , case when substring(invc_date,7,2) = '18' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd18'
		   , case when substring(invc_date,7,2) = '19' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd19'
		   , case when substring(invc_date,7,2) = '20' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd20'
		   , case when substring(invc_date,7,2) = '21' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd21'
		   , case when substring(invc_date,7,2) = '22' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd22'
		   , case when substring(invc_date,7,2) = '23' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd23'
		   , case when substring(invc_date,7,2) = '24' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd24'
		   , case when substring(invc_date,7,2) = '25' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd25'
		   , case when substring(invc_date,7,2) = '26' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd26'
		   , case when substring(invc_date,7,2) = '27' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd27'
		   , case when substring(invc_date,7,2) = '28' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd28'
		   , case when substring(invc_date,7,2) = '29' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd29'
		   , case when substring(invc_date,7,2) = '30' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd30'
		   , case when substring(invc_date,7,2) = '31' then round(sum(ifnull(work_pcnt,1) * ifnull(need_time,0) / 60),0) else 0 end as 'd31'
      from   pjod_work_book
	  where  pjod_idcd = _pjod_idcd
--	  and    cvic_idcd is null
     )	a ,
     (SELECT @val:='', @rownum:=0) SUB
group by pjod_idcd , wkct_idcd, yyyymm
) x
order by wkct_idcd , yyyymm , rNum

;
end