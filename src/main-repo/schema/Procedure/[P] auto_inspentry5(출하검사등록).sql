
drop procedure if exists `auto_inspentry5`;

CREATE PROCEDURE `auto_inspentry5`(
     _invc_numb  varchar(50),
     _invc_date  varchar(8)
    )
begin
    declare _new_invc_numb1   varchar(50);
    declare _new_invc_numb2   varchar(50);
    declare _insp_drtr_idcd   varchar(50);
    declare _stor             varchar(50);
--    declare _invc_date        varchar(8);
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

/*
select date_format(now(),'%Y%m%d') into _invc_date
;
*/
call fn_seq_gen_v3(_stor , 'ostt_insp','',_new_invc_numb1);
insert into ostt_insp (
        invc_numb      , line_seqn      , bzpl_idcd      , invc_date
      , spts_numb      , spts_seqn      , spts_date
      , spts_dept_idcd , spts_drtr_idcd , item_idcd      , unit_idcd
      , spts_qntt      , deli_date      , wrhs_idcd      , cstm_idcd
      , insp_drtr_idcd , insp_mthd_dvcd , insp_qntt      , pass_qntt
      , poor_qntt      , judt_dvcd      , remk_text
      , user_memo      , sysm_memo      , prnt_idcd      , line_levl      , line_ordr
      , line_stat      , line_clos      , find_name                           
      , updt_user_name , updt_ipad      , updt_dttm      , updt_idcd      , updt_urif
      , crte_user_name , crte_ipad      , crte_dttm      , crte_idcd      , crte_urif
	  )
select  _new_invc_numb1 as invc_numb      
	  , a.line_seqn     as line_seqn      
	  , m.bzpl_idcd     as bzpl_idcd
      , _invc_date      as invc_date
      , m.invc_numb     as spts_numb
      , a.line_seqn     as spts_seqn
      , m.invc_date     as spts_date
      , m.dept_idcd     as spts_dept_idcd
      , m.drtr_idcd     as spts_drtr_idcd
      , a.item_idcd     as item_idcd
      , i.unit_idcd     as unit_idcd
      , a.trst_qntt     as spts_qntt
      , a.deli_date     as deli_date
      , a.wrhs_idcd     as wrhs_idcd
      , m.cstm_idcd     as cstm_idcd
      , _insp_detr_idcd as insp_drtr_idcd
      , '3000'          as insp_mthd_dvcd
      , a.trst_qntt     as insp_qntt
      , a.trst_qntt     as pass_qntt
      , 0               as poor_qntt
      , '1'             as judt_dvcd
      , null            as remk_text
      , null             , 'Auto Create Data', a.prnt_idcd     , a.line_levl       , a.line_ordr
      , '0'              , '0'              , a.find_name 
      , null             , null             , null             , null              , null
      , a.crte_user_name , a.crte_ipad      , date_format(now(), '%Y%m%d%H%i%s')   , a.crte_idcd 
      , a.crte_urif
from spts_item a	  
     left outer join spts_mast m on a.invc_numb = m.invc_numb
     left outer join item_mast i on a.item_idcd = i.item_idcd
where a.invc_numb = _invc_numb
;
/*
update  spts_item set dlvy_qntt = offr_qntt
      , line_clos = '1'
where   invc_numb = _invc_numb
;
*/		
end