Ext.define('module.custom.sjflv.sale.sale.salework.SaleWork', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.CstmClassPopup',
		'lookup.popup.view.IypkgOrdrPopup',
		'lookup.popup.view.ProdPopup'
	],
	models	: [
		'module.custom.sjflv.sale.sale.salework.model.SaleWorkListerMaster',
		'module.custom.sjflv.sale.sale.salework.model.SaleWorkListerMaster2',
		'module.custom.sjflv.sale.sale.salework.model.SaleWorkListerDetail',
		'module.custom.sjflv.sale.sale.salework.model.SaleWorkListerDetail2',
		'module.custom.sjflv.sale.sale.salework.model.SaleWorkWorkerMaster',
		'module.custom.sjflv.sale.sale.salework.model.SaleWorkWorkerDetail',
		'module.custom.sjflv.sale.sale.salework.model.SaleWorkModifiyPopup',
		'module.custom.sjflv.sale.sale.salework.model.SaleWorkInvoice',
		'module.custom.sjflv.sale.sale.salework.model.SaleWorkItemPopup',
	],
	stores	: [
		'module.custom.sjflv.sale.sale.salework.store.SaleWorkListerMaster',
		'module.custom.sjflv.sale.sale.salework.store.SaleWorkListerMaster2',
		'module.custom.sjflv.sale.sale.salework.store.SaleWorkListerDetail',
		'module.custom.sjflv.sale.sale.salework.store.SaleWorkListerDetail2',
		'module.custom.sjflv.sale.sale.salework.store.SaleWorkModifyPopup',
		'module.custom.sjflv.sale.sale.salework.store.SaleWorkInvoice',
		'module.custom.sjflv.sale.sale.salework.store.SaleWorkInvoice2',
		'module.custom.sjflv.sale.sale.salework.store.SaleWorkItemPopup'
	],
	views	: [
		'module.custom.sjflv.sale.sale.salework.view.SaleWorkLayout',
		'module.custom.sjflv.sale.sale.salework.view.SaleWorkSearch',
		'module.custom.sjflv.sale.sale.salework.view.SaleWorkListerMaster',
		'module.custom.sjflv.sale.sale.salework.view.SaleWorkListerMaster2',
		'module.custom.sjflv.sale.sale.salework.view.SaleWorkListerDetail',
		'module.custom.sjflv.sale.sale.salework.view.SaleWorkListerDetail2',
		'module.custom.sjflv.sale.sale.salework.view.SaleWorkWorkerEditor',
		'module.custom.sjflv.sale.sale.salework.view.SaleWorkWorkerEditor2',
		'module.custom.sjflv.sale.sale.salework.view.SaleWorkWorkerSearch',
		'module.custom.sjflv.sale.sale.salework.view.SaleWorkWorkerSearch2',
		'module.custom.sjflv.sale.sale.salework.view.SaleWorkWorkerLister',
		'module.custom.sjflv.sale.sale.salework.view.SaleWorkWorkerLister2',
		'module.custom.sjflv.sale.sale.salework.view.SaleWorkModifyPopup',
		'module.custom.sjflv.sale.sale.salework.view.SaleWorkItemPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-sjflv-salework-layout #mainpanel'							: { tabchange : me.selectAction	},
			'module-sjflv-salework-layout button[action=selectAction]'			: { click : me.selectAction },
			'module-sjflv-salework-worker-editor button[action=selectAction2]'	: { click : me.selectAction2},	//발행대기내역조회
			'module-sjflv-salework-worker-editor2 button[action=selectAction3]'	: { click : me.selectAction3},	//반품대기내역조회
			'module-sjflv-salework-worker-lister button[action=updateAction]'	: { click : me.updateAction},	//발행대기내역저장
			'module-sjflv-salework-worker-lister2 button[action=updateAction]'	: { click : me.updateAction2},	//반품대기내역저장
			'module-sjflv-salework-worker-lister button[action=cancelAction]'	: { click : me.cancelAction},	//취소
			'module-sjflv-salework-worker-lister2 button[action=cancelAction]'	: { click : me.cancelAction2},	//취소

			'module-sjflv-salework-lister-master  button[action=exportAction]'	: { click : me.exportAction},	//엑셀
			'module-sjflv-salework-lister-master  button[action=deleteAction]'	: { click : me.deleteAction},	//
			'module-sjflv-salework-lister-master  button[action=sendAction]'	: { click : me.sendAction  },	//
			'module-sjflv-salework-lister-master  button[action=reportAction]'	: { click : me.reportAction  },	//
			'module-sjflv-salework-lister-master  button[action=resendAction]'	: { click : me.resendAction  },	//
			'module-sjflv-salework-lister-master  button[action=printAction]'	: { click : me.printAction  },	//
			'module-sjflv-salework-item-popup     button[action=itemupdateAction]': { click : me.itemupdateAction	},// 품목지정


			'module-sjflv-salework-lister-master2 button[action=exportAction]'	: { click : me.exportAction},	//엑셀
			'module-sjflv-salework-lister-detail  button[action=exportAction]'	: { click : me.exportAction},	//엑셀
			'module-sjflv-salework-lister-detail2 button[action=exportAction]'	: { click : me.exportAction},	//엑셀

			'module-sjflv-salework-lister-master' : {
				selectionchange : me.selectDetail
			},
			'module-sjflv-salework-lister-master2' : {
				selectionchange : me.selectDetail2
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-sjflv-salework-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-sjflv-salework-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-sjflv-salework-lister-master')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-sjflv-salework-lister-master2')[0] },
		detail	: function () { return Ext.ComponentQuery.query('module-sjflv-salework-lister-detail')[0] },
		detail2	: function () { return Ext.ComponentQuery.query('module-sjflv-salework-lister-detail2')[0] },
		worker : {
			editor  : function () { return Ext.ComponentQuery.query('module-sjflv-salework-worker-editor')[0]  },
			editor2 : function () { return Ext.ComponentQuery.query('module-sjflv-salework-worker-editor2')[0] },
			lister  : function () { return Ext.ComponentQuery.query('module-sjflv-salework-worker-lister')[0]  },
			lister2 : function () { return Ext.ComponentQuery.query('module-sjflv-salework-worker-lister2')[0] },
			search  : function () { return Ext.ComponentQuery.query('module-sjflv-salework-worker-search')[0]  },
			search2 : function () { return Ext.ComponentQuery.query('module-sjflv-salework-worker-search2')[0] }
		},
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister1 = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		if(tindex == 0){
			lister1.select({
				callback:function(records, operation, success) {
					if (success) {
						lister1.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}else if(tindex == 1){
			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}else{
			mask.hide();
		}
	},
	selectDetail:function(grid,records){
		var	me		= this,
			detail	= me.pocket.detail()
		;
		if(records[0]){
			detail.select({
				callback:function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select();
					} else {}
				}, scope:me
			}, Ext.merge( {stor_id : _global.stor_id , invc_numb : records[0].get('invc_numb')}) );
		}
	},
	selectDetail2:function(grid,records){
		var	me		= this,
			detail2	= me.pocket.detail2()
		;
		if(records[0]){
			detail2.select({
				callback:function(records, operation, success) {
					if (success) {
						detail2.getSelectionModel().select();
					} else {}
				}, scope:me
			}, Ext.merge( {stor_id : _global.stor_id , invc_numb : records[0].get('invc_numb')}) );
		}
	},

	//worker-lister 조회 (발행대기내역조회)
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
					cstm_idcd		: param.cstm_idcd,
					deli_yorn		: param.deli_yorn,
					deli_date1		: param.deli_date1,
					deli_date2		: param.deli_date2,
					acpt_dvcd		: param.acpt_dvcd
				})

			},
			lister	: lister,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true } );
				}
				mask.hide();
				var deli1      = param.deli_date1.toString();
				var deli2      = param.deli_date2.toString();
				var deli_date1, deli_date2
				if(deli1){
					deli_date1 = deli1.substr(0,4)+'-'+deli1.substr(4,2)+'-'+deli1.substr(6,2);
				}
				if(deli2){
					deli_date2 = deli2.substr(0,4)+'-'+deli2.substr(4,2)+'-'+deli2.substr(6,2);
				}

				editor.down('[name=acpt_dvcd] ').setValue(param.acpt_dvcd);
				editor.down('[name=deli_date1]').setValue(deli_date1);
				editor.down('[name=deli_date2]').setValue(deli_date2);
			}
		});
	},

	//worker-lister 조회 (발행대기내역조회)
	selectAction3 : function() {
		var me = this,
			lister = me.pocket.worker.lister2(),
			editor = me.pocket.worker.editor2(),
			search = me.pocket.worker.search2(),
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
					cstm_idcd		: param.cstm_idcd,
					invc_date1		: param.invc_date1,
					invc_date2		: param.invc_date2,
					acpt_dvcd		: param.acpt_dvcd,
				})

			},
			lister	: lister,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true } );
				}
				mask.hide();
				var invc1      = param.invc_date1.toString();
				var invc2      = param.invc_date2.toString();
				var invc_date1, invc_date2
				if(invc1){
					invc_date1 = invc1.substr(0,4)+'-'+invc1.substr(4,2)+'-'+invc1.substr(6,2);
				}
				if(invc2){
					invc_date2 = invc2.substr(0,4)+'-'+invc2.substr(4,2)+'-'+invc2.substr(6,2);
				}

				editor.down('[name=acpt_dvcd] ').setValue(param.acpt_dvcd);
