/*


call project_work_schd('DW-1938')


select * from pjod_work_schd where pjod_idcd = 'N1000WINFOpjod_mast000177'

*/


drop procedure if exists `project_work_schd`;

CREATE  PROCEDURE `project_work_schd`(
    _pjod_idcd      varchar(50)
  , _work_ordr_dvcd varchar(4)
  , _ordr_degr      int
  )
begin  

with recursive cte as (																								
    select a.pjod_idcd			as pjod_idcd			
         , a.work_schd_dvcd		as work_schd_dvcd	
         , a.work_ordr_dvcd     as work_ordr_dvcd
         , a.ordr_degr          as ordr_degr		 
         , a.name				as item_name
         , a.progress			as achi_rate		
         , a.description		as remk_text
         , a.depends			as depends		
         , FROM_UNIXTIME(a.`start`/ 1000,'%Y%m%d')  as stdt	
         , a.starttime			as sttm
         , FROM_UNIXTIME(a.`end`  / 1000,'%Y%m%d')  as eddt	
         , a.endtime			as edtm
         , a.duration			as work_days
         , a.wkct_idcd			as wkct_idcd
		 , w.wkct_name          as wkct_name
         , a.cvic_idcd          as cvic_idcd
		 , case ifnull(a.otod_yorn,0) when 0 then c.cvic_name else t.cstm_name end as cvic_name
		 , a.work_cont          as work_cont
		 , a.otod_yorn          as otod_yorn
         , a.item_idcd          as item_idcd		 
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
		 , a.bomt_seqn          as bomt_seqn
		 , datediff(now() , str_to_date(FROM_UNIXTIME(a.`end`/1000,'%Y%m%d'),'%Y%m%d')) as due_days
    from   pjod_work_schd a 
	       left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd
	       left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd
	       left outer join cstm_mast t on a.cvic_idcd = t.cstm_idcd
	where  a.pjod_idcd      = ifnull(_pjod_idcd,'standard')
	and    a.work_ordr_dvcd = ifnull(_work_ordr_dvcd,'1000')
	and    a.ordr_degr      = ifnull(_ordr_degr,1)
	and    a.work_schd_dvcd = '2000'
	and    a.line_levl      = 1
    union all 
    select a.pjod_idcd			as pjod_idcd			
         , a.work_schd_dvcd		as work_schd_dvcd				
         , a.work_ordr_dvcd     as work_ordr_dvcd
         , a.ordr_degr          as ordr_degr		 
         , a.name				as item_name
         , a.progress			as achi_rate		
         , a.description		as remk_text
         , a.depends			as depends		
         , FROM_UNIXTIME(a.`start`/ 1000,'%Y%m%d')  as stdt	
         , a.starttime			as sttm
         , FROM_UNIXTIME(a.`end`  / 1000,'%Y%m%d')  as eddt	
         , a.endtime			as edtm
         , a.duration			as work_days
         , a.wkct_idcd			as wkct_idcd
		 , w.wkct_name          as wkct_name
         , a.cvic_idcd          as cvic_idcd
		 , case ifnull(a.otod_yorn,0) when 0 then c.cvic_name else t.cstm_name end as cvic_name
		 , a.work_cont          as work_cont
		 , a.otod_yorn          as otod_yorn
         , a.item_idcd          as item_idcd		 
         , a.work_item_idcd     as work_item_idcd		 
         , a.user_memo			as user_memo			
         , a.sysm_memo			as sysm_memo			
         , a.prnt_idcd			as prnt_idcd			
         , b.line_levl + 1		as line_levl			
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
		 , a.bomt_seqn          as bomt_seqn
		 , datediff(now() , str_to_date(FROM_UNIXTIME(a.`end`/1000,'%Y%m%d'),'%Y%m%d')) as due_days
    from   pjod_work_schd a 
	       left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd
	       left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd
	       left outer join cstm_mast t on a.cvic_idcd = t.cstm_idcd
           inner  join cte b on a.prnt_idcd = b.work_item_idcd and a.pjod_idcd = b.pjod_idcd
	where  a.work_schd_dvcd = '2000'
	and    a.work_ordr_dvcd = ifnull(_work_ordr_dvcd,'1000')
	and    a.ordr_degr      = ifnull(_ordr_degr,1)

)
    select 
           pjod_idcd			
         , work_schd_dvcd
		 , work_ordr_dvcd
		 , ordr_degr
		 , case when ifnull(achi_rate,0) = 0 then 
		        case when due_days <= 0 then '1100' 
	                 else case when due_days   between 1 and 7           then '1200'
		                       else case when  due_days between 8 and 14 then '1300'
                                         else  case when due_days  >  14 then '1400'
                                                    else null 
										       end
									end
		       		      end
                end 
		   else case when due_days >= 0 then '2100' 
	                 else case when due_days   between 1 and 7           then '2200'
		                       else case when  due_days between 8 and 14 then '2300'
                                         else  case when due_days  >  14 then '2400'
                                                    else null 
										       end
									end
		       		      end
                end 
		   end  as work_stat_dvcd
         , due_days		   
--         , case when line_levl = 3 then work_cont else item_name end as item_name
         , item_name 
         , achi_rate		
         , remk_text
         , depends		
         , stdt	
         , sttm
         , eddt	
         , edtm
         , work_days
         , wkct_idcd
		 , cvic_idcd
		 , cvic_name
		 , otod_yorn
         , item_idcd		 
		 , wkct_name
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
         , gant_id	
         , gant_seqn	
         , gant_code	
         , gant_levl
         , gant_stat
		 , bomt_seqn
         , ordr
         , case when ifnull((select count(*) from pjod_work_schd r 													
	                         where  r.prnt_idcd  = a.work_item_idcd 
							 and    r.pjod_idcd  = a.pjod_idcd
							 and    r.work_schd_dvcd = '2000'),0) > 0 then 1 else 0 end as has_chld		
    from   cte a																									
	where  a.work_item_idcd not in ('002', '999') /* 소재구매 및 주문제작  */
	order  by  a.ordr
;
end
