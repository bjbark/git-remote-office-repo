Ext.define('module.custom.sjflv.sale.sale.salearlist2.model.SaleArList2',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'cstm_idcd',				type: 'string'},		//거래처ID
		{name: 'cstm_code',				type: 'string'},		//거래처코드
		{name: 'cstm_name',				type: 'string'},		//거래처명
		{name: 'base_amnt',				type: 'float', },		//기초채권
		{name: 'sale_amnt',				type: 'float', },		//매출
		{name: 'ttsm_amnt',				type: 'float', },		//수금합계
		{name: 'npay_amnt',				type: 'float', },		//잔액
		{name: 'drtr_name',				type: 'string', },		//담당자
	]
});
