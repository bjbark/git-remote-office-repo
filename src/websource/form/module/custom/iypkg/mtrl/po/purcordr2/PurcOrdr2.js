Ext.define('module.custom.iypkg.mtrl.po.purcordr2.PurcOrdr2', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.AsmtPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.IypkgOrdrPopup',
		'lookup.popup.view.UnitPopup',
		'lookup.popup.view.ProdPopup'
	],

	models:[
		'module.custom.iypkg.mtrl.po.purcordr2.model.PurcOrdr2',
		'module.custom.iypkg.mtrl.po.purcordr2.model.PurcOrdr2WorkerLister',
	],
	stores:[
		'module.custom.iypkg.mtrl.po.purcordr2.store.PurcOrdr2',
		'module.custom.iypkg.mtrl.po.purcordr2.store.PurcOrdr2WorkerLister'
	],
	views : [
		'module.custom.iypkg.mtrl.po.purcordr2.view.PurcOrdr2Layout',
		'module.custom.iypkg.mtrl.po.purcordr2.view.PurcOrdr2Search',
		'module.custom.iypkg.mtrl.po.purcordr2.view.PurcOrdr2Lister',
		'module.custom.iypkg.mtrl.po.purcordr2.view.PurcOrdr2WorkerSearch',
		'module.custom.iypkg.mtrl.po.purcordr2.view.PurcOrdr2WorkerEditor',
		'module.custom.iypkg.mtrl.po.purcordr2.view.PurcOrdr2WorkerLister',
		'module.custom.iypkg.mtrl.po.purcordr2.view.AsmtCodePopup'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			'module-purcordr2-layout #mainpanel'									: { tabchange : me.selectAction		},
			'module-purcordr2-layout button[action=selectAction]'					: { click : me.selectAction			}, /* 조회 */
			'module-purcordr2-lister button[action=exportAction]'					: { click : me.exportAction			}, /* 엑셀 */
			'module-purcordr2-lister button[action=deleteAction]'					: { click : me.deleteAction			}, /* 삭제 */
			'module-purcordr2-lister button[action=writeAction]'					: { click : me.PrintAction			}, /* 발주서 발행 */
			'module-purcordr2-lister button[action=updateAction]'					: { click : me.updateAction2			}, /* 발주리스트 수정 */

			'module-purcordr2-worker-editor button[action=selectAction2]'			: { click : me.selectAction2		}, /* 조회2*/

			'module-purcordr2-worker-lister button[action=updateAction]'			: { click : me.updateAction			}, /* 저장 */
			'module-purcordr2-worker-lister button[action=cancelAction]'			: { click : me.cancelAction			}, /* 취소 */
			'module-purcordr2-worker-lister button[action=codeAction]'				: { click : me.codeAction			}, /* 부자재코드추가 */
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-purcordr2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-purcordr2-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-purcordr2-lister')[0] },
		popup  : function () { return Ext.ComponentQuery.query('module-purcordr2-asmtcode-popup')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-purcordr2-worker-editor')[0] },
			search : function () { return Ext.ComponentQuery.query('module-purcordr2-worker-search')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-purcordr2-worker-lister')[0] }
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
						item_idcd		: param.item_idcd,
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
			chk
		;
		for (var i = 0; i < changes; i++) {
			if(lister.getStore().getUpdatedRecords()[i].data.asmt_idcd == ''){
				chk = 1;
				break;
			}else if(lister.getStore().getUpdatedRecords()[i].data.offr_qntt == 0){
				chk = 2;
				break;
			}
		}

		if(changes != 0){
			if(chk == 1){
				Ext.Msg.alert("알림","부자재를 선택하여주십시오.");
				return;
			}else if(chk == 2){
				Ext.Msg.alert("알림","수량을 1개 이상 입력해주십시오.");
				return;
			}
			if (param.cstm_idcd==''){
				Ext.Msg.alert("알림","발주처를 반드시 입력해주십시오.");
				return;
			}else{
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/iypkg/mtrl/po/purcordr2/get/code.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							cstm_idcd	: param.cstm_idcd,
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
							cstm_idcd2 = result.records[0].code;
						}
						console.log(cstm_idcd2);
						Ext.Ajax.request({
							url		: _global.location.http() + '/custom/iypkg/mtrl/po/purcordr2/get/count.do',
							method		: "POST",
							params	: {
							token : _global.token_id,
							param : JSON.stringify({
								cstm_idcd : param.cstm_idcd
								})
							},
							async	: false,
							success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							if	(!result.success ){
								Ext.Msg.error(result.message );
								return;
							} else {
								new_invc_numb = result.records[0].invc_numb
//								if(result.records[0].count > 0){
//									new_invc_numb = cstm_idcd2+1;
//								}else {
//									new_invc_numb = cstm_idcd2;
//								}
							}
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
						}
					});
					console.log(new_invc_numb);
					var x = 1;	//순번
					for (var a = 0; a < changes; a++) {
						lister.getStore().getUpdatedRecords()[a].data.new_line_seqn = x++;
						lister.getStore().getUpdatedRecords()[a].data.new_invc_numb = new_invc_numb;
						lister.getStore().getUpdatedRecords()[a].data.offr_date = param.offr_date;
						lister.getStore().getUpdatedRecords()[a].data.deli_date = param.deli_date;
						lister.getStore().getUpdatedRecords()[a].data.drtr_idcd = param.drtr_idcd;
						lister.getStore().getUpdatedRecords()[a].data.cstm_idcd = param.cstm_idcd;
						lister.getStore().getUpdatedRecords()[a].data.offr_path_dvcd = 2;
					}
					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
					mask.show();
					var store = lister.getStore();
					lister.getStore().sync({
						success : function(operation){
							tpanel.items.indexOf(tpanel.setActiveTab(0));
//							lister.getStore().reload();
							search.getForm().reset(true);
							Ext.Msg.confirm("확인", "발주서를 발행하시겠습니까?", function(button) {
									if (button == 'yes') {
										me.PrintAction('update',new_invc_numb,x);
									}
								});
							},
							failure : function(operation){ },
							callback: function(operation){
								mask.hide();
//								store.reload();
								lister.getStore().clearData();
								lister.getStore().loadData([],false);
							}
						});
					},

					failure : function(result, request) {
					},
					callback: function(operation){
							/* 성공 실패 관계 없이 호출된다. */
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

		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/mtrl/po/purcordr2/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb'),
							line_seqn	: records[0].get('line_seqn'),
							acpt_numb	: records[0].get('acpt_numb'),
							acpt_seqn	: records[0].get('acpt_seqn'),
							assi_seqn	: records[0].get('assi_seqn'),
							offr_qntt	: records[0].get('offr_qntt')
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
			search = me.pocket.worker.search(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		search.getForm().reset();

		lister.getStore().clearData();
		lister.getStore().loadData([],false);

//		tpanel.items.indexOf(tpanel.setActiveTab(0));
	},

	codeAction:function() {
		var me = this,
			lister = me.pocket.worker.lister(),
			popup  = me.pocket.popup()
		;
		var me = this
		resource.loadPopup({
			widget : 'module-purcordr2-asmtcode-popup',
		});
	},


	//발주서 발행
	PrintAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			select = lister.getSelectionModel().getSelection(),
			jrf = 'PurcOrderReport_asmt.jrf',
			resId = _global.hq_id.toUpperCase(), cstm = [], date = [], n = 0
		;
		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();
		var a = "";

		if (!records) {
			Ext.Msg.alert("알림", "목록을 선택해주십시오.");
			return;
		}else{
			for (var i = 0; i < records.length; i++) {
				cstm.push(records[i].data.cstm_idcd);
				date.push(records[i].data.invc_date);
			}
			for (var j = 1; j < records.length; j++) {
				if(date[0] == date[j]){
					n = 1;
				}
			}
			if (n == 0 && records.length > 1){
				Ext.Msg.alert("알림", "같은 발주일자 목록을 선택해주십시오.");
				return;
			}
			if(records.length > 0){
				for(var i =0; i< records.length ; i++){
					if(i==0){
						a += "[";
					}
					a+= '{\'invc_numb\':\''+records[i].get('invc_numb')+'\',\'line_seqn\':\''+records[i].get('line_seqn')+'\'}';
					if(i != records.length -1){
						a+=",";
					}else{
						a+="]";
					}
				}
			}
		}
		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
	},


	//엑셀
	exportAction : function(self) {
		this.pocket.lister().writer({enableLoadMask:true});
	},


	//발주리스트 수정
	updateAction2:function() {
		var me = this,
			lister = me.pocket.lister(),
			store  = lister.getStore(),
			changes = lister.getStore().getUpdatedRecords().length,
			chk
		;

		for (var i = 0; i < changes; i++) {
			if(lister.getStore().getUpdatedRecords()[i].data.asmt_name == ''){
				chk = 1;
				break;
			}else if(lister.getStore().getUpdatedRecords()[i].data.offr_qntt == 0){
				chk = 2;
				break;
			}
		}

		if(changes != 0){
			/*if(chk == 1){
				Ext.Msg.alert("알림","부자재명을 입력하세요.");
				return;
			}else if(chk == 2){
				Ext.Msg.alert("알림","발주수량을 1개 이상 입력해주십시오.");
				return;
			}*/

			if(chk ==2) {
				Ext.Msg.alert("알림","발주수량을 1개 이상 입력해주십시오.");
				return;
			}

			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.UPDATE.mask });
				mask.show();
				store.sync({
					success : function(operation){ },
					failure : function(operation){ },
					callback: function(operation){
						mask.hide();
						store.reload();
					}
				});
		}else{
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}
	},


});
