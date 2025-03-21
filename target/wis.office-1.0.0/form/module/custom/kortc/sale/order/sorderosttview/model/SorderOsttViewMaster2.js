Ext.define('module.custom.kortc.sale.order.sorderosttview.model.SorderOsttViewMaster2', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'ostt_qntt'			, type: 'float ',defaultValue : 0	// 출고건수부
		},{	name: 'invc_amnt'			, type: 'float ',defaultValue : 0	// 출고금액
		},{	name: 'dlvy_date'			, type: 'string',convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr// 월
		}
	]
});