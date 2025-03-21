Ext.define('module.custom.iypkg.mtrl.po.purcordr.view.PurcOrdrPrintPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-purcordr-print-popup',

	title: '발주서 출력',
	closable: true,
	autoShow: true,
	width: 270,
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
							width: 125,
							labelWidth: 60,
							labelSeparator: ''
						},
						layout: 'hbox',
						items: [{
							xtype: 'checkboxfield',
							boxLabel: '상자규격',
							name: 'option1',
							margin : '23 0 0 40',
							listeners: {
								change: function(checkbox, newValue) {
									if (newValue) {
										checkbox.up('form-panel').down('[name=option2]').setValue(false);
									}
								}
							}
						}, {
							xtype: 'checkboxfield',
							boxLabel: '스코어',
							name: 'option2',
							margin : '23 40 0 0',
							listeners: {
								change: function(checkbox, newValue) {
									if (newValue) {
										checkbox.up('form-panel').down('[name=option1]').setValue(false);
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
			lister = Ext.ComponentQuery.query('module-purcordr-lister')[0],
			record = lister.getSelectionModel().getSelection(),
			resId = _global.hq_id.toUpperCase(),
			tray = "트레이 2";

		var records = lister.getSelectionModel().getSelection();
		var jrf = '';

		if (_global.hqof_idcd.toUpperCase() == 'N1000DAE-A') {
			jrf = 'PurcOrderReport_daea_fabc.jrf';
		} else if (_global.hqof_idcd.toUpperCase() == 'N1000LIEBE') {
			if(values.option1 != null){
				jrf = 'Liebe_PurcOrderReport_fabc_size.jrf';
			}else{
				jrf = 'Liebe_PurcOrderReport_fabc_score.jrf';
			}

		} else if (_global.hqof_idcd.toUpperCase() == 'N1000IYPKG') {
			jrf = 'PurcOrderReport_fabc.jrf';
		}

		if(values.option1 == null && values.option2 == null){
			Ext.Msg.alert("알림","상자 규격 혹은 스코어 중 선택해주세요.");
			return;
		}

		var _param = '_param~{\'records\':'+me.popup.params.arr+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')

	}
});