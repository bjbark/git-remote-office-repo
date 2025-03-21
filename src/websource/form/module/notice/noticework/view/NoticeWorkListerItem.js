Ext.define('module.notice.noticework.view.NoticeWorkListerItem', { extend: 'Axt.form.Editor',

	alias  : 'widget.module-noticework-lister-item',

	layout : {
		type : 'border'
	},
	defaultFocus	: 'ntce_mast',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createpannel()];
		me.callParent(arguments)  ;
	},

	createpannel : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'top',
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 60, labelSeparator : '' },
				items			: [
					{	fieldLabel	: Language.get('ntce_ttle','제목'),
						xtype		: 'textfield',
						name		: 'ntce_ttle',
						readOnly	: true,
						allowBlank	: false
					}
				]
			}
		;
		return item;
	}
});