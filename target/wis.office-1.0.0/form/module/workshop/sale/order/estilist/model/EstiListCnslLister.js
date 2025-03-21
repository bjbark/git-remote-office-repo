Ext.define('module.workshop.sale.order.estilist.model.EstiListCnslLister',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string' },		//상담번호
		{	name: 'line_seqn'			, type: 'float ' },		//순번
		{	name: 'cnsl_dttm'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//상담일자
		{	name: 'cnsl_dvcd'			, type: 'string' },		//구분
		{	name: 'cnsl_cont'			, type: 'string' },		//메모구분
		{	name: 'drtr_name'			, type: 'string' },		//담당자명
		{	name: 'drtr_idcd'			, type: 'string' },		//담당자ID
	]
});

