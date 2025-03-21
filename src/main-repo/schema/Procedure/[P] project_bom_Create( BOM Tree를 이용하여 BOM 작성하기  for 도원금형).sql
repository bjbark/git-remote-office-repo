/*

call project_bom_tree('standard')

*/


drop procedure if exists project_bom_create ; 


CREATE procedure `project_bom_create`(
       _pjod_idcd varchar(50),
	   _std_idcd  varchar(50)
    )  
begin	

delete from pjod_bom 
where pjod_idcd = _pjod_idcd
;

    insert into pjod_bom (
       	   pjod_idcd      , line_seqn      , work_item_idcd  , item_idcd      , item_name      , item_spec      , item_mtrl
         , ivst_wkct_idcd , unit_idcd      , supl_dvcd      , cstm_idcd      , ndqt_nmrt      , ndqt_dnmn
         , need_qntt      , used_schd_date , lwcs_yorn      , incm_loss_rate , otcm_loss_rate , stok_plac
         , stok_unit_idcd , remk_text      , offr_date      , offr_numb      , offr_qntt      , last_yorn
         , imge_1fst      , imge_2snd      
	     , uper_seqn      , disp_seqn      , user_memo      , sysm_memo
         , prnt_idcd      , line_levl      , line_ordr      , line_stat      , line_clos      , find_name
         , updt_user_name , updt_ipad      , updt_dttm      , updt_idcd      , updt_urif      , crte_user_name
         , crte_ipad      , crte_dttm      , crte_idcd      , crte_urif
		 )
with recursive cte as (																								
    select pjod_idcd      , line_seqn      , work_item_idcd , item_idcd      , item_name      , item_spec      , item_mtrl
         , ivst_wkct_idcd , unit_idcd      , supl_dvcd      , cstm_idcd      , ndqt_nmrt      , ndqt_dnmn
         , need_qntt      , used_schd_date , lwcs_yorn      , incm_loss_rate , otcm_loss_rate , stok_plac
         , stok_unit_idcd , remk_text      , offr_date      , offr_numb      , offr_qntt      , last_yorn
         , imge_1fst      , imge_2snd
	     , uper_seqn      , disp_seqn      , user_memo      , sysm_memo
         , ifnull(_pjod_idcd,'standard')    as prnt_idcd      
		 , line_levl      , line_ordr      , line_stat      , line_clos      , find_name
         , updt_user_name , updt_ipad      , updt_dttm      , updt_idcd      , updt_urif      , crte_user_name
         , crte_ipad      , crte_dttm      , crte_idcd      , crte_urif
    from   pjod_bom
	where  pjod_idcd = _std_idcd
	and    line_levl = 1
    union all 
    select a.pjod_idcd      , a.line_seqn      , a.work_item_idcd , a.item_idcd      , a.item_name      , a.item_spec      , a.item_mtrl
         , a.ivst_wkct_idcd , a.unit_idcd      , a.supl_dvcd      , a.cstm_idcd      , a.ndqt_nmrt      , a.ndqt_dnmn
         , a.need_qntt      , a.used_schd_date , a.lwcs_yorn      , a.incm_loss_rate , a.otcm_loss_rate , a.stok_plac
         , a.stok_unit_idcd , a.remk_text      , a.offr_date      , a.offr_numb      , a.offr_qntt      , a.last_yorn
         , a.imge_1fst      , a.imge_2snd
	     , a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo
         , a.prnt_idcd      , b.line_levl + 1 as line_levl						
		 , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name
         , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif      , a.crte_user_name
         , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif
    from   pjod_bom a																								
    inner join cte b on a.prnt_idcd = b.work_item_idcd and a.pjod_idcd = b.pjod_idcd
)
    select _pjod_idcd     , line_seqn      , work_item_idcd, item_idcd      
	     , case when remk_text is null then item_name
		        else concat(item_name , '(',ifnull(remk_text,''),')') end as item_name     
		 , item_spec      , item_mtrl
         , ivst_wkct_idcd , unit_idcd      , '2000'         , cstm_idcd      , ndqt_nmrt      , ndqt_dnmn
         , need_qntt      , used_schd_date , lwcs_yorn      , incm_loss_rate , otcm_loss_rate , stok_plac
         , stok_unit_idcd , remk_text      , offr_date      , offr_numb      , offr_qntt      , last_yorn
         , imge_1fst      , imge_2snd      
	     , uper_seqn      , disp_seqn      , user_memo      , sysm_memo
         , prnt_idcd      , line_levl      , line_ordr      , line_stat      , line_clos      , find_name
         , updt_user_name , updt_ipad      , updt_dttm      , updt_idcd      , updt_urif      , crte_user_name
         , crte_ipad      , crte_dttm      , crte_idcd      , crte_urif
    from   cte a																									
;
end