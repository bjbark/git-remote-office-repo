Ext.define('module.stock.isos.mtrlmonthlist.model.MtrlMonthList',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'item_code',			type: 'string'},		//품목코드
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'item_spec',			type: 'string'},		//규격
		{	name: 'invc_dvcd',			type: 'string'},		//구분
		{	name: 'total',				type: 'float' },		//1월
		{	name: 'mnth_01',			type: 'float' },		//1월
		{	name: 'mnth_02',			type: 'float' },		//2월
		{	name: 'mnth_03',			type: 'float' },		//3월
		{	name: 'mnth_04',			type: 'float' },		//4월
		{	name: 'mnth_05',			type: 'float' },		//5월
		{	name: 'mnth_06',			type: 'float' },		//6월
		{	name: 'mnth_07',			type: 'float' },		//7월
		{	name: 'mnth_08',			type: 'float' },		//8월
		{	name: 'mnth_09',			type: 'float' },		//9월
		{	name: 'mnth_10',			type: 'float' },		//10월
		{	name: 'mnth_11',			type: 'float' },		//11월
		{	name: 'mnth_12',			type: 'float' },		//12월

	]
});
