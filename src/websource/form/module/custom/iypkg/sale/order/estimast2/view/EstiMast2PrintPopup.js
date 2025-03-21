Ext.define('module.custom.iypkg.sale.order.estimast2.view.EstiMast2PrintPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-estimast2-print-popup',

	title: '견적서 발행',
	closable: true,
	autoShow: true,
	width : 400,
	height: 130,
	layout: {
		type: 'border'
	},

	defaultFocus: 'initfocused',

	initComponent: function(config) {
		var me = this;
		me.items = [me.createForm()];
		me.callParent(arguments);
	},

	createForm: function() {
		var me = this,
			form = {
				xtype: 'form-panel',
				region: 'center',
				border: false,
				dockedItems: [{
					xtype: 'toolbar',
					dock: 'bottom',
					items: [
							'->',
							{xtype: 'button',   text: Const.FINISH.text,   iconCls: Const.FINISH.icon,   scope: me,   handler: me.finishAction,  cls: 'button-style'}, '-',
							{xtype: 'button',   text: Const.CLOSER.text,   iconCls: Const.CLOSER.icon,   scope: me,   handler: me.close,   cls: 'button-style'}
					]
				}],
				items: [me.editorForm()]
			};
		return form;
	},

	editorForm: function() {
		var me = this,
			form = {
				xtype: 'form-panel',
				border: false,
				layout: { type: 'vbox', align: 'stretch'},
				items: [{
					xtype: 'panel',
					layout: 'hbox',
					border: 0,
					items: [{
						xtype: 'form-panel',
						border: 0,
						fieldDefaults: {
							width : 100,
							labelWidth: 60,
							labelSeparator: ''
						},
						layout: 'hbox',
						items: [{
							xtype: 'checkboxfield',
							boxLabel: '일반',
							name: 'option1',
							margin : '25 0 0 40',
							listeners: {
								change: function(checkbox, newValue) {
									if (newValue) {
										checkbox.up('form-panel').down('[name=option2]').setValue(false);
										checkbox.up('form-panel').down('[name=option3]').setValue(false);
									}
								}
							}
						}, {
							xtype: 'checkboxfield',
							boxLabel: '부가세 포함',
							name: 'option2',
							margin : '25 40 0 0',
							listeners: {
								change: function(checkbox, newValue) {
									if (newValue) {
										checkbox.up('form-panel').down('[name=option1]').setValue(false);
										checkbox.up('form-panel').down('[name=option3]').setValue(false);
									}
								}
							}
						}, {
							xtype: 'checkboxfield',
							boxLabel: '부가세 별도',
							name: 'option3',
							margin : '25 40 0 0',
							listeners: {
								change: function(checkbox, newValue) {
									if (newValue) {
										checkbox.up('form-panel').down('[name=option1]').setValue(false);
										checkbox.up('form-panel').down('[name=option2]').setValue(false);
									}
								}
							}
						}]
					}]
				}]
			};
		return form;
	},

	finishAction: function() {
		var me = this,
			baseform = me.down('form'),
			values = baseform.getValues(),
			lister = Ext.ComponentQuery.query('module-estimast2-lister-master')[0],
			record = lister.getSelectionModel().getSelection(),
			resId = _global.hq_id.toUpperCase(),
			tray = "트레이 2";

		var records = lister.getSelectionModel().getSelection();
		var jrf = '';

		if (values.option1 != null) {
			if(me.popup.params.vatx_dvcd  == 1 || me.popup.params.vatx_dvcd  == 2 || me.popup.params.vatx_dvcd  == 3 ){
				jrf = 'EstiReport_Liebe.jrf'
			}else{
				jrf = 'EstiReport_Liebe2.jrf'
			}
		}
		if(values.option2 != null){
			jrf = 'EstiReport_Liebe2.jrf'
		}
		if(values.option3 != null){
			jrf = 'EstiReport_Liebe.jrf'
		}

		if(values.option1 == null && values.option2 == null && values.option3 == null){
			Ext.Msg.alert("알림","견적서 종류를 선택해주세요");
			return;
		}

		var invc_numb = me.popup.params.invc_numb;
		var arg =	'invc_numb~'+invc_numb+'~';
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';

		var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
		me.close();
		return win;
	}
});