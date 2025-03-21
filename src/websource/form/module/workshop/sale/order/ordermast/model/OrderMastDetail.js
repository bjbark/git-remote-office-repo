Ext.define('module.workshop.sale.order.ordermast.model.OrderMastDetail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//invoice 번호
		},{	name: 'amnd_degr'			, type: 'float', defaultValue : 1			//amd차수
		},{	name: 'line_seqn'			, type: 'int'  , defaultValue : 1			//순번
		},{	name: 'uper_seqn'			, type: 'int'  , defaultValue : 1			//순번
		},{	name: 'disp_seqn'			, type: 'int'  , defaultValue : 1			//순번
		},{	name: 'drwg_numb'			, type: 'string'		//도번
		},{	name: 'item_idcd'			, type: 'string'		//품목ID
		},{	name: 'item_code'			, type: 'string'		//품목코드
		},{	name: 'item_name'			, type: 'string'		//품명
		},{	name: 'acpt_qntt'			, type: 'float' 		//수주수량
		},{	name: 'item_spec'			, type: 'string'		//품목규격
		},{	name: 'unit_idcd'			, type: 'string'		//단위ID
		},{	name: 'unit_name'			, type: 'string'		//단위명
		},{	name: 'acpt_stat_dvcd'		, type: 'string'		//진행상태
		},{	name: 'orig_invc_numb'		, type: 'string'		//원invoice번호
		},{	name: 'orig_seqn'			, type: 'float'			//원순번
		},{	name: 'orig_invc_qntt'		, type: 'float'			//원invoice수량
		},{	name: 'optn_dvcd'			, type: 'float'			//옵션구분코드
		},{	name: 'optn_psbl_yorn'		, type: 'string', defaultValue : '0'		//옵션가능여부
		},{	name: 'optn_adtn'			, type: 'float'			//옵션추가
		},{	name: 'pric_adpt'			, type: 'float'			//단가적용
		},{	name: 'norm_sale_pric'		, type: 'float'			//정상판매단가
		},{	name: 'sale_stnd_pric'		, type: 'float'			//판매기준단가
		},{	name: 'invc_qntt'			, type: 'float'			//invoice수량
		},{	name: 'invc_pric'			, type: 'float'			//invoice단가
		},{	name: 'vatx_incl_yorn'		, type: 'string', defaultValue : '0'		//부가세포함여부
		},{	name: 'vatx_rate'			, type: 'float' , defaultValue : 0			//부가세율
		},{	name: 'sply_amnt'			, type: 'float'			//공급가액
		},{	name: 'vatx_amnt'			, type: 'float'			//부가세금액
		},{	name: 'invc_amnt'			, type: 'float'			//invoice금액
		},{	name: 'krwn_amnt'			, type: 'float'			//원화금액
		},{	name: 'krwn_vatx'			, type: 'float'			//원화부가세
		},{	name: 'krwn_ttsm_amnt'		, type: 'float'			//원화합계금액
		},{	name: 'stnd_unit'			, type: 'string'		//기준단위
		},{	name: 'stnd_unit_qntt'		, type: 'float'			//기준단위수량
		},{	name: 'wrhs_idcd'			, type: 'string'		//창고ID
		},{	name: 'dlvy_cstm_idcd'		, type: 'string'		//납품거래처ID
		},{	name: 'deli_date2'			, type: 'string', serialize: Ext.util.Format.dateToStr,		//납기일자
		},{	name: 'deli_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//납기일자
		},{	name: 'dlvy_date'			, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//납품일자
		},{	name: 'dlvy_hhmm'			, type: 'string'		//납품시분
		},{	name: 'remk_text'			, type: 'string'		//비고
		},{	name: 'ostt_dvcd'			, type: 'string'		//출고구분코드
		},{	name: 'dsct_qntt'			, type: 'float'			//중단수량
		},{	name: 'dlvy_memo'			, type: 'string'		//배송메모
		},{	name: 'uper_seqn'			, type: 'float'			//상위순번
		},{	name: 'disp_seqn'			, type: 'float'			//표시순번
		},{	name: 'cstm_lott_numb'		, type: 'string'		//고객LOT번호
		},{	name: 'mold_idcd'			, type: 'string'		//금형코드
		},{	name: 'unit_wigt'			, type: 'string'		//장당중량
		},{	name: 'spgr_valu'			, type: 'string'		//비중

		},{	name: 'pdsd_yorn'			, type: 'string'		//생산계획여부

		},{	name: 'add'					, type: 'string'		//도번중복체크
		},{	name: 'check'				, type: 'string'		//생산계획여부체크
		},{	name: 'drChk'				, type: 'string'		//도면등록여부체크
		},{	name: 'chk'					, type: 'string'		//품목추가체크
		},{	name: 'drwg_chk'			, type: 'string'		//도면등록체크
		},{	name: 'suit_chk'			, type: 'string'		//부자재등록여부
		},{	name: 'modify'				, type: 'string'		//부자재등록여부

		},{	name: 'mtrl_idcd'			, type: 'string'		//원자재ID
		},{	name: 'mtrl_spec'			, type: 'string' 		//원자재규격
		},{	name: 'mtrl_ndqt'			, type: 'float' 		//원자재 소요량
		},{	name: 'mprq_qntt'			, type: 'float'			//제품수량/장당
		},{	name: 'mtrl_name'			, type: 'string'		//적용원자재
		},{	name: 'item_name'			, type: 'string'		//품명
		},{	name: 'item_widh'			, type: 'float' 		//제품넓이
		},{	name: 'item_leng'			, type: 'float' 		//제품길이
		},{	name: 'bcod_numb'			, type: 'string'		//바코드
		},{	name: 'revs_numb'			, type: 'string'		//revision
		},{	name: 'stor_id'				, type: 'string' , defaultValue : _global.stor_id 		//stor_id
		},{	name: 'bzpl_idcd'			, type: 'string' , defaultValue : _global.dflt_bzpl_idcd 		//bzpl_idcd
		},{	name: 'pror_cnt'			, type: 'float'
		},{	name: 'mtrl_cnt1'			, type: 'float'
		},{	name: 'mtrl_cnt2'			, type: 'float'

		},{	name: 'user_memo'			, type: 'string'		//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'		//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'		//부모ID
		},{	name: 'line_levl'			, type: 'float' , defaultValue : 0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float' , defaultValue : 0		// ROW순서
		},{	name: 'line_stat'			, type: 'string', defaultValue: '0'		// ROW상태
		},{	name: 'line_clos'			, type: 'string', defaultValue: '0'		// ROW마감
		},{	name: 'find_name'			, type: 'string'		//찾기명
		},{	name: 'updt_user_name'		, type: 'string'		//수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'		//수정IP
		},{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'		//수정UI
		},{	name: 'crte_user_name'		, type: 'string'		//생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'		//생성IP
		},{	name: 'crte_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 생성ID
		},{	name: 'crte_urif'			, type: 'string'		//생성UI
		}
	],
});