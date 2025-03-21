/*
call project_eis_query_3



select * from pjod_work_schd where pjod_idcd = 'DW-1938'



*/


drop procedure if exists `project_eis_query_3`;

CREATE  PROCEDURE `project_eis_query_3`()
begin  
with over_days as (
select w.pjod_idcd
     , w.wkct_idcd
     , w.id
     , sum(datediff( now() , str_to_date(FROM_UNIXTIME(w.`start`/1000,'%Y%m%d'),'%Y%m%d')         
       )) as over_days           
from  pjod_work_schd w
left  outer join pjod_mast m on w.pjod_idcd = m.pjod_idcd
where w.work_schd_dvcd = '2000'
and   w.line_clos      = '0'
and   m.line_stat      < '2'
and   w.work_item_idcd = '005'
and   w.id not in (select c.idcd from pjod_work_book c where c.pjod_idcd =  w.pjod_idcd)
group by w.pjod_idcd,w.id
),
orders as (
select a.pjod_idcd   , a.id, m.item_name , c.cstm_name    , m.modl_name
     , m.regi_date   , m.ppsl_deli_date  , m.deli_date 
     , a.name as work_item_name
     , str_to_date(FROM_UNIXTIME(a.`start`/1000,'%Y%m%d'),'%Y%m%d') stdt
	 , a.work_cont
from  pjod_work_schd a
left  outer join pjod_mast m on a.pjod_idcd = m.pjod_idcd
left  outer join cstm_mast c on m.cstm_idcd = c.cstm_idcd
where a.work_schd_dvcd = '2000'
and   m.line_clos      = '0'
and   m.line_stat      < '2'
and   a.work_item_idcd = '005'
and a.id not in (select c.idcd from pjod_work_book c where c.pjod_idcd =  a.pjod_idcd)
)
select a.pjod_idcd , a.item_name      , a.cstm_name , a.modl_name
     , a.regi_date , a.ppsl_deli_date , a.deli_date ,a.id
     , a.work_stat_dvcd    
     , a.work_item_name
     , case a.work_stat_dvcd when '1100' then '정상:blue'
                             when '1200' then '지연:green'
                             when '1400' then '위험:red'
                             end as work_stat_name
	 , a.stdt				  
     , a.work_cont
from (
select a.pjod_idcd , a.item_name      , a.cstm_name , a.modl_name
     , a.regi_date , a.ppsl_deli_date , a.deli_date ,a.id
     , case when ifnull(b.over_days,0)    <=   0           then '1100'
            else case when ifnull(b.over_days,0)    between 1 and 2           then '1200'
                      else  case when ifnull(b.over_days,0)   >  3 then '1400'
                                 else null 
                            end
            end         
     end as work_stat_dvcd    
    , a.work_item_name 
	, a.stdt
    , a.work_cont
from orders a 
left outer join over_days b on a.pjod_idcd = b.pjod_idcd
where a.id = b.id
) a
;
end