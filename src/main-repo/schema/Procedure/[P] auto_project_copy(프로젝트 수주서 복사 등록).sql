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


call auto_project_copy('N1000WINFO','SO-1900000073', '20190830');



select * from acpt_item where invc_numb in ('SO-1900000073','SO-1900000084');


*/




drop procedure if exists `auto_project_copy`;

create  procedure `auto_project_copy`(
       _invc_numb  varchar(50)
	 , _deli_date varchar(10)
	 , _dsig_schd_1 char(1)
	 , _dsig_schd_2 char(1)
	 , _work_schd_1 char(1)
	 , _work_schd_2 char(1)
	 , _apnd_file   char(1)
	 , _colt_date   char(1)
	 , _bom         char(1)
    ) 
begin
    declare _new_invc_numb    varchar(50);
    declare _max_amnd         int;
    declare _stor             varchar(50);
	
	select optn_char_valu   into _stor
	from   optn_mast
	where  optn_name = '본사ID'
	;

	
call fn_seq_gen_v3(_stor , 'pjod_mast','',_new_invc_numb);

select max(amnd_degr) into _max_amnd
from   pjod_mast
where  pjod_idcd = _invc_numb
;

insert into pjod_mast (
            pjod_idcd        , amnd_degr        , pjod_code        , pjod_dvcd        , expt_dvcd
          , cstm_idcd        , cstm_name        , prjt_idcd        , regi_date        , pjod_name
          , item_idcd        , item_name        , item_spec        , modl_name        , esti_amnt
          , cofm_yorn        , cofm_date        , cofm_amnt        , crny_dvcd        , frst_exam_date
          , send_exam_date   , deli_date        , ppsl_deli_date   , strt_date        , endd_date
          , drtr_idcd        , dlvy_date        , last_yorn        , apvl_date        , apvl_drtr_idcd
          , cstm_item_code   , mold_size        , cavity           , mold_wigt        , used_mtrl_name
          , prod_wigt        , used_tons                                              
          , user_memo        , sysm_memo        , prnt_idcd        , line_levl        , line_ordr
          , line_stat        , line_clos        , find_name                           
          , updt_user_name   , updt_ipad        , updt_dttm        , updt_idcd        , updt_urif
          , crte_user_name   , crte_ipad        , crte_dttm        , crte_idcd        , crte_urif
	  )
	  
select     _new_invc_numb    , 1                , a.pjod_code      , a.pjod_dvcd      , a.expt_dvcd
          , a.cstm_idcd      , a.cstm_name      , a.prjt_idcd      , a.regi_date      , a.pjod_name
          , a.item_idcd      , a.item_name      , a.item_spec      , a.modl_name      , a.esti_amnt
          , a.cofm_yorn      , a.cofm_date      , a.cofm_amnt      , a.crny_dvcd      , a.frst_exam_date
          , a.send_exam_date , a.deli_date      , a.ppsl_deli_date , a.strt_date      , a.endd_date
          , a.drtr_idcd      , a.dlvy_date      , a.last_yorn      , a.apvl_date      , a.apvl_drtr_idcd
          , a.cstm_item_code , a.mold_size      , a.cavity         , a.mold_wigt      , a.used_mtrl_name
          , a.prod_wigt      , a.used_tons   
          , null              , 'copyed Order '   , a.prnt_idcd       , a.line_levl       , a.line_ordr
          , '0'               , '0'               , a.find_name 
          , null              , null              , null              , null              , null
          , a.crte_user_name  , a.crte_ipad       , date_format(now(), '%Y%m%d%H%i%s')    , a.crte_idcd 
		  , a.crte_urif
from     pjod_mast a
where    a.pjod_idcd = _invc_numb
and      a.amnd_degr = _max_amnd
;
/*   수금 계획을 복사 처리한다.  단, 수금실적은 Clear   */ 
insert into pjod_colt (
            pjod_idcd        , line_seqn        , colt_dvcd        , colt_degr        , plan_date
          , plan_amnt        , colt_date        , colt_amnt        , drtr_idcd      
          , user_memo        , sysm_memo        , prnt_idcd        , line_levl        , line_ordr
          , line_stat        , line_clos        , find_name                         
          , updt_user_name   , updt_ipad        , updt_dttm        , updt_idcd        , updt_urif
          , crte_user_name   , crte_ipad        , crte_dttm        , crte_idcd        , crte_urif
      )
select    _new_invc_numb     , a.line_seqn      , a.colt_dvcd      , a.colt_degr      , a.plan_date
          , a.plan_amnt      , null             , null             , null 
          , null             , 'copyed Order '  , a.prnt_idcd      , a.line_levl      , a.line_ordr
          , '0'              , '0'              , a.find_name 
          , null             , null             , null             , null             , null
          , a.crte_user_name , a.crte_ipad      , date_format(now(), '%Y%m%d%H%i%s')  , a.crte_idcd 
		  , a.crte_urif
from    pjod_colt a
where   a.pjod_idcd = _invc_numb
;
		
end




