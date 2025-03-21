Ext.define( 'module.custom.komec.item.bommast.BomMast', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.ItemPopupSjung',
		'lookup.popup.view.WkctPopup',
	],
	models: [
		'module.custom.komec.item.bommast.model.BomMastLister1',
		'module.custom.komec.item.bommast.model.BomMastLister2',
		'module.custom.komec.item.bommast.model.BomMastLister3',
	],
	stores: [
		'module.custom.komec.item.bommast.store.BomMastLister1',
		'module.custom.komec.item.bommast.store.BomMastLister2',
		'module.custom.komec.item.bommast.store.BomMastLister3',
	],
	views : [
		'module.custom.komec.item.bommast.view.BomMastLayout',
		'module.custom.komec.item.bommast.view.BomMastLister1',
		'module.custom.komec.item.bommast.view.BomMastLister2',
		'module.custom.komec.item.bommast.view.BomMastLister3',
		'module.custom.komec.item.bommast.view.BomMastPopup',
		'module.custom.komec.item.bommast.view.BomMastCopyPopup',
		'module.custom.komec.item.bommast.view.BomMastExcelPopup',
		'module.custom.komec.item.bommast.view.BomMastSearch'
	],
	initPermission: function(workspace, permission) {

	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-komec-bommast-search button[action=selectAction]'			: { click : me.selectAction }, // 조회
			// lister event
			'module-komec-bommast-lister1 button[action=excelAction]'		: { click : me.excelAction }, // 신규

			'module-komec-bommast-lister2 button[action=revInsertAction]'		: { click : me.revAction }, // 신규
			'module-komec-bommast-lister2 button[action=revDeleteAction]'		: { click : me.revAction }, // 삭제
			'module-komec-bommast-lister2 button[action=revUpdateAction]'		: { click : me.revUpdateAction }, // 리비전 저장

			'module-komec-bommast-lister3 button[action=copyAction]'		: { click : me.copyAction        }, // 배합표복사
			'module-komec-bommast-lister3 button[action=updateAction]'		: { click : me.updateAction      }, // 저장
			'module-komec-bommast-lister3 button[action=updownAction]'		: { click : me.updownAction      }, // 위아래
			'module-komec-bommast-lister3 button[action=exportAction]'		: { click : me.exportAction      }, // 엑셀
			// lister event
			'module-komec-bommast-lister1' : {
				itemclick      : me.selectAction1
			},
			'module-komec-bommast-lister2' : {
				itemclick      : me.selectAction2
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-komec-bommast-layout')[0]  } ,
		search  : function () { return Ext.ComponentQuery.query('module-komec-bommast-search')[0]  } ,
		lister1 : function () { return Ext.ComponentQuery.query('module-komec-bommast-lister1')[0] } ,
		lister2 : function () { return Ext.ComponentQuery.query('module-komec-bommast-lister2')[0] } ,
		lister3 : function () { return Ext.ComponentQuery.query('module-komec-bommast-lister3')[0] } ,
	},
	/**
	 * 조회
	 */
	selectAction:function() {
		var me = this,
			lister  = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3()
		;

		resource.mask.show({msg: Const.SELECT.mask });
		lister2.getStore().clearData();
		lister2.getStore().removeAll();
		lister3.getStore().clearData();
		lister3.getStore().removeAll();
		lister.select({
			callback:function(records, operation, success) {
				resource.mask.hide();
			}, scope:me
		},Ext.merge( me.pocket.search().getValues(), {
			hq_id  : _global.hq_id,
		}));
	},

	/**
	 *
	 */
	selectAction1:function( grid, record, item, index, e ){
		var me = this,
			lister = me.pocket.lister2(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3()
		;
		lister3.getStore().clearData();
		lister3.getStore().removeAll();

		if (record){
			if('1001' == record.get('acct_bacd') || '2003' == record.get('acct_bacd')) {
				if((lister2.down('[name=revs_dvcd]').getValue()) == '1') {
					lister2.down('[name=revs_dvcd]').setValue('2');
					return;
				}
			}

			resource.mask.show({msg: Const.SELECT.mask });
			lister.select({
				callback:function(records, operation, success) {
					resource.mask.hide();
				}, scope:me
			},Ext.merge( me.pocket.search().getValues(), {
				hq_id		: _global.hq_id,
				item_idcd	: record.get('item_idcd') ,
				revs_dvcd	: lister2.down('[name=revs_dvcd]').getValue(),
			}));
		}
	},

	/**
	 *
	 */
	selectAction2:function( grid, record, item, index, e ){
		var me = this,
			lister = me.pocket.lister3()
		;
		if (record ){
			resource.mask.show({msg: Const.SELECT.mask });
			lister.select({
				callback:function(records, operation, success) {
					resource.mask.hide();
				}, scope:me
			},Ext.merge( me.pocket.search().getValues(),{
				hq_id		: _global.hq_id,
				prnt_item_idcd	: record.get('prnt_item_idcd') ,
				revs_numb	: record.get('revs_numb') ,
				revs_dvcd	: record.get('revs_dvcd') ,
				prnt_idcd	: record.get('prnt_idcd')
			}));
		}
	},
	/**
	 * 저장
	 */
	updateAction:function() {
		var me        = this,
			lister2   = me.pocket.lister2(),
			lister3   = me.pocket.lister3(),
			revsStore = lister2.getStore(),
			store     = lister3.getStore()
		;
		if(store.getAt(0)){
			var i = store.getAt(0).get('revs_numb');
		}
		store.sync({
			success : function(operation){
				revsStore.reload({
					callback:function(){
						lister2.getSelectionModel().select(i-1);
						var select = lister2.getSelectionModel().getSelection()[0];
						if(select){
							lister3.select({
								callback:function(records, operation, success) {
									resource.mask.hide();
								}, scope:me
							},Ext.merge( me.pocket.search().getValues(),{
								hq_id		: _global.hq_id,
								prnt_item_idcd	: select.get('prnt_item_idcd') ,
								revs_numb	: select.get('revs_numb') ,
								revs_dvcd	: select.get('revs_dvcd') ,
							}));
						}
					}
				});
			},
			failure : function(operation){ },
			callback: function(operation){ }
		}, {synchro : _global.objects.synchro} );
	},

	revAction:function(cont){
		var	me     = this,
			lister = me.pocket.lister2(),
			store  = lister.getStore(),
			master = me.pocket.lister1(),
			select = master.getSelectionModel().getSelection()[0],
			records = lister.getSelectionModel().getSelection()[0],
			set    = cont.itemId
		;
		if(select){
			var i = 0;
			if(set == 'insert'){
				var max = 0;
				store.each(function(rec){
					if(max < rec.get('revs_numb')){
						max = rec.get('revs_numb');
					}
				})
				max++;
				resource.loadPopup({
					widget : 'module-komec-bommast-popup',
					param : {
						revs_numb : max,
						item_idcd : select.get('item_idcd'),
						revs_dvcd : lister.down('[name=revs_dvcd]').getValue()
					},
				});
			}else if(set == 'delete'){
				if(records){
					Ext.Msg.show({ title: '확인', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
						fn : function (button) {
							if (button==='yes') {
								Ext.Ajax.request({
									url		: _global.location.http() + '/custom/komec/item/bommast/set/recordRevs.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											prnt_item_idcd	: select.get('item_idcd'),
											revs_numb		: records.get('revs_numb'),
											revs_dvcd		: lister.down('[name=revs_dvcd]').getValue(),
											_set			: set,
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
											me.pocket.lister3().getStore().clearData();
											me.pocket.lister3().getStore().removeAll();

											store.reload();
										}
									},
									failure : function(result, request) {
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});
							}
						}
					});
				}
			}
		}else{
			Ext.Msg.alert('알림','제품을 선택 후 진행해주세요.');
		}
	},

	revUpdateAction:function() {
		var me        = this,
			lister2   = me.pocket.lister2(),
			lister3   = me.pocket.lister3(),
			revsStore = lister2.getStore(),
			store     = lister3.getStore()
		;
		var select = lister2.getSelectionModel().getSelection()[0];
		if (select){
			var i = select.get('revs_numb')
		}

		revsStore.sync({
			success : function(operation){
				revsStore.reload({
					callback:function(){
						lister2.getSelectionModel().select(i-1);
						var select = lister2.getSelectionModel().getSelection()[0];
						if (select) {
							lister3.select({
								callback:function(records, operation, success) {
									resource.mask.hide();
								}, scope:me
							},Ext.merge( me.pocket.search().getValues(),{
								hq_id			: _global.hq_id,
								prnt_item_idcd	: select.get('prnt_item_idcd') ,
								revs_numb		: select.get('revs_numb') ,
								revs_dvcd		: select.get('revs_dvcd') ,
							}));
						}
					}
				});
			},
			failure : function(operation){ },
			callback: function(operation){ }
		}, {synchro : _global.objects.synchro} );
	},

	updownAction : function(cont){
		var	me     = this,
			master = me.pocket.lister1(),
			lister = me.pocket.lister3(),
			max    = 0,
			store  = lister.getStore(),
			select = lister.getSelectionModel().getSelection()[0],
			selectMaster = master.getSelectionModel().getSelection()[0],
			id,dvcd
		;
		id = cont.itemId;
		if(select){
			if(id == 'upBom'){
				if(select.get('line_seqn')==1){
					return;
				}
				dvcd = 1;
			}else if (id == 'downBom'){
				max = store.getAt(store.data.length-1).get('line_seqn');
				if(select.get('line_seqn')>=max){
					return;
				}
				dvcd = 0;
			}
			if(store.getAt(store.data.length-1).raw.chk=='Y'){
				Ext.Msg.alert('알림','저장 후 수정가능합니다.');
			}else{
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
				mask.show();
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/sjflv/item/bommast/set/updown.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							stor_id		: _global.stor_id,
							item_idcd	: selectMaster.get('item_idcd'),
							line_seqn	: select.get('line_seqn'),
							revs_numb	: select.get('revs_numb'),
							revs_dvcd	: select.get('revs_dvcd'),
							dvcd		: dvcd
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
							store.reload({
								callback:function(){
									var index = 0;
									if(dvcd == 0 ){
										index = (select.get('line_seqn')-1)+1;
									}else{
										index = (select.get('line_seqn')-1)-1;
									}
									lister.getSelectionModel().select(index);
								}
							});
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						mask.hide();
					}
				});
			}
		}
	},
	copyAction:function(){
		var	me      = this,
			lister  = me.pocket.lister2(),
			store   = lister.getStore(),
			master  = me.pocket.lister1(),
			select  = master.getSelectionModel().getSelection()[0],
			records = lister.getSelectionModel().getSelection()[0],
			values  = me.pocket.search().getValues()
		;
		if(select){
			resource.loadPopup({
				widget : 'module-sjflv-bommast-copy-popup',
				param : {
					item_idcd : select.get('item_idcd'),
					revs_dvcd : lister.down('[name=revs_dvcd]').getValue(),
					acct_bacd : (lister.down('[name=revs_dvcd]').getValue() == 1) ? "생산품" : "품목보고서"
				},
			});
		}else{
			Ext.Msg.alert('알림','제품을 선택 후 진행해주세요.');
		}
	},
	excelAction:function(){
		var me		= this
		;
		resource.loadPopup({
			widget : 'module-sjflv-bommast-excel-popup',
			sample : {
				xtype	: 'button' ,
				text	: '엑셀양식 받기' ,
				iconCls	: Const.FINISH.icon ,
				handler:function(){
					window.open('/resource/sample/삼정_BOM_업로드양식(최종).xlsx','download');
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
	exportAction : function(){
		var me = this;
		me.pocket.lister3().excelExport();

	}
});
