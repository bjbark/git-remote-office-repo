Ext.define('module.custom.sjflv.item.itemmast.view.ItemMastSelectPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-itemmast-select-popup',
	store	: 'module.custom.sjflv.item.itemmast.store.ItemMastSelectPopup' ,
	title		: '원료성분조회',
	closable	: true,
	autoShow	: true,
	width		: 500 ,
	height		: 330,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);

		var idcd = me.popup.params.cvic_idcd
		;


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
			itemId	: 'invc',
			margin	: '15 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 500,
							fieldDefaults: { width : 500, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: '원료 및 성분',
									name		: 'mtrl_spec2',
									xtype		: 'textarea',
									height		: 90,
									width		: 400,
									itemId		: 'mtrl_spec2',
									value		: me.popup.params.mtrl_spec_2,
									readOnly	: true,
									margin		: '20 0 0 40'
								},{ fieldLabel	: '계산값',
									xtype		: 'textarea',
									height		: 90,
									width		: 400,
									name		: 'mtrl_spec',
									itemId		: 'mtrl_spec',
									value		: me.popup.params.mtrl_spec,
									readOnly	: true,
									margin		: '20 0 0 40'
								}
							]
						}
					]
				}
			]
		};
		return form;
	},

//	selection:function(){
//		var	me		= this
//			param = Ext.merge( me.down('form').getValues(), me.popup.params)
//		;
//		Ext.Ajax.request({
//			url		: _global.location.http() + '/system/custom/sjflv/item/itemmast/get/select.do',
//			params	: {
//				token : _global.token_id,
//				param : JSON.stringify({
//					item_idcd	: me.params.item_idcd,
//				})
//			},
//			async	: false,
//			method	: 'POST',
//			success	: function(response, request) {
//				var result = Ext.decode(response.responseText);
//				if	(!result.success ){
//					Ext.Msg.error(result.message );
//					return;
//				} else {
//
//				}
//			},
//			failure : function(result, request) {
//			},
//			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//			}
//		});
//	}
});
