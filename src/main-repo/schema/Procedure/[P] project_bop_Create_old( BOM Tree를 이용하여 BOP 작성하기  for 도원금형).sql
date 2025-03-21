/*

call project_bop_tree('test','standard4')

*/


drop procedure if exists project_bop_create ; 


CREATE procedure `project_bop_create`(
       _pjod_idcd      varchar(50),
	   _work_ordr_dvcd varchar(4),
	   _ordr_degr      int,
	   _std_idcd       varchar(50)
    )  
	
begin	
delete from pjod_bop 
where  pjod_idcd = _pjod_idcd
;

insert into pjod_bop (
           pjod_idcd      , work_ordr_dvcd , ordr_degr
		 , line_seqn      , work_item_idcd , item_idcd      , item_name      , item_spec
         , item_mtrl      , wkct_idcd      , plan_sttm      , plan_edtm      , otod_yorn
         , wker_idcd      , work_pcnt      , cstm_idcd      , indn_qntt      , remk_text
         , work_cont      , imge_1fst      , imge_2snd      , lwcs_yorn      , used_yorn                     
	     , bomt_seqn      , uper_seqn      , disp_seqn      , user_memo      , sysm_memo
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
         , ifnull(_pjod_idcd,'standard')    as prnt_idcd    , 0  as prnt_seqn  
		 , line_levl      , line_ordr      , line_stat      , line_clos      , find_name
         , updt_user_name , updt_ipad      , updt_dttm      , updt_idcd      , updt_urif      , crte_user_name
         , crte_ipad      , crte_dttm      , crte_idcd      , crte_urif
    from   pjod_bom
	where  pjod_idcd = _std_idcd
	and    item_idcd not in ('T04')
	and    line_levl = 1
    union all 
    select a.pjod_idcd      , a.line_seqn      , a.work_item_idcd , a.item_idcd      , a.item_name      , a.item_spec
         , a.item_mtrl
         , a.ivst_wkct_idcd , a.unit_idcd      , a.supl_dvcd      , a.cstm_idcd      , a.ndqt_nmrt      , a.ndqt_dnmn
         , a.need_qntt      , a.used_schd_date , a.lwcs_yorn      , a.incm_loss_rate , a.otcm_loss_rate , a.stok_plac
         , a.stok_unit_idcd , a.remk_text      , a.offr_date      , a.offr_numb      , a.offr_qntt      , a.last_yorn
         , a.imge_1fst      , a.imge_2snd
	     , a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo
         , a.prnt_idcd      , b.line_seqn  as  prnt_seqn          , b.line_levl + 1 as line_levl						
		 , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name
         , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif      , a.crte_user_name
         , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif
    from   pjod_bom a																								
    inner join cte b on a.prnt_idcd = b.work_item_idcd and a.pjod_idcd = b.pjod_idcd
	where  a.item_idcd not in ('T04')
)
  select
           _pjod_idcd      as pjod_idcd    
         , _work_ordr_dvcd as work_ordr_dvcd
         , _ordr_degr      as ordr_degr		 
		 , line_seqn       as line_seqn      
		 , work_item_idcd  as work_item_idcd      
		 , item_idcd       as item_idcd      
		 , item_name       as item_name      
		 , item_spec       as item_spec
         , item_mtrl       as item_mtrl      
		 , ivst_wkct_idcd  as wkct_idcd
		 , null            as plan_sttm      
		 , null            as plan_edtm      
		 , '0'             as otod_yorn
         , null            as wker_idcd      
		 , 1               as work_pcnt      
		 , null            as cstm_idcd      
		 , 1               as indn_qntt      
		 , null            as remk_text
		 , remk_text       as work_cont
         , null            as imge_1fst      
		 , null            as imge_2snd      
		 , null            as lwcs_yorn                       
		 , 1               as used_yorn
		 , line_seqn       as bomt_seqn
	     , line_seqn - 1   as uper_seqn      
		 , line_seqn + 1   as disp_seqn      
		 , null            as user_memo      
		 , null            as sysm_memo
         , prnt_idcd       as prnt_idcd      
		 , line_levl       as line_levl      
		 , line_ordr       as line_ordr      
		 , line_stat       as line_stat      
		 , line_clos       as line_clos      
		 , find_name       as find_name
         , null            as updt_user_name 
		 , null            as updt_ipad      
		 , null            as updt_dttm      
		 , null            as updt_idcd      
		 , null            as updt_urif      
		 , null            as crte_user_name
         , null            as crte_ipad      
		 , date_format(now(), '%Y%m%d%H%I%S')   as crte_dttm
		 , null            as crte_idcd      
		 , null            as crte_urif
    from   cte a																									
	where  work_item_idcd not in ('002', '999') /* 소재구매 및 주문제작  */
	and    line_levl <= 2
	union all
    select
           _pjod_idcd      as pjod_idcd      
         , _work_ordr_dvcd as work_ordr_dvcd
         , _ordr_degr      as ordr_degr		 
		 , line_seqn       as line_seqn      
		 , work_item_idcd  as work_item_idcd      
         , (select max(item_idcd) 
		    from   pjod_bom r
			where  r.pjod_idcd = _std_idcd
			and    r.item_idcd = a.prnt_idcd
			and    r.line_levl = 3
			) as item_idcd
         , (select max(item_name) 
		    from   pjod_bom r
			where  r.pjod_idcd = _std_idcd
			and    r.item_idcd = a.prnt_idcd
			and    r.line_levl = 3
			) as item_name
		 , item_spec       as item_spec
         , item_mtrl       as item_mtrl      
		 , ivst_wkct_idcd  as wkct_idcd
		 , null            as plan_sttm      
		 , null            as plan_edtm      
		 , '0'             as otod_yorn
         , null            as wker_idcd      
		 , 1               as work_pcnt      
		 , null            as cstm_idcd      
		 , 1               as indn_qntt      
		 , null            as remk_text
		 , remk_text       as work_cont
         , null            as imge_1fst      
		 , null            as imge_2snd      
		 , null            as lwcs_yorn                       
		 , 1               as used_yorn
		 , line_seqn       as bomt_seqn
	     , line_seqn - 1   as uper_seqn      
		 , line_seqn + 1   as disp_seqn      
		 , null            as user_memo      
		 , null            as sysm_memo
         , (select max(prnt_idcd) 
		    from   pjod_bom r
			where  r.pjod_idcd = _std_idcd
			and    r.item_idcd = a.prnt_idcd
			and    r.line_levl = 3
			) as prnt_idcd
		 , 3               as line_levl      
		 , line_ordr       as line_ordr      
		 , line_stat       as line_stat      
		 , line_clos       as line_clos      
		 , find_name       as find_name
         , null            as updt_user_name 
		 , null            as updt_ipad      
		 , null            as updt_dttm      
		 , null            as updt_idcd      
		 , null            as updt_urif      
		 , null            as crte_user_name
         , null            as crte_ipad      
		 , date_format(now(), '%Y%m%d%H%I%S')   as crte_dttm
		 , null            as crte_idcd      
		 , null            as crte_urif
    from   cte a																									
	where  work_item_idcd not in ('002', '999') /* 소재구매 및 주문제작  */
	and    line_levl = 4
	group by work_item_idcd 
	     , (select max(prnt_idcd) 
		    from   pjod_bom r
			where  r.pjod_idcd = _std_idcd
			and    r.item_idcd = a.prnt_idcd
			and    r.line_levl = 3
			) 
;
end