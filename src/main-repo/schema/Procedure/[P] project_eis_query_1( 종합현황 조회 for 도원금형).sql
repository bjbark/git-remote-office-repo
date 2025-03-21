/*

call project_eis_query_1

12/31 : 이만재 부장 통화 결과, 금형별로 1line씩 표시하면 된다고 함.
        상황을 판단할 때 각 공정의 계획일정 대비 지연일수를 기준으로 판단 함.

*/


drop procedure if exists `project_eis_query_1`;

CREATE  PROCEDURE `project_eis_query_1`()
begin  
with over_days as (
select w.pjod_idcd
     , w.wkct_idcd
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
group by w.pjod_idcd
),
orders as (
select a.pjod_idcd , m.item_name      , c.cstm_name , m.modl_name
     , m.regi_date , m.ppsl_deli_date , m.deli_date 
	 , a.name as work_item_name
	 
from  pjod_work_schd a
left  outer join pjod_mast m on a.pjod_idcd = m.pjod_idcd
left  outer join cstm_mast c on m.cstm_idcd = c.cstm_idcd
where a.work_schd_dvcd = '2000'
and   m.line_clos = '0'
and	  m.line_stat	< '2'
group by a.pjod_idcd
)
select a.pjod_idcd , a.item_name      , a.cstm_name , a.modl_name
     , a.regi_date , a.ppsl_deli_date , a.deli_date 
	 , a.work_stat_dvcd	 
	 , a.work_item_name
	 , case a.work_stat_dvcd when '1100' then '정상:blue'
	                         when '1200' then '지연:green'
	                         when '1400' then '위험:red'
							 end as work_stat_name
from (
select a.pjod_idcd , a.item_name      , a.cstm_name , a.modl_name
     , a.regi_date , a.ppsl_deli_date , a.deli_date 
	 , case when ifnull(b.over_days,0)    <=   0           then '1100'
	        else case when ifnull(b.over_days,0)    between 1 and 2           then '1200'
                      else  case when ifnull(b.over_days,0)   >  3 then '1400'
                                 else null 
                            end
     	    end		   
	  end as work_stat_dvcd	 
	 , a.work_item_name 
from orders a 
left outer join over_days b on a.pjod_idcd = b.pjod_idcd
) a
;
end