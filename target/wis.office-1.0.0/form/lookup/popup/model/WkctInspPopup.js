Ext.define('lookup.popup.model.WkctInspPopup',{ extend:'Axt.data.Model',
	fields: [
		{name: 'wkct_idcd',				type: 'string'},		//공정ID
		{name: 'wkct_code',				type: 'string'},		//공정 code
		{name: 'wkct_name',				type: 'string'},		//공정명
		{name: 'wkct_stnm',				type: 'string'},		//공정약칭
		{name: 'dept_idcd',				type: 'string'},		//부서ID
		{name: 'dept_name',				type: 'string'},		//부서ID
	]
});
