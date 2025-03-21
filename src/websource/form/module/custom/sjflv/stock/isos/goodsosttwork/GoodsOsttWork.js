Ext.define('module.custom.sjflv.stock.isos.goodsosttwork.GoodsOsttWork', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.OrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.LottPopup',
		'lookup.popup.view.LottPopupSjflv',
		'lookup.popup.view.LottPopupTest',
		'lookup.popup.view.CstmDeliPopup',
		'lookup.popup.view.WrhsPopup'
	],
	models	: [
		'module.custom.sjflv.stock.isos.goodsosttwork.model.GoodsOsttWorkMaster1',
		'module.custom.sjflv.stock.isos.goodsosttwork.model.GoodsOsttWorkMaster2',
		'module.custom.sjflv.stock.isos.goodsosttwork.model.GoodsOsttWorkDetail1',
		'module.custom.sjflv.stock.isos.goodsosttwork.model.GoodsOsttWorkDetail2',
		'module.custom.sjflv.stock.isos.goodsosttwork.model.GoodsOsttWorkInvoice',
		'module.custom.sjflv.stock.isos.goodsosttwork.model.GoodsOsttWorkWorkerMaster',
		'module.custom.sjflv.stock.isos.goodsosttwork.model.GoodsOsttWorkWorkerDetail'
	],
	stores	: [
		'module.custom.sjflv.stock.isos.goodsosttwork.store.GoodsOsttWorkMaster1',
		'module.custom.sjflv.stock.isos.goodsosttwork.store.GoodsOsttWorkMaster1Test',
		'module.custom.sjflv.stock.isos.goodsosttwork.store.GoodsOsttWorkMaster2',
		'module.custom.sjflv.stock.isos.goodsosttwork.store.GoodsOsttWorkDetail1',
		'module.custom.sjflv.stock.isos.goodsosttwork.store.GoodsOsttWorkDetail1Test',
		'module.custom.sjflv.stock.isos.goodsosttwork.store.GoodsOsttWorkDetail2',
		'module.custom.sjflv.stock.isos.goodsosttwork.store.GoodsOsttWorkInvoice',
		'module.custom.sjflv.stock.isos.goodsosttwork.store.GoodsOsttWorkInvoiceTest',
	],
	views	: [
		'module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkLayout',
		'module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkListerMaster1',
		'module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkListerMaster1Test',
		'module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkListerMaster2',
		'module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkListerDetail1',
		'module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkListerDetail1Test',
		'module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkListerDetail2',
		'module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkSearch',
		'module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerSearch',
		'module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerSearchTest',
		'module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerLister',
		'module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerListerTest',
		'module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerEditor',
		'module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerEditorTest',
		'module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkItemPopup',
		'module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkItem2Popup',
		'module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkExcelPopup',
		'module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkPricPopup',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-goodsosttwork-layout #mainpanel'					: { tabchange : me.mainTabChange	},
			'module-goodsosttwork-layout button[action=selectAction]'	: { click : me.selectAction			},		// 조회
			// lister1 event
			'module-goodsosttwork-lister-master1 button[action=printAction]' : { click : me.printAction		},		// 거래명세서출력
			'module-goodsosttwork-lister-master1 button[action=printAction3]' : { click : me.printAction3	},		// 인수증출력
			'module-goodsosttwork-lister-master1 button[action=exportAction]': { click : me.exportAction	},		// 엑셀
			'module-goodsosttwork-lister-master1 button[action=insertAction]': { click : me.insertAction	},		// 신규
			'module-goodsosttwork-lister-master1 button[action=deleteAction]': { click : me.deleteAction	},		// 삭제
			'module-goodsosttwork-lister-master1 button[action=excelAction]' : { click : me.excelAction 	}, 		// 운송비등록
			'module-goodsosttwork-lister-master1 button[action=pricAction]' : { click : me.pricAction 		}, 		// 송장업로드
			// lister2 event
			'module-goodsosttwork-worker-lister button[action=chkAction]': { click : me.chkAction		},			// 전체선택
			'module-goodsosttwork-worker-lister button[action=updateAction]': { click : me.updateAction		},		// 저장
			'module-goodsosttwork-worker-lister button[action=cancelAction]': { click : me.cancelAction		},		// 취소
			//lister serch
			'module-goodsosttwork-worker-search button[action=selectAction2]': { click : me.selectAction2	},		// 조회
			// ---- 제품출고 Test ----
			'module-goodsosttwork-worker-search-test button[action=selectAction3]': { click : me.selectAction3	},	// 조회
			'module-goodsosttwork-worker-lister-test button[action=updateAction]' : { click : me.updateAction3	},	// 저장
			// -----------------------
			'module-goodsosttwork-lister-detail1 button[action=exportAction]': { click : me.exportDetailAction	},	// 엑셀
			'module-goodsosttwork-lister-master2 button[action=exportAction]': { click : me.exportAction1	},		// 엑셀
			'module-goodsosttwork-lister-detail2 button[action=exportAction]': { click : me.exportDetailAction1},	// 엑셀
			'module-goodsosttwork-lister-master1' : {
				itemdblclick : me.selectLister1 ,
				selectionchange : me.attachRecord
			},
			'module-goodsosttwork-lister-master2' : {
				itemdblclick : me.selectLister2 ,
				selectionchange : me.attachRecord
			},
			'module-goodsosttwork-lister-master1-test' : {
				itemdblclick : me.selectLister3 ,
				selectionchange : me.attachRecord
			},
		});
		me.callParent(arguments);
	},

	pocket  : {
		layout			: function () { return Ext.ComponentQuery.query('module-goodsosttwork-layout') [0] },
		search			: function () { return Ext.ComponentQuery.query('module-goodsosttwork-search') [0] },
		listermaster1	: function () { return Ext.ComponentQuery.query('module-goodsosttwork-lister-master1')[0] },
		listermaster2	: function () { return Ext.ComponentQuery.query('module-goodsosttwork-lister-master2')[0] },
		listermaster1Test	: function () { return Ext.ComponentQuery.query('module-goodsosttwork-lister-master1-test')[0] },
		listerdetail1	: function () { return Ext.ComponentQuery.query('module-goodsosttwork-lister-detail1')[0] },
		listerdetail1Test	: function () { return Ext.ComponentQuery.query('module-goodsosttwork-lister-detail1-test')[0] },
		listerdetail2	: function () { return Ext.ComponentQuery.query('module-goodsosttwork-lister-detail2')[0] },
		workersearch	: function () { return Ext.ComponentQuery.query('module-goodsosttwork-worker-search')[0] },
		lister			: function () { return Ext.ComponentQuery.query('module-goodsosttwork-worker-lister')[0] },
		// ---- 제품출고 Test ----
		lister_test			: function () { return Ext.ComponentQuery.query('module-goodsosttwork-worker-lister-test')[0] },
		editor_test			: function () { return Ext.ComponentQuery.query('module-goodsosttwork-worker-editor-test')[0] },
		workersearch_test	: function () { return Ext.ComponentQuery.query('module-goodsosttwork-worker-search-test')[0] },
		// -----------------------
		editor			: function () { return Ext.ComponentQuery.query('module-goodsosttwork-worker-editor')[0] }
	},

	//조회
	selectAction : function() {
		var me = this,
			master1  = me.pocket.listermaster1(),
			master2  = me.pocket.listermaster2(),
			listermaster1Test  = me.pocket.listermaster1Test(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(tindex == 3){
			Ext.Msg.alert("알림","출고등록의 조회를 눌러주십시오.");
		}else{
			if(param.work_strt_dttm1>param.work_strt_dttm2) {
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
					listermaster1Test.select({
						callback:function(records, operation, success) {
							if (success) {
								listermaster1Test.getSelectionModel().select(0);
							} else { }
							mask.hide();
						}, scope:me
					}, Ext.merge( param, {stor_id : _global.stor_id}));
				}else if(tindex == 2){
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
			master = me.pocket.listermaster1(),
			lister = me.pocket.lister(),
			detail = me.pocket.listerdetail1(),
			editor = me.pocket.editor(),
			search = me.pocket.workersearch(),
			param  = search.getValues(),
			record = undefined
		;
		lister.getStore().clearData(),
		lister.getStore().loadData([],false);

		var wrhs_idcd = me.pocket.editor().getValues().wrhs_idcd;
		var wrhs_name = me.pocket.editor().getValues().wrhs_name;
		var drtr_idcd = me.pocket.editor().getValues().drtr_idcd;
		var drtr_name = me.pocket.editor().getValues().drtr_name;
		var cstm_idcd = me.pocket.editor().getValues().cstm_idcd;
		var cstm_name = me.pocket.editor().getValues().cstm_name;
		var ostt_date = me.dateFormat(me.pocket.editor().getValues().ostt_date);
		var acpt_dvcd = me.pocket.editor().getValues().acpt_dvcd;

		editor.modifyRecord({
			caller	: me,
			action	: 'invoice',
			params	: {
				param:JSON.stringify({
					cstm_idcd		: cstm_idcd,
					invc_numb		: param.invc_numb,
					item_idcd		: param.item_idcd,
					deli_date1		: param.deli_date1,
					deli_date2		: param.deli_date2,
					cstm_idcd		: param.cstm_idcd,
					acpt_dvcd		: param.acpt_dvcd
				})
			},
			lister	: lister,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true } );
				}
				editor.down('[name=drtr_idcd]').setValue(drtr_idcd);
				editor.down('[name=drtr_name]').setValue(drtr_name);
				editor.down('[name=ostt_date]').setValue(new Date(ostt_date));
			}
		});
	},

	// ---- 제품출고 Test ----
	selectAction3 : function() {
		var me = this,
			master = me.pocket.listermaster1(),
			lister = me.pocket.lister_test(),
			detail = me.pocket.listerdetail1(),
			editor = me.pocket.editor_test(),
			search = me.pocket.workersearch_test(),
			param  = search.getValues(),
			record = undefined
		;
		lister.getStore().clearData(),
		lister.getStore().loadData([],false);

		var wrhs_idcd = me.pocket.editor().getValues().wrhs_idcd;
		var wrhs_name = me.pocket.editor().getValues().wrhs_name;
		var drtr_idcd = me.pocket.editor().getValues().drtr_idcd;
		var drtr_name = me.pocket.editor().getValues().drtr_name;
		var cstm_idcd = me.pocket.editor().getValues().cstm_idcd;
		var cstm_name = me.pocket.editor().getValues().cstm_name;
		var ostt_date = me.dateFormat(me.pocket.editor().getValues().ostt_date);
		var acpt_dvcd = me.pocket.editor().getValues().acpt_dvcd;

		editor.modifyRecord({
			caller	: me,
			action	: 'invoice',
			params	: {
				param:JSON.stringify({
					cstm_idcd		: cstm_idcd,
					invc_numb		: param.invc_numb,
					item_idcd		: param.item_idcd,
					deli_date1		: param.deli_date1,
					deli_date2		: param.deli_date2,
					cstm_idcd		: param.cstm_idcd,
					acpt_dvcd		: param.acpt_dvcd
				})
			},
			lister	: lister,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true } );
				}
				editor.down('[name=drtr_idcd]').setValue(drtr_idcd);
				editor.down('[name=drtr_name]').setValue(drtr_name);
				editor.down('[name=ostt_date]').setValue(new Date(ostt_date));
			}
		});
	},
	// -----------------------

	dateFormat:function(date){
		var	yyyy,
			mm  ,
			dd  ,
			value = ""
		;
		if(date.length==8){
			yyyy = date.substr(0,4),
			mm =  date.substr(4,2),
			dd = date.substr(6,2),
			value = yyyy+'-'+mm+'-'+dd
		}
		return value;
	},

	chkAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			changes = lister.getStore().getUpdatedRecords().length
		;

