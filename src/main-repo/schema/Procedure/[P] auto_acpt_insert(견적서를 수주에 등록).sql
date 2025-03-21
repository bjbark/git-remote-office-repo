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


call auto_acpt_copy('N1000WINFO','SO-1900000073', '20190830');



select * from acpt_item where invc_numb in ('SO-1900000073','SO-1900000084');


*/




drop procedure if exists `auto_acpt_insert`;

create  procedure `auto_acpt_insert`(
     _stor       varchar(50),
     _invc_numb  varchar(50),
	 _deli_date  varchar(8)
    ) 
begin
    declare _new_invc_numb    varchar(50);
	
	
call fn_seq_gen_v3(_stor , 'acpt_mast','',_new_invc_numb);




insert into acpt_item (
            invc_numb       , amnd_degr       , line_seqn       , item_idcd       , unit_idcd
          , orig_invc_numb  , orig_seqn       , orig_invc_qntt  , optn_dvcd       , optn_psbl_yorn
          , optn_adtn       , pric_adpt       , norm_sale_pric  , sale_stnd_pric  , invc_qntt
          , invc_pric       , vatx_incl_yorn  , vatx_rate       , sply_amnt       , vatx_amnt
          , invc_amnt       , krwn_amnt       , krwn_vatx       , krwn_ttsm_amnt  , stnd_unit
          , stnd_unit_qntt  , wrhs_idcd       , dlvy_cstm_idcd  , deli_date       , dlvy_date
          , dlvy_hhmm       , remk_text       , ostt_dvcd       , dsct_qntt       , dlvy_memo
          , uper_seqn       , disp_seqn
          , user_memo       , sysm_memo       , prnt_idcd       , line_levl       , line_ordr
          , line_stat       , line_clos       , find_name
          , updt_user_name  , updt_ipad       , updt_dttm       , updt_idcd       , updt_urif
          , crte_user_name  , crte_ipad       , crte_dttm       , crte_idcd       , crte_urif
	  )
	  
select     _new_invc_numb    , 1                 , a.line_seqn       , a.item_idcd       , a.unit_idcd
         , a.invc_numb       , a.line_seqn       , a.esti_qntt       , null              , null
         , null              , null              , a.norm_sale_pric  , a.sale_stnd_pric  , a.esti_qntt
         , a.sale_pric       , a.vatx_incl_yorn  , a.vatx_rate       , a.sply_amnt       , a.vatx_amnt
         , a.ttsm_amnt       , a.krwn_amnt       , a.krwn_vatx       , a.krwn_ttsm_amnt  , a.unit_idcd
         , a.esti_qntt       , i.ostt_wrhs_idcd  , m.cstm_idcd       , a.deli_date       , null
         , null              , a.remk_text       , null              , null              , null
         , a.uper_seqn       , a.disp_seqn 
         , null              , 'from esti Order ', a.prnt_idcd       , a.line_levl       , a.line_ordr
         , '0'               , '0'               , a.find_name 
         , null              , null              , null              , null              , null
         , a.crte_user_name  , a.crte_ipad       , date_format(now(), '%Y%m%d%H%i%s')    , a.crte_idcd 
		 , a.crte_urif
from     esti_item a
         left outer join esti_mast m on a.invc_numb = m.invc_numb
		 left outer join item_mast i on a.item_idcd = i.item_idcd
where    a.invc_numb = _invc_numb
;

insert into acpt_mast (
           invc_numb         , amnd_degr         , bzpl_idcd         , invc_date         , ordr_dvcd
         , orig_invc_numb    , expt_dvcd         , pcod_nmbr         , deli_date         , cstm_idcd
         , mdtn_prsn         , cont_date         , drtr_idcd         , dept_idcd         , crny_dvcd
         , excg_rate         , ostt_wrhs_idcd    , trut_dvcd         , dlvy_cond_dvcd    , crdt_exce_yorn
         , amnt_lack_yorn    , sale_stor_yorn    , remk_text         , memo              , cofm_yorn
         , cofm_dttm         , cofm_drtr_idcd    , acpt_stat_dvcd                        
         , user_memo         , sysm_memo         , prnt_idcd         , line_levl         , line_ordr
         , line_stat         , line_clos         , find_name                             
         , updt_user_name    , updt_ipad         , updt_dttm         , updt_idcd         , updt_urif
         , crte_user_name    , crte_ipad         , crte_dttm         , crte_idcd         , crte_urif
     )
select     _new_invc_numb    , 1                 , a.bzpl_idcd       , a.invc_date       , '1000'
         , a.invc_numb       , a.expt_dvcd       , null              , a.deli_date       , a.cstm_idcd
         , null              , null              , a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd
         , a.excg_rate       , null              , '1'               , null              , '0'
         , '0'               , '0'               , a.remk_text       , a.memo            , null
         , null              , null              , '0010'  
         , null              , 'from esti Order ', a.prnt_idcd       , a.line_levl       , a.line_ordr
         , '0'               , '0'               , a.find_name 
         , null              , null              , null              , null              , null
         , a.crte_user_name  , a.crte_ipad       , date_format(now(), '%Y%m%d%H%i%s')    , a.crte_idcd 
		 , a.crte_urif
from     esti_mast a
where    a.invc_numb = _invc_numb
;	  

		
end




