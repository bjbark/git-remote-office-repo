Ext.define('module.custom.hjsys.eis.eisreport.view.EisReportEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-hjsys-eisreport-editor',

	height : 200,
	layout : {
	type: 'border'
	},

	title			: Language.get('ntce','공지사항'),
	collapsible 	: true	,
	collapsed		: false	,

	initComponent: function(config){
		var	me = this;
		me.items = [me.createTabs()];
		me.callParent(arguments)  ;
	},
	createTabs : function () {
		var me = this,
			item = {
				layout	: 'fit',
				region	: 'center',
				margin	: 0,
				items	: [
					{xtype: 'module-hjsys-eisreport-lister-master'},
				]
			}
		;
		return item;
	},

});