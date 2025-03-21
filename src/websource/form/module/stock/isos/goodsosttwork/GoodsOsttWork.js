Ext.define('module.stock.isos.goodsosttwork.GoodsOsttWork', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.OrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.WrhsPopup'
	],
	models	: [
		'module.stock.isos.goodsosttwork.model.GoodsOsttWorkMaster1',
		'module.stock.isos.goodsosttwork.model.GoodsOsttWorkMaster2',
		'module.stock.isos.goodsosttwork.model.GoodsOsttWorkDetail1',
		'module.stock.isos.goodsosttwork.model.GoodsOsttWorkDetail2',
		'module.stock.isos.goodsosttwork.model.GoodsOsttWorkInvoice',
		'module.stock.isos.goodsosttwork.model.GoodsOsttWorkWorkerMaster',
		'module.stock.isos.goodsosttwork.model.GoodsOsttWorkWorkerDetail'
	],
	stores	: [
		'module.stock.isos.goodsosttwork.store.GoodsOsttWorkMaster1',
		'module.stock.isos.goodsosttwork.store.GoodsOsttWorkMaster2',
		'module.stock.isos.goodsosttwork.store.GoodsOsttWorkDetail1',
		'module.stock.isos.goodsosttwork.store.GoodsOsttWorkDetail2',
		'module.stock.isos.goodsosttwork.store.GoodsOsttWorkInvoice'
	],
	views	: [
		'module.stock.isos.goodsosttwork.view.GoodsOsttWorkLayout',
		'module.stock.isos.goodsosttwork.view.GoodsOsttWorkListerMaster1',
		'module.stock.isos.goodsosttwork.view.GoodsOsttWorkListerMaster2',
		'module.stock.isos.goodsosttwork.view.GoodsOsttWorkListerDetail1',
		'module.stock.isos.goodsosttwork.view.GoodsOsttWorkListerDetail2',
		'module.stock.isos.goodsosttwork.view.GoodsOsttWorkSearch',
		'module.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerSearch',
		'module.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerLister',
		'module.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerEditor',
		'module.stock.isos.goodsosttwork.view.GoodsOsttWorkItemPopup',
		'module.stock.isos.goodsosttwork.view.GoodsOsttWorkItem2Popup'
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
			'module-goodsosttwork-lister-master1 button[action=exportAction]': { click : me.exportAction	},		// 엑셀
			'module-goodsosttwork-lister-master1 button[action=insertAction]': { click : me.insertAction	},		// 신규
			'module-goodsosttwork-lister-master1 button[action=deleteAction]': { click : me.deleteAction	},		// 삭제
			// lister2 event
			'module-goodsosttwork-worker-lister button[action=updateAction]': { click : me.updateAction		},		// 저장
			'module-goodsosttwork-worker-lister button[action=cancelAction]': { click : me.cancelAction		},		// 취소
			//lister serch
			'module-goodsosttwork-worker-search button[action=selectAction2]': { click : me.selectAction2	},		// 조회
			'module-goodsosttwork-lister-detail1 button[action=printAction]': { click : me.printAction2 },			// 바코드발행
			'module-goodsosttwork-lister-detail1 button[action=exportAction]': { click : me.exportDetailAction	},	// 엑셀
			'module-goodsosttwork-lister-master2 button[action=exportAction]': { click : me.exportAction1	},		// 엑셀
			'module-goodsosttwork-lister-master2 button[action=PrintAction1]': { click : me.printAction1	},		// 부품식별표 발행
			'module-goodsosttwork-lister-detail2 button[action=exportAction]': { click : me.exportDetailAction1},	// 엑셀
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
		workersearch	: function () { return Ext.ComponentQuery.query('module-goodsosttwork-worker-search')[0] },
		lister			: function () { return Ext.ComponentQuery.query('module-goodsosttwork-worker-lister')[0] },
		editor			: function () { return Ext.ComponentQuery.query('module-goodsosttwork-worker-editor')[0] }
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
		if(tindex == 1){
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
		var cstm_idcd = param.cstm_idcd;
		var cstm_name = param.cstm_name;
		var ostt_date = me.dateFormat(me.pocket.editor().getValues().ostt_date);
		var check     = param.optn_1;

		if(check){
			lister.down('[dataIndex=invc_date]').hide();
			lister.down('[dataIndex=acpt_date]').show();
		}else{
			lister.down('[dataIndex=invc_date]').show();
			lister.down('[dataIndex=acpt_date]').hide();
		}
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
					check			: check
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

	updateAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			master = me.pocket.listermaster1(),
			store  = editor.getStore(),
			changes = lister.getStore().getUpdatedRecords().length,
			search = me.pocket.workersearch(),
			param  = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			jrf = 'invoice3.jrf',
			resId = _global.hq_id.toUpperCase(),
			values = editor.getValues()
		;
		if(changes != 0){
//			if(values.wrhs_idcd==""){
//				Ext.Msg.alert('알림','출고창고를 선택해주세요.');
//				return;
//			}
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
					if(_global.hq_id.toUpperCase() == "N1000NBOLT"){
							Ext.Msg.confirm("확인", "거래명세서를 출력 하시겠습니까?", function(button) {
							if (button == 'yes') {
								Ext.Ajax.request({
									url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
								});
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
		editor.getForm().reset();
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
						url			: _global.api_host_info + '/' + _global.app_site + '/stock/goodsosttwork/set/deleteMaster.do',
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

	// 거래명세서출력
	printAction:function() {
		var me = this,
			listermaster1 = me.pocket.listermaster1(),
			select = me.pocket.listermaster1().getSelectionModel().getSelection(),
			jrf = _global.options.rsvd_ordr_spts
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = listermaster1.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록에서 선택하여주십시오.");
			return;
		}

		Ext.Ajax.request({
			url		: _global.location.http() + '/stock/goodsosttwork/get/insp.do',
			params	: {
			token	: _global.token_id,
			param	: JSON.stringify({
					cstm_idcd		: records[0].get('cstm_idcd'),
					rprt_dvcd		: "1000"
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else{
					if(result.records.length >0){
						console.log(jrf);
						jrf = result.records[0].rprt_file_name;
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		if(jrf){
			jrf = 'invoice.jrf';
		}
		var invc_numb = select[0].get('invc_numb')
		var arg = 'invc_numb~'+invc_numb+'~';

		if(resId == 'N1000NBOLT'){
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+'invoice3.jrf'+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		}else{
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		}
		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},

	// 광일테크 부품식별표 출력
	printAction1 : function() {
		var me = this,
			listermaster2  = me.pocket.listermaster2(),
			listerdetail2  = me.pocket.listerdetail2(),
			select = listerdetail2.getSelectionModel().getSelection(),
			master = listermaster2.getSelectionModel().getSelection(),
			cstm_idcd = '',
			dvcd = '',
			widget
		;
		if (!select || select.length == 0) {
			Ext.Msg.alert("알림", '대기내역을 선택하여 주시기 바랍니다.' );
			return;
		}else{
			cstm_idcd = master[0].data.cstm_idcd;
			if(cstm_idcd.trim() == 'KUM01'){
				dvcd = 'kumho';
				widget = 'module-goodsosttwork-item2-popup';
			}else{
				widget = 'module-goodsosttwork-item-popup';
			}

			resource.loadPopup({
				widget :  widget,
				param : {
					invc_numb : select[0].data.invc_numb,
					line_seqn : select[0].data.line_seqn,
					trst_qntt : select[0].data.trst_qntt,
					dvcd      : dvcd
				}
			});
		}
	},

	// 뉴볼텍 바코드발행
	printAction2:function() {
		var me = this,
			master = me.pocket.listermaster1(),
			select = me.pocket.listermaster1().getSelectionModel().getSelection(),
			jrf = 'NboltBarcode.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록을 선택해주십시오.");
			return;
		}
		if (select) {
			var invc_numb = select[0].get('invc_numb');
			var arg = 'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1200,height=600'),
			});
		}
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