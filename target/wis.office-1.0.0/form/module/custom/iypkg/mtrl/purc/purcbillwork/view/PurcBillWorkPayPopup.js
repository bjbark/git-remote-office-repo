Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkPayPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-purcbillwork-pay-popup',

	title		: '지급등록',
	closable	: true,
	autoShow	: true,
	width		: 270 ,
	height		: 130,
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
			itemId	: 'invc',
			margin	: '23 0 0 10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 370,
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: '지급일자',
									xtype		: 'datefield',
									name		: 'paym_date',
									width		: 200,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								}
							]
						}
					]
				}
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
			master	= Ext.ComponentQuery.query('module-purcbillwork-lister2-master')[0],
			records	= master.getSelectionModel().getSelection(),
			store	= master.getStore(),
			val		= []
		;

		for (var i = 0; i < records.length; i++) {
			val.push({
				invc_numb : records[i].data.purc_numb,
				paym_date : values.paym_date
			});
		}

		Ext.Ajax.request({
			url			: _global.location.http() + '/custom/iypkg/mtrl/purc/purcbillwork/set/pay.do',
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					records : val
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				me.setResponse( {success : true});
				store.reload();
			}
		});
	}
});
