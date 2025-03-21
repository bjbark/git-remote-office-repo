select hqof_idcd
     , group_concat(if(optn_idcd = '수주확정'         , optn_logc_valu , null)) as acpt_fix_yorn
     , group_concat(if(optn_idcd = '초기비밀번호'     , optn_etcc      , null)) as init_pswd
     , group_concat(if(optn_idcd = '자동출하지시'     , optn_logc_valu , null)) as auto_spts_yorn
     , group_concat(if(optn_idcd = '출고LOT대장작성'  , optn_logc_valu , null)) as istt_lott_yorn
     , group_concat(if(optn_idcd = '마이너스재고허용' , optn_logc_valu , null)) as mins_stok_yorn
     , group_concat(if(optn_idcd = '건별매출처리'     , optn_logc_valu , null)) as sale_item_yorn
     , group_concat(if(optn_idcd = '수입검사여부'     , optn_logc_valu , null)) as purc_insp_yorn
     , group_concat(if(optn_idcd = '자재LOT관리'      , optn_logc_valu , null)) as mtrl_lott_yorn
     , group_concat(if(optn_idcd = '발주확정'         , optn_logc_valu , null)) as purc_ordr_fix_yorn
     , group_concat(if(optn_idcd = '품목추가정보표시' , optn_logc_valu , null)) as item_adon_disp_yorn
     , group_concat(if(optn_idcd = '품목속성정보표시' , optn_logc_valu , null)) as item_spec_disp_yorn
     , group_concat(if(optn_idcd = '무검사입고담당'   , code_idcd      , null)) as insp_drtr_idcd
     , group_concat(if(optn_idcd = '본사ID'           , optn_char_valu , null)) as dflt_hqof_idcd
     , group_concat(if(optn_idcd = '부가세포함'       , optn_logc_valu , null)) as vatx_incl_yorn
     , group_concat(if(optn_idcd = 'theme'            , optn_char_valu , null)) as theme
from (
       select prjt_idcd  , optn_idcd    , hqof_idcd         , optn_name              
            , clss_1fst  , clss_2snd    , clss_3trd         , optn_desc
            , case when optn_logc_valu  in ('예', 'y','Y','Yes','YES','yes') then 1 else 0 end as optn_logc_valu
            , case when optn_yorn_valu  in ('예', 'y','Y','Yes','YES','yes') then 1 else 0 end as optn_yorn_valu
            , optn_nmbr_valu            , optn_char_valu    , optn_scpe_from  , optn_scpe_util
            , optn_etcc  , code_idcd
        from optn_mast
      )    a
group by hqof_idcd


			acpt_fix_yorn		: true,     /* 수주확정			*/       
			init_pswd			: '',       /* 초기비밀번호		*/   
			auto_spts_yorn		: false,    /* 자동출하지시		*/   
			istt_lott_yorn		: true,     /* 출고LOT대장작성	*/
			mins_stok_yorn		: true,     /* 마이너스재고허용	*/
			sale_item_yorn		: true,     /* 건별매출처리		*/   
			purc_insp_yorn		: true,     /* 수입검사여부		*/
			mtrl_lott_yorn		: true,     /* 자재LOT관리		*/
			purc_ordr_fix_yorn	: true,     /* 발주확정			*/
			item_adon_disp_yorn	: false,    /* 품목추가정보표시	*/
			item_spec_disp_yorn	: true,     /* 품목속성정보표시	*/
			insp_drtr_idcd		: '',       /* 무검사입고담당	*/
			dflt_hqof_idcd		: '',       /* 본사ID			*/
			vatx_incl_yorn		: true,     /* 부가세포함		*/
			theme				: '',       /* theme			*/




			.query("select hqof_idcd																									")
			.query("	, group_concat(if(optn_idcd = '수주확정'         , optn_logc_valu , null)) as acpt_fix_yorn						")
			.query("	, group_concat(if(optn_idcd = '초기비밀번호'     , optn_etcc      , null)) as init_pswd							")
			.query("	, group_concat(if(optn_idcd = '자동출하지시'     , optn_logc_valu , null)) as auto_spts_yorn					")
			.query("	, group_concat(if(optn_idcd = '출고LOT대장작성'  , optn_logc_valu , null)) as istt_lott_yorn					")
			.query("	, group_concat(if(optn_idcd = '마이너스재고허용' , optn_logc_valu , null)) as mins_stok_yorn					")
			.query("	, group_concat(if(optn_idcd = '건별매출처리'     , optn_logc_valu , null)) as sale_item_yorn					")
			.query("	, group_concat(if(optn_idcd = '수입검사여부'     , optn_logc_valu , null)) as purc_insp_yorn					")
			.query("	, group_concat(if(optn_idcd = '자재LOT관리'      , optn_logc_valu , null)) as mtrl_lott_yorn					")
			.query("	, group_concat(if(optn_idcd = '발주확정'         , optn_logc_valu , null)) as purc_ordr_fix_yorn				")
			.query("	, group_concat(if(optn_idcd = '품목추가정보표시' , optn_logc_valu , null)) as item_adon_disp_yorn				")
			.query("	, group_concat(if(optn_idcd = '품목속성정보표시' , optn_logc_valu , null)) as item_spec_disp_yorn				")
			.query("	, group_concat(if(optn_idcd = '무검사입고담당'   , code_idcd      , null)) as insp_drtr_idcd					")
			.query("	, group_concat(if(optn_idcd = '본사ID'           , optn_char_valu , null)) as dflt_hqof_idcd					")
			.query("	, group_concat(if(optn_idcd = '부가세포함'       , optn_logc_valu , null)) as vatx_incl_yorn					")
			.query("	, group_concat(if(optn_idcd = 'theme'            , optn_char_valu , null)) as theme								")
			.query("from (																												")
			.query("	select prjt_idcd  , optn_idcd    , hqof_idcd         , optn_name              									")
			.query("			, clss_1fst  , clss_2snd    , clss_3trd         , optn_desc												")
			.query("			, case when optn_logc_valu  in ('예', 'y','Y','Yes','YES','yes') then 1 else 0 end as optn_logc_valu	")
			.query("			, case when optn_yorn_valu  in ('예', 'y','Y','Yes','YES','yes') then 1 else 0 end as optn_yorn_valu	")
			.query("			, optn_nmbr_valu            , optn_char_valu    , optn_scpe_from  , optn_scpe_util						")
			.query("			, optn_etcc  , code_idcd																				")
			.query("		from optn_mast																								")
			.query("	)    a																											")
			.query("group by hqof_idcd																									")
