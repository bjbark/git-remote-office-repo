Ext.define('module.custom.kortc.sale.order.sorderosttview.model.SorderOsttViewMaster1', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'cstm_name'			, type: 'string'	//거래처명
		},{	name: 'ostt_qntt'			, type: 'float ', defaultValue:0	// 출고건수부
		},{	name: 'invc_amnt'			, type: 'float ', defaultValue:0	// 출고금액
		},{	name: 'drtr_name'			, type: 'string'	// 영업담당


		}
	]
});