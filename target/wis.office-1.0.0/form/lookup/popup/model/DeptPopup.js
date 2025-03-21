Ext.define('lookup.popup.model.DeptPopup',{ extend:'Axt.data.Model',
	fields:[
		{name: 'hqof_idcd',		type: 'string'  },
		{name: 'stor_grp' ,		type: 'string'  },
		{name: 'stor_name',		type: 'string'  },
		//
		{name: 'dept_idcd',		type: 'string'  },
		{name: 'dept_code',		type: 'string'  },
		{name: 'dept_name',		type: 'string'  },
		{name: 'prnt_idcd',		type: 'string'  },
		{name: 'line_stat',		type: 'string'  },
		{name: 'line_ordr',		type: 'int'     , defaultvalue : 0  }

	]
});
