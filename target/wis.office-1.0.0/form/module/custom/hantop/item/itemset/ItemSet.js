Ext.define('module.custom.hantop.item.itemset.ItemSet', { extend:'Axt.app.Controller',

	requires:[
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.UnitPopup',
	],

	models	: [
		'module.custom.hantop.item.itemset.model.ItemSet',
		'module.custom.hantop.item.itemset.model.ItemSetDetail1',
		'module.custom.hantop.item.itemset.model.ItemSetDetail2',
		'module.custom.hantop.item.itemset.model.ItemSetDetail3',
		'module.custom.hantop.item.itemset.model.ItemSetDetail4',
		'module.custom.hantop.item.itemset.model.ItemSetDetail5'
	],
	stores	: [
		'module.custom.hantop.item.itemset.store.ItemSet',
		'module.custom.hantop.item.itemset.store.ItemSetDetail1',
		'module.custom.hantop.item.itemset.store.ItemSetDetail2',
		'module.custom.hantop.item.itemset.store.ItemSetDetail3',
		'module.custom.hantop.item.itemset.store.ItemSetDetail4',
		'module.custom.hantop.item.itemset.store.ItemSetDetail5'
	],
	views	: [
		'module.custom.hantop.item.itemset.view.ItemSetLayout',
		'module.custom.hantop.item.itemset.view.ItemSetSearch',
		'module.custom.hantop.item.itemset.view.ItemSetLister',
		'module.custom.hantop.item.itemset.view.ItemSetEditor',
		'module.custom.hantop.item.itemset.view.ItemSetDetail1',
		'module.custom.hantop.item.itemset.view.ItemSetDetail2',
		'module.custom.hantop.item.itemset.view.ItemSetDetail3',
		'module.custom.hantop.item.itemset.view.ItemSetDetail4',
		'module.custom.hantop.item.itemset.view.ItemSetDetail5',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-itemset-layout button[action=selectAction]'		: { click : me.selectAction },	// 조회
			'module-itemset-layout #detail'							: { tabchange : me.selectDetail },

			// lister event
			'module-itemset-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-itemset-lister button[action=modifyAction]' : { click : me.modifyAction },	//수정
			'module-itemset-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-itemset-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제

			// editer event
			'module-itemset-editor button[action=updateAction]' 	: { click : me.updateAction },	// 저장
			'module-itemset-editor button[action=cancelAction]' 	: { click : me.cancelAction },	// 취소

			// 행추가 저장
			'module-itemset-detail1 button[action=updateAction]'	: { click : me.updateAction1 },
			'module-itemset-detail2 button[action=updateAction]'	: { click : me.updateAction2 },
			'module-itemset-detail3 button[action=updateAction]'	: { click : me.updateAction3 },
			'module-itemset-detail4 button[action=updateAction]'	: { click : me.updateAction4 },
			'module-itemset-detail5 button[action=updateAction]'	: { click : me.updateAction5 },

			// 행추가 취소
			'module-itemset-detail1 button[action=cancelAction]'	: { click : me.cancelAction2 },
			'module-itemset-detail2 button[action=cancelAction]'	: { click : me.cancelAction2 },
			'module-itemset-detail3 button[action=cancelAction]'	: { click : me.cancelAction2 },
			'module-itemset-detail4 button[action=cancelAction]'	: { click : me.cancelAction2 },
			'module-itemset-detail5 button[action=cancelAction]'	: { click : me.cancelAction2 },

			// lister event
			'module-itemset-lister' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},
			'module-itemset-search combobox[name=acct_dvcd]' : { select: me.selectLookup  }
		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-itemset-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-itemset-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-itemset-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-itemset-lister')[0] },
		listerdetail1 : function () { return Ext.ComponentQuery.query('module-itemset-detail1')[0] },
		listerdetail2 : function () { return Ext.ComponentQuery.query('module-itemset-detail2')[0] },
		listerdetail3 : function () { return Ext.ComponentQuery.query('module-itemset-detail3')[0] },
		listerdetail4 : function () { return Ext.ComponentQuery.query('module-itemset-detail4')[0] },
		listerdetail5 : function () { return Ext.ComponentQuery.query('module-itemset-detail5')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		if(param.acct_dvcd == '' || param.acct_dvcd == null){
			Ext.Msg.alert("알림","계정구분을 선택해주세요.");
			return;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( me.pocket.search().getValues(), {stor_id : _global.stor_id}) );
	},

	selectDetail:function( grid, record ){
		var me = this,
			tpanel = me.pocket.layout().down('#detail'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined,
			listermaster  = me.pocket.lister(),
			listerdetail1 = me.pocket.listerdetail1(),
			listerdetail2 = me.pocket.listerdetail2(),
			listerdetail3 = me.pocket.listerdetail3(),
			listerdetail4 = me.pocket.listerdetail4(),
			listerdetail5 = me.pocket.listerdetail5(),
			record        = listermaster.getSelectionModel().getSelection()[0]
		;
		if(record==null){
		}else{
			if(tindex!=5){
				if(tindex == 0){
					lister = listerdetail1
				}else if(tindex == 1){
					lister = listerdetail2
				}else if(tindex == 2){
					lister = listerdetail3
				}else if(tindex == 3){
					lister = listerdetail4
				}else if(tindex == 4){
					lister = listerdetail5
				}
				lister.select({
					callback : function(records, operation, success) {
							if (success) {
								lister.getSelectionModel().select(0);
							} else {}
						}, scope : me
				}, { item_idcd : record.get('item_idcd') });
			}
		}
	},

	selectLookup:function() {
		var me = this,
		listerdetail1 = me.pocket.listerdetail1(),
		listerdetail2 = me.pocket.listerdetail2(),
		listerdetail3 = me.pocket.listerdetail3(),
		listerdetail4 = me.pocket.listerdetail4(),
		listerdetail5 = me.pocket.listerdetail5()
	;
		this.selectAction();

		listerdetail1.getStore().clearData();
		listerdetail1.getStore().loadData([],false);

		listerdetail2.getStore().clearData();
		listerdetail2.getStore().loadData([],false);

		listerdetail3.getStore().clearData();
		listerdetail3.getStore().loadData([],false);

		listerdetail4.getStore().clearData();
		listerdetail4.getStore().loadData([],false);

		listerdetail5.getStore().clearData();
		listerdetail5.getStore().loadData([],false);

	},

	//선택
	selectRecord:function( grid, record ){
		var me = this,
		editor = me.pocket.editor();
		listerdetail1 = me.pocket.listerdetail1(),
		listerdetail2 = me.pocket.listerdetail2(),
		listerdetail3 = me.pocket.listerdetail3(),
		listerdetail4 = me.pocket.listerdetail4(),
		listerdetail5 = me.pocket.listerdetail5()
		;

		if(record[0]){
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);

			listerdetail1.select({
				callback:function(records, operation, success) {
					if (success) {
						listerdetail1.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( record[0].data, {stor_id : _global.stor_id}) );
			listerdetail2.select({
				callback:function(records, operation, success) {
					if (success) {
						listerdetail2.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( record[0].data, {stor_id : _global.stor_id}) );
			listerdetail3.select({
				callback:function(records, operation, success) {
					if (success) {
						listerdetail3.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( record[0].data, {stor_id : _global.stor_id}) );
			listerdetail4.select({
				callback:function(records, operation, success) {
					if (success) {
						listerdetail4.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( record[0].data, {stor_id : _global.stor_id}) );
			listerdetail5.select({
				callback:function(records, operation, success) {
					if (success) {
						listerdetail5.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( record[0].data, {stor_id : _global.stor_id}) );
		}
	},

	//수정
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.modifyRecord({
			caller   : me,
			action   : Const.EDITOR.DEFAULT ,
			callback : function( results ) {
				if (results.success){
					results.feedback({success : true});
				}
			},
			finished : function(results, record){
				if (results.success){
					editor.expand(false);
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			}
		});
	},

	//신규
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
			editor.insertBefore({
				caller	: me,
				keygen	: {
					url			: _global.location.http() + '/listener/seq/maxid.do',
					object		: resource.keygen,
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm   	: 'wind_item_mast'
						})
					}
				},
				callback : function (keygen){
					if (keygen.success){
						editor.insertRecord({
							caller	: me,
							record	: Ext.create( lister.getStore().model.modelName,{
							}),
							lister	: lister,
							disables: [me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
							callback: function (results){
								if (results.success) {
									results.feedback({success : true , visible : true });
								}
							}
						});
					}
				}
			});
	},

	updateAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			store  = lister.getStore()
		;
		console.log(editor.getValues());
		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			before	: function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('item_name'))) {
						resource.keygen({
							url			: _global. location.http () + '/listener/seq/maxid.do',
							object		: resource. keygen,
							params		: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'wind_item_mast'
								})
							 },
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('item_name' , keygen.records[0].seq );
									results.feedback({success : true  });
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						});
					} else { results.feedback({success : true }); }
				}
			},

			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){ results.feedback({success : true  });},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({});}
					});
				}
			},

			finished : function(results, record, operation){
				if (results.success) {
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.collapse(false);
					switch (operation) {
						case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
					}
				}
			}
		});
	},

	//취소
	cancelAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.cancelRecord({
			caller   : me,

			action   : Const.EDITOR.DEFAULT ,
			callback : function(results, record){
				if (results.success){
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					results.feedback( {success : true , reload : true });
				}
			},
			finished : function(results, record){
				if (results.success){
					editor.collapse(false);
				}
			}
		});
	},

	// 색상별단가 저장
	updateAction1 : function() {
		var	me		= this,
			listerdetail1  = me.pocket.listerdetail1(),
			store    = listerdetail1.getStore(),
			changes  = listerdetail1.getStore().getUpdatedRecords().length,
			change   = listerdetail1.getStore().data.items,
			length   = listerdetail1.getStore().data.items.length,
			remove   = listerdetail1.getStore().removed.length,
			search   = me.pocket.search()
		;

		if(changes == 0 && change.length == 0 && remove==0 ){
			Ext.Msg.alert("알림","변경된 내용이 없습니다.");
		}else {
			if(length >0){
				modify   = change[length-1].get('modify');		//수정유무
			}
			if(change.length != 0 && changes == 0 && remove==0 && modify == '' ){
				Ext.Msg.alert("알림","변경된 내용이 없습니다.");
				return;
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = listerdetail1.getStore();

			listerdetail1.getStore().sync({ // 저장 성공시
				success : function(operation){ Ext.Msg.alert('알림','저장 완료되었습니다.'); },
				failure : function(operation){ Ext.Msg.alert('알림','저장 실패하였습니다.'); },
				callback: function(operation){
					mask.hide();
				}
			}, {synchro : _global.objects.synchro} );
		}listerdetail1.getStore().reload();
	},

	// 권속부자재 저장
	updateAction2 : function() {
		var	me		= this,
			listerdetail2  = me.pocket.listerdetail2(),
			store    = listerdetail2.getStore(),
			changes  = listerdetail2.getStore().getUpdatedRecords().length,
			change   = listerdetail2.getStore().data.items,
			length   = listerdetail2.getStore().data.items.length,
			remove   = listerdetail2.getStore().removed.length,
			search   = me.pocket.search()
		;

		if(changes == 0 && change.length == 0 && remove==0 ){
			Ext.Msg.alert("알림","변경된 내용이 없습니다.");
		}else {
			if(length >0){
				modify   = change[length-1].get('modify');		//수정유무
			}
			if(change.length != 0 && changes == 0 && remove==0 && modify == '' ){
				Ext.Msg.alert("알림","변경된 내용이 없습니다.");
				return;
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = listerdetail2.getStore();

			listerdetail2.getStore().sync({ // 저장 성공시
				success : function(operation){ Ext.Msg.alert('알림','저장 완료되었습니다.'); },
				failure : function(operation){ Ext.Msg.alert('알림','저장 실패하였습니다.'); },
				callback: function(operation){
					mask.hide();
				}
			}, {synchro : _global.objects.synchro} );
		}listerdetail2.getStore().reload();
	},

	// 자재너비변수 저장
	updateAction3 : function() {
		var	me		= this,
			listerdetail3  = me.pocket.listerdetail3(),
			store    = listerdetail3.getStore(),
			changes  = listerdetail3.getStore().getUpdatedRecords().length,
			change   = listerdetail3.getStore().data.items,
			length   = listerdetail3.getStore().data.items.length,
			remove   = listerdetail3.getStore().removed.length,
			search   = me.pocket.search()
		;

		if(changes == 0 && change.length == 0 && remove==0 ){
			Ext.Msg.alert("알림","변경된 내용이 없습니다.");
		}else {
			if(length >0){
				modify   = change[length-1].get('modify');		//수정유무
			}
			if(change.length != 0 && changes == 0 && remove==0 && modify == '' ){
				Ext.Msg.alert("알림","변경된 내용이 없습니다.");
				return;
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = listerdetail3.getStore();

			listerdetail3.getStore().sync({ // 저장 성공시
				success : function(operation){ Ext.Msg.alert('알림','저장 완료되었습니다.'); },
				failure : function(operation){ Ext.Msg.alert('알림','저장 실패하였습니다.'); },
				callback: function(operation){
					mask.hide();
				}
			}, {synchro : _global.objects.synchro} );
		}listerdetail3.getStore().reload();
	},

	// 표준바 저장
	updateAction4 : function() {
		var	me		= this,
			listerdetail4  = me.pocket.listerdetail4(),
			store    = listerdetail4.getStore(),
			changes  = listerdetail4.getStore().getUpdatedRecords().length,
			change   = listerdetail4.getStore().data.items,
			length   = listerdetail4.getStore().data.items.length,
			remove   = listerdetail4.getStore().removed.length,
			search   = me.pocket.search()
		;

		if(changes == 0 && change.length == 0 && remove==0 ){
			Ext.Msg.alert("알림","변경된 내용이 없습니다.");
		}else {
			if(length >0){
				modify   = change[length-1].get('modify');		//수정유무
			}
			if(change.length != 0 && changes == 0 && remove==0 && modify == '' ){
				Ext.Msg.alert("알림","변경된 내용이 없습니다.");
				return;
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = listerdetail4.getStore();

			listerdetail4.getStore().sync({ // 저장 성공시
				success : function(operation){ Ext.Msg.alert('알림','저장 완료되었습니다.'); },
				failure : function(operation){ Ext.Msg.alert('알림','저장 실패하였습니다.'); },
				callback: function(operation){
					mask.hide();
				}
			}, {synchro : _global.objects.synchro} );
		}listerdetail4.getStore().reload();
	},

	// 컨테이너 저장
	updateAction5 : function() {
		var	me		= this,
			listerdetail5  = me.pocket.listerdetail5(),
			store    = listerdetail5.getStore(),
			changes  = listerdetail5.getStore().getUpdatedRecords().length,
			change   = listerdetail5.getStore().data.items,
			length   = listerdetail5.getStore().data.items.length,
			remove   = listerdetail5.getStore().removed.length,
			search   = me.pocket.search()
		;

		if(changes == 0 && change.length == 0 && remove==0 ){
			Ext.Msg.alert("알림","변경된 내용이 없습니다.");
		}else {
			if(length >0){
				modify   = change[length-1].get('modify');		//수정유무
			}
			if(change.length != 0 && changes == 0 && remove==0 && modify == '' ){
				Ext.Msg.alert("알림","변경된 내용이 없습니다.");
				return;
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = listerdetail5.getStore();

			listerdetail5.getStore().sync({ // 저장 성공시
				success : function(operation){ Ext.Msg.alert('알림','저장 완료되었습니다.'); },
				failure : function(operation){ Ext.Msg.alert('알림','저장 실패하였습니다.'); },
				callback: function(operation){
					mask.hide();
				}
			}, {synchro : _global.objects.synchro} );
		}listerdetail5.getStore().reload();
	},

	cancelAction2 : function() {
		var	me = this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister
		;
		if(tindex == 0){
			lister = me.pocket.lister();
		}else if(tindex == 1){
			lister = me.pocket.listerdetail1();
		}else if(tindex == 2){
			lister = me.pocket.listerdetail2();
		}else if(tindex == 3){
			lister = me.pocket.listerdetail3();
		}else if(tindex == 4){
			lister = me.pocket.listerdetail4();
		}else if(tindex == 5){
			lister = me.pocket.listerdetail5();
		}
		lister.getStore().reload();
	},

	//삭제
	deleteAction:function() {
		var me = this,
		editor = me.pocket.editor();
		editor.deleteRecord({
			lister	: me.pocket.lister(),
			callback: function(results, record, store) {
				store.sync({																					// 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });},		// 저장 성공시
					failure : function(operation){ results.feedback({success : false }); },						// 저장 실패시 호출
					callback: function(operation){ results.callback({}); }										// 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});