Ext.define('module.stock.isos.goodsrettwork.GoodsRettWork', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.OrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CstmDeliPopup',
		'lookup.popup.view.WrhsPopup'
	],
	models	: [
		'module.stock.isos.goodsrettwork.model.GoodsRettWorkMaster',
		'module.stock.isos.goodsrettwork.model.GoodsRettWorkDetail',
		'module.stock.isos.goodsrettwork.model.GoodsRettWorkInvoice',
		'module.stock.isos.goodsrettwork.model.GoodsRettWorkWorkerLister',
		'module.stock.isos.goodsrettwork.model.GoodsRettWorkWorkerMaster'
	],
	stores	: [
		'module.stock.isos.goodsrettwork.store.GoodsRettWorkMaster',
		'module.stock.isos.goodsrettwork.store.GoodsRettWorkDetail',
		'module.stock.isos.goodsrettwork.store.GoodsRettWorkInvoice',
		'module.stock.isos.goodsrettwork.store.GoodsRettWorkWorkerLister'
	],
	views	: [
		'module.stock.isos.goodsrettwork.view.GoodsRettWorkLayout',
		'module.stock.isos.goodsrettwork.view.GoodsRettWorkListerMaster',
		'module.stock.isos.goodsrettwork.view.GoodsRettWorkListerDetail',
		'module.stock.isos.goodsrettwork.view.GoodsRettWorkSearch',
		'module.stock.isos.goodsrettwork.view.GoodsRettWorkWorkerSearch',
		'module.stock.isos.goodsrettwork.view.GoodsRettWorkWorkerLister',
		'module.stock.isos.goodsrettwork.view.GoodsRettWorkWorkerEditor',
		'module.stock.isos.goodsrettwork.view.GoodsRettWorkIsosPopup'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-goodsrettwork-layout button[action=selectAction]'			: { click : me.selectAction			},	// 조회
			// lister1 event
			'module-goodsrettwork-lister-master button[action=exportAction]'	: { click : me.exportAction			},	// 엑셀
			'module-goodsrettwork-lister-master button[action=insertAction]'	: { click : me.insertAction			},	// 신규
			'module-goodsrettwork-lister-master button[action=deleteAction]'	: { click : me.deleteAction			},	// 삭제
			// lister2 event
			'module-goodsrettwork-worker-lister button[action=updateAction]'	: { click : me.updateAction			},	// 저장
			'module-goodsrettwork-worker-lister button[action=cancelAction]'	: { click : me.cancelAction			},	// 취소
			//lister serch
			'module-goodsrettwork-worker-search button[action=selectAction2]'	: { click : me.selectAction2		},	// 조회
			'module-goodsrettwork-lister-detail button[action=exportAction]'	: { click : me.exportDetailAction	},	// 엑셀
			'module-goodsrettwork-lister-detail button[action=isosAction]'		: { click : me.isosAction			},	// 반품처리 팝업
			'module-goodsrettwork-lister-master' : {
				itemdblclick : me.selectLister1 ,
				selectionchange : me.attachRecord
			},
			'module-goodsrettwork-layout #mainpanel' : {
				tabchange : me.mainTabChange
			}
		});
		me.callParent(arguments);
	},

	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-goodsrettwork-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-goodsrettwork-search') [0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-goodsrettwork-lister-master')[0] },
		listerdetail: function () { return Ext.ComponentQuery.query('module-goodsrettwork-lister-detail')[0] },
		worker		: {
			editor	: function () { return Ext.ComponentQuery.query('module-goodsrettwork-worker-editor')[0] },
			search	: function () { return Ext.ComponentQuery.query('module-goodsrettwork-worker-search')[0] },
			lister	: function () { return Ext.ComponentQuery.query('module-goodsrettwork-worker-lister')[0] }
		}
	},

	//조회
	selectAction : function() {
		var me = this,
			master	= me.pocket.listermaster(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			tpanel	= me.pocket.layout().down('#mainpanel'),
			tindex	= tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(tindex == 1){
			Ext.Msg.alert("알림","반품등록  내역을 조회를 하세요.");
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
					}, Ext.merge( param,{stor_id : _global.stor_id}));
				}else if(tindex == 2){
				}
			}
		}
	},

	//worker-lister 조회
	selectAction2 : function() {
		var me = this,
			master = me.pocket.listermaster(),
			lister = me.pocket.worker.lister(),
			detail = me.pocket.listerdetail(),
			editor = me.pocket.worker.editor(),
			search = me.pocket.worker.search(),
			param  = search.getValues(),
			record = undefined
			console.log(me.pocket.worker.lister());
		;
//		lister.getStore().clearData(),
//		lister.getStore().loadData([],false);

//		if(editor.getValues().cstm_idcd==''){
//			Ext.Msg.alert("알림","거래처를 반드시 입력해주십시오.");
//		}else
//			if(editor.getValues().wrhs_idcd==''){
//			Ext.Msg.alert("알림","반품 등록 할 창고를 입력해주십시오.");
//		}
//			else{
//			var wrhs_idcd = me.pocket.worker.editor().getValues().wrhs_idcd;
//			var wrhs_name = me.pocket.worker.editor().getValues().wrhs_name;
//			var cstm_idcd = me.pocket.worker.editor().getValues().cstm_idcd;
//			var cstm_name = me.pocket.worker.editor().getValues().cstm_name;
			editor.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {
					param:JSON.stringify({
//						cstm_idcd		: cstm_idcd,
						acpt_numb		: param.invc_numb,
						item_idcd		: param.item_idcd,
						ostt_date1		: param.ostt_date1,
						ostt_date2		: param.ostt_date2,
						cstm_idcd		: param.cstm_idcd,
						dlvy_cstm_idcd	: param.dlvy_cstm_idcd,
						lott_numb		: param.lott_numb,
						acpt_dvcd		: param.acpt_dvcd
					})
				},
				lister	: lister,
				callback: function( results ) {
					if (results.success){
						results.feedback( {success : true } );
					}
//					editor.down('[name=drtr_idcd]').setValue(_global.login_id);
//					editor.down('[name=drtr_name]').setValue(_global.login_nm);
//					editor.down('[name=wrhs_idcd]').setValue(wrhs_idcd);
//					editor.down('[name=wrhs_name]').setValue(wrhs_name);
//					editor.down('[name=cstm_idcd]').setValue(cstm_idcd);
//					editor.down('[name=cstm_name]').setValue(cstm_name);
//					console.log(lister.down('[name=cstm_idcd]'));
				}
			});
