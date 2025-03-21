Ext.define('module.custom.kortc.sale.order.sorderosttview.model.SorderOsttViewMaster3', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'drtr_name'			, type: 'string'	//담당자명
		},{	name: 'ostt_qntt'			, type: 'float ', defaultValue : 0	// 출고건수부
		},{	name: 'invc_amnt'			, type: 'float ', defaultValue : 0	// 출고금액
		}
	]
});