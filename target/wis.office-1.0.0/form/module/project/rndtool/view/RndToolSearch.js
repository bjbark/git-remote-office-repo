Ext.define('module.project.rndtool.view.RndToolSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-rndtool-search',
	/**
	 */
	initComponent: function(){
		var me = this;
		me.items = [ me.createLine1(), me.createLine2() ];
		me.callParent();
	},

	/**
	 * 라인1
	 */
	createLine1 : function(){
		var me = this,
			line = {
				xtype : 'fieldset',
				items : [
			 		{
			 			fieldLabel    : 'Module ID'       ,
			 			name          : 'modl_id'   ,
			 			xtype         : 'searchfield'
			 		},{
			 			fieldLabel    : 'Module 명',
			 			name          : 'modl_nm'   ,
			 			xtype         : 'searchfield'
			 		},{
			 			fieldLabel    : 'View ID'       ,
			 			name          : 'view_id'   ,
			 			xtype         : 'searchfield'
			 		},{
			 			fieldLabel    : 'View 명'       ,
			 			name          : 'view_nm'   ,
			 			xtype         : 'searchfield'
			 		}
			 	]
			}
		;
		return line;
	},
	/**
	 * 라인1
	 */
	createLine2 : function(){
		var me = this,
			line = {
				xtype : 'fieldset',
				items : [
			 	]
			}
		;
		return line;
	}

});



