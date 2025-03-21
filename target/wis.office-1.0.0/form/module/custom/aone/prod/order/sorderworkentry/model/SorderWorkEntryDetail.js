Ext.define('module.custom.aone.prod.order.sorderworkentry.model.SorderWorkEntryDetail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//invoice번호
		},{	name: 'wkod_numb'			, type: 'string' 		//작업지시번호
		},{	name: 'work_invc_numb'		, type: 'string' 		//작업보고 invc번호
		},{	name: 'amnd_degr'			, type: 'float'  , defaultValue : 1	//amd차수
		},{	name: 'line_seqn'			, type: 'float'  , defaultValue : 1	//행번호
		},{	name: 'uper_seqn'			, type: 'float'
		},{	name: 'disp_seqn'			, type: 'float'
		},{	name: 'invc_qntt'			, type: 'float'			//INVOICE 수량
		},{	name: 'plan_strt_dttm'		, type: 'string' ,convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'plan_endd_dttm'		, type: 'string' ,convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'plan_strt_dttm2'		, type: 'string' ,convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'plan_endd_dttm2'		, type: 'string' ,convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'plan_strt_date'		, type: 'string'
		},{	name: 'plan_endd_date'		, type: 'string'
		},{	name: 'wker_idcd'			, type: 'string'		//보고자
		},{	name: 'invc_date'			, type: 'string' ,convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//보고일자
		},{	name: 'sral_numb'			, type: 'string'		//담당자명
		},{	name: 'entryImage'			, type: 'string'		//처리이미지1
		},{	name: 'entryImage2'			, type: 'string'		//처리이미지2
		},{	name: 'modify'				, type: 'string' , defaultValue : 'n'		//주문인식
		},{	name: 'plan_dttm'			, type: 'string'
		},{	name: 'wkod_seqn'			, type: 'float'			//작업지시순번
		},{	name: 'invc_numb2'			, type: 'string'		//견적품목구분코드
		},{	name: 'esti_item_dvcd'		, type: 'string'		//견적품목구분코드
		},{	name: 'item_idcd'			, type: 'string'		//품목ID
		},{	name: 'item_code'			, type: 'string'		//품목코드
		},{	name: 'item_name'			, type: 'string'		//품명
		},{	name: 'item_spec'			, type: 'string'		//품목규격
		},{	name: 'cstm_item_name'		, type: 'string'		//거래처품명
		},{	name: 'cstm_item_code'		, type: 'string'		//거래처품목코드
		},{	name: 'work_strt_dttm'		, type: 'string' ,convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'work_endd_dttm'		, type: 'string' ,convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'unit_idcd'			, type: 'string'		//단위ID
		},{	name: 'json_data'			, type: 'string'		//json_data
		},{	name: 'unit_name'			, type: 'string'		//단위명
		},{	name: 'norm_sale_pric'		, type: 'float'			//정상판매단가
		},{	name: 'sale_stnd_pric'		, type: 'float'			//판매기준단가
		},{	name: 'dsnt_rate'			, type: 'float'			//할인율
		},{	name: 'prog_rate'			, type: 'float'			//진척율
		},{	name: 'esti_pric'			, type: 'float'			//판매단가
		},{	name: 'esti_qntt'			, type: 'float'			//견적수량
		},{	name: 'vatx_incl_yorn'		, type: 'string'		//부가세포함여부
		},{	name: 'vatx_rate'			, type: 'float'			//부가세율
		},{	name: 'sply_amnt'			, type: 'float'			//판매금액
		},{	name: 'stok_qntt'			, type: 'float'			//재고수량
		},{	name: 'qntt'				, type: 'float'			//소요수량
		},{	name: 'pric'				, type: 'float'			//단가
		},{	name: 'max_pric'			, type: 'float'			//최근30건 최고단가
		},{	name: 'amnt'				, type: 'float'			//판매금액
		},{	name: 'vatx_amnt'			, type: 'float'			//부가세금액
		},{	name: 'ttsm_amnt'			, type: 'float'			//합계금액
		},{	name: 'krwn_amnt'			, type: 'float'			//원화금액
		},{	name: 'krwn_vatx'			, type: 'float'			//원화부가세
		},{	name: 'krwn_ttsm_amnt'		, type: 'float'			//원화합계금액
		},{	name: 'deli_date2'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//납기일자
		},{	name: 'pdod_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//지시일정
		},{	name: 'dlvy_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//납품일자
		},{	name: 'dlvy_hhmm'			, type: 'string'		//남품시분
		},{	name: 'wrhs_idcd'			, type: 'string'		//입고창고
		},{	name: 'wrhs_name'			, type: 'string'		//입고창고
		},{	name: 'remk_text'			, type: 'string'		//비고
		},{	name: 'user_memo'			, type: 'string'		//작업내용(사용자메모)
		},{	name: 'sysm_memo'			, type: 'string'		//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'		//부모ID
		},{	name: 'line_levl'			, type: 'float'  , defaultValue : 0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float'  , defaultValue : 0		// ROW순서
		},{	name: 'line_stat'			, type: 'string' , defaultValue: '0'		// ROW상태
		},{	name: 'line_clos'			, type: 'string' , defaultValue: '0'		// ROW마감
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
		},{	name: 'chk'					, type: 'string'		//생성UI
		},{	name: 'acpt_stat_dvcd'		, type: 'string'		//진행상태
		},{	name: 'repa_stat_dvcd'		, type: 'string'		//수리상태
		},{	name: 'zone_idcd'			, type: 'string'		//진행상태
		},{	name: 'zone_name'			, type: 'string'		//수리상태
		}
	],
	recalculation : function(inv) {
		var row = this
		;
		row.set('amnt'	, Math.round(row.get('need_qntt') * row.get('pric')));
	}
});