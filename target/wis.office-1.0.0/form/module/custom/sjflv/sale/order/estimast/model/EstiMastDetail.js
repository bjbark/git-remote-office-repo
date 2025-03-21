Ext.define('module.custom.sjflv.sale.order.estimast.model.EstiMastDetail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//
		},{	name: 'amnd_degr'			, type: 'float' , defaultValue : 1	//amd차수
		},{	name: 'line_seqn'			, type: 'float' , defaultValue : 1
		},{	name: 'assi_seqn'			, type: 'float'
		},{	name: 'item_idcd'			, type: 'string'		//
		},{	name: 'item_name'			, type: 'string'		//
		},{	name: 'item_spec'			, type: 'string'		//
		},{	name: 'mixx_rate'			, type: 'string'		//배합비
		},{	name: 'pric'				, type: 'float'			//단가
		},{	name: 'amnt'				, type: 'float'			//금액
		},{	name: 'change'				, type: 'string'	//
		},{	name: 'acpt_numb'			, type: 'string'	//

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