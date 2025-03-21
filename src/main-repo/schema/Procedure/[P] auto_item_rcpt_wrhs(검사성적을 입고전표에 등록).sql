
drop procedure if exists `auto_item_rcpt_wrhs`;

CREATE PROCEDURE `auto_item_rcpt_wrhs`(
     _invc_numb  varchar(50)
    )
begin
    declare _new_invc_numb1   varchar(50);
    declare _new_invc_numb2   varchar(50);
    declare _insp_drtr_idcd   varchar(50);
    declare _stor             varchar(50);
    declare _insp_dvcd        int;
    declare _insp_count       int;

/*
    발주관리 화면에서 입고 처리 버튼을 누르면 본 프로시져를 실행한다. 
    본 프로시져에서는 OPtion Master에 등록된 검사 여부를 참조하여 발주 대장에 등록된 발주 품목을 
    입고대장 또는 수입검사대장에 등록한다. 
    즉, 무검사일 경우 입고대장 및 수입검사대장(검사 완료한 상태로...)에 기록하고
        검사일 경우 수입검사 대장에 기록한다. 
    처리된 발주서는 납품 수량 및 마감상태를 update 한다. 	   
	등록된 입고 전표를 수불대장 및 LOT수불대장에 등록하기 위하여 auto_isos_booking(invoice번호, '구매입고') 프로시져를 호출한다. 
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


--  등록 작업 전 이미 등록된 실적을 삭제한다. (재 작업 및 검사성적 삭제 작업에 대비)
delete from purc_istt_mast
where  invc_numb = (select insp_invc_numb 
                    from   purc_insp
                    where  insp_invc_numb = _invc_numb
				   )	
;
delete from purc_istt_item
where  insp_invc_numb = _invc_numb
;

select count(*) into _insp_count
from   purc_insp
where  invc_numb = _invc_numb
and    ifnull(judt_yorn, 0 ) = '1'  /*  합격인 경우만 입고처리 한다.  */
and    ifnull(istt_yorn,'0') = '0'
;

