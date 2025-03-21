Ext.define('module.custom.kortc.item.itemmast.model.ItemMast', { extend:'Axt.data.Model',
	fields: [
		{	name: 'item_idcd'			, type: 'string' },		//품목ID
		{	name: 'line_seqn'			, type: 'float'   , defaultValue : 1},		//순번
		{	name: 'item_code'			, type: 'string' },		//품목코드
		{	name: 'unit_idcd'			, type: 'string' },		//수불단위
		{	name: 'unit_name'			, type: 'string' },		//수불단위
		{	name: 'unit_code'			, type: 'string' },		//단위코드
		{	name: 'item_brcd_1fst'		, type: 'string' },		//품목바코드1
		{	name: 'item_brcd_2snd'		, type: 'string' },		//품목바코드2
		{	name: 'item_brcd_3rrd'		, type: 'string' },		//품목바코드3
		{	name: 'cstm_item_spec'		, type: 'string' },		//거래처규격
		{	name: 'item_name'			, type: 'string' },		//품명
		{	name: 'json_data'			, type: 'string' },		//json
		{	name: 'item_spec'			, type: 'string' },		//품목규격
		{	name: 'brnd_bacd'			, type: 'string' },		//브랜드분류
		{	name: 'brnd_name'			, type: 'string' },		//브랜드분류
		{	name: 'modl_name'			, type: 'string' },		//모델명
		{	name: 'supl_dvcd'			, type: 'string' },		//조달방법
		{	name: 'safe_stok'			, type: 'float' },		//안전재고
		{	name: 'lcls_idcd'			, type: 'string' },		//대분류id
		{	name: 'mcls_idcd'			, type: 'string' },		//중분류id
		{	name: 'scls_idcd'			, type: 'string' },		//소분류id
		{	name: 'lcls_name'			, type: 'string' },		//대분류id
		{	name: 'mcls_name'			, type: 'string' },		//중분류id
		{	name: 'scls_name'			, type: 'string' },		//소분류id
		{	name: 'mker_name'			, type: 'string' },		//제조사명
		{	name: 'clss_desc'			, type: 'string' },		//품목분류
		{	name: 'acct_bacd'			, type: 'string' },		//계정분류구분코드
		{	name: 'acct_bacd_name'		, type: 'string' },		//계정구분
		{	name: 'cstm_itid'			, type: 'string' },		//거래처품번
		{	name: 'cstm_item_name'		, type: 'string' },		//거래처품명
		{	name: 'cstm_spec'			, type: 'string' },		//거래처규격
		{	name: 'crty_bacd'			, type: 'string' },		//차종구분
		{	name: 'crty_bacd_name'		, type: 'string' },		//차종구분명
		{	name: 'dely_cstm_itid'		, type: 'string' },		//납품처품번
		{	name: 'dely_cstm_item_name'	, type: 'string' },		//납품처품명
		{	name: 'dely_cstm_spec'		, type: 'string' },		//납품처규격
		{	name: 'dely_cstm_modl'		, type: 'string' },		//납품처모델
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
		{	name: 'puch_pric'			, type: 'float'	, defaultValue : 0},		//안전납기
		{	name: 'istt_wrhs_name'		, type: 'string' },		//창고코드명
		{	name: 'istt_wrhs_name1'		, type: 'string' },		//생산정보창고코드명
		{	name: 'ostt_wrhs_name'		, type: 'string' },		//창고명
		{	name: 'wrhs_code'			, type: 'string' },		//창고코드
		{	name: 'istt_wrhs_idcd'		, type: 'string' },		//입고창고id
		{	name: 'istt_wrhs_idcd1'		, type: 'string' },		//생산정보의 입고창고id
		{	name: 'ostt_wrhs_idcd'		, type: 'string' },		//출고창고id
		{	name: 'safe_deli_dcnt'		, type: 'float'  },		//안전납기일수
		{	name: 'rtil_ddln_dcnt'		, type: 'float'  },		//유통기한일수
		{	name: 'rtil_ddln_dvcd'		, type: 'string' },		//유통기한구분코드
		{	name: 'stun_exng_volm'		, type: 'float'	, defaultValue : 0},		//기준단위환산량
		{	name: 'spal_idnf_code'		, type: 'string' },		//시리얼식별코드
		{	name: 'ndqt_calc_dvcd'		, type: 'string' },		//소요량계산구분
		{	name: 'otod_loss_rate'		, type: 'float'	, defaultValue : 0 },		//외주LOSS율
		{	name: 'ostt_mthd_dvcd'		, type: 'string' },		//출고방법구분코드
		{	name: 'incm_loss_rate'		, type: 'float'	, defaultValue : 0},		//사내LOSS율
		{	name: 'coun_iout_dvcd'		, type: 'string' },		//내외자구분코드
		{	name: 'item_mtrl'			, type: 'string' },		//내외자구분코드
		{	name: 'auto_istt_yorn'		, type: 'string' },		//자동입고여부
		{	name: 'item_imge'			, type: 'string' },		//이미지1
		{	name: 'item_imge2'			, type: 'string' },		//이미지2
		{	name: 'cstm_idcd'			, type: 'string' },		//거래처				(purc_adon)
		{	name: 'zone_idcd'			, type: 'string' },		//보관위치
		{	name: 'zone_name'			, type: 'string' },		//보관위치명
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
		{	name: 'wkfw_idcd'			, type: 'string' },		//공정흐름ID
		{	name: 'wkfw_idcd2'			, type: 'string' },		//공정흐름ID			(item_adon)
		{	name: 'wkfw_name'			, type: 'string' },		//공정흐름명
		{	name: 'wkfw_name2'			, type: 'string' },		//공정흐름명			(item_adon)
		{	name: 'prod_type_dvcd'		, type: 'string' },		//생산유형구분코드	(item_adon)
		{	name: 'optn_dvcd'			, type: 'string' },		//사양구분코드		(item_adon)
		{	name: 'optm_prod_volm'		, type: 'float'	, defaultValue : 0},		//적정생산량		(item_adon)
		{	name: 'last_insp_yorn'		, type: 'string' },		//최종검사여부		(item_adon)
		{	name: 'dplt_name'			, type: 'string' },		//단프라명			(item_adon)
		{	name: 'cstm_dplt_name'		, type: 'string' },		//고객단프라명		(item_adon)
		{	name: 'sale_psbl_yorn'		, type: 'string' },		//판매여부
		{	name: 'ogin_bacd_name'		, type: 'string' },		//원산지분류
		{	name: 'make_cmpy_name'		, type: 'string' },		//제조회사명
		{	name: 'pkge_name'			, type: 'string' },		//포장분류명
		{	name: 'hqof_idcd'			, type: 'string' , defaultValue : _global.hqof_idcd},		//사업장id


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
		{	name: 'cont_cstm_name'		, type: 'string' },		//거래처			(item_cont)
		{	name: 'ftmr_insp_yorn'		, type: 'string' },		//초물검사여부		(item_cont)
		{	name: 'mdmr_insp_yorn'		, type: 'string' },		//중물검사여부		(item_cont)
		{	name: 'ltmr_insp_yorn'		, type: 'string' },		//종물검사여부		(item_cont)
		{	name: 'cont_degr'			, type: 'string' },		//계약차수		(item_cont)
		{	name: 'coun_iout_dvcd'		, type: 'string' },		//내외자구분(국내/수입)	(item_purc)
		{	name: 'user_idcd'			, type: 'string' },		//사용자코드
		{	name: 'sale_user_name'		, type: 'string' },		//영업담당자
		{	name: 'user_name'			, type: 'string' },		//구매담당자
		{	name: 'rpst_item_idcd'		, type: 'string' },		//표준품목코드
		{	name: 'rpst_item_name'		, type: 'string' },		//대표품목
		{	name: 'srfc_proc'			, type: 'string' },		//대표품목
		{	name: 'msll_valu'			, type: 'string' },		//대표품목
		{	name: 'sold_drwg_numb'		, type: 'string' },		//대표품목
		{	name: 'flat_drwg_numb'		, type: 'string' },		//대표품목
		{	name: 'rpst_item_name'		, type: 'string' },		//대표품목
		{	name: 'mtrl_name'			, type: 'string' },		//대표품목
		{	name: 'mker_name'			, type: 'string' },		//대표품목

		{	name: 'shpm_pric_1fst'		, type: 'float' , defaultValue : 0},		//출고단가1
		{	name: 'shpm_pric_2snd'		, type: 'float' , defaultValue : 0},		//출고단가2
		{	name: 'shpm_pric_3trd'		, type: 'float' , defaultValue : 0},		//출고단가3
		{	name: 'shpm_pric_4frt'		, type: 'float' , defaultValue : 0},		//출고단가4
		{	name: 'shpm_pric_5fit'		, type: 'float' , defaultValue : 0},		//출고단가5
		{	name: 'cnsr_pric'			, type: 'float' , defaultValue : 0},		//소비자단가
		{	name: 'puch_pric'			, type: 'float' , defaultValue : 0},		//구매단가


	//품목두께
		{	name: 'modify'				, type: 'string' },		//chk
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

