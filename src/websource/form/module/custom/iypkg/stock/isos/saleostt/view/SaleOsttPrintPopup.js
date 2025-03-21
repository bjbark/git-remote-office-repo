Ext.define('module.custom.iypkg.stock.isos.saleostt.view.SaleOsttPrintPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-iypkg-saleostt-print-popup',

	title: '거래명세서 출력',
	closable: true,
	autoShow: true,
	width: 280,
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
							width: 300,
							labelWidth: 60,
							labelSeparator: ''
						},
						items: [{
							fieldLabel: '단가',
							name: 'pric',
							xtype: 'lookupfield',
							width: 180,
							margin: '20 0 0 20',
							lookupValue: resource.lookup('yorn'),
							value: '1',
							editable: false
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
			lister = Ext.ComponentQuery.query('module-saleostt-lister')[0],
			record = lister.getSelectionModel().getSelection(),
			resId = _global.hq_id.toUpperCase(),
			tray = "트레이 2";

		var records = lister.getSelectionModel().getSelection();

		if (_global.hqof_idcd.toUpperCase() == 'N1000DAE-A') {
			jrf = 'invoice_dae-a.jrf';
		} else if (_global.hqof_idcd.toUpperCase() == 'N1000LIEBE') {
			jrf = 'Invoice_liebe.jrf';
		} else if (_global.hqof_idcd.toUpperCase() == 'N1000IYPKG') {
			jrf = 'Invoice_iypkg.jrf';
		}

		if (me.popup && me.popup.params && me.popup.params.arr && me.popup.params.arr.length > 0) {
			Ext.Ajax.request({
				url: _global.location.http() + '/custom/iypkg/stock/isos/saleostt/set/updt.do',
				method: "POST",
				params: {
					token: _global.token_id,
					param: JSON.stringify({
						invc_numb: me.popup.params.arr[0].get('invc_numb')
					})
				},
				async: false,
				success: function(response, request) {
					var result = Ext.decode(response.responseText);
					lister.getStore().reload();
					if (!result.success) {
						Ext.Msg.error(result.message);
						return;
					}
				},
				failure: function(result, request) {
					// 실패 처리
				},
				callback: function(operation) {
					// 콜백 처리
				}
			});
		} else {
			Ext.Ajax.request({
				url: _global.location.http() + '/custom/iypkg/stock/isos/saleostt/set/updt.do',
				method: "POST",
				params: {
					token: _global.token_id,
					param: JSON.stringify({
						invc_numb: record[0].get('invc_numb')
					})
				},
				async: false,
				success: function(response, request) {
					var result = Ext.decode(response.responseText);
					lister.getStore().reload();
					if (!result.success) {
						Ext.Msg.error(result.message);
						return;
					}
				},
				failure: function(result, request) {
					// 실패 처리
				},
				callback: function(operation) {
					// 콜백 처리
				}
			});
		}

		var dvcd = (values.pric == 1) ? '1' : '2';

		var cstm = '',
			a = "",
			chk = 0;

		if (me.popup && me.popup.params && me.popup.params.arr && me.popup.params.arr.length > 0) {
			cstm = me.popup.params.arr[0].get('cstm_idcd');
		} else {
			cstm = record[0].get('cstm_idcd');
		}

		if (me.popup && me.popup.params && me.popup.params.arr && me.popup.params.arr.length > 0) {
			var popup = me.popup.params.arr;

			for (var i = 0; i < popup.length; i++) {
				if (cstm != popup[i].get('cstm_idcd')) {
					chk = 1;
				}
				if (i == 0) {
					a += "[";
				}
				a += '{\'invc_numb\':\'' + popup[i].get('invc_numb') + '\',\'line_seqn\':' + popup[i].get('line_seqn') + '}';
				if (i != popup.length - 1) {
					a += ",";
				} else {
					a += "]";
				}
			}
		} else {
			for (var i = 0; i < record.length; i++) {
				if (cstm != record[i].get('cstm_idcd')) {
					chk = 1;
				}
				if (i == 0) {
					a += "[";
				}
				a += '{\'invc_numb\':\'' + record[i].get('invc_numb') + '\',\'line_seqn\':' + record[i].get('line_seqn') + '}';

				if (i != record.length - 1) {
					a += ",";
				} else {
					a += "]";
				}
			}
		}

		if (chk) {
			Ext.Msg.alert('알림', '같은 납품거래처만 명세서발행이 가능합니다.');
			return;
		}

		var _param = '';

		if (me.popup && me.popup.params && me.popup.params.arr && me.popup.params.arr.length > 0) {
			_param = '_param~{\'dvcd\':\'' + dvcd + '\',\'cstm_idcd\':\'' + me.popup.params.arr[0].get('cstm_idcd') + '\',\'records\':' + a + '}~';
		} else {
			_param = '_param~{\'dvcd\':\'' + dvcd + '\',\'cstm_idcd\':\'' + record[0].get('cstm_idcd') + '\',\'records\':' + a + '}~';
		}

		var url = '/ubi/getReport.do?param={"jrf" : "' + jrf + '","arg" : "' + _param + '","resId" : "' + resId + '"}';
		me.close();
		var win = window.open(_global.location.http() + encodeURI(url), 'test', 'width=1400,height=800');

		lister.selectedRecords = new Set();

		return win;
	}
});