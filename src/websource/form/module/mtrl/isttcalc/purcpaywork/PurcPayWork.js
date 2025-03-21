Ext.define('module.mtrl.isttcalc.purcpaywork.PurcPayWork', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.CstmClassPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.IypkgOrdrPopup',
		'lookup.popup.view.ProdPopup'
	],
	models	: [
		'module.mtrl.isttcalc.purcpaywork.model.PurcPayWorkListerMaster',
		'module.mtrl.isttcalc.purcpaywork.model.PurcPayWorkWorkerLister',
	],
	stores	: [
		'module.mtrl.isttcalc.purcpaywork.store.PurcPayWorkListerMaster',
		'module.mtrl.isttcalc.purcpaywork.store.PurcPayWorkListerMaster2',
		'module.mtrl.isttcalc.purcpaywork.store.PurcPayWorkListerDetail',
		'module.mtrl.isttcalc.purcpaywork.store.PurcPayWorkListerDetail2',
		'module.mtrl.isttcalc.purcpaywork.store.PurcPayWorkWorkerLister',
	],
	views	: [
		'module.mtrl.isttcalc.purcpaywork.view.PurcPayWorkLayout',
		'module.mtrl.isttcalc.purcpaywork.view.PurcPayWorkSearch',
		'module.mtrl.isttcalc.purcpaywork.view.PurcPayWorkListerMaster',
		'module.mtrl.isttcalc.purcpaywork.view.PurcPayWorkListerMaster2',
		'module.mtrl.isttcalc.purcpaywork.view.PurcPayWorkListerDetail',
		'module.mtrl.isttcalc.purcpaywork.view.PurcPayWorkListerDetail2',
		'module.mtrl.isttcalc.purcpaywork.view.PurcPayWorkWorkerEditor',
		'module.mtrl.isttcalc.purcpaywork.view.PurcPayWorkWorkerSearch',
		'module.mtrl.isttcalc.purcpaywork.view.PurcPayWorkWorkerLister'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-purcpaywork-layout #mainpanel'							: { tabchange : me.selectAction	},
			'module-purcpaywork-layout button[action=selectAction]'			: { click : me.selectAction },

			'module-purcpaywork-lister-master button[action=deleteAction]'	: { click : me.deleteAction},	//지급내역삭제

			'module-purcpaywork-worker-editor button[action=selectAction2]'	: { click : me.selectAction2},	//조회2


			'module-purcpaywork-worker-lister button[action=updateAction]'		: { click : me.updateAction }, //저장
			'module-purcpaywork-worker-lister button[action=cancelAction]'		: { click : me.cancelAction }, //취소

			'module-purcpaywork-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange: me.selectRecord									// 메뉴 선택시 이벤트
			},

			'module-purcpaywork-lister-master2' : {
				itemdblclick    : me.selectDetail2,
				selectionchange: me.selectRecord									// 메뉴 선택시 이벤트
			}


		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-purcpaywork-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-purcpaywork-search')[0] },
		master	: function () { return Ext.ComponentQuery.query('module-purcpaywork-lister-master')[0] },
		detail	: function () { return Ext.ComponentQuery.query('module-purcpaywork-lister-detail')[0] },
		master2	: function () { return Ext.ComponentQuery.query('module-purcpaywork-lister-master2')[0] },
		detail2	: function () { return Ext.ComponentQuery.query('module-purcpaywork-lister-detail2')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-purcpaywork-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-purcpaywork-worker-lister')[0] },
			search : function () { return Ext.ComponentQuery.query('module-purcpaywork-worker-search')[0] }
		},
	},

	//조회
	selectAction:function() {
		var me = this,
			master = me.pocket.master(),
			master2 = me.pocket.master2(),
			search = me.pocket.search(),
			param  = search.getValues()
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(tindex==0){
			lister = master;
			temp   = 'query';
		}else{
			lister = master2;
			temp   = 'entry';
		}
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
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp}));

	},

	//선택
	selectRecord:function( grid, record ){
		var me = this,
		detail = me.pocket.detail()
	;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);

	},

	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.detail()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, Ext.merge(me.pocket.search().getValues(),{ invc_numb : record.get('invc_numb') }));
		}
	},

	selectDetail2 : function(grid, record) {
		var me = this,
			detail2 = me.pocket.detail2()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail2.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, Ext.merge(me.pocket.search().getValues(),{ orig_invc_numb : record.get('orig_invc_numb') }));
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

	deleteAction:function() {
		var me = this,
			lister = me.pocket.master(),
			store  = lister.getStore(),
			select	= lister.getSelectionModel().getSelection()


		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "지급 List에서 1건을 선택 후 진행하십시오.");
				return;
			}

		if (select[0]) {
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.each(select, function(record) {
						record.dirtyValue('line_stat', '2');
						record.store.commitChanges();
					});
				Ext.each(select, function(record) {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/mtrl/isttcalc/purcpaywork/set/del_yn.do',
						method		: "POST",
						params		: {
						 	token	: _global.token_id,
							param	: Ext.encode({
								invc_numb	: record.get('colt_numb'),
								iomy_dvcd	: '2',
								line_stat	: '2',
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								lister.getStore().reload();
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							mask.hide();
							}
						});
					})
				}
			});
		}
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
				lister.getStore().getUpdatedRecords()[a].data.iomy_date = param.invc_date;
				lister.getStore().getUpdatedRecords()[a].data.iomy_date = param.iomy_date;
				lister.getStore().getUpdatedRecords()[a].data.stot_dvcd = param.stot_dvcd;
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

	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}

});

