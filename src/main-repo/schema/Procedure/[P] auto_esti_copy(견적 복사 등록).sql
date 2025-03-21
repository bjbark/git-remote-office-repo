/*

call fn_seq_gen_v2 (
'N1000DOOIN',
'ETOT_TRST_MAST',
''
)

call fn_seq_gen_v2 (
'N1000DOOIN',
'ETOT_TRST_ITEM',
''
)

select * from seqn_dflt where tabl_name = 'ETOT_TRST_ITEM'

call auto_spts_insert('xxx')


select * from acpt_mast;


call auto_esti_copy('N1000WINFO','SO-1900000332', '20191030');



select * from acpt_item where invc_numb in ('SO-1900000073','SO-1900000084');


select * from esti_mast;


*/







drop procedure if exists `auto_esti_copy`;

create  procedure `auto_esti_copy`(
     _stor       varchar(50),
     _invc_numb  varchar(50),
	 _deli_date  varchar(8)
    ) 
begin
    declare _new_invc_numb    varchar(50);
	
	
call fn_seq_gen_v3(_stor , 'esti_mast','',_new_invc_numb);




insert into esti_item (
           invc_numb        , amnd_degr        , line_seqn        , esti_item_dvcd   , item_idcd
         , item_name        , item_spec        , cstm_item_name   , cstm_item_code   , unit_idcd
         , norm_sale_pric   , sale_stnd_pric   , dsnt_rate        , sale_pric        , esti_qntt
         , vatx_incl_yorn   , vatx_rate        , sply_amnt        , vatx_amnt        , ttsm_amnt
         , krwn_amnt        , krwn_vatx        , krwn_ttsm_amnt   , deli_date        , dlvy_date
         , dlvy_hhmm        , remk_text        , uper_seqn        , disp_seqn        
	     , user_memo        , sysm_memo        , prnt_idcd        , line_levl        , line_ordr
         , line_stat        , line_clos        , find_name                          
         , updt_user_name   , updt_ipad        , updt_dttm        , updt_idcd        , updt_urif
         , crte_user_name   , crte_ipad        , crte_dttm        , crte_idcd        , crte_urif
	  )
	  
select     _new_invc_numb   , 1                , a.line_seqn      , a.esti_item_dvcd , a.item_idcd
         , a.item_name      , a.item_spec      , a.cstm_item_name , a.cstm_item_code , a.unit_idcd
         , a.norm_sale_pric , a.sale_stnd_pric , a.dsnt_rate      , a.sale_pric      , a.esti_qntt
         , a.vatx_incl_yorn , a.vatx_rate      , a.sply_amnt      , a.vatx_amnt      , a.ttsm_amnt
         , a.krwn_amnt      , a.krwn_vatx      , a.krwn_ttsm_amnt , _deli_date       , a.dlvy_date
         , a.dlvy_hhmm      , a.remk_text      , a.uper_seqn      , a.disp_seqn      
         , null             , 'copyed Order '  , a.prnt_idcd      , a.line_levl      , a.line_ordr
         , '0'              , '0'              , a.find_name 
         , null             , null             , null             , null             , null
         , a.crte_user_name , a.crte_ipad      , date_format(now(), '%Y%m%d%H%i%s')  , a.crte_idcd 
		 , a.crte_urif
from     esti_item a
where    a.invc_numb = _invc_numb
;


insert into esti_mast (
           invc_numb        , amnd_degr        , bzpl_idcd        , invc_date        , cstm_idcd
         , cstm_name        , esti_dvcd        , expt_dvcd        , deli_date        , dept_idcd
         , drtr_idcd        , mdtn_prsn        , dlvy_cond        , esti_vald_term   , excg_rate_chge_yorn
         , paym_cond        , remk_text        , memo             , esti_amnt        , esti_vatx
         , ttsm_amnt        , crny_dvcd        , excg_rate                           
	     , user_memo        , sysm_memo        , prnt_idcd        , line_levl        , line_ordr
         , line_stat        , line_clos        , find_name                           
         , updt_user_name   , updt_ipad        , updt_dttm        , updt_idcd        , updt_urif
         , crte_user_name   , crte_ipad        , crte_dttm        , crte_idcd        , crte_urif
     )
select     _new_invc_numb   , 1                , a.bzpl_idcd      , a.invc_date      , a.cstm_idcd
         , a.cstm_name      , a.esti_dvcd      , a.expt_dvcd      , _deli_date       , a.dept_idcd
         , a.drtr_idcd      , a.mdtn_prsn      , a.dlvy_cond      , a.esti_vald_term , a.excg_rate_chge_yorn
         , a.paym_cond      , a.remk_text      , a.memo           , a.esti_amnt      , a.esti_vatx
         , a.ttsm_amnt      , a.crny_dvcd      , a.excg_rate
         , null             , 'copyed Order '  , a.prnt_idcd      , a.line_levl       , a.line_ordr
         , '0'              , '0'              , a.find_name 
         , null             , null             , null             , null              , null
         , a.crte_user_name , a.crte_ipad      , date_format(now(), '%Y%m%d%H%i%s')    , a.crte_idcd 
		 , a.crte_urif
from     esti_mast a
where    a.invc_numb = _invc_numb
;	  


		
end




