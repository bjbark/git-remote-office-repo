Ext.define('module.custom.sjflv.sale.sale.salearlist.model.SaleArListLister',{ extend:'Axt.data.Model',
	fields:
	[
	 	{name: 'invc_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//일자ㄴ
		{name: 'item_name',				type: 'string'},		//적요
		{name: 'sale_amnt',				type: 'float', },		//매출
		{name: 'colt_amnt',				type: 'float', },		//수금
		{name: 'npay_amnt',				type: 'float', },		//잔액
	]
});
