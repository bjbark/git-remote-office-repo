
drop procedure if exists `auto_item_rcpt`;

CREATE PROCEDURE `auto_item_rcpt`(
     _invc_numb  varchar(50),
	 _auto_insp   char(1)  /*  발주에서 입고접수 버튼을 누르면 "N" 수입검사 입력 화면에서 합격처리 버튼을 누르면 "Y"  */
    )
begin
    declare _new_invc_numb1   varchar(50);
    declare _new_invc_numb2   varchar(50);
    declare _insp_drtr_idcd   varchar(50);
    declare _stor             varchar(50);
    declare _insp_dvcd        int;

/*
    발주관리 화면에서 입고 처리 버튼을 누르면 본 프로시져를 실행한다. 
    본 프로시져에서는 OPtion Master에 등록된 검사 여부를 참조하여 발주 대장에 등록된 발주 품목을 
    입고대장 또는 수입검사대장에 등록한다. 
    즉, 무검사일 경우 입고대장 및 수입검사대장(검사 완료한 상태로...)에 기록하고
        검사일 경우 수입검사 대장에 기록한다. 
    처리된 발주서는 납품 수량 및 마감상태를 update 한다. 	   
*/

	
	
select case when optn_logc_valu in ('예','1','YES','Yes','yes','Y','y') then 1 else 0 end into _insp_dvcd
from   optn_mast
where  optn_name = '수입검사여부'
;	
select code_idcd into _insp_drtr_idcd
from   optn_mast
where  optn_name = '무검사입고담당'
;	
select optn_char_valu into _stor
from   optn_mast
where  optn_name = '본사ID'
;	

if  _auto_insp = 'Y' then
    set _insp_dvcd = 1;
end if; 


call fn_seq_gen_v3(_stor , 'purc_istt_mast','',_new_invc_numb1);
insert into purc_istt_item (
        invc_numb        , line_seqn        , istt_wrhs_idcd   , item_idcd        , istt_pric
      , istt_qntt        , vatx_incl_yorn   , vatx_rate        , istt_amnt        , istt_vatx
      , ttsm_amnt        , krwn_pric        , krwn_amnt        , krwn_vatx        , krwn_amnt_totl
      , pric_dvcd        , cstm_idcd        , stnd_unit        , stnd_unit_qntt   , paym_dvcd
      , lott_numb        , sral_strt_numb   , sral_endd_numb   , remk_text        , prof_data
      , istt_insp_yorn   , insp_date        , insp_drtr_idcd   , insp_mthd_dvcd   , insp_qntt
      , msmt_valu        , pass_qntt        , poor_qntt        , poor_caus_dvcd   , judt_dvcd
      , orig_invc_numb   , orig_amnd_degr   , orig_seqn        , istt_yorn        , uper_seqn
      , disp_seqn                                                                 
      , user_memo        , sysm_memo        , prnt_idcd        , line_levl        , line_ordr
      , line_stat        , line_clos        , find_name                           
      , updt_user_name   , updt_ipad        , updt_dttm        , updt_idcd        , updt_urif
      , crte_user_name   , crte_ipad        , crte_dttm        , crte_idcd        , crte_urif
	  )
