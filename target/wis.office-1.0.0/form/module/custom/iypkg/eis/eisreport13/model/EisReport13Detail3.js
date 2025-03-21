Ext.define('module.custom.iypkg.eis.eisreport13.model.EisReport13Detail3',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'user_idcd',			type: 'string'},		//담당자 번호
		{	name: 'user_name',			type: 'string'},		//담당자명
		{	name: 'cstm_idcd',			type: 'string'},		//거래처 번호
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'mm',					type: 'string'},		//월
		{	name: 'invc_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//매출일자
		{	name: 'ttsm_amnt',			type: 'float' , defaultValue : '0'},		//매출금액
		{	name: 'colt_amnt',			type: 'float' , defaultValue : '0'},		//수금액
		{	name: 'uncolt',				type: 'float' , defaultValue : '0'},		//미수금

		{	name: 'cary_amnt',			type: 'float'},			//이월잔액
		{	name: 'befr_amnt',			type: 'float'},			//전년잔액
		{	name: 'colt_month',			type: 'float'},
	]
});
