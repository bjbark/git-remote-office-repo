Ext.define('module.custom.inkopack.prod.pdodlist.model.PdodListDetail',{ extend:'Axt.data.Model',
	fields :
	[
		{	name: 'item_name'			,type: 'string'},		//품명
		{	name: 'item_spec'			,type: 'string'},		//규격
		{	name: 'indn_qntt'			,type: 'float '},		//작업량
		{	name: 'cvic_stnm'			,type: 'string '},		//설비약칭
	]
});
