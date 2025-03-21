/*

조정 완료된 세부 일정계획으로 작업지시를 생성한다.

call project_work_order('DW-1938')

*/




drop procedure if exists `project_work_order`;

create  procedure `project_work_order`(
     _invc_numb  varchar(50)
    ) 
begin
    declare _new_invc_numb    varchar(50);
    declare _stor             varchar(50);
	
	
	delete from pjod_work_plan
	where  pjod_idcd = _invc_numb
	and    work_schd_dvcd = '2000'
	;
	
    insert into pjod_work_plan (
                  pjod_idcd
                , work_schd_dvcd
                , idcd
                , line_seqn
                , work_ordr_dvcd
                , invc_date
                , sttm
                , edtm
                , wkct_idcd
                , work_item_idcd
                , item_name
                , item_spec
                , modl_name
                , indn_qntt
                , work_cont
                , otod_yorn
                , cvic_idcd
                , rsps_idcd
                , ivst_pcnt
                , need_dcnt
                , ivst_mnhr
                , prog_stat_dvcd
                , perf_rate
                , befr_wkct_idcd
                , aftr_wkct_idcd
                , remk_text
                , uper_seqn
                , disp_seqn
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
	        select 
                  a.`pjod_idcd`    as pjod_idcd
                , '2000'           as work_schd_dvcd
                , a.`id`           as idcd
                , a.`seqn`         as line_seqn
                , '1100'           as work_ordr_dvcd
                , date_format(now(), '%Y%m%d%H%I%S')    as invc_date
                , CONCAT(FROM_UNIXTIME(a.`start`/1000,'%Y%m%d') , a.`starttime`)  as sttm
                , CONCAT(FROM_UNIXTIME(a.`end`/1000,'%Y%m%d')   , a.`endtime`)    as edtm
                , a.wkct_idcd      as wkct_idcd
                , a.item_idcd      as work_item_idcd
                , a.name           as item_name
                , null             as item_spec
                , null             as modl_name
                , 1                as indn_qntt
                , null             as work_cont
                , a.otod_yorn      as otod_yorn
                , a.cvic_idcd      as cvic_idcd
                , null             as rsps_idcd
                , 0                as ivst_pcnt
                , 1                as need_dcnt
                , 0                as ivst_mnhr
                , '0'              as prog_stat_dvcd
                , 0                as perf_rate
                , null             as befr_wkct_idcd
                , null             as aftr_wkct_idcd
                , null             as remk_text
                , a.seqn - 1       as uper_seqn
                , a.seqn + 1       as disp_seqn
                , null             as user_memo
                , 'auto'           as sysm_memo
                , prnt_idcd        as prnt_idcd
                , a.line_levl      as line_levl
                , a.line_ordr      as line_ordr
                , '0'              as line_stat
                , '0'              as line_clos
                , concat(pjod_idcd ,' ',a.`name`)      as find_name
                , null             as updt_user_name
                , null             as updt_ipad
                , null             as updt_dttm
                , null             as updt_idcd
                , null             as updt_urif
                , null             as crte_user_name
                , null             as crte_ipad
                , date_format(now(), '%Y%m%d%H%I%S')       as crte_dttm
                , null             as crte_idcd
                , null             as crte_urif
            from  pjod_work_schd a
	        where a.`pjod_idcd` = _invc_numb
			and   a.`work_schd_dvcd` = '2000'
	        ;
			
    update pjod_work_schd set work_indn_yorn = 'Y'
	                        , work_indn_date = date_format(now(), '%Y%m%d%H%I%S')
	where  pjod_idcd = _invc_numb						
	;						
	
end




