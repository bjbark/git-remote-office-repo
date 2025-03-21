/*

call project_eis_query_1

*/


drop procedure if exists `project_eis_query_1`;

CREATE  PROCEDURE `project_eis_query_1`()
begin  
with over_days as (
select w.pjod_idcd , w.wkct_idcd
     , sum(datediff(
           ifnull((select max(invc_date)
	               from   pjod_work_book r
	               where  w.pjod_idcd = r.pjod_idcd
		           and    w.id  = r.idcd
		          ),date_format(now(),'%Y%m%d'))
		, str_to_date(FROM_UNIXTIME(w.`start`/1000,'%Y%m%d'),'%Y%m%d') 		  
	    )) as over_days			  
from  pjod_work_schd w
left  outer join pjod_mast m on w.pjod_idcd = m.pjod_idcd
where w.work_schd_dvcd = '2000'
and   w.line_clos = '0'
and	  m.line_stat	< '2'
group by w.pjod_idcd , w.wkct_idcd
),
orders as (
select a.pjod_idcd , i.item_name      , c.cstm_name , m.modl_name
     , m.regi_date , m.ppsl_deli_date , m.deli_date , a.wkct_idcd
	 , w.wkct_name
from  pjod_work_schd a
left  outer join pjod_mast m on a.pjod_idcd = m.pjod_idcd
left  outer join cstm_mast c on m.cstm_idcd = c.cstm_idcd
left  outer join item_mast i on a.item_idcd = i.item_idcd
left  outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd
where a.work_schd_dvcd = '2000'
and   m.line_clos = '0'
and	  m.line_stat	< '2'
group by a.pjod_idcd , a.wkct_idcd
)
select a.pjod_idcd , a.item_name      , a.wkct_name , a.cstm_name , a.modl_name
     , a.regi_date , a.ppsl_deli_date , a.deli_date 
	 , a.work_stat_dvcd	 
	 , case a.work_stat_dvcd when '1100' then '대기중:blue'
	                         when '1200' then '지연1:green'
	                         when '1300' then '지연2:brown'
	                         when '1400' then '위험:red'
							 end as work_stat_name
from (
select a.pjod_idcd , a.item_name      , a.wkct_name , a.cstm_name , a.modl_name
     , a.regi_date , a.ppsl_deli_date , a.deli_date 
	 , case when ifnull(b.over_days,0)    <=   0           then '1100'
	        else case when ifnull(b.over_days,0)    between 1 and 7           then '1200'
		              else case when  ifnull(b.over_days,0)  between 8 and 14 then '1300'
                                else  case when ifnull(b.over_days,0)   >  14 then '1400'
                                           else null 
		                              end
			               end
				 end		   
	  end as work_stat_dvcd	 
from orders a 
left outer join over_days b on a.pjod_idcd = b.pjod_idcd and a.wkct_idcd = b.wkct_idcd
) a
;
end