Ext.define('module.custom.aone.sale.order.sorderplan.model.SorderPlanMtrl', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'amnd_degr'			, type: 'float'  , defaultValue: 1		//amd차수
		},{	name: 'line_seqn'			, type: 'float'  , defaultValue: 1		//
		},{	name: 'assi_seqn'			, type: 'float'  	//
		},{	name: 'item_name'			, type: 'string'	//제품명
		},{	name: 'item_code'			, type: 'string'	//
		},{	name: 'item_idcd'			, type: 'string'	//
		},{	name: 'item_spec'			, type: 'string'	//
		},{	name: 'stok_qntt'			, type: 'float'		//재고 수량
		},{	name: 'qntt'				, type: 'float'		//부품 수량
		},{	name: 'pric'				, type: 'float'		//부품 단가
		},{	name: 'amnt'				, type: 'float'		//부품 금액
		},{	name: 'invc_qntt'			, type: 'float'		//수량
		},{	name: 'modify'				, type: 'string' 	//chk'			, type: 'string' },		//메모내용
		}
	]
});