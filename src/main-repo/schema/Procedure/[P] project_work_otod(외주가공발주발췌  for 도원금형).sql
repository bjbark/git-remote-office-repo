/*


call project_work_otod('DW-1944')


select * from pjod_work_schd where pjod_idcd = 'N1000WINFOpjod_mast000177'

*/


drop procedure if exists `project_work_otod`;

CREATE  PROCEDURE `project_work_otod`(
  _pjod_idcd  varchar(50)
  )
begin  
    select 
           a.pjod_idcd			as pjod_idcd			
         , a.work_schd_dvcd		as work_schd_dvcd				
         , a.name				as item_name
         , a.progress			as achi_rate		
         , a.description		as remk_text
         , a.depends			as depends		
         , FROM_UNIXTIME(a.`start`/1000,'%Y%m%d')  as stdt	
         , a.starttime			as sttm
         , FROM_UNIXTIME(a.`end`/1000,'%Y%m%d')    as eddt	
         , a.endtime			as edtm
         , a.duration			as work_days
         , a.wkct_idcd			as wkct_idcd
		 , w.wkct_name          as wkct_name
         , a.cvic_idcd          as cvic_idcd
		 , t.cstm_name          as cvic_name
		 , a.otod_yorn          as otod_yorn
         , a.item_idcd          as item_idcd		 
		 , i.item_name          as item_name
		 , i.item_spec          as item_spec
		 , i.mtrl_bacd          as mtrl_bacd
		 , 1                    as need_qntt
         , FROM_UNIXTIME(a.`end`/1000,'%Y%m%d')    as rqst_deli_date	
         , a.work_item_idcd     as work_item_idcd		 
         , a.user_memo			as user_memo			
         , a.sysm_memo			as sysm_memo			
         , a.prnt_idcd			as prnt_idcd			
         , a.line_levl			as line_levl			
         , a.line_ordr			as line_ordr			
         , a.line_stat			as line_stat			
         , a.line_clos			as line_clos			
         , a.find_name			as find_name			
         , a.updt_user_name		as updt_user_name				
         , a.updt_ipad			as updt_ipad			
         , a.updt_dttm			as updt_dttm			
         , a.updt_idcd			as updt_idcd			
         , a.updt_urif			as updt_urif			
         , a.crte_user_name		as crte_user_name				
         , a.crte_ipad			as crte_ipad			
         , a.crte_dttm			as crte_dttm			
         , a.crte_idcd			as crte_idcd			
         , a.crte_urif			as crte_urif			
         , a.id					as gant_id	
         , a.seqn				as gant_seqn	
         , a.code				as gant_code	
         , a.`level`			as gant_levl
         , a.status				as gant_stat
		 , a.seqn               as ordr
		 , datediff(now() , str_to_date(FROM_UNIXTIME(a.`end`/1000,'%Y%m%d'),'%Y%m%d')) as due_days
    from   pjod_work_schd a 
	       left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd
	       left outer join cstm_mast t on a.cvic_idcd = t.cstm_idcd
	       left outer join item_mast i on a.item_idcd = i.item_idcd
	where  a.pjod_idcd      = ifnull(_pjod_idcd,'standard')
	and    a.work_schd_dvcd = '2000'
	and    a.otod_yorn      = 1
	and    ifnull(a.work_indn_yorn,0) = 0
	order by  a.seqn
;
end