//				editor.down('[name=deli_yorn] ').setValue(param.deli_yorn);
				editor.down('[name=invc_date1]').setValue(invc_date1);
				editor.down('[name=invc_date2]').setValue(invc_date2);
			}
		});
	},

	//저장 (발행대기내역저장)
	updateAction:function() {
		var me = this,
			master = me.pocket.lister(),
			lister = me.pocket.worker.lister(),
			editor = me.pocket.worker.editor(),
			store  = editor.getStore(),
			store2  = lister.getStore(),
			search = me.pocket.worker.search(),
			param  = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel')
		;
		if(param.invc_date == ''){
			Ext.Msg.alert('알림','발행일자를 확인해주세요.');
			return;
		}else if( param.rqod_rcvd_dvcd == ''){
			Ext.Msg.alert('알림','영수/청구를 확인해주세요.');
			return;
		}else{
			editor.updateRecord({
				caller	: me,
				action	: 'invoice',
				before	: function(results, record ) {
					if (results.success) {
						var info	= record,
							dirty	= false
						;
						var arr = new Array(), code = '';
						Ext.each(info, function( item ) {
							item.set('publ_date', param.publ_date);
							item.set('rqod_rcvd_dvcd', param.rqod_rcvd_dvcd);
							item.set('cstm_idcd',param.cstm_idcd);
							item.set('vatx_dvcd',param.vatx_dvcd);
							item.set('dept_idcd',_global.dept_id);
							item.set('drtr_idcd',_global.login_pk);
							item.set('drtr_name',_global.login_nm);
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
												table_nm: 'txbl_mast'
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
								store.clearData();
								store2.loadData([],false);
								store2.reload();
							}
						});
					}
				}
			});
		}
	},

	//저장 (반품대기내역저장)
	updateAction2:function() {
		var me = this,
			master = me.pocket.lister(),
			lister = me.pocket.worker.lister2(),
			editor = me.pocket.worker.editor2(),
			store  = editor.getStore(),
			store2  = lister.getStore(),
			search = me.pocket.worker.search2(),
			param  = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel')
		;
		if(param.invc_date == ''){
			Ext.Msg.alert('알림','발행일자를 확인해주세요.');
			return;
		}else if( param.rqod_rcvd_dvcd == ''){
			Ext.Msg.alert('알림','영수/청구를 확인해주세요.');
			return;
		}else{
			editor.updateRecord({
				caller	: me,
				action	: 'invoice',
				before	: function(results, record ) {
					if (results.success) {
						var info	= record,
							dirty	= false
						;
						var arr = new Array(), code = '';
						Ext.each(info, function( item ) {
							item.set('publ_date', param.publ_date);
							item.set('rqod_rcvd_dvcd', param.rqod_rcvd_dvcd);
							item.set('cstm_idcd',param.cstm_idcd);
							item.set('vatx_dvcd',param.vatx_dvcd);
							item.set('dept_idcd',_global.dept_id);
							item.set('drtr_idcd',_global.login_pk);
							item.set('drtr_name',_global.login_nm);
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
												table_nm: 'txbl_mast'
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
								store.clearData();
								store2.loadData([],false);
								store2.reload();
							}
						});
					}
				}
			});
		}
	},

	//취소
	cancelAction:function() {
		var me = this,
			lister = me.pocket.worker.lister(),
			search = me.pocket.worker.search(),
			editor = me.pocket.worker.editor(),
			select = lister.getStore().getUpdatedRecords().length
		;

		if(select){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			editor.getStore().reload();
		}
	},

	//반품등록 취소
	cancelAction2:function() {
		var me = this,
			lister = me.pocket.worker.lister2(),
			search = me.pocket.worker.search2(),
			editor = me.pocket.worker.editor2(),
			select = lister.getStore().getUpdatedRecords().length
		;

		if(select){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			editor.getStore().reload();
		}
	},

	deleteAction : function(){
		var	me		= this,
			lister	= me.pocket.lister(),
			detail	= me.pocket.detail(),
			store	= lister.getStore(),
			select	= lister.getSelectionModel().getSelection()
		;
		if(select[0]){
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					if(select[0].get('baro_stat') == "해당 문서 정보가 없습니다." || select[0].get('baro_stat') == "발급취소"){
						store.remove(select);
						store.sync({
							callback:function(){
		//						store.reload();
							}
						})
						detail.getStore().clearData();
						detail.getStore().loadData([],false);
					}else{
						Ext.Msg.alert('알림','삭제할 수 없는 상태입니다.');
					}
				}
			})
		}
	},
	sendAction:function(){
		var	me		= this,
			lister	= me.pocket.lister(),
			select	= lister.getSelectionModel().getSelection()
		;

		if(select[0]){
			var a = [];
			var chk = "";
			for(var i =0; i< select.length ; i++){
				a.push(Ext.merge(select[i].data,{crte_idcd : _global.login_pk}));
				if(select[i].get('trsm_yorn')==1){
					Ext.Msg.alert("알림","이미 처리된 품목입니다.");
					return;
				}
				if(select[0].get('bzpl_buss_numb') != select[i].get('bzpl_buss_numb')){
					Ext.Msg.alert('알림','같은 사업장인 계산서만 전송가능합니다.');
					return;
				}
			}
			Ext.Ajax.request({
				url		: _global.location.http() + '/barobill/get/baro_logn.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						user_idcd		: _global.login_pk,
						vatx_dvcd		: select[0].get('vatx_dvcd'),
						buss_numb		: select[0].get('bzpl_buss_numb')
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
						console.log(result);
						if(result.records[0]){
							chk = result.records[0].user_idcd;
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			if(chk==""){
				Ext.Msg.alert('알림','등록된 홈택스 로그인 정보가 없습니다.');
				return;
			}
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/sjflv/sale/sale/salework/set/taxSend.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						records			: a
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
						if(result.records[0]){
							if(result.records[0].result!="" && result.records[0].result!="1"){
								Ext.Msg.alert('알림',result.records[0].result);
							}else{
								lister.getStore().reload();
							}
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	},
	resendAction : function(){
		var	me		= this,
			lister	= me.pocket.lister(),
			select	= lister.getSelectionModel().getSelection()
		;
		if(select[0]){
			var a = [];
			var chk = "";
			for(var i =0; i< select.length ; i++){
				a.push(Ext.merge(select[i].data,{crte_idcd : _global.login_pk}));
				if(select[i].get('trsm_yorn')==0){
					Ext.Msg.alert("알림","전송내역이 없는 계산서입니다.");
					return;
				}
			}
			Ext.Ajax.request({
				url		: _global.location.http() + '/barobill/get/baro_logn.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						user_idcd		: _global.login_pk,
						vatx_dvcd		: select[0].get('vatx_dvcd'),
						buss_numb		: select[0].get('bzpl_buss_numb')
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
						console.log(result);
						if(result.records[0]){
							chk = result.records[0].user_idcd;
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			if(chk==""){
				Ext.Msg.alert('알림','등록된 홈택스 로그인 정보가 없습니다.');
				return;
			}
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/sjflv/sale/sale/salework/set/reSendMail.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						records			: a
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
						if(result.records[0]){
							if(result.records[0].result!=""){
								Ext.Msg.alert('알림',result.records[0].result);
							}else{
								Ext.Msg.alert('알림',"재전송 완료되었습니다.");
							}
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	},
	reportAction : function(){
		var	me		= this,
			lister	= me.pocket.lister(),
			record	= lister.getSelectionModel().getSelection(),
//			jrf		= 'Invoice_Sjung2.jrf',
			resId = _global.hq_id.toUpperCase()
		;

		if(_global.hqof_idcd.toUpperCase()=='N1000SJUNG'){
			jrf = 'Invoice_Sjung2.jrf';
		}else if(_global.hqof_idcd.toUpperCase()=='N1000SJFLV'){
			jrf = 'invoice_sjflv.jrf';
		}

		if(record[0]){
			var a = "";
			for(var i =0; i< record.length ; i++){
				if(i==0){
					a += "[";
				}
					a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\'}';
				if(i != record.length -1){
					a+=",";
				}else{
					a+="]";
				}
			}
			var _param = '_param~{\'records\':'+a+'}~';
			var arg = _param;
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
			return win;
		}
	},

	// 거래명세서 발행
	printAction:function() {
		var me = this,
			master = me.pocket.lister(),
			select	= me.pocket.lister().getSelectionModel().getSelection(),
			record = master.getSelectionModel().getSelection(),
			jrf = 'Invoice_Sjung_txbl.jrf',
			resId =_global.hq_id.toUpperCase()
		;

		var err_msg = "";
		var records = master.getSelectionModel().getSelection();

		if (!records || records.length==0) {
			Ext.Msg.alert("알림", "세금계산서 목록중 1건이상을 선택하여주십시오.");
			return ;
		}

		var a = "";
		for(var i =0; i< record.length ; i++){
			if(i==0){
				a+= "[";
			}
				a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\'}';
			if(i != record.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}

		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},
	exportAction : function(button){
		var	me		= this,
			lister	= '';
		switch (button.itemId) {
		case "saleWorkMaster":
			lister = me.pocket.lister1();
			break;
		case "saleWorkMaster2":
			lister = me.pocket.lister2();
			break;
		case "saleWorkDetail":
			lister = me.pocket.detail();
			break;
		case "saleWorkDetail2":
			lister = me.pocket.detail2();
			break;
		default:
			break;
		}
		lister.writer({enableLoadMask:true});
	},
});

