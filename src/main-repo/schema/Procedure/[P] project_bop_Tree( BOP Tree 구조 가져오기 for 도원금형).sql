/*

call project_bop_tree('DW-1944')

*/


drop procedure if exists project_bop_tree ; 


CREATE procedure `project_bop_tree`(
       _pjod_idcd varchar(50)
    )  
begin	

with recursive cte as (																								
    select pjod_idcd      , line_seqn      , work_item_idcd , item_idcd      , item_name      , item_spec      , item_mtrl
         , wkct_idcd      , plan_sttm      , plan_edtm      , otod_yorn      , wker_idcd      , work_pcnt
         , cstm_idcd      , indn_qntt      , remk_text      , work_cont      , used_yorn      , imge_1fst      , imge_2snd
         , lwcs_yorn      , uper_seqn      , disp_seqn
         , user_memo      , sysm_memo
         , ifnull(_pjod_idcd,'standard')   as prnt_idcd      
		 , line_levl      , line_ordr      , line_stat      , line_clos      , find_name
         , updt_user_name , updt_ipad      , updt_dttm      , updt_idcd      , updt_urif      , crte_user_name
         , crte_ipad      , crte_dttm      , crte_idcd      , crte_urif
    from   pjod_bop
	where  pjod_idcd = ifnull(_pjod_idcd,'standard')
	and    line_levl = 1
    union all 
    select a.pjod_idcd      , a.line_seqn      , a.work_item_idcd , a.item_idcd      , a.item_name      , a.item_spec      , a.item_mtrl
         , a.wkct_idcd      , a.plan_sttm      , a.plan_edtm      , a.otod_yorn      , a.wker_idcd      , a.work_pcnt
         , a.cstm_idcd      , a.indn_qntt      , a.remk_text      , a.work_cont      , a.used_yorn      , a.imge_1fst      , a.imge_2snd
         , a.lwcs_yorn      , a.uper_seqn      , a.disp_seqn
         , a.user_memo      , a.sysm_memo
         , a.prnt_idcd      , b.line_levl + 1 as line_levl						
		 , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name
         , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif      , a.crte_user_name
         , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif
    from   pjod_bop a																								
    inner join cte b on a.prnt_idcd = b.work_item_idcd and a.pjod_idcd = b.pjod_idcd
	
)
    select pjod_idcd      , line_seqn      , item_idcd      , ifnull(work_cont,item_name) as item_name      
	     , item_spec      , item_mtrl
         , wkct_idcd      , plan_sttm      , plan_edtm      , otod_yorn      , wker_idcd      , work_pcnt
         , cstm_idcd      , indn_qntt      , remk_text      , used_yorn      , imge_1fst      , imge_2snd
         , lwcs_yorn      , uper_seqn      , disp_seqn
         , user_memo      , sysm_memo
         , prnt_idcd      , line_levl      , line_ordr      , line_stat      , line_clos      , find_name
         , updt_user_name , updt_ipad      , updt_dttm      , updt_idcd      , updt_urif      , crte_user_name
         , crte_ipad      , crte_dttm      , crte_idcd      , crte_urif
         , case when ifnull((select count(*) from pjod_bop r 													
	                         where  r.prnt_idcd  = a.work_item_idcd ),0) > 0 then 1 else 0 end as has_chld		
    from   cte a																									
	where  work_item_idcd not in ('002', '999') /* 소재구매 및 주문제작  */
;
end