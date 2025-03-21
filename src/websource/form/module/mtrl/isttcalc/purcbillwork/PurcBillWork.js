Ext.define('module.mtrl.isttcalc.purcbillwork.PurcBillWork', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.CstmClassPopup',
		'lookup.popup.view.IypkgOrdrPopup',
		'lookup.popup.view.ProdPopup',
		'lookup.popup.view.BzplPopup',
	],
	models	: [
		'module.mtrl.isttcalc.purcbillwork.model.PurcBillWorkListerMaster',
		'module.mtrl.isttcalc.purcbillwork.model.PurcBillWorkListerMaster2',
		'module.mtrl.isttcalc.purcbillwork.model.PurcBillWorkListerDetail',
		'module.mtrl.isttcalc.purcbillwork.model.PurcBillWorkWorkerLister',
	],
	stores	: [
		'module.mtrl.isttcalc.purcbillwork.store.PurcBillWorkListerMaster',
		'module.mtrl.isttcalc.purcbillwork.store.PurcBillWorkListerMaster2',
		'module.mtrl.isttcalc.purcbillwork.store.PurcBillWorkListerDetail',
		'module.mtrl.isttcalc.purcbillwork.store.PurcBillWorkListerDetail2',
		'module.mtrl.isttcalc.purcbillwork.store.PurcBillWorkWorkerLister',
		'module.mtrl.isttcalc.purcbillwork.store.PurcBillWorkWorkerLister2',
	],
	views	: [
		'module.mtrl.isttcalc.purcbillwork.view.PurcBillWorkLayout',
		'module.mtrl.isttcalc.purcbillwork.view.PurcBillWorkSearch',
		'module.mtrl.isttcalc.purcbillwork.view.PurcBillWorkListerMaster',
		'module.mtrl.isttcalc.purcbillwork.view.PurcBillWorkListerMaster2',
		'module.mtrl.isttcalc.purcbillwork.view.PurcBillWorkListerDetail',
		'module.mtrl.isttcalc.purcbillwork.view.PurcBillWorkListerDetail2',
		'module.mtrl.isttcalc.purcbillwork.view.PurcBillWorkWorkerEditor',
		'module.mtrl.isttcalc.purcbillwork.view.PurcBillWorkWorkerLister',
		'module.mtrl.isttcalc.purcbillwork.view.PurcBillWorkWorkerEditor2',
		'module.mtrl.isttcalc.purcbillwork.view.PurcBillWorkWorkerListerMaster2',
		'module.mtrl.isttcalc.purcbillwork.view.PurcBillWorkWorkerListerDetail2'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-purcbillwork-layout button[action=selectAction]'			: { click : me.selectAction },
//			'module-purcbillwork-worker-editor button[action=selectAction2]'	: { click : me.selectAction2},	//조회2

			'module-purcbillwork-lister-master button[action=exportAction]': { click : me.exportAction1	},			// 엑셀
			'module-purcbillwork-lister-detail button[action=exportAction]': { click : me.exportDetailAction1 },	// 엑셀
			'module-purcbillwork-lister-master2 button[action=exportAction]': { click : me.exportAction2 },			// 엑셀
			'module-purcbillwork-lister-detail2 button[action=exportAction]': { click : me.exportDetailAction2 },	// 엑셀

			'module-purcbillwork-lister-master' : {
				itemdblclick : me.selectLister1 ,
				selectionchange : me.attachRecord1
			},

			'module-purcbillwork-lister-master2' : {
				itemdblclick : me.selectLister2 ,
				selectionchange : me.attachRecord2
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout			: function () { return Ext.ComponentQuery.query('module-purcbillwork-layout')[0] },
		search			: function () { return Ext.ComponentQuery.query('module-purcbillwork-search')[0] },
		listermaster1	: function () { return Ext.ComponentQuery.query('module-purcbillwork-lister-master')[0] },
		listerdetail1	: function () { return Ext.ComponentQuery.query('module-purcbillwork-lister-detail')[0] },
		listermaster2	: function () { return Ext.ComponentQuery.query('module-purcbillwork-lister-master2')[0] },
		listerdetail2	: function () { return Ext.ComponentQuery.query('module-purcbillwork-lister-detail2')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-invoicemast-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-invoicemast-worker-lister')[0] }
		},
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			master1 = me.pocket.listermaster1(),
			master2 = me.pocket.listermaster2(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		if(tindex == 2){
			Ext.Msg.alert("알림","발행대기 내역 조회를 눌러주십시오.");
		} else if (tindex == 3) {
			Ext.Msg.alert("알림","홈텍스자료 가져오기를 눌러주십시오.");
		}else {
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			if ( tindex == 0 ) {
				master1.select({
					callback:function(records, operation, success) {
						if (success) {
							master1.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}));
			} else {
				master2.select({
					callback:function(records, operation, success) {
						if (success) {
							master2.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}));
			}
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

	selectLister1:function( grid, record ){
		var me = this,
			master = me.pocket.listermaster1(),
			detail = me.pocket.listerdetail1(),
			record = master.getSelectionModel().getSelection()[0]
		;
		detail.select({
			 callback : function(records, operation, success) {
				if (success) {
				} else {}
			}, scope : me
		}, { invc_numb : record.get('invc_numb') });
	},

	selectLister2:function( grid, record ){
		var me = this,
			master = me.pocket.listermaster2(),
			detail = me.pocket.listerdetail2(),
			record = master.getSelectionModel().getSelection()[0]
		;
		detail.select({
			 callback : function(records, operation, success) {
				if (success) {
				} else {}
			}, scope : me
		}, { invc_numb : record.get('invc_numb'), line_seqn : record.get('line_seqn') });
	},

	attachRecord1:function( grid, records ){
		var me = this,
			listerdetail1 = me.pocket.listerdetail1()
		;
		listerdetail1.getStore().clearData();
		listerdetail1.getStore().loadData([],false);
	},

	attachRecord2:function( grid, records ){
		var me = this,
			listerdetail2 = me.pocket.listerdetail2()
		;
		listerdetail2.getStore().clearData();
		listerdetail2.getStore().loadData([],false);
	},

	// 엑셀
	exportAction1 : function(self) {
		this.pocket.listermaster1().writer({enableLoadMask:true});
	},
	exportDetailAction1 : function(self) {
		this.pocket.listerdetail1().writer({enableLoadMask:true});
	},
	exportAction2 : function(self) {
		this.pocket.listermaster2().writer({enableLoadMask:true});
	},
	exportDetailAction2 : function(self) {
		this.pocket.listerdetail2().writer({enableLoadMask:true});
	}
});

