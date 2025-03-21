Ext.define('module.custom.kortc.qc.chge.chgemast.view.ChgeMastPopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.module-chgemast-popup',

	title	: Language.get('','4M 변경 의뢰서'),
	closable: true,
	autoShow: true,
	width	: 800,
	height	: 250,
	layout	: {
		type: 'border'
	},

	initComponent: function(config){
		var me = this;
			me.items = [me.createForm()];
			me.callParent(arguments);
	},

	/**
	 *	화면폼
	 */
	createForm: function() {
		var me 	= this,
			form= {
				xtype		: 'form-panel',
				region		: 'center',
				layout		: 'fit',
				border		: false,
				dockedItems	: [
				    {	xtype	: 'grid-paging',
				    	dock	: 'bottom',
				    	items	: [
				    	    '->',
				    	    {	xtype: 'button', text: Const.CLOSER.text, iconCls: Const.CLOSER.icon, scope: me, handler: me.close, cls: 'button-style'
				    		}
				    	]
					}
				],
				items	: [
				    {	title 	: '4M 변경 의뢰서'	,
				    	xtype	: 'module-chgemast-filelister',
					}
				]
		};
		return form;
	},

});