select  _new_invc_numb1  , a.line_seqn      , i.istt_wrhs_idcd , a.item_idcd      , a.offr_pric    
      , ifnull(a.offr_qntt,0) - ifnull(a.dlvy_qntt,0)
	                     , a.vatx_incl_yorn , a.vatx_rate      
						 , (ifnull(a.offr_qntt,0) - ifnull(a.dlvy_qntt,0)) * a.offr_pric    
						 , truncate((ifnull(a.offr_qntt,0) - ifnull(a.dlvy_qntt,0)) * a.offr_pric  * a.vatx_rate / 100, -1)  
  	  , (ifnull(a.offr_qntt,0) - ifnull(a.dlvy_qntt,0)) * a.offr_pric    
		 + truncate((ifnull(a.offr_qntt,0) - ifnull(a.dlvy_qntt,0)) * a.offr_pric  * a.vatx_rate / 100, -1)  
      , a.offr_pric      , (ifnull(a.offr_qntt,0) - ifnull(a.dlvy_qntt,0)) * a.offr_pric    
						 , truncate((ifnull(a.offr_qntt,0) - ifnull(a.dlvy_qntt,0)) * a.offr_pric  * a.vatx_rate / 100, -1)  
               	         , (ifnull(a.offr_qntt,0) - ifnull(a.dlvy_qntt,0)) * a.offr_pric    
		                   + truncate((ifnull(a.offr_qntt,0) - ifnull(a.dlvy_qntt,0)) * a.offr_pric  * a.vatx_rate / 100, -1)  
      , a.pric_dvcd      , m.cstm_idcd      , i.unit_idcd      , ifnull(a.offr_qntt,0) - ifnull(a.dlvy_qntt,0) , null
	  , null             , null             , null             , null              , null  
	  , case _insp_dvcd  when 1 then '1' else '0' end as istt_yorn
	  , case _insp_dvcd  when 1 then date_format(now(), '%Y%m%d')  else null end as istt_date
	  , case _insp_dvcd  when 1 then _insp_drtr_idcd else null end as insp_drtr_idcd
	  , case _insp_dvcd  when 1 then '3000'          else null end as insp_mthd_dvcd  /* 1000:전수검사 , 2000:Sample , 3000:무검사   */
	  , case _insp_dvcd  when 1 then ifnull(a.offr_qntt,0) - ifnull(a.dlvy_qntt,0)  else 0 end as insp_qntt
      , null             as msmt_valu
	  , case _insp_dvcd  when 1 then ifnull(a.offr_qntt,0) - ifnull(a.dlvy_qntt,0)  else 0 end as pass_qntt
	  , 0                as poor_qntt
	  , null             as poor_caus_dvcd
	  , case _insp_dvcd  when 1 then '1' else null       end       as judt_dvcd
	  , a.invc_numb      , a.amnd_degr      , a.line_seqn      , '0'               , a.uper_seqn
      , a.disp_seqn
      , null             , 'Auto Create Data', a.prnt_idcd     , a.line_levl       , a.line_ordr
      , '0'              , '0'              , a.find_name 
      , null             , null             , null             , null              , null
      , a.crte_user_name , a.crte_ipad      , date_format(now(), '%Y%m%d%H%i%s')   , a.crte_idcd 
      , a.crte_urif
from purc_ordr_item a	  
     left outer join purc_ordr_mast m on a.invc_numb = m.invc_numb
     left outer join item_mast i on a.item_idcd = i.item_idcd
where a.invc_numb = _invc_numb
;
insert into purc_istt_mast (
          invc_numb        , invc_date        , bzpl_idcd        , istt_wrhs_idcd   , coun_iout_dvcd
        , cstm_idcd        , drtr_idcd        , dept_idcd        , istt_qntt        , vatx_incl_yorn
        , vatx_rate        , istt_amnt        , istt_vatx        , ttsm_amnt        , krwn_pric
        , krwn_amnt        , krwn_vatx        , krwn_amnt_totl   , remk_text
        , user_memo        , sysm_memo        , prnt_idcd        , line_levl        , line_ordr
        , line_stat        , line_clos        , find_name
        , updt_user_name   , updt_ipad        , updt_dttm        , updt_idcd        , updt_urif
        , crte_user_name   , crte_ipad        , crte_dttm        , crte_idcd        , crte_urif
	   )
select    _new_invc_numb1  , date_format(now(), '%Y%m%d') , a.bzpl_idcd , b.puch_wrhs_idcd , a.coun_iout_dvcd
        , a.cstm_idcd      , drtr_idcd        , dept_idcd        
		, (select sum(ifnull(r.istt_qntt,0)) from purc_istt_item r where r.invc_numb = _new_invc_numb1) 
		, a.vatx_incl_yorn
		, a.vatx_rate      
		, (select sum(ifnull(r.istt_amnt,0)) from purc_istt_item r where r.invc_numb = _new_invc_numb1) 
		, (select sum(ifnull(r.istt_vatx,0)) from purc_istt_item r where r.invc_numb = _new_invc_numb1) 
		, (select sum(ifnull(r.ttsm_amnt,0)) from purc_istt_item r where r.invc_numb = _new_invc_numb1) 
		, 0
		, 0                , 0                , 0                , null
        , null             , 'Auto Create Data'  , a.prnt_idcd   , a.line_levl       , a.line_ordr
        , '0'              , '0'              , a.find_name 
        , null             , null             , null             , null              , null
        , a.crte_user_name , a.crte_ipad      , date_format(now(), '%Y%m%d%H%i%s')   , a.crte_idcd 
        , a.crte_urif
