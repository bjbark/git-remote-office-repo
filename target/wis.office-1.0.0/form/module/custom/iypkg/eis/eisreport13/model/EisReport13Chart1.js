Ext.define('module.custom.iypkg.eis.eisreport13.model.EisReport13Chart1',{ extend:'Axt.data.Model',
	fields : [
			{	name: 'user_idcd',			type: 'string'},		//담당자id
			{	name: 'cstm_idcd',			type: 'string'},		//거래처id
			{	name: 'sw_code',			type: 'float' },		//sw_code
			{	name: 'dw_code',			type: 'float' },		//dw_code
			{	name: 'offr_amnt',			type: 'float' },		//sw+dw 합계
			{	name: 'sub',				type: 'float' },		//금액,수량,m2
			{	name: 'total',				type: 'float' },		//금액,수량,m2
			{	name: 'mm',					type: 'string'},		//1~12월
	]
});
