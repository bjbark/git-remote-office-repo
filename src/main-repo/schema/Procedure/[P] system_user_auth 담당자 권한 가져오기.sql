-- call system_option()
drop procedure if exists  `system_option`;

CREATE PROCEDURE `system_option`(
  _hqof_idcd  varchar(50)
)
BEGIN
  DECLARE done INT DEFAULT FALSE;
select hqof_idcd
     , group_concat(if(auth_idcd = trim('acpt_fix_yorn              ') ,       optn_logc_valu , null)) as acpt_fix_yorn        /* 수주확정               */
     , group_concat(if(auth_idcd = trim('init_pswd                  ') ,       optn_etcc      , null)) as init_pswd            /* 초기비밀번호           */
     , group_concat(if(auth_idcd = trim('auto_spts_yorn             ') ,       optn_logc_valu , null)) as auto_spts_yorn       /* 자동출하지시           */
     , group_concat(if(auth_idcd = trim('istt_lott_yorn             ') ,       optn_logc_valu , null)) as istt_lott_yorn       /* 출고LOT대장작성        */
     , group_concat(if(auth_idcd = trim('mins_stok_yorn             ') ,       optn_logc_valu , null)) as mins_stok_yorn       /* 마이너스재고허용       */
     , group_concat(if(auth_idcd = trim('sale_item_yorn             ') ,       optn_logc_valu , null)) as sale_item_yorn       /* 건별매출처리           */
     , group_concat(if(auth_idcd = trim('purc_insp_yorn             ') ,       optn_logc_valu , null)) as purc_insp_yorn       /* 수입검사여부           */
     , group_concat(if(auth_idcd = trim('mtrl_lott_yorn             ') ,       optn_logc_valu , null)) as mtrl_lott_yorn       /* 자재LOT관리            */
     , group_concat(if(auth_idcd = trim('purc_ordr_fix_yorn         ') ,       optn_logc_valu , null)) as purc_ordr_fix_yorn   /* 발주확정               */
     , group_concat(if(auth_idcd = trim('item_adon_disp_yorn        ') ,       optn_logc_valu , null)) as item_adon_disp_yorn  /* 품목추가정보표시       */
     , group_concat(if(auth_idcd = trim('item_spec_disp_yorn        ') ,       optn_logc_valu , null)) as item_spec_disp_yorn  /* 품목속성정보표시       */
     , group_concat(if(auth_idcd = trim('insp_drtr_idcd             ') ,       code_idcd      , null)) as insp_drtr_idcd       /* 무검사입고담당         */
     , group_concat(if(auth_idcd = trim('dflt_hqof_idcd             ') ,       optn_char_valu , null)) as dflt_hqof_idcd       /* 본사ID                 */
     , group_concat(if(auth_idcd = trim('vatx_incl_yorn             ') ,       optn_logc_valu , null)) as vatx_incl_yorn       /* 부가세포함             */
     , group_concat(if(auth_idcd = trim('theme                      ') ,       optn_char_valu , null)) as theme                /* theme                  */
     , group_concat(if(auth_idcd = trim('item_popp_auto             ') ,       optn_logc_valu , null)) as item_popp_auto       /* 품목코드자동조회       */
     , group_concat(if(auth_idcd = trim('cstm_popp_auto             ') ,       optn_logc_valu , null)) as cstm_popp_auto       /* 거래처코드자동조회     */
     , group_concat(if(auth_idcd = trim('item_insp_type_yorn        ') ,       optn_logc_valu , null)) as item_insp_type_yorn  /* 품목검사유형지정       */
     , group_concat(if(auth_idcd = trim('insp_type_wkct_incl        ') ,       optn_logc_valu , null)) as insp_type_wkct_incl  /* 검사유형에 공정지정    */
     , group_concat(if(auth_idcd = trim('insp_item_ctq              ') ,       optn_logc_valu , null)) as insp_item_ctq        /* 검사항목_CTQ포함       */
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
from (
       select user_idcd  , auth_idcd    , auth_name              
            , 1  as optn_logc_valu
        from user_auth
		where user_idcd = _user_idcd
      )    a
group by hqof_idcd
;
end