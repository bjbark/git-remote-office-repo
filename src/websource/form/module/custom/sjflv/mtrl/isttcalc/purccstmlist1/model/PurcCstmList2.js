Ext.define('module.custom.sjflv.mtrl.isttcalc.purccstmlist1.model.PurcCstmList2',{ extend:'Axt.data.Model',
	fields:
	[
	 	{name: 'invc_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//일자ㄴ
		{name: 'item_name',				type: 'string'},		//적요
		{name: 'puch_amnt',				type: 'float', },		//매입
		{name: 'colt_amnt',				type: 'float', },		//지급
		{name: 'npay_amnt',				type: 'float', },		//잔액
	]
});