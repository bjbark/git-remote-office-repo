Ext.define('module.project.sscdmast.view.SscdMastSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-sscdmast-search',
	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(),me.createLine1() ];
		me.callParent();
	},

	/**
	 * 라인1
	 */
	
	searchBasic : function(){
		var me = this,
			line = { xtype	: 'module-common-searchBar' }
		;
		return line;
	},
	createLine1 : function(){
		var me = this,
			line = {
				xtype : 'fieldset',
				collapsible : true,
				collapsed	: false,
				items : [
			 		{	fieldLabel  : '사용여부',
			 			xtype       : 'lookupfield',
			 			name        : 'line_stat',
			 			editable    : false,
			 			lookupValue : resource.lookup('search_all').concat( resource.lookup('line_stat' ) ) ,
			 			value       : '0'
 	 		 		},{ fieldLabel	: '언어구분',
 	 		 			xtype       : 'lookupfield',
 	 		 			name        : 'lang_dvcd'  ,
 	 		 			lookupValue : resource.lookup('search_all').concat(resource.lookup('lang_dvcd')),
			 		}
			 	]
			}
		;
		return line;
	}
});
