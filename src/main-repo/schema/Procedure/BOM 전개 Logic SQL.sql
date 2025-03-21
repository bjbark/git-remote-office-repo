with recursive cte as (																								
    select prnt_item_idcd    , bomt_degr    , bomt_seqn        , item_idcd        , ivst_wkct_idcd    , unit_idcd	
         , ndqt_nmrt         , ndqt_dnmn    , lwcs_yorn        , incm_loss_rate   , otcm_loss_rate    , strt_date	
         , endd_date         , stok_plac    , stok_unit_idcd   , aset_clss_dvcd 									
         , firs_dwup_drtr_idcd              , last_updt_drtr_idcd                 , remk_text						
         , user_memo         , sysm_memo    , prnt_idcd        , 1 as line_levl										
         , line_ordr         , line_stat    , line_clos        , find_name        , updt_user_name					
         , updt_ipad         , updt_dttm    , updt_idcd        , updt_urif        , crte_user_name					
         , crte_ipad         , crte_dttm    , crte_idcd        , crte_urif	
    from   bom_mast 																								
    where  prnt_item_idcd = :item1		"	, arg.getParameter("prnt_item_idcd"))
	and    bomt_degr = (select max(bomt_degr) from bom_mast where prnt_item_idcd = :item2 )	"	, arg.getParameter("prnt_item_idcd"))
    union all																										
    select a.prnt_item_idcd  , a.bomt_degr  , a.bomt_seqn      , a.item_idcd      , a.ivst_wkct_idcd  , a.unit_idcd	
         , a.ndqt_nmrt       , a.ndqt_dnmn  , a.lwcs_yorn      , a.incm_loss_rate , a.otcm_loss_rate  , a.strt_date	
         , a.endd_date       , a.stok_plac  , a.stok_unit_idcd , a.aset_clss_dvcd 									
         , a.firs_dwup_drtr_idcd            , a.last_updt_drtr_idcd               , a.remk_text						
         , a.user_memo       , a.sysm_memo  , a.prnt_idcd      , b.line_levl + 1 as line_levl						
         , a.line_ordr       , a.line_stat  , a.line_clos      , a.find_name      , a.updt_user_name				
         , a.updt_ipad       , a.updt_dttm  , a.updt_idcd      , a.updt_urif      , a.crte_user_name				
         , a.crte_ipad       , a.crte_dttm  , a.crte_idcd      , a.crte_urif										
    from   bom_mast a																								
    inner join cte b on a.prnt_item_idcd = b.item_idcd 																
)																													
    select a.prnt_item_idcd  , m.item_name as prnt_item_name  , m.item_spec as prnt_item_spec						
         , a.bomt_degr       , a.bomt_seqn																			
         , a.item_idcd       , d.item_name as item_name       , d.item_spec as item_spec							
         , a.ivst_wkct_idcd  , a.unit_idcd  , a.ndqt_nmrt     , a.ndqt_dnmn       , a.lwcs_yorn						
         , a.incm_loss_rate  , a.otcm_loss_rate																		
         , a.strt_date       , a.endd_date  , a.stok_plac     , a.stok_unit_idcd  , a.aset_clss_dvcd				
         , a.firs_dwup_drtr_idcd            , a.last_updt_drtr_idcd               , a.remk_text						
         , a.user_memo       , a.sysm_memo  , a.prnt_idcd     , a.line_levl       , a.line_ordr						
         , a.line_stat       , a.line_clos  , a.find_name															
         , a.updt_user_name  , a.updt_ipad  , a.updt_dttm     , a.updt_idcd       , a.updt_urif						
         , a.crte_user_name  , a.crte_ipad  , a.crte_dttm     , a.crte_idcd       , a.crte_urif						
    from   cte a																									
           left outer join item_mast m on a.prnt_item_idcd = m.item_idcd											
           left outer join item_mast d on a.item_idcd      = d.item_idcd											
