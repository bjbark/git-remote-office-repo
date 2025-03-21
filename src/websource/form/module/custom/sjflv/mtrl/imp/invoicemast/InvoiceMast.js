Ext.define('module.custom.sjflv.mtrl.imp.invoicemast.InvoiceMast', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.CstmClassPopup',
		'lookup.popup.view.IypkgOrdrPopup',
		'lookup.popup.view.ProdPopup'
	],
	models	: [
		'module.custom.sjflv.mtrl.imp.invoicemast.model.InvoiceMastListerMaster',
		'module.custom.sjflv.mtrl.imp.invoicemast.model.InvoiceMastWorkerLister',
	],
	stores	: [
		'module.custom.sjflv.mtrl.imp.invoicemast.store.InvoiceMastListerMaster',
		'module.custom.sjflv.mtrl.imp.invoicemast.store.InvoiceMastListerDetail',
		'module.custom.sjflv.mtrl.imp.invoicemast.store.InvoiceMastWorkerLister',
	],
	views	: [
		'module.custom.sjflv.mtrl.imp.invoicemast.view.InvoiceMastLayout',
		'module.custom.sjflv.mtrl.imp.invoicemast.view.InvoiceMastSearch',
		'module.custom.sjflv.mtrl.imp.invoicemast.view.InvoiceMastListerMaster',
		'module.custom.sjflv.mtrl.imp.invoicemast.view.InvoiceMastListerDetail',
		'module.custom.sjflv.mtrl.imp.invoicemast.view.InvoiceMastWorkerEditor',
		'module.custom.sjflv.mtrl.imp.invoicemast.view.InvoiceMastWorkerLister',
		'module.custom.sjflv.mtrl.imp.invoicemast.view.InvoiceMastWorkerLister2',
		'module.custom.sjflv.mtrl.imp.invoicemast.view.InvoiceMastCostPopup',
		'module.custom.sjflv.mtrl.imp.invoicemast.view.InvoiceMastPayPopup',
		'module.custom.sjflv.mtrl.imp.invoicemast.view.InvoiceMastInsertPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-invoicemast-layout #mainpanel'							: { tabchange : me.selectAction	},
			'module-invoicemast-layout button[action=selectAction]'			: { click : me.selectAction },
			'module-invoicemast-worker-editor button[action=selectAction2]'	: { click : me.selectAction2},	//조회2

			'module-invoicemast-lister-master button[action=costAction]'	: { click : me.costAction   }, /* 부대비용등록 */

			'module-invoicemast-worker-lister button[action=InsertAction]'	: { click : me.InsertAction }, /* Invoice 등록 */
			'module-invoicemast-worker-lister button[action=PayAction]'	: { click : me.PayAction }, /* 지급등록 */
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-invoicemast-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-invoicemast-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-invoicemast-lister')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-invoicemast-lister2')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-invoicemast-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-invoicemast-worker-lister')[0] }
		},
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister1 = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			search = me.pocket.search(),
			param = search.getValues(),
			lister = undefined, type,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			search2 = me.pocket.worker.search()
			;
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		if(tindex == 1){
			me.pocket.search().down('[name=collapsed]').expand();
			mask.show();
			lister1.select({
				callback:function(records, operation, success) {
					if (success) {
						lister1.getSelectionModel().select();
					} else {}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id, type : '입고'}) );
		}else if(tindex==0){
			me.pocket.search().down('[name=collapsed]').collapse();
		}
		mask.hide();
		search2.getForm().reset();

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

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					mask.hide();
				} else {
				}
			}, scope:me
		}, Ext.merge({
			invc_date1		: param.invc_date1,
			invc_date2		: param.invc_date2,
			cstm_idcd		: param.cstm_idcd,
			invc_numb		: param.invc_numb
		}));
	},

	//저장
	updateAction:function() {
		var me = this,
			lister = me.pocket.worker.lister(),
			store  = lister.getStore(),
			changes = lister.getStore().getUpdatedRecords().length,
			search = me.pocket.worker.search(),
			param  = search.getValues(),
			new_invc_numb, new_line_seqn,
			tpanel = me.pocket.layout().down('#mainpanel'),
			chk, chk2
		;

		for (var i = 0; i < changes; i++) {
			if(lister.getStore().getUpdatedRecords()[i].data.istt_qntt2 == 0){
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
					url			: _global.location.http() + '/custom/iypkg/stock/isos/isttwork1/get/invc.do',
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm	: '원단입고번호'
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
					lister.getStore().getUpdatedRecords()[a].data.istt_date = param.invc_date;
					lister.getStore().getUpdatedRecords()[a].data.offr_path_dvcd = 1;
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
						me.pocket.lister().getStore().reload();
					}
				});
			}
		}else{
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}
	},

	//취소
	cancelAction:function() {
		var me = this,
			lister = me.pocket.worker.lister(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			search = me.pocket.worker.search(),
			select = lister.getStore().getUpdatedRecords().length
		;
		if(select){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.getStore().reload({
				callback: function(operation){
					mask.hide();
				}
			});
			search.getForm().reset(true);
		}
	},

	deleteAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			workerlister = me.pocket.worker.lister(),
			store  = lister.getStore()
		;
		var records = lister.getSelectionModel().getSelection();


		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();
				var a =[];

				for(var i =0; i< records.length ; i++){
					a.push({invc_numb : records[i].get('invc_numb'),line_seqn : records[i].get('line_seqn')});
				}
				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/stock/isos/isttwork1/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
					 	param	: JSON.stringify({
							stor_id		: _global.stor_id,
							hqof_idcd	: _global.hqof_idcd,
							records		: a
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
						store.reload();
					}
				});
			}
		});
	},
	costAction:function() {
		var me = this
//			master = me.pocket.lister.master()
		;

		var me = this
		resource.loadPopup({
			widget : 'module-invoicemast-cost-popup',
		});
//		var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
//		var numb2 = Ext.ComponentQuery.query('#cstm_name')[0].setValue(records[0].data.cstm_name);
	},

	InsertAction:function() {
		var me = this
//			master = me.pocket.lister.master()
		;

		var me = this
		resource.loadPopup({
			widget : 'module-invoicemast-insert-popup',
		});
//		var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
//		var numb2 = Ext.ComponentQuery.query('#cstm_name')[0].setValue(records[0].data.cstm_name);
	},

	PayAction:function() {
		var me = this
//			master = me.pocket.lister.master()
		;

		var me = this
		resource.loadPopup({
			widget : 'module-invoicemast-pay-popup',
		});
//		var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
//		var numb2 = Ext.ComponentQuery.query('#cstm_name')[0].setValue(records[0].data.cstm_name);
	},

	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}

});

