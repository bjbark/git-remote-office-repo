Ext.define('module.sale.sale.salecolt.SaleColt', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.OrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.BzplPopup',
	],
	models	: [
		'module.sale.sale.salecolt.model.SaleColtMaster1',
		'module.sale.sale.salecolt.model.SaleColtDetail1',
		'module.sale.sale.salecolt.model.SaleColtMaster2',
		'module.sale.sale.salecolt.model.SaleColtDetail2',
		'module.sale.sale.salecolt.model.SaleColtWorkerLister'
	],
	stores	: [
		'module.sale.sale.salecolt.store.SaleColtMaster1',
		'module.sale.sale.salecolt.store.SaleColtMaster2',
		'module.sale.sale.salecolt.store.SaleColtDetail1',
		'module.sale.sale.salecolt.store.SaleColtDetail2',
		'module.sale.sale.salecolt.store.SaleColtWorkerLister'
	],
	views	: [
		'module.sale.sale.salecolt.view.SaleColtLayout',
		'module.sale.sale.salecolt.view.SaleColtListerMaster1',
		'module.sale.sale.salecolt.view.SaleColtListerDetail1',
		'module.sale.sale.salecolt.view.SaleColtListerMaster2',
		'module.sale.sale.salecolt.view.SaleColtListerDetail2',
		'module.sale.sale.salecolt.view.SaleColtSearch',
		'module.sale.sale.salecolt.view.SaleColtWorkerSearch',
		'module.sale.sale.salecolt.view.SaleColtWorkerLister',
		'module.sale.sale.salecolt.view.SaleColtWorkerEditor',
		'module.sale.sale.salecolt.view.SaleColtItemPopup',
		'module.sale.sale.salecolt.view.SaleColtItem2Popup'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
//			'module-salecolt-layout #mainpanel'					: { tabchange : me.mainTabChange	},
			'module-salecolt-layout button[action=selectAction]'	: { click : me.selectAction			},		// 조회
			// lister1 event
			'module-salecolt-lister-master1 button[action=exportAction]': { click : me.exportAction	},		// 엑셀
			'module-salecolt-lister-master1 button[action=deleteAction]': { click : me.deleteAction	},		// 삭제
			'module-salecolt-lister-master2 button[action=exportAction]': { click : me.exportAction1},		// 엑셀
			// lister2 event
			'module-salecolt-worker-lister button[action=updateAction]': { click : me.updateAction	},		// 저장
			'module-salecolt-worker-lister button[action=cancelAction]': { click : me.cancelAction	},		// 취소
			//lister serch
			'module-salecolt-worker-editor button[action=selectAction2]': { click : me.selectAction2},	//조회2

			'module-salecolt-lister-detail1 button[action=exportAction]': { click : me.exportDetailAction1},	// 엑셀
			'module-salecolt-lister-detail2 button[action=exportAction]': { click : me.exportDetailAction2},	// 엑셀
			'module-salecolt-lister-master1' : {
				itemdblclick : me.selectLister1 ,
				selectionchange : me.attachRecord1
			},
			'module-salecolt-lister-master2' : {
				itemdblclick : me.selectLister2 ,
				selectionchange : me.attachRecord2
			}
		});
		me.callParent(arguments);
	},

	pocket  : {
		layout			: function () { return Ext.ComponentQuery.query('module-salecolt-layout') [0] },
		search			: function () { return Ext.ComponentQuery.query('module-salecolt-search') [0] },
		listermaster1	: function () { return Ext.ComponentQuery.query('module-salecolt-lister-master1')[0] },
		listermaster2	: function () { return Ext.ComponentQuery.query('module-salecolt-lister-master2')[0] },
		listerdetail1	: function () { return Ext.ComponentQuery.query('module-salecolt-lister-detail1')[0] },
		listerdetail2	: function () { return Ext.ComponentQuery.query('module-salecolt-lister-detail2')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-salecolt-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-salecolt-worker-lister')[0] },
			search : function () { return Ext.ComponentQuery.query('module-salecolt-worker-search')[0] }
		},
	},

	//조회
	selectAction : function() {
		var me = this,
			master1  = me.pocket.listermaster1(),
			master2  = me.pocket.listermaster2(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(tindex == 2){
			Ext.Msg.alert("알림","수금등록의 조회를 눌러주십시오.");
		}else{
			if(param.work_strt_dttm1 > param.work_strt_dttm2) {
				Ext.Msg.alert("알림", "조회기간을 다시 입력해주십시오.");
			}else{
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
				}else if(tindex == 1){
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

		if(param.cstm_idcd == '' || param.cstm_idcd==null){
			Ext.Msg.alert("알림","거래처를 반드시 선택해주십시오.");
			return;
		}

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
			cstm_idcd		: param.cstm_idcd
		}));
	},

	dateFormat:function(date){
		var	yyyy,
			mm  ,
			dd  ,
			value = ""
		;
		if(date.length==8){
			yyyy = date.substr(0,4),
			mm =  date.substr(4,2),
			dd = date.substr(6,2)
			value = yyyy+'-'+mm+'-'+dd
		}
		return value;
	},

	//저장
	updateAction:function() {
		var me = this,
			lister = me.pocket.worker.lister(),
			store  = lister.getStore(),
			changes = lister.getStore().getUpdatedRecords().length,
			search = me.pocket.worker.search(),
			editor = me.pocket.worker.editor(),
			param  = search.getValues(),
			new_invc_numb, new_line_seqn,
			tpanel = me.pocket.layout().down('#mainpanel'),
			chk
		;

		for (var i = 0; i < changes; i++) {
			if(lister.getStore().getUpdatedRecords()[i].data.iomy_amnt == 0){
				chk = 1;
				break;
			}
		}

		if(changes != 0){
			if(chk == 1){
				Ext.Msg.alert("알림","금액을 0원 이상 입력해주십시오.");
				return;
			}
			Ext.Ajax.request({
				url			: _global.location.http() + '/listener/seq/maxid.do',
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'crdt_colt_mast'
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
				lister.getStore().getUpdatedRecords()[a].data.iomy_date = param.iomy_date;
				lister.getStore().getUpdatedRecords()[a].data.paym_bank_name = param.paym_bank_name;
				lister.getStore().getUpdatedRecords()[a].data.stot_bass = param.stot_bass;
				lister.getStore().getUpdatedRecords()[a].data.stot_dvcd = param.stot_dvcd;
				lister.getStore().getUpdatedRecords()[a].data.publ_date = param.publ_date;
				lister.getStore().getUpdatedRecords()[a].data.expr_date = param.expr_date;
				lister.getStore().getUpdatedRecords()[a].data.drtr_idcd = param.drtr_idcd;

			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = lister.getStore();
			lister.getStore().sync({
				success : function(operation){
					tpanel.items.indexOf(tpanel.setActiveTab(0));
					lister.getStore().reload();
					search.getForm().reset(true);
					editor.getForm().reset(true);
				},
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
				}
			});
			lister.getStore().reload();
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
		}, { invc_numb : record.get('invc_numb'), line_seqn : record.get('line_seqn') });
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

	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			master1		= me.pocket.listermaster1(),
			master2		= me.pocket.listermaster2(),
			search		= me.pocket.search(),
			search2		= me.pocket.workersearch(),
			lister		= me.pocket.lister(),
			editor		= me.pocket.editor(),
			param		= search.getValues(),
			param2		= search2.getValues(),
			tindex		= tabPanel.items.indexOf(newCard)
		;


		editor.down('[name=drtr_idcd]').setValue(_global.login_id);
		editor.down('[name=drtr_name]').setValue(_global.login_nm);
		editor.down('[name=ostt_date]').setValue(new Date());

		if(tindex == 0){
			me.pocket.search().down('[name=collapsed]').expand();
			master1.select({
				callback:function(records, operation, success) {
					if (success) {
						master1.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}else if(tindex == 1){
			me.pocket.search().down('[name=collapsed]').collapse();
			if(me.pocket.editor().getValues().cstm_idcd.length > 0 ){
				me.selectAction2();
			}
		}else if(tindex == 2){
			me.pocket.search().down('[name=collapsed]').expand();
			master2.select({
				callback:function(records, operation, success) {
					if (success) {
						master2.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}
	},


	deleteAction : function() {
		var me = this,
			lister = me.pocket.listermaster1(),
			detail = me.pocket.listerdetail1(),
			store  = lister.getStore(),
			select = lister.getSelectionModel().getSelection()[0],
			record = []
		;
		if(!select){
			Ext.Msg.alert("알림", "삭제하실 출고건을 선택하여 주십시오.");
		}else{
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
					mask.show();
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/stock/salecolt/set/deleteMaster.do',
						method		: "POST",
						async		: false,
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								invc_numb	: select.get('invc_numb'),
							})
						},
						success : function(response, request) {
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							store.reload();
							mask.hide();
						}
					});
				}
			});
		}
	},

	// 엑셀
	exportAction : function(self) {
		this.pocket.listermaster1().writer({enableLoadMask:true});
	},
	exportDetailAction1 : function(self) {
		this.pocket.listerdetail1().writer({enableLoadMask:true});
	},
	exportAction1 : function(self) {
		this.pocket.listermaster2().writer({enableLoadMask:true});
	},
	exportDetailAction2 : function(self) {
		this.pocket.listerdetail2().writer({enableLoadMask:true});
	},
});