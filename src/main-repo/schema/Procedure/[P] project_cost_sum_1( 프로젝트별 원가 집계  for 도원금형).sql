/*

call project_coost_sum_1('DW-1942')

mans_time 투입공수
mans_amnt 노무비
cvic_time 설비가동시간
cvic_amnt 제조경비
mtrl_amnt 자재구입비
otod_amnt 외주가공비
sub_totl  소계
mngr_amnt 관리비
mgin_amnt 이윤
totl_amnt 원가계

*/


drop procedure if exists project_coost_sum_1 ; 


CREATE procedure `project_coost_sum_1`(
       _pjod_idcd varchar(50)
    )  
begin	


with mans_work as (
      select sum(ifnull(a.work_time,0)) as mans_time 
	       , sum(a.work_time * ifnull(a.labo_rate, (select max(labo_rate_1fst)
		                                            from   labo_rate r
			                                        where  r.labo_rate_dvcd = '1' 
                                                    ))) as mans_amnt
      from (											  
            select round(sum(1 * ifnull(need_time,0) / 60),0) as work_time
	             , e.wkrn_idcd
                 , (select max(labo_rate_1fst)
		            from   labo_rate r
			        where  r.labo_rate_dvcd = '1' 				 
					and    r.wkrn_idcd = e.wkrn_idcd ) as labo_rate 					
            from   pjod_work_book a
			left   outer join user_mast e on a.wker_idcd_1fst = e.user_idcd 
	        where  pjod_idcd = _pjod_idcd
			and    wker_idcd_1fst is not null
			union all
            select round(sum(1 * ifnull(need_time,0) / 60),0) as work_time
	             , e.wkrn_idcd			   
                 , (select max(labo_rate_1fst)
		            from   labo_rate r
			        where  r.labo_rate_dvcd = '1' 				 
					and    r.wkrn_idcd = e.wkrn_idcd ) as labo_rate 					
            from   pjod_work_book a
			left   outer join user_mast e on a.wker_idcd_2snd = e.user_idcd 
	        where  pjod_idcd = _pjod_idcd
			and    wker_idcd_2snd is not null
			union all
            select round(sum(1 * ifnull(need_time,0) / 60),0) as work_time
	             , e.wkrn_idcd			   
                 , (select max(labo_rate_1fst)
		            from   labo_rate r
			        where  r.labo_rate_dvcd = '1' 				 
					and    r.wkrn_idcd = e.wkrn_idcd ) as labo_rate 					
            from   pjod_work_book a
			left   outer join user_mast e on a.wker_idcd_3trd = e.user_idcd 
	        where  pjod_idcd = _pjod_idcd
			and    wker_idcd_3trd is not null
      ) a	
),  cvic_work as (
      select sum(ifnull(a.work_time,0)) as cvic_time 
	       , sum(a.work_time * ifnull(a.labo_rate, (select max(labo_rate_1fst)
		                                            from   labo_rate r
			                                        where  r.labo_rate_dvcd = '3' 
                                                    ))) as cvic_amnt
      from (											  
            select round(sum(1 * ifnull(need_time,0) / 60),0) as work_time
	             , a.cvic_idcd
                 , (select max(labo_rate_1fst)
		            from   labo_rate r
			        where  r.labo_rate_dvcd = '3' 				 
					and    r.wkrn_idcd = a.cvic_idcd ) as labo_rate 					
            from   pjod_work_book a
	        where  pjod_idcd = _pjod_idcd
			and    cvic_idcd is not null
      ) a	
),  mtrl_used as (
      select sum(ifnull(a.ttsm_amnt,0)) as mtrl_amnt 
	  from   purc_istt_item a 
	  where  orig_invc_numb  in (select invc_numb
	                             from   purc_ordr_mast m 
                                 where  m.prnt_idcd = _pjod_idcd
								 and    m.supl_dvcd in ('1000' , '3000')
								)
),  otod_used as (
      select sum(ifnull(a.ttsm_amnt,0)) as otod_amnt 
	  from   purc_istt_item a 
	  where  orig_invc_numb  in (select invc_numb
	                             from   purc_ordr_mast m 
                                 where  m.prnt_idcd = _pjod_idcd
								 and    m.supl_dvcd in ('4000')
								)
)
select a.* , b.* , c.* , d.*
     , a.mans_amnt + b.cvic_amnt + c.mtrl_amnt + d.otod_amnt                     as sub_totl
     , round((a.mans_amnt + b.cvic_amnt + c.mtrl_amnt + d.otod_amnt) * 0.1)      as mngr_amnt
     , round(((a.mans_amnt + b.cvic_amnt + c.mtrl_amnt + d.otod_amnt) +  
	   ((a.mans_amnt + b.cvic_amnt + c.mtrl_amnt + d.otod_amnt) * 0.1)) * 0.1)   as mgin_amnt
     , a.mans_amnt + b.cvic_amnt + c.mtrl_amnt + d.otod_amnt   +
       round((a.mans_amnt + b.cvic_amnt + c.mtrl_amnt + d.otod_amnt) * 0.1) +
       round(((a.mans_amnt + b.cvic_amnt + c.mtrl_amnt + d.otod_amnt) +  
	   ((a.mans_amnt + b.cvic_amnt + c.mtrl_amnt + d.otod_amnt) * 0.1)) * 0.1)   as totl_amnt
from   mans_work a , cvic_work b , mtrl_used c , otod_used d

;
end