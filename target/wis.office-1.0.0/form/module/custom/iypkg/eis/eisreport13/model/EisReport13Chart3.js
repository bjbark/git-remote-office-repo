Ext.define('module.custom.iypkg.eis.eisreport13.model.EisReport13Chart3',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'user_idcd',			type: 'string'},		//담당자 번호
		{	name: 'user_name',			type: 'string'},		//담당자명
		{	name: 'cstm_idcd',			type: 'string'},		//거래처 번호
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'offr_amnt',			type: 'float' , defaultValue : '0'},		//매출금액
		{	name: 'coll_amnt',			type: 'float' , defaultValue : '0'},		//수금액(거래명세서 금액)
		{	name: 'colt_amnt',			type: 'float' , defaultValue : '0'},		//수금액(거래명세서 금액)
		{	name: 'invc_date',			type: 'string'},		//1~12월
		{	name: 'mm',					type: 'string'},		//1~12월

		{	name: 'find_name',			type: 'string'},		//찾기명
	]
});
