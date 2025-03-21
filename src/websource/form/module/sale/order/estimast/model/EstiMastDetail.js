Ext.define('module.sale.order.estimast.model.EstiMastDetail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//invoice번호
		},{	name: 'amnd_degr'			, type: 'float' , defaultValue : 1	//amd차수
		},{	name: 'line_seqn'			, type: 'float'
		},{	name: 'uper_seqn'			, type: 'float'
		},{	name: 'disp_seqn'			, type: 'float'
		},{	name: 'esti_item_dvcd'		, type: 'string'		//견적품목구분코드
		},{	name: 'item_idcd'			, type: 'string'		//품목ID
		},{	name: 'item_code'			, type: 'string'		//품목코드
		},{	name: 'item_name'			, type: 'string'		//품명
		},{	name: 'item_spec'			, type: 'string'		//품목규격
		},{	name: 'cstm_item_name'		, type: 'string'		//거래처품명
		},{	name: 'cstm_item_code'		, type: 'string'		//거래처품목코드
		},{	name: 'unit_idcd'			, type: 'string'		//단위ID
		},{	name: 'unit_name'			, type: 'string'		//단위명
		},{	name: 'norm_sale_pric'		, type: 'float'			//정상판매단가
		},{	name: 'sale_stnd_pric'		, type: 'float'			//판매기준단가
		},{	name: 'dsnt_rate'			, type: 'float'			//할인율
		},{	name: 'esti_pric'			, type: 'float'			//판매단가
		},{	name: 'esti_qntt'			, type: 'float'			//견적수량
		},{	name: 'vatx_incl_yorn'		, type: 'string'		//부가세포함여부
		},{	name: 'vatx_rate'			, type: 'float'			//부가세율
		},{	name: 'sply_amnt'			, type: 'float'			//판매금액
		},{	name: 'vatx_amnt'			, type: 'float'			//부가세금액
		},{	name: 'ttsm_amnt'			, type: 'float'			//합계금액
		},{	name: 'krwn_amnt'			, type: 'float'			//원화금액
		},{	name: 'krwn_vatx'			, type: 'float'			//원화부가세
		},{	name: 'krwn_ttsm_amnt'		, type: 'float'			//원화합계금액
		},{	name: 'deli_date2'			, type: 'string' , serialize: Ext.util.Format.dateToStr
		},{	name: 'dlvy_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//납품일자
		},{	name: 'dlvy_hhmm'			, type: 'string'		//남품시분
		},{	name: 'remk_text'			, type: 'string'		//비고
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
	recalculation : function(inv) {
		var row = this,
			baseamt = row.get('esti_qntt') * row.get('sale_pric'),
			resId =  _global.options.mes_system_type?_global.options.mes_system_type.toUpperCase():_global.hq_id.toUpperCase()
		;
		if(resId == 'SJFLV' ){
			row.set('sply_amnt'	, Math.round(row.get('esti_qntt') * row.get('esti_pric')));
			row.set('vatx_amnt'	, Math.trunc(row.get('sply_amnt')/Number(_global.tax_rt)));
			row.set('ttsm_amnt'	, row.get('sply_amnt') + row.get('vatx_amnt')) ;
		}else{
			row.set('sply_amnt'	, Math.floor(row.get('esti_qntt') * row.get('esti_pric') /10)*10 );
			row.set('vatx_amnt'	, Math.floor(Number(_global.tax_rt) * row.get('sply_amnt')/1000)*10 );
			row.set('ttsm_amnt'	, row.get('sply_amnt') + row.get('vatx_amnt')) ;
		}
	}
});