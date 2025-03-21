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

*/

drop procedure if exists `auto_spts_insert`;

CREATE PROCEDURE `auto_spts_insert`(
     _stor  varchar(50),
     _invc_numb  varchar(50)
    )
begin
    declare _new_invc_numb    varchar(50);
	
	
call fn_seq_gen_v3(_stor , 'spts_mast','',_new_invc_numb);

insert into spts_item (
        invc_numb        , line_seqn        , acpt_numb      , acpt_seqn   , item_idcd        , sale_unit
      , norm_sale_pric   , sale_stnd_pric   , sale_pric      , trst_qntt   , vatx_incl_yorn   , vatx_rate
      , sale_amnt        , vatx_amnt        , ttsm_amnt      , deli_date   , stnd_unit        , stnd_unit_qntt
      , wrhs_idcd        , dlvy_cstm_idcd   , dsct_yorn      , ostt_dvcd   , insp_dvcd        , insp_date
      , pcod_numb        , ostt_yorn        , ostt_date      , ostt_qntt   , uper_seqn        , disp_seqn
      , user_memo        , sysm_memo        , prnt_idcd      , line_levl   , line_ordr        , line_stat
      , line_clos        , find_name        , crte_user_name , crte_ipad   , crte_dttm
	  )
select  _new_invc_numb   , a.line_seqn      , a.invc_numb    , a.line_seqn , a.item_idcd      , a.unit_idcd
      , a.norm_sale_pric , a.sale_stnd_pric , a.invc_pric    , a.invc_qntt , a.vatx_incl_yorn , a.vatx_rate
	  , a.sply_amnt      , a.vatx_amnt      , a.invc_amnt    , a.deli_date , a.stnd_unit      , a.stnd_unit_qntt
	  , a.wrhs_idcd      , m.cstm_idcd      , '0'            , '3001'      , '2000'           , null 
	  , null             , '0'              , null           , 0           , a.line_seqn - 1  , a.line_seqn
	  , null             , null             , a.invc_numb    , 1           , a.line_seqn       , 0
      , '0'              
      , concat(  _new_invc_numb , ' '
               , a.invc_numb , ' '   	  
			   , a.item_idcd , ' '
			   , i.item_name , ' '
			   , i.item_code )
	  , 'auto create '   , null             , date_format(now(), '%Y%m%d%H%i%s')
from acpt_item a
     left outer join acpt_mast m on a.invc_numb = m.invc_numb
     left outer join item_mast i on a.item_idcd = i.item_idcd
where a.invc_numb = _invc_numb
;

insert into spts_mast (
          invc_numb        , invc_date       , bzpl_idcd        , expt_dvcd       , cstm_idcd       , ostt_dvcd
        , drtr_idcd        , dept_idcd       , ostt_schd_date   , ostt_yorn       , ostt_date       , trut_dvcd
        , dlvy_cond_dvcd   , deli_date       , sale_stor_yorn   , crny_dvcd       , excg_rate       , remk_text
        , user_memo        , sysm_memo       , prnt_idcd        , line_levl       , line_ordr       , line_stat
        , line_clos        , find_name       , crte_user_name   , crte_ipad       , crte_dttm
	   )
select    _new_invc_numb   , date_format(now(), '%Y%m%d') , a.bzpl_idcd , a.expt_dvcd , a.cstm_idcd , '3001'
        , a.drtr_idcd      , a.dept_idcd     , date_format(date_add(now(),interval +3 day) ,'%Y%m%d')    
		                                                        , 0               , null            , a.trut_dvcd
        , a.dlvy_cond_dvcd , a.deli_date     , a.sale_stor_yorn , a.crny_dvcd     , a.excg_rate     , a.remk_text
        , null             , null            , a.invc_numb      , 1               , 0               , 0
        , '0'              
        , concat(  _invc_numb , ' '
                 , a.invc_numb , ' '   	  
			     , c.cstm_name 
				)
	    , 'auto create '   , null             , date_format(now(), '%Y%m%d%H%i%s')
from acpt_mast a
     left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd
where a.invc_numb = _invc_numb
;	 

update acpt_mast set acpt_stat_dvcd = '0200' 
where  invc_numb = _invc_numb
;
		
end