//		console.log();

		for(var i=0;i<changes;i++) {
			console.log(lister.getStore().getUpdatedRecords()[i].data.chk );
			lister.getStore().getUpdatedRecords()[i].data.chk = false;
		}


	},

	pricAction:function() {
		var me = this,
			master = me.pocket.listermaster1()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", " 1건을 선택 후 진행하십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget : 'module-sjflv-goodsosttwork-pric-popup',
		});
		Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		Ext.ComponentQuery.query('#ostt_trnt_dvcd')[0].setValue(records[0].data.ostt_trnt_dvcd);
		Ext.ComponentQuery.query('#ostt_trnt_amnt')[0].setValue(records[0].data.ostt_trnt_amnt);
		Ext.ComponentQuery.query('#remk_text')[0].setValue(records[0].data.remk_text);
	},

	updateAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			master = me.pocket.listermaster1(),
			store  = editor.getStore(),
			changes = lister.getStore().getUpdatedRecords().length,
			new_line_seqn,
			search = me.pocket.workersearch(),
			param  = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			jrf = 'invoice3.jrf',
			resId = _global.hq_id.toUpperCase(),
			values = editor.getValues()
		;

//		for(var i=0;i<changes;i++) {
//			if(lister.getStore().getUpdatedRecords()[0].data.lott_numb != lister.getStore().getUpdatedRecords()[i].data.lott_numb){
//				Ext.Msg.alert("알림","납품처명이 같은수주목록을 선택해주십시오.");
//				return
//			}
//		}

		if(changes != 0){
			if(values.wrhs_idcd==""){
				Ext.Msg.alert('알림','출고창고를 선택해주세요.');
				return;
			}
			var msg="";
			var x = 1;	//순번
			var arr = new Array();
			var new_invc_numb = "";
			var new_line_seqn = 1;  //2024.02.06 임수찬 : OEM제품인 경우 원료를 제품에 묶기위해 사용.

			Ext.each(lister.getStore().getUpdatedRecords(),function(record){
				if(record.get('lott_numb') == null || record.get('lott_numb') ==""){
					if(!(record.get('acpt_dvcd') == '2000' && record.get('prod_trst_dvcd') == '2000' && record.get('acct_bacd') == '3000')) {
						msg = "Batch No를 선택해주세요.";
						record.dirty = false
					}
				}

				// 2024.02.06 임수찬 : OEM제품인 경우 원료를 제품에 묶기위해 사용 (item_idcd) 조건 추가, 1:1 처리
				var length = Array.isArray(arr)?arr.findIndex(x => x.cstm_idcd == record.get('cstm_idcd') && x.dlvy_cstm_idcd == record.get('dlvy_cstm_idcd')
															&& x.item_idcd == record.get('item_idcd')) : -1; //에러처럼 보이지만 에러아님.

				if(length == -1 && ('20' == record.get('acct_bacd').substr(0, 2) ||'30' == record.get('acct_bacd').substr(0, 2) || '40' == record.get('acct_bacd').substr(0, 2))){
					Ext.Ajax.request({
						url			: _global.location.http() + '/listener/seq/maxid.do',
						params		: {
							token	: _global.token_id ,
							param	: JSON.stringify({
								stor_id	: _global.stor_id,
								table_nm: 'sale_ostt_mast'
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							new_invc_numb = result.records[0].seq;
							arr.push({cstm_idcd:record.get('cstm_idcd'),dlvy_cstm_idcd : record.get('dlvy_cstm_idcd'),new_invc_numb : result.records[0].seq, line_seqn : 1,item_idcd :record.get('item_idcd') })
						}
					});
					record.set('new_line_seqn',1);
					record.set('new_invc_numb',new_invc_numb);
					new_line_seqn = 1;

				}else{
					//var af_seqn = arr[length].line_seqn+1;
					//arr[length].line_seqn = af_seqn;
					new_line_seqn++;
					record.set('new_line_seqn',new_line_seqn);
					record.set('new_invc_numb',new_invc_numb);
				}
			});
			if(msg!=""){
				Ext.Msg.alert('알림',msg);
				return;
			}

			editor.updateRecord({
				caller	: me,
				action	: 'invoice',
				before	: function(results, record ) {
					if (results.success) {

						record.productStore.data.items = lister.getStore().getUpdatedRecords();
						var product = new Array();
						for(var i=0;i<changes;i++) {
							product.push(lister.getStore().getUpdatedRecords()[i].data);
						}
						record.raw.product = product;
						var info	= record,
							dirty	= false
						;
						info.dirtyValue('sysm_memo', '');
						info.product().data.each( function( item ) {
//							item.dirtyValue('wrhs_idcd', values.wrhs_idcd);
//							if (item.dirty || item.phantom) {
//								dirty = true;
//							}
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
								var ms;
									invc_numb = editor.down('[name=new_invc_numb]').getValue();
									arg =	'invc_numb~'+invc_numb+'~';
									url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
								if (results.inserted){
									ms = Ext.create( lister.getStore().model.modelName , record.data );
									lister.getStore().insert(0, ms);
								} else {
//									ms = lister.getStore().findRecord('acpt_numb', record.get('acpt_numb'));
//									Ext.iterate(ms.data, function (key, value) {
//										ms.set( key, record.get(key));
//									});
								}
								tpanel.items.indexOf(tpanel.setActiveTab(0));
								master.getStore().load();
								results.feedback({success : true  });
							},
							failure : function(operation){ results.feedback({success : false });},
							callback: function(operation){results.callback({});
							}
						});
					}
				}
			});
		}else{
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}
	},

	updateAction3:function() {
		var me = this,
			editor = me.pocket.editor_test(),
			lister = me.pocket.lister_test(),
//			master = me.pocket.listermaster1(),
			store  = editor.getStore(),
			changes = lister.getStore().getUpdatedRecords().length,
			new_line_seqn,
			search = me.pocket.workersearch_test(),
			param  = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			jrf = 'invoice3.jrf',
			resId = _global.hq_id.toUpperCase(),
			values = editor.getValues()
		;

		if(changes != 0){
			if(values.wrhs_idcd==""){
				Ext.Msg.alert('알림','출고창고를 선택해주세요.');
				return;
			}
			var msg="";
			var x = 1;	//순번
			var arr = new Array();
			var new_invc_numb = "";
			var new_line_seqn = 1;  //2024.02.06 임수찬 : OEM제품인 경우 원료를 제품에 묶기위해 사용.

			Ext.each(lister.getStore().getUpdatedRecords(),function(record){
				if(record.get('lott_numb') == null || record.get('lott_numb') ==""){
					if(!(record.get('acpt_dvcd') == '2000' && record.get('prod_trst_dvcd') == '2000' && record.get('acct_bacd') == '3000')) {
						msg = "Batch No를 선택해주세요.";
						record.dirty = false
					}
				}

				// 2024.02.06 임수찬 : OEM제품인 경우 원료를 제품에 묶기위해 사용 (item_idcd) 조건 추가, 1:1 처리
				var length = Array.isArray(arr)?arr.findIndex(x => x.cstm_idcd == record.get('cstm_idcd') && x.dlvy_cstm_idcd == record.get('dlvy_cstm_idcd')
															&& x.item_idcd == record.get('item_idcd')) : -1; //에러처럼 보이지만 에러아님.

				if(length == -1 && ('20' == record.get('acct_bacd').substr(0, 2) ||'30' == record.get('acct_bacd').substr(0, 2) || '40' == record.get('acct_bacd').substr(0, 2))){
					Ext.Ajax.request({
						url			: _global.location.http() + '/listener/seq/maxid.do',
						params		: {
							token	: _global.token_id ,
							param	: JSON.stringify({
								stor_id	: _global.stor_id,
								table_nm: 'sale_ostt_mast'
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							new_invc_numb = result.records[0].seq;
							arr.push({cstm_idcd:record.get('cstm_idcd'),dlvy_cstm_idcd : record.get('dlvy_cstm_idcd'),new_invc_numb : result.records[0].seq, line_seqn : 1,item_idcd :record.get('item_idcd') })
						}
					});
					record.set('new_line_seqn',1);
					record.set('new_invc_numb',new_invc_numb);
					new_line_seqn = 1;

				}else{
					//var af_seqn = arr[length].line_seqn+1;
					//arr[length].line_seqn = af_seqn;
					new_line_seqn++;
					record.set('new_line_seqn',new_line_seqn);
					record.set('new_invc_numb',new_invc_numb);
				}
			});
			if(msg!=""){
				Ext.Msg.alert('알림',msg);
				return;
			}

			editor.updateRecord({
				caller	: me,
				action	: 'invoice',
				before	: function(results, record ) {
					if (results.success) {

						record.productStore.data.items = lister.getStore().getUpdatedRecords();
						var product = new Array();
						for(var i=0;i<changes;i++) {
							product.push(lister.getStore().getUpdatedRecords()[i].data);
						}
						record.raw.product = product;
						var info	= record,
							dirty	= false
						;
						info.dirtyValue('sysm_memo', '');
						info.product().data.each( function( item ) {
//							item.dirtyValue('wrhs_idcd', values.wrhs_idcd);
//							if (item.dirty || item.phantom) {
//								dirty = true;
//							}
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
								var ms;
								var	invc_numb = editor.down('[name=new_invc_numb]').getValue();
								var	arg =	'invc_numb~'+invc_numb+'~';
								var	url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
								if (results.inserted){
									ms = Ext.create( lister.getStore().model.modelName , record.data );
									lister.getStore().insert(0, ms);
								} else {
//									ms = lister.getStore().findRecord('acpt_numb', record.get('acpt_numb'));
//									Ext.iterate(ms.data, function (key, value) {
//										ms.set( key, record.get(key));
//									});
								}
								tpanel.items.indexOf(tpanel.setActiveTab(0));
//								master.getStore().load();
								results.feedback({success : true  });
							},
							failure : function(operation){ results.feedback({success : false });},
							callback: function(operation){results.callback({});
							}
						});
					}
				}
			});
		}else{
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}
	},

	cancelAction : function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		tpanel.items.indexOf(tpanel.setActiveTab(0));
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
		}, { invc_numb : record.get('invc_numb') });
	},

	selectLister3:function( grid, record ){
		var me = this,
			master = me.pocket.listermaster1Test(),
			detail = me.pocket.listerdetail1Test(),
			record = master.getSelectionModel().getSelection()[0]
		;

		console.log('여기기');
		detail.select({
			 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
		}, { invc_numb : record.get('invc_numb') });
	},

	attachRecord:function( grid, records ){
		var me = this,
			listerdetail1 = me.pocket.listerdetail1(),
			listerdetail2 = me.pocket.listerdetail2(),
			listerdetail3 = me.pocket.listerdetail1Test()
		;
		listerdetail1.getStore().clearData();
		listerdetail1.getStore().loadData([],false);

		listerdetail2.getStore().clearData();
		listerdetail2.getStore().loadData([],false);

//		listerdetail3.getStore().clearData();
//		listerdetail3.getStore().loadData([],false);
	},

	insertAction:function(){
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		tpanel.items.indexOf(tpanel.setActiveTab(1));
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
//		editor.getStore().clearData();
//		editor.getStore().loadData([],false);
//		editor.getForm().reset();

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
			me.selectAction2();

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
			select = lister.getSelectionModel().getSelection(),
			record = []
		;
		if(select.length <= 0){
			Ext.Msg.alert("알림", "삭제하실 출고건을 선택하여 주십시오.");
		}else{

			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
					mask.show();
					store.remove (select);
					store.sync({
						callback:function(){
							store.reload();
							mask.hide();
						}
					})
				}
			});
		}
	},

	// 거래명세서출력
	printAction:function() {
		var me = this,
			listermaster1 = me.pocket.listermaster1(),
			select = me.pocket.listermaster1().getSelectionModel().getSelection(),
			record = listermaster1.getSelectionModel().getSelection(),
			jrf = '',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = listermaster1.getSelectionModel().getSelection();

		if (select.length<=0) {
			Ext.Msg.alert("알림", "목록을 선택해주십시오.");
			return;
		}

		if(resId == 'N1000SJFLV'){
			var arg = "invc_numb~";
			Ext.each(select,function(record){
				arg += "\'"+record.get('invc_numb')+"\',";
			})
			arg = arg.substring(0, arg.lastIndexOf(","));
			arg += "~";

			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+'Invoice_sjflv2.jrf'+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';
		}else if (select) {
			var a = "";
			for(var i =0; i< record.length ; i++){
				if(i==0){
					a+= "[";
				}
					a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\',\'cstm_idcd\':\''+record[i].get('cstm_idcd')+'\'}';
				if(i != record.length -1){
					a+=",";
				}else{
					a+="]";
				}
			}
			var _param = '_param~{\'records\':'+a+'}~';
			var arg = _param;

			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+'Invoice_Sjung.jrf'+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';
		}

		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},

	// 인수증출력
	printAction3:function() {
		var me = this,
			listermaster1 = me.pocket.listermaster1(),
			select = me.pocket.listermaster1().getSelectionModel().getSelection(),
			jrf = '',
			resId = _global.hq_id.toUpperCase()
		;

		var err_msg = "";
		var records = listermaster1.getSelectionModel().getSelection();
		if (select.length<=0) {
			Ext.Msg.alert("알림", "목록을 선택해주십시오.");
			return;
		}

		if (select) {
			var invc_numb = select[0].get('invc_numb');
			var arg =	'invc_numb~'+invc_numb+'~';
		}
//		Ext.each(select,function(record){
//			arg += "\'"+record.get('invc_numb')+"\',";
//		})
//		arg = arg.substring(0, arg.lastIndexOf(","));
//		arg += "~";

		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+'sjung_receipt.jrf'+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';

//		if(resId == 'N1000SJFLV'){
//			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+'Invoice_sjflv2.jrf'+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';
//		}else if (select) {
//			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+'Invoice_Sjung.jrf'+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';
//		}

		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},

	// 엑셀
	exportAction : function(self) {
		this.pocket.listermaster1().writer({enableLoadMask:true});
	},
	exportDetailAction : function(self) {
		this.pocket.listerdetail1().writer({enableLoadMask:true});
	},
	exportAction1 : function(self) {
		this.pocket.listermaster2().writer({enableLoadMask:true});
	},
	exportDetailAction1 : function(self) {
		this.pocket.listerdetail2().writer({enableLoadMask:true});
	},

	//택배 송장 등록
	excelAction:function(){
		var me		= this
		;
		resource.loadPopup({
			widget : 'module-sjflv-goodsosttwork-excel-popup',
			sample : {
				xtype	: 'button' ,
				text	: '엑셀양식 받기' ,
				iconCls	: Const.FINISH.icon ,
				handler:function(){
					window.open('/resource/sample/삼정_송장_업로드 양식.xlsx','download');
				}
			},
			params : {
			},
			waitMsg			: '업로드중...',							// upload시 progress bar의 wait message (옵션)
			allowExtension	: ['xls', 'xlsx'],						// 지정하지 않으면 확장자 무제한 (옵션)
			uploadBtnConfig	: {										// upload버튼의 config속성 (속성은 api참고) (옵션)
				text : '엑셀 Upload'
			},
			listeners: {
				close:function(){
//					me.pocket.lister2().getStore().clearData();
//					me.pocket.lister2().getStore().removeAll();
				}
			}
		});
	},
});