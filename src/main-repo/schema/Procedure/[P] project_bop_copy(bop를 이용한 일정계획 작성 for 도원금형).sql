/*

call project_bop_copy('DW-1938','20200101')

select * from pjod_work_schd where pjod_idcd = 'DW-1938' order by seqn


select *
from pjod_work_schd
	where  pjod_idcd = 'DW-1938'
	and    work_schd_dvcd = '2000'
	and    `level`        = 4
	and    ifnull(summ_wkct_yorn,'0') = '0'


*/


drop procedure if exists `project_bop_copy`;


CREATE  PROCEDURE `project_bop_copy`(
  _pjod_idcd  varchar(50),
  _st_dt      varchar(14),
  )
begin  

delete from pjod_work_schd 
where pjod_idcd = _pjod_idcd
;
set @rownum := 0;
set @idnum	:= -2;
insert into pjod_work_schd (
           pjod_idcd
         , work_schd_dvcd
         , id
         , seqn
         , name
         , progress
         , progressbyworklog
         , relevance
         , `type`
         , typeld
         , description
         , code
         , `level`
         , status
         , depends
         , `start`
         , duration
         , `end`
         , startismilestone
         , endismilestone
         , collapsed
         , canwrite
         , canadd
         , candelete
         , canaddlssue
         , haschild
         , starttime
         , endtime
         , wkct_idcd
		 , cvic_idcd
		 , item_idcd
		 , work_item_idcd
		 , otod_yorn
		 , remk_text
		 , work_cont
         , work_indn_yorn
         , work_indn_date
		 , summ_wkct_yorn
		 , summ_wkct_seqn
		 , bomt_seqn
         , user_memo
         , sysm_memo
         , prnt_idcd
         , line_levl
         , line_ordr
         , line_stat
         , line_clos
         , find_name
         , updt_user_name
         , updt_ipad
         , updt_dttm
         , updt_idcd
         , updt_urif
         , crte_user_name
         , crte_ipad
         , crte_dttm
         , crte_idcd
         , crte_urif
  )


with recursive cte as (																								
    select pjod_idcd      
	     , line_seqn      , work_item_idcd , item_idcd      , item_name      , item_spec      , item_mtrl
         , wkct_idcd      , plan_sttm      , plan_edtm      , otod_yorn      , wker_idcd      , work_pcnt
         , cstm_idcd      , indn_qntt      , remk_text      , used_yorn      , imge_1fst      , imge_2snd
         , lwcs_yorn      , work_cont      , uper_seqn      , disp_seqn      , bomt_seqn
         , user_memo      , sysm_memo
         , ifnull(_pjod_idcd,'standard')   as prnt_idcd      
		 , line_levl      , line_ordr      , line_stat      , line_clos      , find_name
         , updt_user_name , updt_ipad      , updt_dttm      , updt_idcd      , updt_urif      , crte_user_name
         , crte_ipad      , crte_dttm      , crte_idcd      , crte_urif      , concat(line_seqn)    as ordr
    from   pjod_bop
	where  pjod_idcd = ifnull(_pjod_idcd,'standard')
	and    line_levl = 1
    union all 
    select a.pjod_idcd      
	     , a.line_seqn      , a.work_item_idcd , a.item_idcd      , a.item_name      , a.item_spec      , a.item_mtrl
         , a.wkct_idcd      , a.plan_sttm      , a.plan_edtm      , a.otod_yorn      , a.wker_idcd      , a.work_pcnt
         , a.cstm_idcd      , a.indn_qntt      , a.remk_text      , a.used_yorn      , a.imge_1fst      , a.imge_2snd
         , a.lwcs_yorn      
--		 , case b.line_levl when 2 then a.work_cont else a.item_name end as work_cont      
--		 , case b.line_levl when 2 then a.work_cont else null end as work_cont      
         , a.work_cont
		 , a.uper_seqn      , a.disp_seqn      , a.bomt_seqn      , a.user_memo      , a.sysm_memo
         , a.prnt_idcd      , b.line_levl + 1 as line_levl						
		 , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name
         , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif      , a.crte_user_name
         , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif      , concat(b.ordr , a.line_seqn) as ordr
    from   pjod_bop a																								
    inner join cte b on a.prnt_idcd = b.work_item_idcd and a.pjod_idcd = b.pjod_idcd 
	
)
    select 
           _pjod_idcd              as pjod_idcd
         , '2000'                  as work_schd_dvcd
         , @idnum := @idnum +1     as id
         , @rownum := @rownum + 1  as seqn
