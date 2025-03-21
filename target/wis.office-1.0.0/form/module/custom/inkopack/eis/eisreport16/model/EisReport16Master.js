Ext.define('module.custom.inkopack.eis.eisreport16.model.EisReport16Master',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'deli_date'		,type: 'string',defaultValue : Ext.Date.format(new Date(),'Ym'), convert : function(val){ var value; value= val.substring(0,4)+'-'+val.substring(4,6); return value; }, serialize: Ext.util.Format.dateToStr},		//납기일자
		{	name: 'cstm_name'		,type: 'string'},		//거래처
		{	name: 'item_code'		,type: 'string'},		//품목코드
		{	name: 'item_name'		,type: 'string'},		//품명
		{	name: 'item_spec'		,type: 'string'},		//규격
		{	name: 'chk1'			,type: 'string'},		//자재입고
		{	name: 'chk2'			,type: 'string'},		//인쇄
		{	name: 'chk3'			,type: 'string'},		//합지
		{	name: 'chk4'			,type: 'string'},		//가공
		{	name: 'chk5'			,type: 'string'},		//창고입고
		{	name: 'chk6'			,type: 'string'},		//출고
	]
});
