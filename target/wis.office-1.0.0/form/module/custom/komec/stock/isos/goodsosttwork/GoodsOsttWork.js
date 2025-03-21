Ext.define('module.custom.komec.stock.isos.goodsosttwork.GoodsOsttWork', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.OrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.LottPopup',
		'lookup.popup.view.CstmDeliPopup',
		'lookup.popup.view.WrhsPopup'
	],
	models	: [
		'module.custom.komec.stock.isos.goodsosttwork.model.GoodsOsttWorkMaster1',
		'module.custom.komec.stock.isos.goodsosttwork.model.GoodsOsttWorkMaster2',
		'module.custom.komec.stock.isos.goodsosttwork.model.GoodsOsttWorkDetail1',
		'module.custom.komec.stock.isos.goodsosttwork.model.GoodsOsttWorkDetail2',
		'module.custom.komec.stock.isos.goodsosttwork.model.GoodsOsttWorkInvoice',
		'module.custom.komec.stock.isos.goodsosttwork.model.GoodsOsttWorkWorkerMaster',
		'module.custom.komec.stock.isos.goodsosttwork.model.GoodsOsttWorkWorkerDetail',
	],
	stores	: [
		'module.custom.komec.stock.isos.goodsosttwork.store.GoodsOsttWorkMaster1',
		'module.custom.komec.stock.isos.goodsosttwork.store.GoodsOsttWorkMaster2',
		'module.custom.komec.stock.isos.goodsosttwork.store.GoodsOsttWorkDetail1',
		'module.custom.komec.stock.isos.goodsosttwork.store.GoodsOsttWorkDetail2',
		'module.custom.komec.stock.isos.goodsosttwork.store.GoodsOsttWorkInvoice',
	],
	views	: [
		'module.custom.komec.stock.isos.goodsosttwork.view.GoodsOsttWorkLayout',
		'module.custom.komec.stock.isos.goodsosttwork.view.GoodsOsttWorkListerMaster1',
		'module.custom.komec.stock.isos.goodsosttwork.view.GoodsOsttWorkListerMaster2',
		'module.custom.komec.stock.isos.goodsosttwork.view.GoodsOsttWorkListerDetail1',
		'module.custom.komec.stock.isos.goodsosttwork.view.GoodsOsttWorkListerDetail2',
		'module.custom.komec.stock.isos.goodsosttwork.view.GoodsOsttWorkBrcdLister',
		'module.custom.komec.stock.isos.goodsosttwork.view.GoodsOsttWorkBrcdSearch',
		'module.custom.komec.stock.isos.goodsosttwork.view.GoodsOsttWorkSearch',
		'module.custom.komec.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerLister',
		'module.custom.komec.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerEditor',
		'module.custom.komec.stock.isos.goodsosttwork.view.GoodsOsttWorkItemPopup',
		'module.custom.komec.stock.isos.goodsosttwork.view.GoodsOsttWorkItem2Popup',
		'module.custom.komec.stock.isos.goodsosttwork.view.GoodsOsttWorkExcelPopup',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-goodsosttwork-layout #mainpanel'					: { tabchange : me.mainTabChange		},
			'module-goodsosttwork-layout button[action=selectAction]'	: { click : me.selectAction				},	// 조회
			// lister1 event
			'module-goodsosttwork-lister-master1 button[action=printAction]'  : { click : me.printAction		},	// 거래명세서출력
			'module-goodsosttwork-lister-master1 button[action=printAction2]' : { click : me.printAction2		},	// 라벨출력
//			'module-goodsosttwork-lister-master1 button[action=printAction3]' : { click : me.printAction3		},	// 인수증출력
			'module-goodsosttwork-lister-master1 button[action=exportAction]' : { click : me.exportAction		},	// 엑셀
			'module-goodsosttwork-lister-master1 button[action=insertAction]' : { click : me.insertAction		},	// 신규
			'module-goodsosttwork-lister-master1 button[action=deleteAction]' : { click : me.deleteAction		},	// 삭제
			// lister2 event
			'module-goodsosttwork-worker-lister button[action=chkAction]': { click : me.chkAction				},	// 전체선택
			'module-goodsosttwork-worker-lister button[action=updateAction]': { click : me.updateAction			},	// 저장
			'module-goodsosttwork-worker-lister button[action=cancelAction]': { click : me.cancelAction			},	// 취소

			'module-goodsosttwork-worker-lister2 button[action=updateAction]': { click : me.updateAction2			},	// 저장
			'module-goodsosttwork-worker-lister2 button[action=cancelAction]': { click : me.cancelAction2			},	// 취소

			//lister serch

			'module-goodsosttwork-lister-detail1 button[action=exportAction]': { click : me.exportDetailAction	},	// 엑셀
			'module-goodsosttwork-lister-master2 button[action=exportAction]': { click : me.exportAction1		},	// 엑셀
			'module-goodsosttwork-lister-detail2 button[action=exportAction]': { click : me.exportDetailAction1	},	// 엑셀
			'module-goodsosttwork-lister-master1' : {
				itemdblclick : me.selectLister1 ,
				selectionchange : me.attachRecord
			},
			'module-goodsosttwork-lister-master2' : {
				itemdblclick : me.selectLister2 ,
				selectionchange : me.attachRecord
			}
		});
		me.callParent(arguments);
	},

	pocket  : {
		layout			: function () { return Ext.ComponentQuery.query('module-goodsosttwork-layout') [0] },
		search			: function () { return Ext.ComponentQuery.query('module-goodsosttwork-search') [0] },
		listermaster1	: function () { return Ext.ComponentQuery.query('module-goodsosttwork-lister-master1')[0] },
		listermaster2	: function () { return Ext.ComponentQuery.query('module-goodsosttwork-lister-master2')[0] },
		listerdetail1	: function () { return Ext.ComponentQuery.query('module-goodsosttwork-lister-detail1')[0] },
		listerdetail2	: function () { return Ext.ComponentQuery.query('module-goodsosttwork-lister-detail2')[0] },
		brcdlister		: function () { return Ext.ComponentQuery.query('module-goodsosttwork-brcd-lister')[0] },
		brcdsearch		: function () { return Ext.ComponentQuery.query('module-goodsosttwork-brcd-search')[0] },
		lister			: function () { return Ext.ComponentQuery.query('module-goodsosttwork-worker-lister')[0] },
		editor			: function () { return Ext.ComponentQuery.query('module-goodsosttwork-worker-editor')[0] },
	},

	//조회
	selectAction : function() {
		var me = this,
			master1  = me.pocket.listermaster1(),
			master2  = me.pocket.listermaster2(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			worker = me.pocket.lister(),
			lister
		;
		if(param.invc_date1>param.invc_date2) {
			Ext.Msg.alert("알림", "조회기간을 다시 입력해주십시오.");
		}else{

			if(tindex == 0) {
				lister = master1
			} else if( tindex ==  1){
				lister = worker;
			};

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
//						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}
	},

//	//worker-lister 조회
	selectAction2 : function() {
		var me = this,
			master = me.pocket.listermaster1(),
			lister = me.pocket.lister(),
			detail = me.pocket.listerdetail1(),
			editor = me.pocket.editor(),
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

	selectAction3 : function() {
		var me = this,
			master = me.pocket.listermaster1(),
			lister2 = me.pocket.lister2(),
			detail = me.pocket.listerdetail1(),
			editor2 = me.pocket.editor2(),
			param  = search2.getValues(),
			record = undefined
		;
		lister2.getStore().clearData(),
		lister2.getStore().loadData([],false);

		var wrhs_idcd = me.pocket.editor2().getValues().wrhs_idcd;
		var wrhs_name = me.pocket.editor2().getValues().wrhs_name;
		var drtr_idcd = me.pocket.editor2().getValues().drtr_idcd;
		var drtr_name = me.pocket.editor2().getValues().drtr_name;
		var cstm_idcd = me.pocket.editor2().getValues().cstm_idcd;
		var cstm_name = me.pocket.editor2().getValues().cstm_name;
		var ostt_date = me.dateFormat(me.pocket.editor2().getValues().ostt_date);
		var acpt_dvcd = me.pocket.editor2().getValues().acpt_dvcd;

		editor2.modifyRecord({
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
			lister	: lister2,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true } );
				}
				editor2.down('[name=drtr_idcd]').setValue(drtr_idcd);
				editor2.down('[name=drtr_name]').setValue(drtr_name);
				editor2.down('[name=ostt_date]').setValue(new Date(ostt_date));
			}
		});
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


	updateAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			master = me.pocket.listermaster1(),
			store  = lister.getStore(),
			changes = lister.getStore().getUpdatedRecords().length,
			records	= lister.getSelectionModel().getSelection(),
			select = lister.getSelectionModel().getSelection()[0],
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			jrf = 'invoice3.jrf',
			resId = _global.hq_id.toUpperCase(),
			values = editor.getValues(),
			new_line_seqn
		;
		if(changes != 0){
			if(values.wrhs_idcd==""){
				Ext.Msg.alert('알림','출고창고를 선택해주세요.');
				return;
			}
			var msg="";
			var x = 1;	//순번
			var arr = new Array();
			Ext.each(lister.getStore().getUpdatedRecords(),function(record){

				if(record.get('lott_numb') == null || record.get('lott_numb') ==""){
					if(!(record.get('acpt_dvcd') == '2000' && record.get('prod_trst_dvcd') == '2000' && record.get('acct_bacd') == '3000')) {
						msg = "Batch No를 선택해주세요.";
						record.dirty = false
					}
				}

				var length = Array.isArray(arr)?arr.findIndex(x => x.cstm_idcd == record.get('cstm_idcd') && x.dlvy_cstm_idcd == record.get('dlvy_cstm_idcd')) : -1; //에러처럼 보이지만 에러아님.

				if(length == -1){
					var new_invc_numb = '';
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
							arr.push({cstm_idcd:record.get('cstm_idcd'),dlvy_cstm_idcd : record.get('dlvy_cstm_idcd'),new_invc_numb : result.records[0].seq, line_seqn : 1})
						}
					});
					record.set('new_line_seqn',1);
					record.set('new_invc_numb',new_invc_numb);
					record.set('ostt_date',values.ostt_date);
					record.set('drtr_idcd',values.drtr_idcd);
				}else{
					var af_seqn = arr[length].line_seqn+1;
					arr[length].line_seqn = af_seqn;
					record.set('new_line_seqn',af_seqn);
					record.set('new_invc_numb',arr[length].new_invc_numb);
					record.set('ostt_date',values.ostt_date);
					record.set('drtr_idcd',values.drtr_idcd);
				}
			});
			if(msg!=""){
				Ext.Msg.alert('알림',msg);
				return;
			}
			store.sync({
				callback:function(){
					store.reload();
				}
			})

		}else{
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}
	},

	updateAction2:function() {
		var me = this,
			editor = me.pocket.editor2(),
			lister = me.pocket.lister2(),
			master = me.pocket.listermaster1(),
			store  = editor.getStore(),
			changes = lister.getStore().getUpdatedRecords().length,
			records	= lister.getSelectionModel().getSelection(),
			search = me.pocket.workersearch2(),
			select = lister.getSelectionModel().getSelection()[0],
			param  = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			jrf = 'invoice3.jrf',
			resId = _global.hq_id.toUpperCase(),
			values = editor.getValues(),
			new_line_seqn
		;

		if(changes != 0){
			if(values.cstm_idcd == "" || values.cstm_idcd == null){
				Ext.Msg.alert('알림','거래처를 반드시 선택해주세요.');
				return;
			}
			var x = 1;	//순번
			var msg = "";
			var arr = [];
			var new_invc = [];
			Ext.each(lister.getStore().getUpdatedRecords(),function(record){

				if(arr.indexOf(record.get('cstm_idcd')) == -1){
					x = 1;
					arr.push(record.get('cstm_idcd'));
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
							new_invc.push(result.records[0].seq);
						}
					});

					record.set('new_line_seqn',x);
					record.set('new_invc_numb',new_invc[arr.indexOf(record.get('cstm_idcd'))]);

				}else{
					x++;
					record.set('new_line_seqn',x);
					record.set('new_invc_numb',new_invc[arr.indexOf(record.get('cstm_idcd'))]);

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
//							item.dirtyValue('acpt_numb', info.get('acpt_numb'));
							if (item.dirty || item.phantom) {
								dirty = true;
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
								store.reload();
							},
							failure : function(operation){ results.feedback({success : false });},
							callback: function(operation){results.callback({});
							}
						});
					}
					editor.getForm().reset();
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

	cancelAction2 : function() {
		var me = this,
			editor = me.pocket.editor2(),
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

	attachRecord:function( grid, records ){
		var me = this,
			listerdetail1 = me.pocket.listerdetail1(),
			listerdetail2 = me.pocket.listerdetail2()
		;
		listerdetail1.getStore().clearData();
		listerdetail1.getStore().loadData([],false);

		listerdetail2.getStore().clearData();
		listerdetail2.getStore().loadData([],false);
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
			tindex		= tabPanel.items.indexOf(newCard)
		;
		me.selectAction();
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
			jrf = '',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		if (select.length<=0) {
			Ext.Msg.alert("알림", "목록을 선택해주십시오.");
			return;
		}
		var arg = "invc_numb~";
		Ext.each(select,function(record){
			arg += "\'"+record.get('invc_numb')+"\',";
		})
		arg = arg.substring(0, arg.lastIndexOf(","));
		arg += "~";

		if (select) {
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+'Invoice_Sjung.jrf'+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';
		}

		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},

	// 인수증출력
//	printAction3:function() {
//		var me = this,
//			listermaster1 = me.pocket.listermaster1(),
//			select = me.pocket.listermaster1().getSelectionModel().getSelection(),
//			jrf = '',
//			resId = _global.hq_id.toUpperCase()
//		;
//
//		var err_msg = "";
//		var records = listermaster1.getSelectionModel().getSelection();
//		if (select.length<=0) {
//			Ext.Msg.alert("알림", "목록을 선택해주십시오.");
//			return;
//		}
//
//		if (select) {
//			var invc_numb = select[0].get('invc_numb');
//			var arg =	'invc_numb~'+invc_numb+'~';
//		}
////		Ext.each(select,function(record){
////			arg += "\'"+record.get('invc_numb')+"\',";
////		})
////		arg = arg.substring(0, arg.lastIndexOf(","));
////		arg += "~";
//
//		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+'sjung_receipt.jrf'+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';
//
////		if(resId == 'N1000SJFLV'){
////			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+'Invoice_sjflv2.jrf'+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';
////		}else if (select) {
////			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+'Invoice_Sjung.jrf'+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';
////		}
//
//		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
//		return win;
//	},

	printAction2:function() {
		var me = this,
			listermaster1 = me.pocket.listermaster1(),
			select = me.pocket.listermaster1().getSelectionModel().getSelection(),
			jrf = 'komec_ostt_label.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		if (select.length<=0) {
			Ext.Msg.alert("알림", "목록을 선택해주십시오.");
			return;
		}
		var a = "";
		for(var i =0; i< select.length ; i++){
			if(i==0){
				a+= "[";
			}
				a+= '{\'invc_numb\':\''+select[i].get('invc_numb')+'\',\'line_seqn\':\''+select[i].get('line_seqn')+'\'}';
			if(i != select.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}
		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		if (select) {
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';
		}

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

});