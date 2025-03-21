Ext.define('module.custom.iypkg.mtrl.po.purcordr.PurcOrdr', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.FabcPopup',
		'lookup.popup.view.ProdPopup',
		'Axt.popup.view.ZipcodeSearch',
		'lookup.popup.view.IypkgOrdrStatInfo',
		'lookup.popup.view.IypkgOrdrPopup',
	],
	models	: [
		'module.custom.iypkg.mtrl.po.purcordr.model.PurcOrdr',
		'module.custom.iypkg.mtrl.po.purcordr.model.PurcOrdrLister2',
		'module.custom.iypkg.mtrl.po.purcordr.model.PurcOrdrWorkerLister'
	],
	stores	: [
		'module.custom.iypkg.mtrl.po.purcordr.store.PurcOrdr',
		'module.custom.iypkg.mtrl.po.purcordr.store.PurcOrdrLister2',
		'module.custom.iypkg.mtrl.po.purcordr.store.PurcOrdrWorkerLister'
	],
	views	: [
		'module.custom.iypkg.mtrl.po.purcordr.view.PurcOrdrLayout',
		'module.custom.iypkg.mtrl.po.purcordr.view.PurcOrdrLister',
		'module.custom.iypkg.mtrl.po.purcordr.view.PurcOrdrLister2',
		'module.custom.iypkg.mtrl.po.purcordr.view.PurcOrdrSearch',
		'module.custom.iypkg.mtrl.po.purcordr.view.PurcOrdrWorkerEditor',
		'module.custom.iypkg.mtrl.po.purcordr.view.PurcOrdrWorkerLister',
		'module.custom.iypkg.mtrl.po.purcordr.view.PurcOrdrWorkerSearch',
		'module.custom.iypkg.mtrl.po.purcordr.view.PurcOrdrPrintPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-purcordr-layout #mainpanel'								: { tabchange : me.selectAction	},
			'module-purcordr-layout button[action=selectAction]'			: { click : me.selectAction		},	//조회
			'module-purcordr-worker-editor button[action=selectAction2]'	: { click : me.selectAction2	},	//조회2

			'module-purcordr-lister button[action=exportAction]'			: { click : me.exportAction		},
			'module-purcordr-lister2 button[action=exportAction]'			: { click : me.exportAction2	},
			'module-purcordr-lister button[action=deleteAction]'			: { click : me.deleteAction		},
			'module-purcordr-lister button[action=writeAction]'				: { click : me.PrintAction		},	//발주서발행
			'module-purcordr-lister button[action=updateAction]'			: { click : me.updateAction2	},	//저장


			'module-purcordr-worker-lister button[action=chkAction]'		: { click : me.chkAction		},	//
			'module-purcordr-worker-lister button[action=updateAction]'		: { click : me.updateAction		},	//저장
			'module-purcordr-worker-lister button[action=cancelAction]'		: { click : me.cancelAction		},	//취소
			'module-purcordr-lister'	: {
				itemdblclick	: me.selectRecord
			},
			'module-purcordr-worker-lister'	: {
				itemdblclick	: me.selectRecord2
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-purcordr-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-purcordr-search')[0] },
		editor	: function () { return Ext.ComponentQuery.query('module-purcordr-editor')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-purcordr-lister')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-purcordr-lister2')[0] },
		popup	: function () { return Ext.ComponentQuery.query('module-purcordr-print-popup')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-purcordr-worker-editor')[0] },
			search : function () { return Ext.ComponentQuery.query('module-purcordr-worker-search')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-purcordr-worker-lister')[0] }
		},
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			search = me.pocket.worker.search()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		if(tindex == 0){
			me.pocket.search().down('[name=collapsed]').collapse();
		}else if (tindex == 1){
			me.pocket.search().down('[name=collapsed]').expand();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id, type : '발주'}) );
		}
		mask.hide();
		;
		search.getForm().reset(true);
	},

	//worker-lister 조회
	selectAction2 : function() {
		var me = this,
			lister = me.pocket.worker.lister(),
			editor = me.pocket.worker.editor(),
			search = me.pocket.worker.search(),
			param  = editor.getValues(),
			record = undefined
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					mask.hide();
				} else { }
			}, scope:me
		}, Ext.merge({
			invc_date1		: param.invc_date1,
			invc_date2		: param.invc_date2,
			cstm_idcd		: param.cstm_idcd,
			prod_idcd		: param.prod_idcd,
			fabc_idcd		: param.fabc_idcd,
			invc_numb		: param.invc_numb
		}));
	},

	//입고리스트 팝업
	selectRecord : function(){
		var me = this,
			lister = me.pocket.lister(),
			selectRecord = lister.getSelectionModel().getSelection()
		;

		resource.loadPopup({
			widget	: 'lookup-iypkg-ordr-stat-popup',
			params:{
				records : selectRecord[0]['data']
			},
		})
	},

	//입고리스트 팝업
	selectRecord2 : function(){
		var me = this,
			lister = me.pocket.worker.lister(),
			selectRecord = lister.getSelectionModel().getSelection()
		;
		resource.loadPopup({
			widget	: 'lookup-iypkg-ordr-stat-popup',
			params:{
				records : selectRecord[0]['data']
			},
		})
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
			cstm_idcd2,
			tpanel = me.pocket.layout().down('#mainpanel'),
			count	= 0,
			record = lister.getSelectionModel().getSelection(),
			chk,
			code = ''
			;
			var err_msg = "";
			var records = lister.getSelectionModel().getSelection();


			for (var i = 0; i < changes; i++) {
				if(lister.getStore().getUpdatedRecords()[i].data.offr_qntt == 0){
					chk = 1;
					break;
				}
			}


			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
			if(changes != 0){
				if(chk == 1){
					Ext.Msg.alert("알림","수량을 1개 이상 입력해주십시오.");
					return;
				}
				if (param.cstm_idcd==''){
					Ext.Msg.alert("알림","발주처를 반드시 입력해주십시오.");
					return;
				}else{
					Ext.Ajax.request({
						url		: _global.location.http() + '/custom/iypkg/mtrl/po/purcordr/get/code.do',
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
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/iypkg/mtrl/po/purcordr/get/count.do',
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
								console.log(result.records[0].count);
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
									new_invc_numb = result.records[0].invc_numb
//									if(result.records[0].count > 0){
//										new_invc_numb = cstm_idcd2+1;
//									}else {
//										new_invc_numb = cstm_idcd2;
//									}
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
							lister.getStore().getUpdatedRecords()[a].data.offr_cstm_idcd = param.cstm_idcd;
							lister.getStore().getUpdatedRecords()[a].data.offr_cstm_name = param.cstm_name;
							lister.getStore().getUpdatedRecords()[a].data.user_memo = param.user_memo;
							lister.getStore().getUpdatedRecords()[a].data.remk_text = param.remk_text;
							lister.getStore().getUpdatedRecords()[a].data.offr_path_dvcd = 1;				//발주구분코드 1 : 원단발주
						}

						var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
						mask.show();
						var store = lister.getStore();
						lister.getStore().sync({
							success : function(operation){
								tpanel.items.indexOf(tpanel.setActiveTab(0));
								lister.getStore().reload();
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
								store.reload();
							}
						});
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			}
		}else{
		Ext.Msg.alert("알림","변경된 사항이 없습니다.");
	}
},

	updateAction2:function() {
		var me = this,
			lister = me.pocket.lister(),
			store  = lister.getStore(),
			search = me.pocket.search(),
			param  = search.getValues()
//			chk
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();

		store.sync({
			success : function(operation){
			},
			failure : function(operation){ },
			callback: function(operation){
				mask.hide();
				store.reload();
			}
		});
	},

	//취소
	cancelAction:function() {
		var me = this,
			search = me.pocket.worker.search(),
			lister = me.pocket.worker.lister(),
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

	//삭제
	deleteAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			workerlister = me.pocket.worker.lister(),
			store  = lister.getStore()
			select	= lister.getSelectionModel().getSelection()

		;
		var records = lister.getSelectionModel().getSelection();

		if (select) {
		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {
				Ext.each(select, function(record) {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
					mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/mtrl/po/purcordr/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: record.get('invc_numb'),
							line_seqn	: record.get('line_seqn'),
							acpt_invc_numb	: record.get('acpt_invc_numb'),
							acpt_line_seqn	: record.get('acpt_line_seqn'),
							offr_qntt	: record.get('offr_qntt')
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

	chkAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.worker.lister(),
			changes = lister.getStore().getUpdatedRecords().length
		;
//		console.log();

		for(var i=0;i<changes;i++) {
			console.log(lister.getStore().getUpdatedRecords()[i].data.chk );
			lister.getStore().getUpdatedRecords()[i].data.chk = false;
		}


	},

	//발주서 발행
	PrintAction:function(cont,new_invc_numb,max_seqn) {
		var me = this,
			lister = me.pocket.lister(),
			select = lister.getSelectionModel().getSelection(),
			jrf = 'PurcOrderReport_fabc.jrf',
			resId = _global.hq_id.toUpperCase(), cstm = [], date = [], n = 0
		;
		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();
		var a = "";
		if(resId == 'N1000DAE-A'){
			jrf = 'PurcOrderReport_daea_fabc.jrf'
		}

		if(resId == 'N1000LIEBE'){
			jrf = 'Liebe_PurcOrderReport_fabc2.jrf'
		}

		if(cont!='update'){
			if (!records || records.length==0) {
				Ext.Msg.alert("알림", "목록을 선택해주십시오.");
				return;
			}else{
				if(resId == 'N1000DAE-A'){
					var a = "",
					jrf = 'PurcOrderReport_daea_fabc.jrf',
					resId	= _global.hq_id.toUpperCase(), cstm = [], date = [], n = 0
					;
					var records = lister.getSelectionModel().getSelection();
					var a = "";

					for (var i = 0; i < records.length; i++) {
						cstm.push(records[i].data.cstm_idcd);
						date.push(records[i].data.invc_date);
					}
					for (var j = 1; j < records.length; j++) {
						if(date[0] != date[j]){
							n = 1;
						}
					}
//					if (n == 1 && records.length > 1){
//						Ext.Msg.alert("알림", "같은 발주일자 목록을 선택해주십시오.");
//						return;
//					}
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
					}else{
						for(var i =0; i< max_seqn ; i++){
							if(i==0){
								a += "[";
							}
							a+= '{\'invc_numb\':\''+new_invc_numb+'\',\'line_seqn\':\''+(i+1)+'\'}';
							if(i != max_seqn-1){
								a+=",";
							}else{
								a+="]";
							}
						}
					}
					var _param = '_param~{\'records\':'+a+'}~';
					var arg = _param;
					var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
					var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
					return win;
				}

				for (var i = 0; i < records.length; i++) {
					cstm.push(records[i].data.cstm_idcd);
					date.push(records[i].data.invc_date);
				}
				for (var j = 1; j < records.length; j++) {
					if(date[0] != date[j]){
						n = 1;
					}
				}
				if (n == 1 && records.length > 1){
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
		}else{
			for(var i =0; i< max_seqn ; i++){
				if(i==0){
					a += "[";
				}
				a+= '{\'invc_numb\':\''+new_invc_numb+'\',\'line_seqn\':\''+(i+1)+'\'}';
				if(i != max_seqn-1){
					a+=",";
				}else{
					a+="]";
				}
			}
		}

		if(resId == 'N1000LIEBE'){
			resource.loadPopup({
				widget : 'module-purcordr-print-popup',
				params : {
					arr : a,
				}
			});
		}else{
			var _param = '_param~{\'records\':'+a+'}~';
			var arg = _param;
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
		}
	},

	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	},

	exportAction2 : function(button){
		var value = button.button ;
		this.pocket.lister2().writer({enableLoadMask:true});
	}

});

