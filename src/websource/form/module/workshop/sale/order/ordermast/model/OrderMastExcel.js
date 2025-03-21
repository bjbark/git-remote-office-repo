Ext.define('module.workshop.sale.order.ordermast.model.OrderMastExcel', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'drwg_numb'			, type: 'string' 	//도면
		},{	name: 'revs_numb'			, type: 'string' 	//rev번호
		},{	name: 'pqty_ndqt'			, type: 'float'		//개당소요량
		},{	name: 'need_qntt'			, type: 'float'		//소요량(투입량)

		},{	name: 'acct_bacd_name'		, type: 'string'	//계정구분
		},{	name: 'mtrl_bacd_name'		, type: 'string'	//재질
		},{	name: 'item_name'			, type: 'string'	//품명
		},{	name: 'item_tick'			, type: 'float'		//두께
		},{	name: 'item_leng'			, type: 'float'		//제품길이
		},{	name: 'item_widh'			, type: 'float'		//제품넓이


		},{	name: 'user_memo'			, type: 'string'	//사용자메모
		}
	]
});