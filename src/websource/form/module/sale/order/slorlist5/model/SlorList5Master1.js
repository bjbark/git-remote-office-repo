Ext.define('module.sale.order.slorlist5.model.SlorList5Master1',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'acpt_cont',			type: 'float '},		//주문건수
		{	name: 'invc_amnt',			type: 'float '},		//주문금액
		{	name: 'deli_ok',			type: 'float '},		//납기준수건수
		{	name: 'deli_not',			type: 'float '},		//납기미준수건수
		{	name: 'deli_rate',			type: 'float '},		//납기준수율
		{	name: 'remk_text',			type: 'string'},		//비고
		{	name: 'user_memo',			type: 'string'},		//비고
	]
});