--         , if ( a.work_cont is null , a.item_name, concat(a.work_cont,'(',a.item_name,')'))    as name
--         , if ( a.work_cont is null , a.item_name, a.work_cont)    as name
--         , a.item_name      as `name`
		 , case when a.line_levl = 3 then a.work_cont else a.item_name end as `name`
         , 0                       as progress
         , 'false'                 as progressbyworklog
         , null                    as relevance
         , null                    as `type`
         , null                    as typeld
         , null                    as description
         , null                    as code
         , a.line_levl             as `level`
         , 'STATUS_SUSPENDED'      as status
         , null                    as depends
         , UNIX_TIMESTAMP( STR_TO_DATE(_st_dt, '%Y%m%d'))*1000       as `start`
         , 1                       as duration
         , UNIX_TIMESTAMP( date_add(STR_TO_DATE(_st_dt, '%Y%m%d'), interval + 1 day))*1000    as `end`
         , null                    as startismilestone
         , null                    as endismilestone
         , 'false'                 as collapsed
         , 'true'                  as canwrite
         , 'true'                  as canadd
         , 'true'                  as candelete
         , 'true'                  as canaddlssue
         , case when ifnull((select count(*) from pjod_bop r 													
	                         where  r.prnt_idcd  = a.item_idcd
                             and    r.pjod_idcd  = _pjod_idcd ),0) > 0 then 'true' else 'false' end as has_chld		
         , '090000'                as starttime
         , '180000'                as endtime
		 , a.wkct_idcd             as wkct_idcd
		 , null                    as cvic_idcd					
		 , a.item_idcd             as item_idcd
		 , a.work_item_idcd        as work_item_idcd
         , a.otod_yorn             as otod_yorn
         , a.remk_text             as remk_text
--         , a.work_cont      as work_cont		 
         , case when a.line_levl = 3 then a.item_name else null end as work_cont		 
         , null                    as work_indn_yorn
         , null                    as work_indn_date
		 , case when a.line_levl <= 2 then '1' else null end as summ_wkct_yorn
		 , null                    as summ_wkct_seqn
		 , a.bomt_seqn             as bomt_seqn
         , null                    as user_memo
         , null                    as sysm_memo
         , prnt_idcd               as prnt_idcd
         , a.line_levl             as line_levl
         , a.line_ordr             as line_ordr
         , '0'                     as line_stat
         , '0'                     as line_clos
         , concat(_pjod_idcd ,' ',a.item_name)      as find_name
         , null                    as updt_user_name
         , null                    as updt_ipad
         , null                    as updt_dttm
         , null                    as updt_idcd
         , null                    as updt_urif
         , null                    as crte_user_name
         , null                    as crte_ipad
         , date_format(now(), '%Y%m%d%H%I%S')       as crte_dttm
         , null                    as crte_idcd
         , null                    as crte_urif
    from   cte a																									
	where  a.item_idcd not in ('002', '999') /* 소재구매 및 주문제작  */
	order by  rpad(a.ordr,100,'0')
;
/*
    update pjod_work_schd schd set summ_wkct_yorn = '1'
	where  pjod_idcd      = _pjod_idcd
	and    work_schd_dvcd = '2000'
	and    seqn in (select  min(seqn) as seqn
                    from    pjod_work_schd a																			
                    where   a.`level`        = 4
                    and     a.pjod_idcd      = _pjod_idcd
					and     a.work_schd_dvcd = '2000'
	                group by a.wkct_idcd 
	                       , (select max(prnt_idcd) 
                              from   pjod_work_schd r
				              where  r.pjod_idcd = _pjod_idcd 
				              and    r.line_levl = 3
				              and    r.item_idcd = schd.prnt_idcd 
				              )
				   )		  
;
    update pjod_work_schd schd set summ_wkct_seqn = (select min(seqn) as seqn
                                                     from   pjod_work_schd a																			
                                                     where  a.`level`        = 4
                                                     and    a.pjod_idcd      = _pjod_idcd
			                                         and    a.work_schd_dvcd = '2000'
                                                     and    a.wkct_idcd       = schd.wkct_idcd
									                 and    a.summ_wkct_yorn = '1'
				                                    )
	where  pjod_idcd = _pjod_idcd
	and    work_schd_dvcd = '2000'
	and    `level`        = 4
	and    ifnull(schd.summ_wkct_yorn,'0') = '0'
  
;
    update pjod_work_schd schd set summ_wkct_idcd = (select id
                                                     from   pjod_work_schd a																			
				                                     where  a.pjod_idcd = _pjod_idcd 
                                                     and    a.seqn = schd.summ_wkct_seqn
									  and    a.work_schd_dvcd = '2000'
									  
				                      )
	where  pjod_idcd = _pjod_idcd
	and    work_schd_dvcd = '2000'
	and    `level`        = 4
	and    ifnull(schd.summ_wkct_yorn,'0') = '0'
;
*/
end
