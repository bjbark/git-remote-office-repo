Ext.define('module.custom.sjflv.mtrl.isttcalc.purcpaywork.PurcPayWork', {  extend   : 'Axt.app.Controller',
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
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.model.PurcPayWorkListerMaster',
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.model.PurcPayWorkListerDetail',
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.model.PurcPayWorkListerDetail2',
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.model.PurcPayWorkWorkerLister',
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.model.PurcPayWorkWorkerMaster',
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.model.PurcPayWorkInvoice',
	],
	stores	: [
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.store.PurcPayWorkListerMaster',
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.store.PurcPayWorkListerMaster2',
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.store.PurcPayWorkListerDetail',
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.store.PurcPayWorkListerDetail2',
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.store.PurcPayWorkInvoice',
	],
	views	: [
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.view.PurcPayWorkLayout',
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.view.PurcPayWorkSearch',
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.view.PurcPayWorkListerMaster',
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.view.PurcPayWorkListerMaster2',
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.view.PurcPayWorkListerDetail',
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.view.PurcPayWorkListerDetail2',
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.view.PurcPayWorkWorkerEditor',
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.view.PurcPayWorkWorkerSearch',
		'module.custom.sjflv.mtrl.isttcalc.purcpaywork.view.PurcPayWorkWorkerLister'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-sjflv-purcpaywork-layout #mainpanel'							: { tabchange : me.selectAction	},
			'module-sjflv-purcpaywork-layout button[action=selectAction]'			: { click : me.selectAction },

			'module-sjflv-purcpaywork-lister-master button[action=deleteAction]'	: { click : me.deleteAction},	//지급내역삭제
			'module-sjflv-purcpaywork-lister-master button[action=exportAction]'	: { click : me.exportAction},	//엑셀
			'module-sjflv-purcpaywork-lister-master2 button[action=exportAction]'	: { click : me.exportAction},	//엑셀
			'module-sjflv-purcpaywork-lister-detail button[action=exportAction]'	: { click : me.exportAction},	//엑셀
			'module-sjflv-purcpaywork-lister-detail2 button[action=exportAction]'	: { click : me.exportAction},	//엑셀

			'module-sjflv-purcpaywork-worker-editor button[action=selectAction2]'	: { click : me.selectAction2},	//조회2


			'module-sjflv-purcpaywork-worker-lister button[action=updateAction]'		: { click : me.updateAction }, //저장
			'module-sjflv-purcpaywork-worker-lister button[action=cancelAction]'		: { click : me.cancelAction }, //취소

			'module-sjflv-purcpaywork-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange: me.selectRecord									// 메뉴 선택시 이벤트
			},

			'module-sjflv-purcpaywork-lister-master2' : {
				itemdblclick    : me.selectDetail2,
				selectionchange: me.selectRecord									// 메뉴 선택시 이벤트
			}


		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-sjflv-purcpaywork-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-sjflv-purcpaywork-search')[0] },
		master	: function () { return Ext.ComponentQuery.query('module-sjflv-purcpaywork-lister-master')[0] },
		detail	: function () { return Ext.ComponentQuery.query('module-sjflv-purcpaywork-lister-detail')[0] },
		master2	: function () { return Ext.ComponentQuery.query('module-sjflv-purcpaywork-lister-master2')[0] },
		detail2	: function () { return Ext.ComponentQuery.query('module-sjflv-purcpaywork-lister-detail2')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-sjflv-purcpaywork-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-sjflv-purcpaywork-worker-lister')[0] },
			search : function () { return Ext.ComponentQuery.query('module-sjflv-purcpaywork-worker-search')[0] }
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
		}else if(tindex == 1){
			lister = master2;
			temp   = 'entry';
		}else {
			return;
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
		detail2 = me.pocket.detail2()
	;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);


		detail2.getStore().clearData();
		detail2.getStore().loadData([],false);

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
			}, Ext.merge({ invc_numb : record.get('invc_numb') }));
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
		lister.getStore().clearData();
		lister.getStore().loadData([],false);

		editor.modifyRecord({
			caller	: me,
			action	: 'invoice',
			params	: {
				param:JSON.stringify({
					invc_date1		: param.invc_date1,
					invc_date2		: param.invc_date2,
					cstm_idcd		: param.cstm_idcd2
				})
			},
			lister	: lister,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true } );
				}
				mask.hide();
			}
		});
	},

	deleteAction:function() {
		var me = this,
			lister = me.pocket.master(),
			store  = lister.getStore(),
			select	= lister.getSelectionModel().getSelection()
		;

		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {
				if(select[0]) {
					var a = [];
					Ext.each(select,function(record){
						a.push({invc_numb : record.data.invc_numb});
					})
					Ext.Ajax.request({
						url			:  _global.api_host_info + "/system/custom/sjflv/mtrl/isttcalc/purcpaywork/set/deleteMaster.do",
						params		: {
							token	: _global.token_id ,
							param	: JSON.stringify({
								stor_id	: _global.stor_id,
								records	: a
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
						},
						callback : function(){
							store.reload();
						}
					});
				}else{
					Ext.Msg.alert("알림", "지급 List를 선택해주세요.");
					return;
				}
			}
		});
	},

	//저장
	updateAction:function() {
		var	me		= this,
			lister	= me.pocket.worker.lister(),
			store	= lister.getStore(),
			changes	= lister.getStore().getUpdatedRecords().length,
			search	= me.pocket.worker.search(),
			editor	= me.pocket.worker.editor(),
			param	= search.getValues(),
			values	= editor.getValues(),
			new_invc_numb, new_line_seqn,
			tpanel	= me.pocket.layout().down('#mainpanel'),
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

			if(Ext.isEmpty(param.stot_dvcd)){
				Ext.Msg.alert(Const.NOTICE , '결재방법을  입력하여 주시기 바랍니다.');
				return;
			}

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			editor.updateRecord({
				caller	: me,
				action	: 'invoice',
				before	: function(results, record ) {
					if (results.success) {
						var info	= record,
							dirty	= false,
							new_invc_numb = ''
						;


						var arr = new Array(), code = '';
						Ext.each(info, function( item ) {
							item.set('invc_date', param.invc_date);
							item.set('publ_date', param.publ_date);
							item.set('iomy_date', param.iomy_date);
							item.set('stot_dvcd', param.stot_dvcd);
							item.set('drtr_idcd', param.drtr_idcd);
							item.set('paym_bank_name', param.paym_bank_name);
							item.set('stot_bass', param.stot_bass);
							item.set('expr_date', param.expr_date);
							item.set('total_amnt', param.total_amnt);
						});
						info.product().data.each(function( item ) {
							if (item.dirty || item.phantom) {
								if(!arr[item.get('cstm_idcd')]){
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
											code = result.records[0].seq;
										}
									});
									arr[item.get('cstm_idcd')] = code;
									item.set('chk',1);
								}
								item.set('new_invc_numb',arr[item.get('cstm_idcd')]);
							}
						});
						if (dirty) {
							info.setDirty();
						}
						results.feedback({success : true  });
					}
				},
				callback : function(results, record, store ) {
					if (results.success){
						store.sync({
							success : function(records, operation){
							}, /* 저장 성공시 */
							failure : function(operation){ results.feedback({success : false });},
							callback: function(operation){
								results.callback({});
								tpanel.items.indexOf(tpanel.setActiveTab(0));
								lister.getStore().clearData();
								lister.getStore().loadData([],false);

								editor.modifyRecord({
									caller	: me,
									action	: 'invoice',
									params	: {
										param:JSON.stringify({
											invc_date1		: values.invc_date1,
											invc_date2		: values.invc_date2,
											cstm_idcd		: values.cstm_idcd2
										})
									},
									lister	: lister,
									callback: function( results ) {
										if (results.success){
											results.feedback( {success : true } );
										}
										mask.hide();
									}
								});
								search.getForm().reset(true);
								mask.hide();
							}
						});
					}
				}
			});
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
		var	me		= this
			lister	= '',
			itemId	= button.itemId
		;
		switch (itemId) {
		case 'master':
			lister = me.pocket.master();
			break;
		case 'master2':
			lister = me.pocket.master2();
			break;
		case 'detail':
			lister = me.pocket.detail();
			break;
		case 'detail2':
			lister = me.pocket.detail2();
			break;
		default:
			break;
		}

		lister.writer({enableLoadMask:true});
	}

});

