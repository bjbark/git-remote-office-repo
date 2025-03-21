Ext.define('module.prod.order.workbookv2.view.WorkBookV2RemkModifyPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-workbookv2-workbookv2remkmodifypopup',

	title		: '비고작성',
	closable	: true,
	autoShow	: true,
	width		: 340 ,
	height		: 145,
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
						{	text : '<span class="write-button">저장</span>', scope: me, handler: me.update , cls: 'button-style'} ,
						{	text : '<span class="write-button">닫기</span>', scope: me, handler: me.close  , cls: 'button-style'} ,
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
			itemId	: 'invc',
			margin	: '15 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	fieldLabel	: '비고',
							xtype		: 'textarea',
							name		: 'user_memo',
							width		: 300,
							value		: me.popup.params.user_memo,
						}
					]
				}
			]
		};
		return form;
	},


	update: function(){
		var me = this,
			form= me.down('form'),
			values	= form.getValues(),
			lister = Ext.ComponentQuery.query('module-workbookv2-lister')[0]
		;
		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/order/workbookv2/set/remkmodify.do',
			params	: {
				token	: _global.token_id,
				param	: JSON.stringify({
					invc_numb	: me.popup.params.invc_numb,
					user_memo	: values.user_memo,
					updt_idcd	: _global.login_pk
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
					mask.show();
					lister.getStore().reload();
					me.hide();
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	},
});
