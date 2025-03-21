Ext.define('module.custom.hantop.sale.estientry.view.EstiEntryAutoPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-estientry-auto-popup',

	title		: '절단방법변경',
	closable	: true,
	autoShow	: true,
	width		: 260 ,
	height		: 200,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);

	},

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
							width		: 370,
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: Language.get('wdbf_auto_cutt_yorn', 'BF자동절단' ),
									name		: 'wdbf_auto_cutt_yorn',
									xtype		: 'lookupfield',
									lookupValue	: resource.lookup('yorn'),
									editable	: false,
									width		: 200,
									labelWidth	: 100
								},{	fieldLabel	: Language.get('wdbf_auto_weld_yorn', 'BF자동용접' ),
									name		: 'wdbf_auto_weld_yorn',
									xtype		: 'lookupfield',
									lookupValue	: resource.lookup('yorn'),
									editable	: false,
									width		: 200,
									labelWidth	: 100
								},{	fieldLabel	: Language.get('wdsf_auto_cutt_yorn', 'SF자동절단' ),
									name		: 'wdsf_auto_cutt_yorn',
									xtype		: 'lookupfield',
									lookupValue	: resource.lookup('yorn'),
									editable	: false,
									width		: 200,
									labelWidth	: 100
								},{	fieldLabel	: Language.get('wdsf_auto_weld_yorn', 'SF자동용접' ),
									name		: 'wdsf_auto_weld_yorn',
									xtype		: 'lookupfield',
									lookupValue	: resource.lookup('yorn'),
									editable	: false,
									width		: 200,
									labelWidth	: 100
								}
							]
						}
					]
				}
			]
		};
		return form;
	},

	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			master	= Ext.ComponentQuery.query('module-estientry-lister-master')[0]
			values	= baseform.getValues(),
			param	= me.popup.params
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/hntop/sale/estientry/set/auto.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					invc_numb			: param.invc_numb,
					amnd_degr			: param.amnd_degr,
					line_seqn			: param.line_seqn,
					wdbf_auto_cutt_yorn	: values.wdbf_auto_cutt_yorn,
					wdbf_auto_weld_yorn	: values.wdbf_auto_weld_yorn,
					wdsf_auto_cutt_yorn	: values.wdsf_auto_cutt_yorn,
					wdsf_auto_weld_yorn	: values.wdsf_auto_weld_yorn
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				Ext.Msg.alert("알림", "변경이 완료 되었습니다.");
				master.getStore().reload();
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					me.setResponse( {success : true , values :  values });
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				mask.hide();
			}
		});
	}
});
