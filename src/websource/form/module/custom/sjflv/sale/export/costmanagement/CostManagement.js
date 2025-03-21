Ext.define('module.custom.sjflv.sale.export.costmanagement.CostManagement', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.OrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.WrhsPopup'
	],
	models	: [
		'module.custom.sjflv.sale.export.costmanagement.model.CostManagementMaster1',
		'module.custom.sjflv.sale.export.costmanagement.model.CostManagementDetail1',
		'module.custom.sjflv.sale.export.costmanagement.model.CostManagementInvoice',
		'module.custom.sjflv.sale.export.costmanagement.model.CostManagementWorkerMaster',
		'module.custom.sjflv.sale.export.costmanagement.model.CostManagementWorkerDetail'
	],
	stores	: [
		'module.custom.sjflv.sale.export.costmanagement.store.CostManagementMaster1',
		'module.custom.sjflv.sale.export.costmanagement.store.CostManagementDetail1',
		'module.custom.sjflv.sale.export.costmanagement.store.CostManagementInvoice'
	],
	views	: [
		'module.custom.sjflv.sale.export.costmanagement.view.CostManagementLayout',
		'module.custom.sjflv.sale.export.costmanagement.view.CostManagementListerMaster1',
		'module.custom.sjflv.sale.export.costmanagement.view.CostManagementListerDetail1',
		'module.custom.sjflv.sale.export.costmanagement.view.CostManagementSearch',
		'module.custom.sjflv.sale.export.costmanagement.view.CostManagementWorkerSearch',
		'module.custom.sjflv.sale.export.costmanagement.view.CostManagementWorkerLister',
		'module.custom.sjflv.sale.export.costmanagement.view.CostManagementWorkerEditor',
		'module.custom.sjflv.sale.export.costmanagement.view.CostManagementWorkerSearch',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-sjflv-costmanagement-layout #mainpanel'					: { tabchange : me.mainTabChange	},
			'module-sjflv-costmanagement-layout button[action=selectAction]'	: { click : me.selectAction			},		// 조회
			// lister1 event
			'module-sjflv-costmanagement-lister-master1 button[action=printAction]' : { click : me.printAction		},		// 거래명세서출력
			'module-sjflv-costmanagement-lister-master1 button[action=inexAction]'  : { click : me.popupAction		},		//
			'module-sjflv-costmanagement-lister-master1 button[action=exportAction]': { click : me.exportAction	},		// 엑셀
			'module-sjflv-costmanagement-lister-master1 button[action=insertAction]': { click : me.insertAction	},		// 신규
			'module-sjflv-costmanagement-lister-master1 button[action=deleteAction]': { click : me.deleteAction	},		// 삭제
			// lister2 event
			'module-sjflv-costmanagement-worker-lister button[action=updateAction]': { click : me.updateAction		},		// 저장
			'module-sjflv-costmanagement-worker-lister button[action=cancelAction]': { click : me.cancelAction		},		// 취소
			'module-sjflv-costmanagement-worker-lister button[action=invcAction]'  : { click : me.popupAction		},		// invoice등록
			//lister serch
			'module-sjflv-costmanagement-worker-search button[action=selectAction2]': { click : me.selectAction2	},		// 조회
			'module-sjflv-costmanagement-lister-detail1 button[action=exportAction]': { click : me.exportDetailAction	},	// 엑셀
			'module-sjflv-costmanagement-lister-master1' : {
				itemdblclick : me.selectLister1 ,
				selectionchange : me.attachRecord
			},
		});
		me.callParent(arguments);
	},

	pocket  : {
		layout			: function () { return Ext.ComponentQuery.query('module-sjflv-costmanagement-layout') [0] },
		search			: function () { return Ext.ComponentQuery.query('module-sjflv-costmanagement-search') [0] },
		listermaster1	: function () { return Ext.ComponentQuery.query('module-sjflv-costmanagement-lister-master1')[0] },
		listermaster2	: function () { return Ext.ComponentQuery.query('module-sjflv-costmanagement-lister-master2')[0] },
		listerdetail1	: function () { return Ext.ComponentQuery.query('module-sjflv-costmanagement-lister-detail1')[0] },
		listerdetail2	: function () { return Ext.ComponentQuery.query('module-sjflv-costmanagement-lister-detail2')[0] },
		workersearch	: function () { return Ext.ComponentQuery.query('module-sjflv-costmanagement-worker-search')[0] },
		lister			: function () { return Ext.ComponentQuery.query('module-sjflv-costmanagement-worker-lister')[0] },
		editor			: function () { return Ext.ComponentQuery.query('module-sjflv-costmanagement-worker-editor')[0] }
	},

	//조회
	selectAction : function() {
		var me = this,
			master1  = me.pocket.listermaster1(),
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

		var wrhs_idcd = me.pocket.editor().getValues().wrhs_idcd,
			wrhs_name = me.pocket.editor().getValues().wrhs_name,
			drtr_idcd = me.pocket.editor().getValues().drtr_idcd,
			drtr_name = me.pocket.editor().getValues().drtr_name,
			cstm_idcd = me.pocket.editor().getValues().cstm_idcd,
			cstm_name = me.pocket.editor().getValues().cstm_name,
			ostt_date = me.dateFormat(me.pocket.editor().getValues().ostt_date)
		;

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
				})
			},
			lister	: lister,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true } );
				}
				editor.down('[name=drtr_idcd]').setValue(drtr_idcd);
				editor.down('[name=drtr_name]').setValue(drtr_name);
				editor.down('[name=wrhs_idcd]').setValue(wrhs_idcd);
				editor.down('[name=wrhs_name]').setValue(wrhs_name);
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

	attachRecord:function( grid, records ){
		var me = this,
			listerdetail1 = me.pocket.listerdetail1()
		;
		listerdetail1.getStore().clearData();
		listerdetail1.getStore().loadData([],false);

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
			search		= me.pocket.search(),
			lister		= me.pocket.lister(),
			editor		= me.pocket.editor(),
			param		= search.getValues(),
			tindex		= tabPanel.items.indexOf(newCard)
		;
//		editor.getStore().clearData();
//		editor.getStore().loadData([],false);
//		editor.getForm().reset();

		if(tindex == 0){
			master1.select({
				callback:function(records, operation, success) {
					if (success) {
						master1.getSelectionModel().select(0);
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
						url			: _global.api_host_info + '/' + _global.app_site + '/stock/costmanagement/set/deleteMaster.do',
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

	popupAction:function(cont){
		var	me = this,
			widget
		;
		if(cont.itemId=='invc'){
			widget = 'module-costmanagement-invc-popup';
		}else{
			widget = 'module-costmanagement-inex-popup';
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