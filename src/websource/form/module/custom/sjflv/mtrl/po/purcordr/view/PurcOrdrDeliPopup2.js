Ext.define('module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrDeliPopup2', { extend: 'Axt.popup.Search',
	alias: 'widget.module-purcordr-deli-popup2',

	title		: '납기일자',
	closable	: true,
	autoShow	: true,
	width		: 220 ,
	height		: 120,
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
			margin	: '15 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 240,
							fieldDefaults: { width : 100, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: Language.get('invc_numb','수주번호'),
									xtype		: 'textfield',
									name		: 'invc_numb',
									itemId		: 'invc_numb',
									labelWidth	: 80,
									width		: 160,
									hidden		: true
								},{ fieldLabel	: '납기일자',
									xtype		: 'datefield',
									name		: 'deli_date',
									value		: new Date(),
									margin		: '5 0 0 20',
									width		: 160,
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
	 * 수령 버튼 이벤트
	 */

	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-purcordr-worker-lister')[0],
			store	= master.getStore(),
			select	= master.getSelectionModel().getSelection(),
			item
			;

		if(select != 0){
			Ext.each(select, function(record) {
				record.set('deli_date2', values.deli_date);  // 모든 레코드의 deli_date2 필드를 업데이트
			});


		}else if (master.getStore().data.items != 0) {
			item = master.getStore().data.items;
			Ext.each(item, function(record) {
				record.set('deli_date2', values.deli_date);  // 모든 레코드의 deli_date2 필드를 업데이트
			});
		}

		me.close();
	},
});
