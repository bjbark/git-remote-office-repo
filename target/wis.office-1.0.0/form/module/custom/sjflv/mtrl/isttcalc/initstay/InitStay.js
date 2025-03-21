Ext.define('module.custom.sjflv.mtrl.isttcalc.initstay.InitStay', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.BasePopup',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload',
		'lookup.popup.view.WkfwPopup'
	],

	models:[
		'module.custom.sjflv.mtrl.isttcalc.initstay.model.InitStayMaster'
	],
	stores:[
		'module.custom.sjflv.mtrl.isttcalc.initstay.store.InitStayMaster',
		'module.custom.sjflv.mtrl.isttcalc.initstay.store.InitStayWorkerLister'
	],
	views : [
		'module.custom.sjflv.mtrl.isttcalc.initstay.view.InitStayLayout',
		'module.custom.sjflv.mtrl.isttcalc.initstay.view.InitStaySearch',
		'module.custom.sjflv.mtrl.isttcalc.initstay.view.InitStayListerMaster',
		'module.custom.sjflv.mtrl.isttcalc.initstay.view.InitStayWorkerEditor',
		'module.custom.sjflv.mtrl.isttcalc.initstay.view.InitStayWorkerSearch',
		'module.custom.sjflv.mtrl.isttcalc.initstay.view.InitStayWorkerLister'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-mtrl-initstay-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-mtrl-initstay-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-imtrl-nitstay-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-mtrl-initstay-layout #mainpanel'									: { tabchange : me.selectAction		},
			'module-mtrl-initstay-layout button[action=selectAction]'				: { click : me.selectAction       }, /* 조회 */

			'module-mtrl-initstay-lister-master button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-mtrl-initstay-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-mtrl-initstay-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */

			'module-mtrl-initstay-worker-search button[action=selectAction2]'		: { click : me.selectAction2},	//조회2

			'module-mtrl-initstay-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
			'module-mtrl-initstay-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */


		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-mtrl-initstay-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-mtrl-initstay-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-mtrl-initstay-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-mtrl-initstay-worker-lister')[0] },
			search : function () { return Ext.ComponentQuery.query('module-mtrl-initstay-worker-search')[0] }
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-mtrl-initstay-lister-master')[0] },
		},
	},

	selectAction:function(callbackFn) {
		var me = this,
			editor = this.pocket.worker.editor(),
			lister = me.pocket.lister.master(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		console.log("^^^^^^^^");

		if(tindex == 0){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			me.pocket.search().down('[name=collapsed]').expand();
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true); }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}else{
			me.pocket.search().down('[name=collapsed]').collapse();
		}
	},

	selectAction2 : function() {
		var me = this,
			lister = me.pocket.worker.lister(),
			editor = me.pocket.worker.editor(),
			search = me.pocket.worker.search(),
			param = search.getValues(),
			record = undefined
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { }
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {mes_system_type:_global.options.mes_system_type}));
	},

	insertAction:function() {
		var me		= this,
			editor	= me.pocket.worker.editor(),
			search	= me.pocket.worker.search(),
			lister	= me.pocket.worker.lister(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
			parent
		;

		lister.getStore().clearData();
		lister.getStore().loadData([],false);

		tpanel.items.indexOf(tpanel.setActiveTab(1));

	},

	cancelAction:function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			search = me.pocket.worker.search(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		tpanel.items.indexOf(tpanel.setActiveTab(0));
	},

	deleteAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			editor = me.pocket.worker.editor(),
			store  = master.getStore()
		;

		var err_msg = "";
		var param	= "";
		var records = master.getSelectionModel().getSelection();

		if (!records || records.length==0) {
			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
			return;
		}

		var select = [];
		Ext.each(records, function(record) {
			if(record.get('row_type') == '0'){
				select.push(record.data);
			}

		});

		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg: Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url         : _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/mtrl/isttcalc/initstay/set/del_yn.do2',
					method: "POST",
					params: {
						token: _global.token_id,
						param: JSON.stringify({
							records: JSON.stringify(select)
						})
					},
					async: false,
					method: 'POST',
					success: function(response, request) {
						var result = Ext.decode(response.responseText);
						if (!result.success) {
							Ext.Msg.error(result.message);
							return;
						} else {
					}
					},
					failure: function(result, request) {
					},
					callback: function(operation) {  /* 성공 실패 관계 없이 호출된다. */
						store.reload({callback:function(){
							me.cancelAction();
							editor.getForm().reset(true);
						}});
						mask.hide();
					}
				});
			}
		});
	},

	updateAction:function(callbackFn) {
		var me = this,
			select = me.pocket.worker.lister().getSelectionModel().getSelection(),
			lister = me.pocket.worker.lister(),
			editor = me.pocket.worker.editor(),
			master = me.pocket.lister.master(),
			param  = editor.getValues()
		;

		if(!select || select.length<1){
			Ext.Msg.alert("알림", "이월대상 자료를 1개 이상 선택하세요.");
			return;
		}

		var selects = [];
		Ext.each(select, function(record) {
			record.data.trns_date = param.trns_date
			selects.push(record.data);
		})

		Ext.Msg.confirm("확인", "이월 작업을 하시겠습니까?", function(button) {
			if (button == 'yes') {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.UPDATE.mask });
				mask.show();

				Ext.each(select, function(record) {
					Ext.Ajax.request({
						url		: _global.location.http() + '/custom/sjflv/mtrl/isttcalc/initstay/set/update.do',
						params	: {
							token : _global.token_id,
							param: JSON.stringify({
								records: JSON.stringify(selects)
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
								master.getStore().reload();
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				})
			}
			lister.getStore().reload();
		})
	},


	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},
	exportDetailAction : function(self) {
		this.pocket.lister.detail().writer({enableLoadMask:true});
	},

});
