Ext.define('module.custom.iypkg.stock.isos.isttwork2.IsttWork2', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ProdPopup'
	],

	models:[
		'module.custom.iypkg.stock.isos.isttwork2.model.IsttWork2Master',
		'module.custom.iypkg.stock.isos.isttwork2.model.IsttWork2Worker',
	],
	stores:[
		'module.custom.iypkg.stock.isos.isttwork2.store.IsttWork2Master',
		'module.custom.iypkg.stock.isos.isttwork2.store.IsttWork2Worker',
	],
	views : [
		'module.custom.iypkg.stock.isos.isttwork2.view.IsttWork2Layout',
		'module.custom.iypkg.stock.isos.isttwork2.view.IsttWork2Search',
		'module.custom.iypkg.stock.isos.isttwork2.view.IsttWork2Master',
		'module.custom.iypkg.stock.isos.isttwork2.view.IsttWork2WorkerEditor',
		'module.custom.iypkg.stock.isos.isttwork2.view.IsttWork2WorkerSearch',
		'module.custom.iypkg.stock.isos.isttwork2.view.IsttWork2WorkerLister',

	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({// TODO
			'module-isttwork2-layout #mainpanel'									: { tabchange : me.selectAction		},
			'module-isttwork2-layout button[action=selectAction]'					: { click : me.selectAction			}, /* 조회 */
			'module-isttwork2-lister button[action=deleteAction]'					: { click : me.deleteAction			}, /* 삭제 */

			'module-isttwork2-worker-editor button[action=selectAction2]'			: { click : me.selectAction2		}, /* 조회2*/
			'module-isttwork2-worker-lister button[action=updateAction]'			: { click : me.updateAction			}, /* 저장*/
			'module-isttwork2-lister button[action=exportAction]'					: { click : me.exportAction			}, /* 엑셀 */
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-isttwork2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-isttwork2-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-isttwork2-lister')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-isttwork2-worker-editor')[0] },
			search : function () { return Ext.ComponentQuery.query('module-isttwork2-worker-search')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-isttwork2-worker-lister')[0] }
		},

	},


	//조회
	selectAction:function(callbackFn) {
		var me = this,
			lister = me.pocket.lister(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(tindex==1){
			me.pocket.search().down('[name=collapsed]').expand();
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}else if(tindex==0){
			me.pocket.search().down('[name=collapsed]').collapse();
		}
	},

	//worker-lister 조회
	selectAction2 : function() {
		var me = this,
			lister = me.pocket.worker.lister(),
			editor = me.pocket.worker.editor(),
			search = me.pocket.worker.search(),
			param = editor.getValues(),
			record = undefined
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { }
			}, scope:me
		}, Ext.merge({	cstm_idcd		: param.cstm_idcd,
						prod_idcd		: param.prod_idcd,
						invc_date1		: param.invc_date1,
						invc_date2		: param.invc_date2
		}));
		mask.hide();

	},

	//저장
	updateAction:function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			store  = lister.getStore(),
			changes = lister.getStore().getUpdatedRecords().length,
			search = me.pocket.worker.search(),
			param  = search.getValues(),
			new_invc_numb, new_line_seqn,
			tpanel = me.pocket.layout().down('#mainpanel'),
			chk, chk2
		;

		if(param.invc_date == ''){
			Ext.Msg.alert("알림","입고일자를 입력해주십시오.");
			return;
		}

		for (var i = 0; i < changes; i++) {
			if(lister.getStore().getUpdatedRecords()[i].data.istt_qntt == 0){
				chk = 1;
				break;
			}
			if(lister.getStore().getUpdatedRecords()[0].data.cstm_idcd != lister.getStore().getUpdatedRecords()[i].data.cstm_idcd){
				chk2 = 1;
			}
		}

		if(changes != 0){
			if(chk == 1){
				Ext.Msg.alert("알림","수량을 1개 이상 입력해주십시오.");
				return;
			}
			if (chk2 == 1){
				Ext.Msg.alert("알림","동일한 발주처의 품목을 선택하여 주십시오.");
				return;
			}else{
				Ext.Ajax.request({
					url			: _global.location.http() + '/listener/seq/maxid.do',
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id	: _global.stor_id,
							table_nm : '부자재입고번호'
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						new_invc_numb = result.records[0].seq;
					}
				});
				var x = 1;	//순번
				for (var a = 0; a < changes; a++) {
					lister.getStore().getUpdatedRecords()[a].data.new_line_seqn = x++;
					lister.getStore().getUpdatedRecords()[a].data.new_invc_numb = new_invc_numb;
					lister.getStore().getUpdatedRecords()[a].data.invc_date = param.invc_date;
					lister.getStore().getUpdatedRecords()[a].data.offr_path_dvcd = 2;
					if(lister.getStore().getUpdatedRecords()[a].data.line_seqn === '' ||
					        lister.getStore().getUpdatedRecords()[a].data.line_seqn === null ||
					        lister.getStore().getUpdatedRecords()[a].data.line_seqn === undefined){
						console.log('11');
						lister.getStore().getUpdatedRecords()[a].data.line_seqn = 1;
					}
				}

				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
				mask.show();
				var store = lister.getStore();
				lister.getStore().sync({
					success : function(operation){
						tpanel.items.indexOf(tpanel.setActiveTab(0));
						lister.getStore().reload();
						search.getForm().reset(true);
					},
					failure : function(operation){ },
					callback: function(operation){
						mask.hide();
						store.reload();
					}
				});

			}
		}else{
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}
	},

	//삭제
	deleteAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			workerlister = me.pocket.worker.lister(),
			store  = lister.getStore()
		;

		var records = lister.getSelectionModel().getSelection();

		console.log(records);

		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/stock/isos/isttwork2/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb'),
							invc_date	: records[0].get('invc_date'),
							line_seqn	: records[0].get('line_seqn')
						})
					},
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if (result.success) {
							store.remove(records[0]);
							store.commitChanges();
						} else {
							Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
						}
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback : function() {
						workerlister.getStore().load();
						mask.hide();
					}
				});
			}
		});
	},

	//취소
	cancelAction:function() {
		var me = this,
			lister = me.pocket.worker.lister(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			search = me.pocket.worker.search()
		;
		tpanel.items.indexOf(tpanel.setActiveTab(0));
		search.getForm().reset(true);
	},

	//엑셀
	exportAction : function(self) {
		this.pocket.lister().writer({enableLoadMask:true});
	},


});
