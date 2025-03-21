Ext.define('module.mtrl.po.poplan.model.PoPlanMaster2',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'item_code',			type: 'string'},		//품목코드
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'item_spec',			type: 'string'},		//품목규격
		{	name: 'modl_name',			type: 'string'},		//모델명
		{	name: 'acpt_cont',			type: 'float '},		//주문건수
		{	name: 'invc_amnt',			type: 'float '},		//주문금액
		{	name: 'deli_ok',			type: 'float '},		//납기준수건수
		{	name: 'deli_not',			type: 'float '},		//납기미준수건수
		{	name: '',			type: 'float '},		//납기준수율
		{	name: 'remk_text',			type: 'string'},		//비고

	]
});
