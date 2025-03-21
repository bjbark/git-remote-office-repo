Ext.define('module.custom.komec.item.itemlist.model.ItemList', { extend:'Axt.data.Model',
	fields: [
		{	name: 'item_idcd'			, type: 'string' },		//품목ID
		{	name: 'line_seqn'			, type: 'float'   , defaultValue : 1},		//순번
		{	name: 'item_code'			, type: 'string' },		//품목코드
		{	name: 'unit_name'			, type: 'string'  ,	defaultValue:'Kg' },	//수불단위
		{	name: 'unit_name'			, type: 'string'  ,	defaultValue:'Kg' },	//수불단위
		{	name: 'item_brcd_1fst'		, type: 'string' },		//품목바코드1
		{	name: 'item_brcd_2snd'		, type: 'string' },		//품목바코드2
		{	name: 'item_brcd_3rrd'		, type: 'string' },		//품목바코드3
		{	name: 'sale_psbl_yorn'		, type: 'string' },		//판매여부
		{	name: 'item_name'			, type: 'string' },		//품명
		{	name: 'item_spec'			, type: 'string' },		//품목규격
		{	name: 'modl_name'			, type: 'string' },		//모델명
		{	name: 'lcls_idcd'			, type: 'string' },		//대분류id
		{	name: 'mcls_idcd'			, type: 'string' },		//중분류id
		{	name: 'scls_idcd'			, type: 'string' },		//소분류id
		{	name: 'lcls_name'			, type: 'string' },		//대분류id
		{	name: 'mcls_name'			, type: 'string' },		//중분류id
		{	name: 'scls_name'			, type: 'string' },		//소분류id
		{	name: 'clss_desc'			, type: 'string' },		//품목분류
		{	name: 'acct_bacd'			, type: 'string' },		//자산분류구분코드
		{	name: 'acct_bacd_name'		, type: 'string' },		//자산분류구분코드
		{	name: 'item_stnm'			, type: 'string' },		//품목약칭
		{	name: 'item_egnm'			, type: 'string' },		//품목영문명
		{	name: 'item_egnm_stnm'		, type: 'string' },		//품목영문명약칭
		{	name: 'vatx_dvcd'			, type: 'string' },		//부가세구분코드
		{	name: 'vatx_incl_yorn'		, type: 'string' },		//부가세포함여부
		{	name: 'lott_idnf_code'		, type: 'string' },		//LOT식별
		{	name: 'optn_item_yorn'		, type: 'string' },		//옵션품목여부
		{	name: 'sets_item_yorn'		, type: 'string' },		//세트품목여부
		{	name: 'roll_mngt_yorn'		, type: 'string' },		//roll관리여부
		{	name: 'stok_mngt_yorn'		, type: 'string' },		//재고관리여부
		{	name: 'lott_mngt_yorn'		, type: 'string' },		//lot관리여부
		{	name: 'spal_mngt_yorn'		, type: 'string' },		//시리얼관리여부
		{	name: 'insp_objt_yorn'		, type: 'string' },		//검사대상여부
		{	name: 'insp_type_idcd'		, type: 'string' },		//검사유형id
		{	name: 'insp_type_name'		, type: 'string' },		//검사유형명
		{	name: 'insp_mthd_dvcd'		, type: 'string' },		//검사방법구분코드
		{	name: 'smpl_stnd_dvcd'		, type: 'string' },		//샘플링기준구분코드
		{	name: 'insp_levl_dvcd'		, type: 'string' },		//검사수준구분코드
		{	name: 'shpm_insp_yorn'		, type: 'string' },		//출고검사여부
		{	name: 'rcpt_insp_yorn'		, type: 'string' },		//인수검사여부
		{	name: 'istt_wrhs_name'		, type: 'string' },		//창고코드명
		{	name: 'ostt_wrhs_name'		, type: 'string' },		//창고명
		{	name: 'wrhs_code'			, type: 'string' },		//창고코드
		{	name: 'istt_wrhs_idcd'		, type: 'string' },		//입고창고id
		{	name: 'ostt_wrhs_idcd'		, type: 'string' },		//출고창고id
		{	name: 'rtil_ddln_dcnt'		, type: 'float'  },		//유통기한일수
		{	name: 'rtil_ddln_dvcd'		, type: 'string' },		//유통기한구분코드
		{	name: 'stun_exng_volm'		, type: 'float'	, defaultValue : 0},		//기준단위환산량
		{	name: 'spal_idnf_code'		, type: 'string' },		//시리얼식별코드
		{	name: 'ndqt_calc_dvcd'		, type: 'string' },		//소요량계산구분
		{	name: 'otod_loss_rate'		, type: 'float'	, defaultValue : 0 },		//외주LOSS율
		{	name: 'ostt_mthd_dvcd'		, type: 'string' },		//출고방법구분코드
		{	name: 'incm_loss_rate'		, type: 'float'	, defaultValue : 0},		//사내LOSS율
		{	name: 'coun_iout_dvcd'		, type: 'string' },		//내외자구분코드
		{	name: 'auto_istt_yorn'		, type: 'string' },		//자동입고여부
		{	name: 'item_imge'			, type: 'string' },		//이미지1
		{	name: 'item_imge2'			, type: 'string' },		//이미지2
//		{	name: 'clss_idcd'			, type: 'string' },		//품목분류			(item_class)
//		{	name: 'clss_code'			, type: 'string' },		//품목분류			(item_class)
		{	name: 'cstm_idcd'			, type: 'string' },		//거래처				(purc_adon)
		{	name: 'cstm_name'			, type: 'string' },		//거래처				(purc_adon)
		{	name: 'make_cmpy_name'		, type: 'string' },		//제조회사			(item_purc)
		{	name: 'base_vend_idcd'		, type: 'string' },		//기본구매처			(item_purc)
		{	name: 'base_vend_name'		, type: 'string' },		//기본구매처
		{	name: 'minm_puch_qntt'		, type: 'float'	, defaultValue : 0},		//최소구매수량			(item_purc)
		{	name: 'puch_itvl_qntt'		, type: 'float'	, defaultValue : 0},		//구매간격수량			(item_purc)
		{	name: 'avrg_supl_dcnt'		, type: 'float'	, defaultValue : 0},		//평균조달일수			(item_purc)
		{	name: 'optm_offr_volm'		, type: 'float'	, defaultValue : 0 },		//적정발주량				(item_purc)
		{	name: 'sale_drtr_idcd'		, type: 'string' },		//영업담당자			(cstm_mast)
		{	name: 'item_idcd'			, type: 'string' },		//(item_adon)
		{	name: 'colr_bacd'			, type: 'string' },		//컬러분류코드		(item_adon)
		{	name: 'colr_bacd_name'		, type: 'string' },		//(item_adon)
//		{	name: 'cstm_idcd'			, type: 'string' },		//(item_adon)
		{	name: 'wkfw_idcd'			, type: 'string' },		//공정흐름ID			(item_adon)
		{	name: 'wkfw_name'			, type: 'string' },		//공정흐름명			(item_adon)
		{	name: 'prod_type_dvcd'		, type: 'string' },		//생산유형구분코드	(item_adon)
		{	name: 'optn_dvcd'			, type: 'string' },		//사양구분코드		(item_adon)
		{	name: 'optm_prod_volm'		, type: 'float'	, defaultValue : 0},		//적정생산량		(item_adon)
		{	name: 'last_insp_yorn'		, type: 'string' },		//최종검사여부		(item_adon)
		{	name: 'dplt_name'			, type: 'string' },		//단프라명			(item_adon)
		{	name: 'cstm_dplt_name'		, type: 'string' },		//고객단프라명		(item_adon)
		{	name: 'expt_boxx_sort'		, type: 'float'  },		//수출박스정렬		(item_adon)
		{	name: 'expt_boxx_wtfl'		, type: 'float'  },		//수출박스물결		(item_adon)
		{	name: 'dplt_sort'			, type: 'float'  },		//단프라정렬			(item_adon)
		{	name: 'dplt_wtfl'			, type: 'float'  },		//단프라물결			(item_adon)
		{	name: 'dplt_bulk'			, type: 'float'  },		//단프라벌크			(item_adon)
		{	name: 'cstm_pper_boxx'		, type: 'float'  },		//고객종이박스		(item_adon)
		{	name: 'cstm_dplt'			, type: 'float'  },		//고객단프라			(item_adon)
		{	name: 'midl_boxx'			, type: 'float'  },		//중박스				(item_adon)
		{	name: 'larg_boxx'			, type: 'float'  },		//대박스				(item_adon)
		{	name: 'tray'				, type: 'float'  },		//트레이				(item_adon)
		{	name: 'cotn_optn_base'		, type: 'string' },		//(item_adon)
		{	name: 'cotn_optn_topp'		, type: 'string' },		//(item_adon)
		{	name: 'ejac_item_idcd'		, type: 'string' },		//(item_adon)
		{	name: 'mold_idcd'			, type: 'string' },		//(item_adon)
		{	name: 'mold_name'			, type: 'string' },		//(item_adon)
		{	name: 'runr_wigt'			, type: 'float'  , defaultValue : 0 },		//(item_adon)
		{	name: 'prod_wigt'			, type: 'float'  , defaultValue : 0  },		//(item_adon)
		{	name: 'cycl_time'			, type: 'float'  , defaultValue : 0  },		//(item_adon)
		{	name: 'mtrl_bacd'			, type: 'string' },		//(item_adon)
		{	name: 'mtrl_bacd_name'		, type: 'string' },		//(item_adon)
		{	name: 'cont_pric'			, type: 'float'  },		//계약단가		(item_cont)
		{	name: 'cont_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//계약일자(item_cont)
		{	name: 'deli_dcnt'			, type: 'int'    , defaultValue : 0},		//납기일수		(item_cont)
		{	name: 'trnt_mthd_dvcd'		, type: 'string' },		//운송방법		(item_cont)
		{	name: 'drtr_idcd'			, type: 'string' },		//담당자			(item_cont)
		{	name: 'cont_drtr_idcd'		, type: 'string' },		//담당자			(item_cont)
		{	name: 'cont_cstm_idcd'		, type: 'string' },		//담당자			(item_cont)
		{	name: 'drtr_name'			, type: 'string' },		//담당자			(item_cont)
		{	name: 'cont_drtr_name'		, type: 'string' },		//담당자			(item_cont)
		{	name: 'cont_cstm_name'		, type: 'string' },		//담당자			(item_cont)
		{	name: 'ftmr_insp_yorn'		, type: 'string' },		//초물검사여부		(item_cont)
		{	name: 'mdmr_insp_yorn'		, type: 'string' },		//중물검사여부		(item_cont)
		{	name: 'ltmr_insp_yorn'		, type: 'string' },		//종물검사여부		(item_cont)
		{	name: 'cont_degr'			, type: 'string' },		//계약차수		(item_cont)
		{	name: 'coun_iout_dvcd'		, type: 'string' },		//내외자구분(국내/수입)	(item_purc)
		{	name: 'user_idcd'			, type: 'string' },		//사용자코드
		{	name: 'sale_user_name'		, type: 'string' },		//영업담당자
		{	name: 'user_name'			, type: 'string' },		//구매담당자
		{	name: 'pkge_name'			, type: 'string' },		//포장분류명
		{	name: 'item_pkge_01'		, type: 'float'  },		//박스
		{	name: 'item_pkge_02'		, type: 'float'  },		//박스
		{	name: 'item_pkge_03'		, type: 'float'  },		//박스
		{	name: 'item_pkge_04'		, type: 'float'  },		//박스
		{	name: 'item_pkge_05'		, type: 'float'  },		//박스
		{	name: 'item_pkge_06'		, type: 'float'  },		//박스
		{	name: 'item_pkge_07'		, type: 'float'  },		//박스
		{	name: 'item_pkge_08'		, type: 'float'  },		//박스
		{	name: 'item_pkge_09'		, type: 'float'  },		//박스
		{	name: 'item_pkge_10'		, type: 'float'  },		//박스
		{	name: 'item_pkge_11'		, type: 'float'  },		//박스
		{	name: 'item_pkge_12'		, type: 'float'  },		//박스
		{	name: 'item_pkge_13'		, type: 'float'  },		//박스
		{	name: 'invc_date1'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//수정일시
		{	name: 'invc_date2'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//수정일시
		{	name: 'invc_date3'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//수정일시
		{	name: 'invc_date4'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//수정일시


		{	name: 'shpm_pric_1fst'		, type: 'float' , defaultValue : 0},		//출고단가1
		{	name: 'shpm_pric_2snd'		, type: 'float' , defaultValue : 0},		//출고단가2
		{	name: 'shpm_pric_3trd'		, type: 'float' , defaultValue : 0},		//출고단가3
		{	name: 'shpm_pric_4frt'		, type: 'float' , defaultValue : 0},		//출고단가4
		{	name: 'shpm_pric_5fit'		, type: 'float' , defaultValue : 0},		//출고단가5
		{	name: 'cnsr_pric'			, type: 'float' , defaultValue : 0},		//소비자단가
		{	name: 'puch_pric'			, type: 'float' , defaultValue : 0},		//구매단가


		{	name: 'leng_unit'			, type: 'string' },		//길이속성단위
		{	name: 'leng_valu'			, type: 'float'  },		//길이값
		{	name: 'leng_valu_2snd'		, type: 'float'  },		//길이값2
		{	name: 'leng_valu_2snd'		, type: 'float'  },		//길이값2
		{	name: 'widh_unit'			, type: 'string' },		//폭속성단위
		{	name: 'widh_valu'			, type: 'float'  },		//폭값
		{	name: 'tick_unit'			, type: 'string' },		//두께속성단위
		{	name: 'tick_valu'			, type: 'float'  },		//두께값
		{	name: 'spgr_unit'			, type: 'string' },		//비중속성단위
		{	name: 'spgr_valu'			, type: 'float'  },		//비중값
		{	name: 'item_wigt'			, type: 'float'  },		//품목중량
		{	name: 'unit_name2'			, type: 'string' },		//단위ID
		{	name: 'unit_idcd2'			, type: 'string' },		//단위명
		{	name: 'drwg_numb'			, type: 'string' },		//도면번호
		{	name: 'ansi_name'			, type: 'string' },		//ANSI호칭
		{	name: 'ansi_mntn_qntt'		, type: 'float'  },		//ANSI산수
		{	name: 'bolt_name'			, type: 'float'  },		//나사호칭
		{	name: 'bolt_pith'			, type: 'float'  },		//나사피치
		{	name: 'half_pith'			, type: 'float'  },		//반피치
		{	name: 'sinn_valu'			, type: 'float'  },		//SIN값
		{	name: 'a_valu'				, type: 'float'  },		//A값
		{	name: 'b_valu'				, type: 'float'  },		//B값
		{	name: 'bolt_dpth'			, type: 'float'  },		//나사깊이
		{	name: 'mntn_dpth'			, type: 'float'  },		//산깊이
		{	name: 'lead_angl'			, type: 'float'  },		//리드각
		{	name: 'lead_angl_stte'		, type: 'integer'},		//리드각도
		{	name: 'lead_angl_mint'		, type: 'integer'},		//리드각분
		{	name: 'tper_dpth'			, type: 'float'  },		//taper깊이
		{	name: 'tper_leng'			, type: 'float'  },		//taper길이
		{	name: 'tper_angl'			, type: 'float'  },		//taper각
		{	name: 'tper_angl_stte'		, type: 'integer'},		//taper각도
		{	name: 'tper_angl_mint'		, type: 'integer'},		//taper각분
		{	name: 'a_valu_scpe'			, type: 'string' },		//a값범위
		{	name: 'b_valu_scpe'			, type: 'string' },		//b값범위
		{	name: 'mntn_dpth_scpe'		, type: 'string' },		//산깊이범위
		{	name: 'plat_optn'			, type: 'string' },		//도금사양
		{	name: 'tolr_valu'			, type: 'float'  },		//공차
		{	name: 'imge_chek1'			, type: 'string' },		//단위명
		{	name: 'imge_chek2'			, type: 'string' },		//단위명
		{	name: 'user_memo'			, type: 'string' },		//사용자메모
		{	name: 'sysm_memo'			, type: 'string' },		//시스템메모
		{	name: 'prnt_idcd'			, type: 'string' },		//부모ID
		{	name: 'line_levl'			, type: 'float'   , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr'			, type: 'string' },		//ROW순서
		{	name: 'line_stat'			, type: 'string'  , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos'			, type: 'string' },		//ROW마감
		{	name: 'find_name'			, type: 'string' },		//찾기명
		{	name: 'updt_user_name'		, type: 'string' },		//수정사용자명
		{	name: 'updt_ipad'			, type: 'string' },		//수정IP
		{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//수정일시
		{	name: 'updt_idcd'			, type: 'string' },		//수정ID
		{	name: 'updt_urif'			, type: 'string' },		//수정UI
		{	name: 'crte_user_name'		, type: 'string' },		//생성사용자명
		{	name: 'crte_ipad'			, type: 'string' },		//생성IP
		{	name: 'crte_dttm'			, type: 'string' },		//생성일시
		{	name: 'crte_idcd'			, type: 'string' },		//생성ID
		{	name: 'crte_urif'			, type: 'string' },		//생성UI
	]
});