from    purc_ordr_mast a
        left outer join cstm_mast c  on a.cstm_idcd = c.cstm_idcd
	    left outer join bzpl_mast b  on a.bzpl_idcd = b.bzpl_idcd
where   a.invc_numb = _invc_numb
;
if  _insp_dvcd = '1' then 	 
    call auto_isos_booking(_new_invc_numb1, '구매입고');  /* 수불대장 및 LOT 수불대장에 반영한다.(재고변동사항 반영 프로시져 모음 파일 참조할 것 ) */
end if;

call fn_seq_gen_v3(_stor , 'purc_insp','',_new_invc_numb2);
insert into purc_insp (
         invc_numb      , line_seqn      , invc_date      , insp_dvcd      , cstm_idcd
       , dlvy_idcd      , dlvy_seqn      , cnfm_dept_idcd , cnfm_drtr_idcd , item_idcd
       , dlvy_qntt      , dlvy_wrhs_idcd , lott_numb      , insp_drtr_idcd , insp_mthd_dvcd
       , msmt_valu      , insp_qntt      , poor_qntt      , pass_yorn      , pass_qntt
       , poor_type_dvcd , poor_caus_dvcd , judt_dvcd      , istt_yorn      , orig_invc_numb
       , orig_amnd_degr , orig_seqn      
	   , uper_seqn      , disp_seqn      
	   , user_memo      , sysm_memo      , prnt_idcd      , line_levl      , line_ordr
       , line_stat      , line_clos      , find_name
       , updt_user_name , updt_ipad      , updt_dttm      , updt_idcd      , updt_urif
       , crte_user_name , crte_ipad      , crte_dttm      , crte_idcd      , crte_urif
	  ) 
select  _new_invc_numb2 , a.line_seqn    , date_format(now(), '%Y%m%d')    ,'1000' , m.cstm_idcd   
       , a.invc_numb        as dlvy_idcd
	   , a.line_seqn        as dlvy_seqn
	   , null               as cnfm_dept_idcd
	   , null               as cnfm_drtr_idcd
	   , a.item_idcd        as item_idcd
       , ifnull(a.offr_qntt,0) - ifnull(a.dlvy_qntt,0) as dlvy_qntt
	   , i.istt_wrhs_idcd   as dlvy_wrhs_idcd
	   , null               as lott_numb
	   , _insp_drtr_idcd    as insp_drtr_idcd
	   , '3000'             as insp_mthd_dvcd  /* 1000:전수검사 , 2000:Sample , 3000:무검사   */
	   , null               as msmt_valu
	   , case _insp_dvcd when 1 then 0    else ifnull(a.offr_qntt,0) - ifnull(a.dlvy_qntt,0) end as insp_qntt
	   , 0                  as poor_qntt
	   , case _insp_dvcd when 1 then null else 1 end   as pass_yorn
	   , case _insp_dvcd when 1 then 0    else ifnull(a.offr_qntt,0) - ifnull(a.dlvy_qntt,0) end as pass_qntt
	   , null               as poor_type_dvcd
	   , null               as poor_caus_dvcd
	   , case _insp_dvcd when 1 then null else '1' end as judt_dvcd
       , case _insp_dvcd when 1 then '0'  else '1' end as istt_yorn
	   , a.invc_numb        as orig_invc_numb
	   , a.amnd_degr        as orig_amnd_degr
	   , a.line_seqn        as orig_seqn
	   , a.uper_seqn        as uper_seqn
	   , a.disp_seqn        as disp_seqn
       , null             , 'Auto Create Data', a.prnt_idcd      , a.line_levl       , a.line_ordr
       , '0'              , '0'               , a.find_name 
       , null             , null              , null             , null              , null
       , a.crte_user_name , a.crte_ipad       , date_format(now(), '%Y%m%d%H%i%s')   , a.crte_idcd 
       , a.crte_urif
from     purc_ordr_item a	  
         left outer join purc_ordr_mast m on a.invc_numb = m.invc_numb
         left outer join item_mast i on a.item_idcd = i.item_idcd
where    a.invc_numb = _invc_numb
;

update  purc_ordr_item set dlvy_qntt = offr_qntt
      , line_clos = '1'
where   invc_numb = _invc_numb
;
update  purc_ordr_mast set line_clos = '1'
where   invc_numb = _invc_numb
;
		
end