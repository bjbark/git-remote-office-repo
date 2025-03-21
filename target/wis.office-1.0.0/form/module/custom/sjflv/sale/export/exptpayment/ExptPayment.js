Ext.define('module.custom.sjflv.sale.export.exptpayment.ExptPayment', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.OrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.UserPopup'
	],
	models	: [
		'module.custom.sjflv.sale.export.exptpayment.model.ExptPaymentMaster1',
		'module.custom.sjflv.sale.export.exptpayment.model.ExptPaymentDetail1',
		'module.custom.sjflv.sale.export.exptpayment.model.ExptPaymentInvoice',
		'module.custom.sjflv.sale.export.exptpayment.model.ExptPaymentWorkerMaster',
		'module.custom.sjflv.sale.export.exptpayment.model.ExptPaymentWorkerDetail'
	],
	stores	: [
		'module.custom.sjflv.sale.export.exptpayment.store.ExptPaymentMaster1',
		'module.custom.sjflv.sale.export.exptpayment.store.ExptPaymentDetail1',
		'module.custom.sjflv.sale.export.exptpayment.store.ExptPaymentWorkerDetail',
		'module.custom.sjflv.sale.export.exptpayment.store.ExptPaymentWorkerEditor',
		'module.custom.sjflv.sale.export.exptpayment.store.ExptPaymentWorkerLister',
		'module.custom.sjflv.sale.export.exptpayment.store.ExptPaymentInvoice'
	],
	views	: [
		'module.custom.sjflv.sale.export.exptpayment.view.ExptPaymentLayout',
		'module.custom.sjflv.sale.export.exptpayment.view.ExptPaymentListerMaster1',
		'module.custom.sjflv.sale.export.exptpayment.view.ExptPaymentListerDetail1',
		'module.custom.sjflv.sale.export.exptpayment.view.ExptPaymentSearch',
		'module.custom.sjflv.sale.export.exptpayment.view.ExptPaymentWorkerSearch',
		'module.custom.sjflv.sale.export.exptpayment.view.ExptPaymentWorkerLister',
		'module.custom.sjflv.sale.export.exptpayment.view.ExptPaymentWorkerDetail',
		'module.custom.sjflv.sale.export.exptpayment.view.ExptPaymentWorkerEditor',
		'module.custom.sjflv.sale.export.exptpayment.view.ExptPaymentInvcPopup',
		'module.custom.sjflv.sale.export.exptpayment.view.ExptPaymentColtPopup',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-sjflv-exptpayment-layout #mainpanel'					: { tabchange : me.mainTabChange	},
			'module-sjflv-exptpayment-layout button[action=selectAction]'	: { click : me.selectAction			},		// 조회
			// lister1 event
			'module-sjflv-exptpayment-lister-master1 button[action=printAction]' : { click : me.printAction		},		// 거래명세서출력
			'module-sjflv-exptpayment-lister-master1 button[action=exportAction]': { click : me.exportAction	},		// 엑셀
			'module-sjflv-exptpayment-lister-master1 button[action=insertAction]': { click : me.insertAction	},		// 신규
			'module-sjflv-exptpayment-lister-master1 button[action=modifyAction]': { click : me.modifyAction	},		// 수정
			'module-sjflv-exptpayment-lister-master1 button[action=deleteAction]': { click : me.deleteAction	},		// 삭제
			// lister2 event
			'module-sjflv-exptpayment-worker-lister button[action=updateAction]': { click : me.updateAction		},		// 저장
			'module-sjflv-exptpayment-worker-lister button[action=cancelAction]': { click : me.cancelAction		},		// 취소
			'module-sjflv-exptpayment-worker-lister button[action=invcAction]'  : { click : me.popupAction		},		// invoice등록
			'module-sjflv-exptpayment-worker-lister button[action=coltAction]'  : { click : me.popupAction		},		// invoice등록
			//lister serch
//			'module-sjflv-exptpayment-worker-search button[action=selectAction2]': { click : me.selectAction2	},		// 조회
			'module-sjflv-exptpayment-worker-editor button[action=selectAction2]': { click : me.selectAction2	},		// 조회
			'module-sjflv-exptpayment-lister-detail1 button[action=exportAction]': { click : me.exportDetailAction	},	// 엑셀
			'module-sjflv-exptpayment-lister-master1' : {
				itemdblclick : me.selectLister1 ,
				selectionchange : me.attachRecord
			},
		});
		me.callParent(arguments);
	},

	pocket  : {
		layout			: function () { return Ext.ComponentQuery.query('module-sjflv-exptpayment-layout') [0] },
		search			: function () { return Ext.ComponentQuery.query('module-sjflv-exptpayment-search') [0] },
		listermaster1	: function () { return Ext.ComponentQuery.query('module-sjflv-exptpayment-lister-master1')[0] },
//		listermaster2	: function () { return Ext.ComponentQuery.query('module-sjflv-exptpayment-lister-master2')[0] },
		listerdetail1	: function () { return Ext.ComponentQuery.query('module-sjflv-exptpayment-lister-detail1')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-sjflv-exptpayment-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-sjflv-exptpayment-worker-lister')[0] },
			detail : function () { return Ext.ComponentQuery.query('module-sjflv-exptpayment-worker-detail')[0] }
		},
//		listerdetail2	: function () { return Ext.ComponentQuery.query('module-sjflv-exptpayment-lister-detail2')[0] },
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-sjflv-exptpayment-lister-master1')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-sjflv-exptpayment-lister-detail1')[0] },
		},
		popup : function () { return Ext.ComponentQuery.query('module-exptpayment-invc-popup')[0] }
