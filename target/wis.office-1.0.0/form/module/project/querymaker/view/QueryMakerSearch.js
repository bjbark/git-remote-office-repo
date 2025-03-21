Ext.define('module.project.querymaker.view.QueryMakerSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-querymaker-search',
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
						fieldLabel	: '경로(Path)',
						name		: 'path',
						xtype		: 'lookupfield',
						editable	: true,
						lookupValue : [['','전체'],['project','Project'],['angel','Angel'], ['main','main'], ['FNG','FNG System'], ['DWGNC','동원FNB']],
						value		: 'angel'
					},{
						fieldLabel	: 'Service 명',
						name		: 'srvc',
						xtype		: 'searchfield'
					},{
						fieldLabel	: 'Module 명',
						name		: 'modl',
						xtype		: 'searchfield'
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