//		}
	},

	updateAction:function() {
		var me = this,
			editor	= me.pocket.worker.editor(),
			lister	= me.pocket.worker.lister(),
			master	= me.pocket.listermaster(),
			store	= editor.getStore(),
			changes	= lister.getStore().getUpdatedRecords().length,
			new_line_seqn,
			search	= me.pocket.worker.search(),
			param	= search.getValues(),
			tpanel	= me.pocket.layout().down('#mainpanel'),
			tindex	= tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(changes != 0){
			for(var i=0;i<changes;i++) {
				if( lister.getStore().getUpdatedRecords()[i].data.rett_resn_dvcd == null || lister.getStore().getUpdatedRecords()[i].data.rett_resn_dvcd==''){
					Ext.Msg.alert("알림","반품사유를 선택하십시오.");
					return;
				}
//				if( lister.getStore().getUpdatedRecords()[i].data.rett_proc_dvcd == null || lister.getStore().getUpdatedRecords()[i].data.rett_proc_dvcd==''){
//					Ext.Msg.alert("알림","반품처리를 선택하십시오.");
//					return;
//				}
			};
			Ext.Ajax.request({
				url			: _global.location.http() + '/listener/seq/maxid.do',
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'sale_rett_mast'
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					lister.down('[name=cstm_idcd]').setValue();
					editor.down('[name=invc_numb]').setValue(result.records[0].seq);
				}
			});
			var x = 1;	//순번
			for (var a = 0; a < changes; a++) {
				lister.getStore().getUpdatedRecords()[a].data.line_seqn = x++;
			}
			if(editor.getValues().rett_wrhs_idcd==''|| editor.getValues().rett_wrhs_idcd==null){
				Ext.Msg.alert("알림","반품 등록 할 창고를 입력해주십시오.");
			}else{
				editor.updateRecord({
					caller	: me,
					action	: 'invoice',
					lister	: lister ,
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
								item.dirtyValue('invc_numb', info.get('invc_numb'));
	//							item.dirtyValue('cstm_idcd', lister.getValues().cstm_idcd);
								item.dirtyValue('wrhs_idcd', editor.getValues().rett_wrhs_idcd);
								console.log(editor.getValues().wrhs_idcd);
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
										ms = lister.getStore().findRecord('invc_numb', record.get('invc_numb'));
//										ms = lister.getStore().findRecord('cstm_idcd', record.get('cstm_idcd'));
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
			}
		}else{
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}
	},


	cancelAction : function() {
		var me = this,
			//editor = me.pocket.editor(),
			//lister = me.pocket.lister(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		tpanel.items.indexOf(tpanel.setActiveTab(0));
	},

	selectLister1:function( grid, record ){
		var me = this,
			master = me.pocket.listermaster(),
			detail = me.pocket.listerdetail(),
			record = master.getSelectionModel().getSelection()[0]
		;
		detail.select({
			 callback : function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select(0);
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
			listerdetail = me.pocket.listerdetail()
		;
		listerdetail.getStore().clearData();
		listerdetail.getStore().loadData([],false);
	},

	insertAction:function(){
		var me = this,
			tpanel	= me.pocket.layout().down('#mainpanel'),
			tindex	= tpanel.items.indexOf(tpanel.getActiveTab())
		;
		tpanel.items.indexOf(tpanel.setActiveTab(1));
	},

	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			lister	= me.pocket.worker.lister(),
			search	= me.pocket.worker.search(),
			editor	= me.pocket.worker.editor(),
			master	= me.pocket.listermaster(),
			param	= search.getValues(),
			tindex	= tabPanel.items.indexOf(newCard)
		;
		editor.getStore().clearData();
		editor.getStore().loadData([],false);
		editor.getForm().reset();
		lister.getStore().clearData();
		lister.getStore().loadData([],false);
		Ext.ComponentQuery.query('module-goodsrettwork-worker-search')[0].getForm().reset();

		editor.down('[name=drtr_idcd]').setValue(_global.login_id);
		editor.down('[name=drtr_name]').setValue(_global.login_nm);
		editor.down('[name=invc_date]').setValue(Ext.Date.format(new Date(), 'Y-m-d'));

		if(tindex == 0){
			master.select({
				callback:function(records, operation, success) {
					if (success) {
						master.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}else if(tindex == 2){
		}
	},


	deleteAction : function() {
		var me = this,
			lister = me.pocket.listermaster(),
			store = lister.getStore(),
			records = lister.getSelectionModel().getSelection()
		;
		console.log(records[0].get('invc_numb'));
		console.log(records[0].get('lott_numb'));

		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/stock/goodsrettwork/set/deleteMaster.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb		: records[0].get('invc_numb'),
							line_seqn		: 1,
							lott_numb		: records[0].get('lott_numb')
						})
					},
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						lister.getStore().reload();
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
						mask.hide();
						me.pocket.listermaster().getStore().loadData([],false);
					}
				});
			}
		});
	},

	isosAction:function(){
		var me = this,
			detail  = me.pocket.listerdetail(),
			select  = detail.getSelectionModel().getSelection()[0],
			records = detail.getSelectionModel().getSelection()
			msg		= "반품처리를 하시겠습니까?";
		;

		if(select){
			if( select.get('rett_proc_dvcd')=="6000") {
				Ext.Msg.alert("알림","폐기취소되어  반품처리를 할 수 없습니다.");
				return;
			}
			if (!Ext.isEmpty(select.get('rett_proc_dvcd'))) {
				msg = "이미 반품처리 완료 된 내역입니다. 반품처리를 하시겠습니까?";
			}
			Ext.Msg.confirm("확인", msg, function(button) {
				if (button == 'yes') {
					resource.loadPopup({
						widget : 'module-goodsrettwork-isos-popup',
						params : select,
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							if	(!result.success ){
								Ext.Msg.error(result.message );
								return;
							} else{
								var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
								mask.show();
								var store = detail.getStore();
								detail.getStore().sync({
									success : function(operation){ me.selectAction();},
									failure : function(operation){ },
									callback: function(operation){
										mask.hide();
									}
								});
							}
						},
						failure : function(result, request) {
							Ext.Msg.error(result.mesage);
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							mask.hide();
						}
					});
				}
			});
		}else{
			Ext.Msg.alert('알림','반품목록을 선택해주세요.')
		}
	},



	// 엑셀
	exportAction : function(self) {
		this.pocket.listermaster().writer({enableLoadMask:true});
	},
	exportDetailAction : function(self) {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	},
});