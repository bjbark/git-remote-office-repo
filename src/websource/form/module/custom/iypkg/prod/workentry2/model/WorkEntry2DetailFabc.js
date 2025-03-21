Ext.define('module.custom.iypkg.prod.workentry2.model.WorkEntry2DetailFabc', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'dvcd',				type: 'string'},		//수주 발주 구분코드
		{	name: 'fabc_idcd',			type: 'string'},		//원단ID
		{	name: 'fabc_name',			type: 'string'},		//원단명
		{	name: 'fdat_spec',			type: 'string'},		//재단규격
		{	name: 'invc_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//수주,발주,입고 날짜
		{	name: 'cstm_name',			type: 'string'},		//입고처명
		{	name: 'ppln_dvcd',			type: 'string'},		//골
		{	name: 'item_leng',			type: 'float' },		//장
		{	name: 'item_widh',			type: 'float' },		//폭
		{	name: 'item_fxqt',			type: 'float' },		//절수
		{	name: 'need_qntt',			type: 'float' },		//원단수주량
	]
});
