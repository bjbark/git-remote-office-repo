Ext.define('module.custom.sjflv.sale.order.oemmast.model.OemMastPrice', { extend:'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'						//invoice번호
		},{	name: 'amnd_degr'			, type: 'float'  , defaultValue: 1		//amd차수
		},{	name: 'line_seqn'			, type: 'float'  , defaultValue: 1		//amd차수
		},{	name: 'assi_seqn'			, type: 'float'							//보조순번
		},{	name: 'acct_bacd'			, type: 'string'						//품목계정		
		},{	name: 'item_idcd'			, type: 'string'						//품목ID
		},{	name: 'item_code'			, type: 'string'						//품목코드
		},{	name: 'item_name'			, type: 'string'						//품목명
		},{	name: 'item_spec'			, type: 'string'						//품목규격
		},{	name: 'mixx_rate'			, type: 'float'	 , defaultValue : 0     //배합비
		},{	name: 'istt_qntt'			, type: 'float'	 , defaultValue : 0		//사용량
		},{	name: 'istt_pric'			, type: 'float',   						//단가
		},{	name: 'istt_amnt'			, type: 'float',   						//금액		
		},{	name: 'bsmt_pric'			, type: 'float',   						//제품원료비
		},{	name: 'make_cost'			, type: 'float',   						//제품임가공비
		},{	name: 'rcpt_cmpy_idcd'		, type: 'string'						//인수처변	
		},{	name: 'rcpt_cmpy_new'		, type: 'string'						//인수처신규
		}
	]
});