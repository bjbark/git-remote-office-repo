Ext.define('module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrDeliPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-purcordr-deli-popup',

	title		: '납기일자 일괄변경',
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
									hidden		: true,
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
			master	= Ext.ComponentQuery.query('module-purcordr-lister-master')[0],
			select	= master.getSelectionModel().getSelection()
			;

		if (select) {
			Ext.each(select, function(record) {
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/sjflv/mtrl/po/purcordr/set/deli.do',
					params	: {
						token	: _global.token_id,
						param	: JSON.stringify({
							invc_numb		: record.get('invc_numb'),
							amnd_degr		: record.get('amnd_degr'),
							line_seqn		: record.get('line_seqn'),
							deli_date		: values.deli_date,
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
							master.getStore().reload();
							me.hide();
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			})
		}
	},
});
