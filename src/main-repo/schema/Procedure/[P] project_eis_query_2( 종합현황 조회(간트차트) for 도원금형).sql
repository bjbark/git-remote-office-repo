/*

call project_eis_query_2('DW-1944')
select * from pjod_work_schd where pjod_idcd = 'DW-1938' order by seqn;
*/
drop procedure if exists `project_eis_query_2`;

CREATE DEFINER=`root`@`%` PROCEDURE `project_eis_query_2`(
        _pjod_idcd varchar(50)
)
begin  

select a.pjod_idcd, a.id, a.seqn, a.sn 
     , concat(space((a.line_levl-1)*2),a.`name`) as ref_name 
	 , a.`name`
     , a.stdt	
     , a.eddt	
     , a.css_type
	 , a.line_levl
	 , a.bomt_seqn
from (	 
     select a.pjod_idcd, id, seqn, 1 as sn 
--	      , case a.line_levl when 3 then a.work_cont else a.name end  as name
	      , case a.line_levl when 3 then a.work_cont else a.name end  as name
          , FROM_UNIXTIME(a.`start`/1000,'%Y%m%d')  as stdt	
          , FROM_UNIXTIME(a.`end`  /1000,'%Y%m%d')  as eddt	
          , 'ganttGreen' as css_type
		  , line_levl
			, a.bomt_seqn
     from  pjod_work_schd a
     where pjod_idcd = _pjod_idcd
     union all
	 select xx.pjod_idcd , xx.id , xx.seqn , xx.sn , xx.name
	      , xx.stdt      , xx.eddt
          , case when datediff( ifnull(xx.eddt,date_format(now(),'%Y%m%d'))
		                       , str_to_date(xx.plan_eddt,'%Y%m%d')) <= 0 then 'ganttGreen'
                 else case when datediff( ifnull(xx.eddt,date_format(now(),'%Y%m%d'))
		                       , str_to_date(xx.plan_eddt,'%Y%m%d')) between 1 and 2 then 'ganttOrange'
                           else case when datediff( ifnull(xx.eddt,date_format(now(),'%Y%m%d'))
		                                          , str_to_date(xx.plan_eddt,'%Y%m%d')) >= 3 then 'ganttRed'
						             else null 	
                                end
                      end
            end  as css_type
	      , xx.line_levl
          , xx.bomt_seqn
     from ( 		  
            select x.pjod_idcd , x.id,  x.seqn, 2 as sn ,'' as name
                 , min(x.invc_date) as stdt
            	 , max(x.invc_date) as eddt
                 , min(x.plan_stdt) as plan_stdt
                 , max(x.plan_eddt) as plan_eddt
	             , (select min(r.line_levl)
	                from   pjod_work_schd r
	                where  r.pjod_idcd = x.pjod_idcd
                    and    r.id = x.id
	               )  as line_levl
                 , x.bomt_seqn
            from (	 
                  select a.pjod_idcd, idcd as id
                       , s.seqn  as seqn
                       , FROM_UNIXTIME(s.`start`/ 1000,'%Y%m%d')  as plan_stdt
                       , FROM_UNIXTIME(s.`end`  / 1000,'%Y%m%d')  as plan_eddt
                       , invc_date  as invc_date
                       , s.bomt_seqn as bomt_seqn
                  from  pjod_work_book a
	       	         left outer join pjod_work_schd s on a.pjod_idcd = s.pjod_idcd and a.idcd = s.id and s.work_schd_dvcd = '2000'
                  where a.pjod_idcd = _pjod_idcd
                  union all 
                  select a.pjod_idcd, id as id
                       , seqn
                       , FROM_UNIXTIME(a.`start`/ 1000,'%Y%m%d')  as plan_stdt
                       , FROM_UNIXTIME(a.`end`  / 1000,'%Y%m%d')  as plan_eddt
                       , null    as invc_date
                       , bomt_seqn
                  from  pjod_work_schd a
                  where pjod_idcd = _pjod_idcd
                  and   (pjod_idcd, id) not in (select r.pjod_idcd, r.idcd
                                                from   pjod_work_book r
                                                where  r.pjod_idcd = a.pjod_idcd
                  							)
             ) x
             group by x.pjod_idcd , x.id,  x.seqn
	  ) xx
) a
order by a.pjod_idcd  , a.seqn , a.id, a.sn
;
end