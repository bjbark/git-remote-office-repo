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


call auto_project_amend('pjod0002');



select * from acpt_item where invc_numb in ('SO-1900000073','SO-1900000084');


*/




drop procedure if exists `auto_project_amend`;

create  procedure `auto_project_amend`(
     _invc_numb  varchar(50)
    ) 
begin
    declare _new_invc_numb    varchar(50);
    declare _max_amnd         int;
	
select ifnull(max(amnd_degr),0) + 1 into _max_amnd
from   pjod_amnd
where  pjod_idcd = _invc_numb
;

update pjod_amnd set last_yorn = '0' 
where  pjod_idcd = _invc_numb
;

insert into pjod_amnd (
            pjod_idcd        , amnd_degr        , amnd_resn        , amnd_date        , pjod_code
          , pjod_dvcd        , expt_dvcd        , prjt_idcd        , regi_date        , pjod_name
          , item_idcd        , item_name        , item_spec        , modl_name        , esti_amnt
          , crny_dvcd        , frst_exam_date   , send_exam_date   , deli_date        , strt_date
          , endd_date        , drtr_idcd        , dlvy_date        , last_yorn        , apvl_date
          , apvl_drtr_idcd                                                          
	      , user_memo        , sysm_memo        , prnt_idcd        , line_levl        , line_ordr
          , line_stat        , line_clos        , find_name                         
          , updt_user_name   , updt_ipad        , updt_dttm        , updt_idcd        , updt_urif
          , crte_user_name   , crte_ipad        , crte_dttm        , crte_idcd        , crte_urif
	   )
  select    a.pjod_idcd      , _max_amnd        , null             , date_format(now(), '%Y%m%d') , a.pjod_code
          , a.pjod_dvcd      , a.expt_dvcd      , a.prjt_idcd      , a.regi_date      , a.pjod_name
          , a.item_idcd      , a.item_name      , a.item_spec      , a.modl_name      , a.esti_amnt
          , a.crny_dvcd      , a.frst_exam_date , a.send_exam_date , a.deli_date      , a.strt_date
          , a.endd_date      , a.drtr_idcd      , a.dlvy_date      , '1'              , a.apvl_date
          , a.apvl_drtr_idcd 
          , null             , 'Auto create Amend', a.prnt_idcd    , a.line_levl      , a.line_ordr
          , '0'              , '0'               , a.find_name 
          , null             , null              , null            , null             , null
          , a.crte_user_name , a.crte_ipad       , date_format(now(), '%Y%m%d%H%i%s') , a.crte_idcd 
		  , a.crte_urif
    from  pjod_mast a
	where pjod_idcd = _invc_numb
;	
	

		
end


	

