-- call system_option()
drop procedure if exists  `system_option`;

CREATE PROCEDURE `system_option`(
  _hqof_idcd  varchar(50)
)
BEGIN
  DECLARE done INT DEFAULT FALSE;
select hqof_idcd
/*
     , group_concat(if(optn_idcd = '수주확정'              , optn_logc_valu , null)) as acpt_fix_yorn
     , group_concat(if(optn_idcd = '초기비밀번호'          , optn_etcc      , null)) as init_pswd
     , group_concat(if(optn_idcd = '자동출하지시'          , optn_logc_valu , null)) as auto_spts_yorn
     , group_concat(if(optn_idcd = '출고LOT대장작성'       , optn_logc_valu , null)) as istt_lott_yorn
     , group_concat(if(optn_idcd = '마이너스재고허용'      , optn_logc_valu , null)) as mins_stok_yorn
     , group_concat(if(optn_idcd = '건별매출처리'          , optn_logc_valu , null)) as sale_item_yorn
     , group_concat(if(optn_idcd = '수입검사여부'          , optn_logc_valu , null)) as purc_insp_yorn
     , group_concat(if(optn_idcd = '자재LOT관리'           , optn_logc_valu , null)) as mtrl_lott_yorn
     , group_concat(if(optn_idcd = '발주확정'              , optn_logc_valu , null)) as purc_ordr_fix_yorn
     , group_concat(if(optn_idcd = '품목추가정보표시'      , optn_logc_valu , null)) as item_adon_disp_yorn
     , group_concat(if(optn_idcd = '품목속성정보표시'      , optn_logc_valu , null)) as item_spec_disp_yorn
     , group_concat(if(optn_idcd = '무검사입고담당'        , code_idcd      , null)) as insp_drtr_idcd
     , group_concat(if(optn_idcd = '본사ID'                , optn_char_valu , null)) as dflt_hqof_idcd
     , group_concat(if(optn_idcd = '부가세포함'            , optn_logc_valu , null)) as vatx_incl_yorn
     , group_concat(if(optn_idcd = 'theme'                 , optn_char_valu , null)) as theme
     , group_concat(if(optn_idcd = '품목코드자동조회'      , optn_logc_valu , null)) as item_popp_auto
     , group_concat(if(optn_idcd = '거래처코드자동조회'    , optn_logc_valu , null)) as cstm_popp_auto
     , group_concat(if(optn_idcd = '품목검사유형지정'      , optn_logc_valu , null)) as item_insp_type_yorn
*/
     , group_concat(if(optn_idcd = trim('acpt_fix_yorn              ') ,       optn_logc_valu , null)) as acpt_fix_yorn        /* 수주확정               */
     , group_concat(if(optn_idcd = trim('init_pswd                  ') ,       optn_etcc      , null)) as init_pswd            /* 초기비밀번호           */
     , group_concat(if(optn_idcd = trim('auto_spts_yorn             ') ,       optn_logc_valu , null)) as auto_spts_yorn       /* 자동출하지시           */
     , group_concat(if(optn_idcd = trim('istt_lott_yorn             ') ,       optn_logc_valu , null)) as istt_lott_yorn       /* 출고LOT대장작성        */
     , group_concat(if(optn_idcd = trim('mins_stok_yorn             ') ,       optn_logc_valu , null)) as mins_stok_yorn       /* 마이너스재고허용       */
     , group_concat(if(optn_idcd = trim('sale_item_yorn             ') ,       optn_logc_valu , null)) as sale_item_yorn       /* 건별매출처리           */
     , group_concat(if(optn_idcd = trim('purc_insp_yorn             ') ,       optn_logc_valu , null)) as purc_insp_yorn       /* 수입검사여부           */
     , group_concat(if(optn_idcd = trim('mtrl_lott_yorn             ') ,       optn_logc_valu , null)) as mtrl_lott_yorn       /* 자재LOT관리            */
     , group_concat(if(optn_idcd = trim('purc_ordr_fix_yorn         ') ,       optn_logc_valu , null)) as purc_ordr_fix_yorn   /* 발주확정               */
     , group_concat(if(optn_idcd = trim('item_adon_disp_yorn        ') ,       optn_logc_valu , null)) as item_adon_disp_yorn  /* 품목추가정보표시       */
     , group_concat(if(optn_idcd = trim('item_spec_disp_yorn        ') ,       optn_logc_valu , null)) as item_spec_disp_yorn  /* 품목속성정보표시       */
     , group_concat(if(optn_idcd = trim('insp_drtr_idcd             ') ,       code_idcd      , null)) as insp_drtr_idcd       /* 무검사입고담당         */
     , group_concat(if(optn_idcd = trim('dflt_hqof_idcd             ') ,       optn_char_valu , null)) as dflt_hqof_idcd       /* 본사ID                 */
     , group_concat(if(optn_idcd = trim('vatx_incl_yorn             ') ,       optn_logc_valu , null)) as vatx_incl_yorn       /* 부가세포함             */
     , group_concat(if(optn_idcd = trim('theme                      ') ,       optn_char_valu , null)) as theme                /* theme                  */
     , group_concat(if(optn_idcd = trim('item_popp_auto             ') ,       optn_logc_valu , null)) as item_popp_auto       /* 품목코드자동조회       */
     , group_concat(if(optn_idcd = trim('cstm_popp_auto             ') ,       optn_logc_valu , null)) as cstm_popp_auto       /* 거래처코드자동조회     */
     , group_concat(if(optn_idcd = trim('item_insp_type_yorn        ') ,       optn_logc_valu , null)) as item_insp_type_yorn  /* 품목검사유형지정       */
     , group_concat(if(optn_idcd = trim('insp_type_wkct_incl        ') ,       optn_logc_valu , null)) as insp_type_wkct_incl  /* 검사유형에 공정지정    */
     , group_concat(if(optn_idcd = trim('insp_item_ctq              ') ,       optn_logc_valu , null)) as insp_item_ctq        /* 검사항목_CTQ포함       */
     , group_concat(if(optn_idcd = trim('insp_item_mthd             ') ,       optn_logc_valu , null)) as insp_item_mthd       /* 검사항목_검사항목포함  */
     , group_concat(if(optn_idcd = trim('insp_item_levl             ') ,       optn_logc_valu , null)) as insp_item_levl       /* 검사항목_검사수준포함  */
     , group_concat(if(optn_idcd = trim('insp_item_lot              ') ,       optn_logc_valu , null)) as insp_item_lot        /* 검사항목_lot판정기준사용  */
     , group_concat(if(optn_idcd = trim('insp_item_goal             ') ,       optn_logc_valu , null)) as insp_item_goal       /* 검사항목_목표수준사용  */
     , group_concat(if(optn_idcd = trim('insp_item_uppr             ') ,       optn_logc_valu , null)) as insp_item_uppr       /* 검사항목_상한값사용  */
     , group_concat(if(optn_idcd = trim('insp_item_lwlt             ') ,       optn_logc_valu , null)) as insp_item_lwlt       /* 검사항목_하한값사용  */
     , group_concat(if(optn_idcd = trim('haccp_item_yorn            ') ,       optn_logc_valu , null)) as haccp_item_yorn      /* HACCP 항목 표시여부  */
from (
       select prjt_idcd  , optn_idcd    , hqof_idcd         , optn_name              
            , clss_1fst  , clss_2snd    , clss_3trd         , optn_desc
            , case when optn_logc_valu  in ('예', 'y','Y','Yes','YES','yes') then 1 else 0 end as optn_logc_valu
            , case when optn_yorn_valu  in ('예', 'y','Y','Yes','YES','yes') then 1 else 0 end as optn_yorn_valu
            , optn_nmbr_valu            , optn_char_valu    , optn_scpe_from  , optn_scpe_util
            , optn_etcc  , code_idcd
        from optn_mast
		where hqof_idcd = _hqof_idcd
      )    a
group by hqof_idcd
;
end