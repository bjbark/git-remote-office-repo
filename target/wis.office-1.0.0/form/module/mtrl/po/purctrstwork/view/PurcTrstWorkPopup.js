Ext.define('module.mtrl.po.purctrstwork.view.PurcTrstWorkPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-purctrstwork-popup',

	title		: '품목 추가',
	closable	: true,
	autoShow	: true,
	width		: 300 ,
	height		: 150,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '20 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('item_name','품명')	,
							xtype		: 'textfield',
							name		: 'item_name',
							itemId		: 'item_name',
							width		: 250,
							labelWidth	: 60,
							margin		: '0 0 5 0',
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '0 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('item_spec','규격')	,
							xtype		: 'textfield',
							name		: 'item_spec',
							itemId		: 'item_spec',
							width		: 250,
							labelWidth	: 60,
							margin		: '0 0 5 0',
						}
					]
				},
			]
		};
		return form;
	},

	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			popup	= Ext.ComponentQuery.query('module-purctrstwork-popup')[0]
		;

		if (values.item_name == null || values.item_name == '') {
			Ext.Msg.alert("알림", "품명을 입력하세요.");
			return;
		}
		me.setResponse(values);
		popup.close();
	}
});