//		workersearch	: function () { return Ext.ComponentQuery.query('module-sjflv-exptpayment-worker-search')[0] },
//		workerlister	: function () { return Ext.ComponentQuery.query('module-sjflv-exptpayment-worker-lister')[0] },
//		workereditor	: function () { return Ext.ComponentQuery.query('module-sjflv-exptpayment-worker-editor')[0] }
	},

	//조회
	selectAction : function() {
		var me = this,
			master = me.pocket.listermaster1(),
			search = me.pocket.search(),
			param  = search.getValues(),
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
					master.select({
						callback:function(records, operation, success) {
							if (success) {
								master.getSelectionModel().select(0);
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
//		Ext.Msg.alert('알림','asdsadasdasd');
		var me = this,
			master = me.pocket.lister.master(),
			lister = me.pocket.worker.lister(),
			detail = me.pocket.worker.detail(),
			editor = me.pocket.worker.editor(),
			param  = editor.getValues(),
			record = undefined
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
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
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			master = me.pocket.lister.master(),
			store  = editor.getStore(),
			changes = lister.getStore().getUpdatedRecords().length,
			new_line_seqn,
			search = me.pocket.workersearch(),
			param  = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(changes != 0){
			var i = 0, cstm = '',chk = 0;
			store.each(function(record){
				if(i==0){
					cstm = record.get('cstm_idcd');
				}else{
					if(record.get('cstm_idcd')!=cstm){
						chk=1;
						return;
					}
				}
			});
			if(chk==1){
				Ext.Msg.alert('알림','거래처가 다른 품목은 같이 출고할 수 없습니다.');
				return;
			}
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
					editor.down('[name=new_invc_numb]').setValue(result.records[0].seq);
				}
			});
			var x = 1;	//순번
			for (var a = 0; a < changes; a++) {
				lister.getStore().getUpdatedRecords()[a].data.new_line_seqn = x++;
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
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail(),
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
			listerdetail1 = me.pocket.listerdetail1()
		;
		listerdetail1.getStore().clearData();
		listerdetail1.getStore().loadData([],false);

	},

	insertAction:function(){
		var me = this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		tpanel.items.indexOf(tpanel.setActiveTab(1));
	},

	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			master		= me.pocket.lister.master(),
			search		= me.pocket.search(),
			lister		= me.pocket.worker.lister(),
			editor		= me.pocket.worker.editor(),
			param		= search.getValues(),
			tindex		= tabPanel.items.indexOf(newCard)
		;
//		editor.getStore().clearData();
//		editor.getStore().loadData([],false);
//		editor.getForm().reset();

		if(tindex == 0){
			master.select({
				callback:function(records, operation, success) {
					if (success) {
						master.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}
	},

	modifyAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
//			search = me.pocket.workersearch(),
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail(),
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister()
		;
			var err_msg = "";
			if (select){
				if (select.get("line_clos") == "1") {
					err_msg = "마감된 오더입니다.";
				}
				if (select.get("acpt_stat_dvcd") !== "0010") {
					if (_global.options.acpt_fix_yorn==1) {
						err_msg = "승인 또는 진행중인 오더는 수정할 수 없습니다.";
					}
				}
				if (err_msg != "") {
					Ext.Msg.alert("알림", err_msg);
					return;
				}
			}

//			search.down('[name=item_bacd]').setValue('0005');
//			search.down('[name=make_bacd]').setValue('0005');
//			search.down('[name=mtrl_bacd]').setValue('0005');

			if (select){
				editor.modifyRecord({
					caller	: me,
					action	: 'invoice',
					params	: {param:JSON.stringify({ invc_numb : select.get('invc_numb') })},
					lister	: lister,
					callback: function( results ) {
						if (results.success){
							me.pocket.layout().getLayout().setActiveItem(1);
							results.feedback( {success : true } );
						}
					}
				}, me);
			}
	},

	deleteAction : function() {
		var me = this,
			lister = me.pocket.lister.master(),
			detail = me.pocket.lister.detail(),
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
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/sale/export/exptpayment/set/del_yn.do',
						method		: "POST",
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								invc_numb	: select.get('invc_numb'),
//								amnd_degr	: select.get('amnd_degr')
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

	popupAction:function(cont){
		var	me = this,
			widget
		;
		if(cont.itemId=='invc'){
			widget = 'module-exptpayment-invc-popup';
		}else if(cont.itemId=='colt'){
			widget = 'module-exptpayment-colt-popup';
		}
		resource.loadPopup({
			widget :  widget,
			param : {
			}
		});
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