if   ifnull(_invc_count,0) > 0 then 
   begin
      call   fn_seq_gen_v3(_stor , 'purc_istt_mast','',_new_invc_numb1);
      insert into purc_istt_item (
              invc_numb        , line_seqn        , istt_wrhs_idcd   , item_idcd        , istt_pric
            , istt_qntt        , vatx_incl_yorn   , vatx_rate        , istt_amnt        , istt_vatx
            , ttsm_amnt        , krwn_pric        , krwn_amnt        , krwn_vatx        , krwn_amnt_totl
            , pric_dvcd        , cstm_idcd        , stnd_unit        , stnd_unit_qntt   , paym_dvcd
            , lott_numb        , sral_strt_numb   , sral_endd_numb   , remk_text        , prof_data
            , istt_insp_yorn   , insp_invc_numb   , insp_seqn        , insp_date        , insp_drtr_idcd   
			, insp_mthd_dvcd   , insp_qntt
            , msmt_valu        , pass_qntt        , poor_qntt        , poor_caus_dvcd   , judt_dvcd
            , orig_invc_numb   , orig_amnd_degr   , orig_seqn        , istt_yorn        , uper_seqn
            , disp_seqn                                                                 
            , user_memo        , sysm_memo        , prnt_idcd        , line_levl        , line_ordr
            , line_stat        , line_clos        , find_name                           
            , updt_user_name   , updt_ipad        , updt_dttm        , updt_idcd        , updt_urif
            , crte_user_name   , crte_ipad        , crte_dttm        , crte_idcd        , crte_urif
      	  )
      select  _new_invc_numb1  , a.line_seqn      ifnull(a.dvly_wrhs_idcd , i.istt_wrhs_idcd) as istt_wrhs_idcd
     	    , a.item_idcd      
			, od.offr_pric    
			, a.pass_qntt
			, od.vatx_incl_yorn 
			, od.vatx_rate      
			, ifnull(a.pass_qntt,0) * ifnull(od.offr_pric,0)                                             as istt_amnt
			, truncate(( ifnull(a.pass_qntt,0)   * ifnull(od.offr_pric,0) ) * ( od.vatx_rate / 100 ),-1) as istt_vatx
			, ifnull(a.pass_qntt,0) * ifnull(od.offr_pric,0) 
			  + truncate(( ifnull(a.pass_qntt,0) * ifnull(od.offr_pric,0) ) * ( od.vatx_rate / 100 ),-1) as ttsm_amnt
			, od.offr_pric                                                                               as krwn_pric
			, ifnull(a.pass_qntt,0) * ifnull(od.offr_pric,0)                                             as krwn_amnt
			, truncate(( ifnull(a.pass_qntt,0)   * ifnull(od.offr_pric,0) ) * ( od.vatx_rate / 100 ),-1) as krwn_vatx
			, ifnull(a.pass_qntt,0) * ifnull(od.offr_pric,0) 
			  + truncate(( ifnull(a.pass_qntt,0) * ifnull(od.offr_pric,0) ) * ( od.vatx_rate / 100 ),-1) as krwn_amnt_totl
			, od.pric_dvcd          as pric_dvcd   
			, om.cstm_idcd          as cstm_idcd
			, i.unit_idcd           as stnd_unit
			, a.pass_qntt           as stnd_unit_qntt
			, null                  as paym_dvcd
			, a.lott_numb           as lott_numb
			, null                  as sral_strt_numb
			, null                  as sral_endd_numb
			, null                  as remk_text
			, null                  as prof_data
			, '1'                   as istt_yorn
			, a.invc_numb           as insp_invc_numb
			, a.line_seqn           as insp_seqn
			, ifnull(a.invc_date, date_format(now(), '%Y%m%d') as insp_date
			, a.insp_drtr_idcd                                 as insp_ertr_idcd
			, ifnull(a.insp_mthd_dvcd, '2000')                 as insp_mthd_dvcd
			, a.insp_qntt           as insp_qntt
			, a.msmt_valu           as msmt_valu
			, a.pass_qntt           as pass_qntt
			, a.poor_qntt           as poor_qntt
			, a.poor_caus_dvcd      as poor_caus_dvcd
			, a.judt_dvcd           as judt_dvcd
			, a.orig_invc_numb      as orig_invc_numb
			, a.orig_amnd_degr      as orig_amnd_degr
			, a.orig_seqn           as orig_seqn
			, '1'                   as istt_yorn
			, a.uper_seqn           as uper_seqn
			, a.disp_seqn           as disp_seqn
			, null             , 'Auto Create Data'  , a.prnt_idcd      , a.line_levl       , a.line_ordr
            , '0'              , '0'              , a.find_name 
            , null             , null             , null             , null              , null
            , a.crte_user_name , a.crte_ipad      , date_format(now(), '%Y%m%d%H%i%s')   , a.crte_idcd 
            , a.crte_urif
      from purc_insp a	  
           left outer join purc_ordr_item od on a.orig_invc_numb = od.invc_numb and a.orig_seqn = od.line_seqn
           left outer join purc_ordr_mast om on a.orig_invc_numb = om.invc_numb
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
    select    _new_invc_numb1  
	        , date_format(now(), '%Y%m%d') 
	        , d.bzpl_idcd  
	        , max(a.dlvy_wrhs_idcd)      as istt_wrhs_idcd 
	        , 'D'                        as coun_iout_dvcd 
            , max(a.cstm_idcd)           as cstm_idcd      
            , max(a.cnfm_drtr_idcd)      as drtr_idcd        
			, max(a.cnfm_dept_idcd)      as dept_idcd        
			, sum(ifnull(a.pass_qntt,0)) as istt_qntt        
    		, (select max(r.vatx_incl_yorn)           from purc_istt_item r where r.invc_numb = _new_invc_numb1) as vatx_incl_yorn
    		, (select max(r.vatx_rate)                from purc_istt_item r where r.invc_numb = _new_invc_numb1) as vatx_incl_yorn
    		, (select sum(ifnull(r.istt_amnt,0))      from purc_istt_item r where r.invc_numb = _new_invc_numb1) as istt_amnt
    		, (select sum(ifnull(r.istt_vatx,0))      from purc_istt_item r where r.invc_numb = _new_invc_numb1) as istt_vatx
    		, (select sum(ifnull(r.ttsm_amnt,0))      from purc_istt_item r where r.invc_numb = _new_invc_numb1) as ttsm_amnt
    		, (select sum(ifnull(r.ttsm_amnt,0)) / sum(isnull(r.istt_qntt,0) from purc_istt_item r where r.invc_numb = _new_invc_numb1) as krwn_pric
    		, (select sum(ifnull(r.krwn_amnt,0))      from purc_istt_item r where r.invc_numb = _new_invc_numb1) as krwn_amnt
    		, (select sum(ifnull(r.krwn_vatx,0))      from purc_istt_item r where r.invc_numb = _new_invc_numb1) as krwn_vatx
    		, (select sum(ifnull(r.krwn_amnt_totl,0)) from purc_istt_item r where r.invc_numb = _new_invc_numb1) as krwn_amnt_totl
			, null                     as remk_text
            , null             , 'Auto Create Data(auto_item_rcpt_wrhs)', null      , 1       , 0
            , '0'              , '0'               , null 
            , null             , null              , null             , null              , null
            , null             , null              , date_format(now(), '%Y%m%d%H%i%s')   , a.crte_idcd 
            , null
    from    purc_insp a
            left outer join dept_mast d  on a.cnfm_dept_idcd = d.cstm_idcd
    where   a.invc_numb = _invc_numb
	group   by d.bzpl_idcd
    ;	 
	
	update purc_insp set istt_yorn = '1' ,  line_clos = '1'
	where  invc_numb = _invc_numb
	;
	
	call auto_isos_booking(_new_invc_numb1, '구매입고');  /* 수불대장 및 LOT 수불대장에 반영한다.(재고변동사항 반영 프로시져 모음 파일 참조할 것 ) */
  end;
end if;
		
end