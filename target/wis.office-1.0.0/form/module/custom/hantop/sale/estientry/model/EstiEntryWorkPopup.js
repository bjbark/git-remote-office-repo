Ext.define('module.custom.hantop.sale.estientry.model.EstiEntryWorkPopup', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'plan_date'			, type: 'string'
		},{	name: 'work_date'			, type: 'string'
		},{	name: 'lott_numb'			, type: 'string'
		},{	name: 'line_seqn'			, type: 'float'
		}
	]
});