Ext.define('module.cust.oembmast.OembMast', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
	],
	models	: [
		'module.cust.oembmast.model.OembMast',
		'module.cust.oembmast.model.OembMastItem1',
		'module.cust.oembmast.model.OembMastItem2'
	],
	stores	: [
		'module.cust.oembmast.store.OembMast',
		'module.cust.oembmast.store.OembMastItem1',
		'module.cust.oembmast.store.OembMastItem2'
	],
	views	: [
		'module.cust.oembmast.view.OembMastLayout',
		'module.cust.oembmast.view.OembMastSearch',
		'module.cust.oembmast.view.OembMastLister',
		'module.cust.oembmast.view.OembMastListerItem1',
		'module.cust.oembmast.view.OembMastListerItem2',
		'module.cust.oembmast.view.OembMastEditor'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-oembmast-layout button[action=selectAction]'	: { click : me.selectAction },	//조회
			'module-oembmast-layout button[action=enrollment]'		: { click : me.enrollment },	//1건등록(<)
			'module-oembmast-layout button[action=enrollmentAll]'	: { click : me.enrollmentAll },	//All등록(<<)
			'module-oembmast-layout button[action=remove]'			: { click : me.remove },		//1건삭제(>)
			'module-oembmast-layout button[action=removeAll]'		: { click : me.removeAll },		//All삭제(>>)

			'module-oembmast-lister button[action=insertAction]'	: { click : me.insertAction },	//신규
			'module-oembmast-editor button[action=updateAction]'	: { click : me.updateAction },	//저장
			'module-oembmast-editor button[action=cancelAction]'	: { click : me.cancelAction },	//취소
			'module-oembmast-lister button[action=modifyAction]'	: { click : me.modifyAction },	//수정
			'module-oembmast-lister button[action=deleteAction]'	: { click : me.deleteAction },	//삭제
			'module-oembmast-lister button[action=exportAction]'	: { click : me.exportAction },	//엑셀

			'module-oembmast-lister'	: { selectionchange: me.selectRecord }
		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-oembmast-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-oembmast-search')[0] },
		lister		: function () { return Ext.ComponentQuery.query('module-oembmast-lister')[0] },
		listeritem1	: function () { return Ext.ComponentQuery.query('module-oembmast-lister-item1')[0] },
		listeritem2	: function () { return Ext.ComponentQuery.query('module-oembmast-lister-item2')[0] },
		editor 		: function () { return Ext.ComponentQuery.query('module-oembmast-editor')[0] },
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			listeritem1 = me.pocket.listeritem1(),
			//listeritem2 = me.pocket.listeritem2(),
			search = me.pocket.search(),
			param = search.getValues()
			//tpanel = me.pocket.layout().down('#mainpanel'),
			//tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		lister.select({
			 callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else {
				}
				mask.hide();
			}, scope:me
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp}));
	},

	//선택
	selectRecord : function(grid, record) {
		var me = this,
			listeritem1 = me.pocket.listeritem1(),
			listeritem2 = me.pocket.listeritem2(),
			editor = me.pocket.editor()
		;
		//debugger;
		if (record.length > 0) {
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();

			listeritem1.select({
				 callback:function(records, operation, success) {
					mask.hide();
				}, scope:me
			}, Ext.merge({ stor_grp : _global.stor_grp, oemb_idcd : record[0].data.oemb_idcd}));

			listeritem2.select({
				 callback:function(records, operation, success) {
					mask.hide();
				}, scope:me
			}, Ext.merge({ stor_grp : _global.stor_grp, oemb_idcd : record[0].data.oemb_idcd}));
		}
	},

	//거래처 건별  추가
	enrollment:function() {
		var me			= this,
			record		= new Array(),
			ordr		= Number(1),
			master		= me.pocket.lister(),
			mrecords	= master.getSelectionModel().getSelection(),
			mrecord		= mrecords[0],
			listeritem1 = me.pocket.listeritem1(),
			listeritem2 = me.pocket.listeritem2(),
			store1		= listeritem1.getStore(),
			store2		= listeritem2.getStore(),
			selects		= listeritem2.getSelectionModel().getSelection()
		;

		if(store2.data.items.length == 0 || !selects || selects.length == 0) {
			return;
		};

		var i = 0;
		for( i = 0; i<selects.length; i++){
		record[i] = Ext.create( store1.model.modelName , {
			_set			: 'insert',
			oemb_idcd		: mrecord.get('oemb_idcd'),
			oemb_name		: mrecord.get('oemb_name'),
			cstm_idcd		: selects[i].get('cstm_idcd'),
			cstm_code		: selects[i].get('cstm_code'),
			cstm_name		: selects[i].get('cstm_name'),
			});
		}
		store1.add(record);
		store1.sync({
			callback: function(batch, options) {
				listeritem1.select({
					callback:function(records, operation, success) {
						if (success) {
							//listeritem1.getSelectionModel().select(0);
						} else {
						}
					}, scope:me
				}, Ext.merge({ stor_grp : _global.stor_grp, oemb_idcd : mrecord.get("oemb_idcd")}));
				store2.reload();
			} ,
			scope: me
		},{	synchro : _global.objects.synchro} );
	},

	//거래처  All 추가
	enrollmentAll:function() {
		var me			= this,
			record		= new Array(),
			ordr		= Number(1),
			master		= me.pocket.lister(),
			mrecords	= master.getSelectionModel().getSelection(),
			mrecord		= mrecords[0],
			listeritem1 = me.pocket.listeritem1(),
			listeritem2 = me.pocket.listeritem2(),
			store1		= listeritem1.getStore(),
			store2		= listeritem2.getStore(),
			selects		= listeritem2.getSelectionModel().getSelection()
		;

		if(store2.data.items.length == 0){
			return;
		};

		var i = 0;
		for( i = 0; i < store2.data.items.length; i++){
		record[i] = Ext.create( store1.model.modelName , {
			_set			: 'insert',
			oemb_idcd		: mrecord.get('oemb_idcd'),
			oemb_name		: mrecord.get('oemb_name'),
			cstm_idcd		: store2.data.items[i].get('cstm_idcd'),
			cstm_code		: store2.data.items[i].get('cstm_code'),
			cstm_name		: store2.data.items[i].get('cstm_name'),
			});
		}
		store1.add(record);
		store1.sync({
			callback: function(batch, options) {
				listeritem1.select({
					callback:function(records, operation, success) {
						if (success) {
							//listeritem1.getSelectionModel().select(0);
						} else {
						}
					}, scope:me
				}, Ext.merge({ stor_grp : _global.stor_grp, oemb_idcd : mrecord.get("oemb_idcd")}));
				store2.reload();
			} ,
			scope: me
		},{	synchro : _global.objects.synchro} );
	},

	//거래처 건별 삭제
	remove : function() {
		var me = this,
			listeritem1 = me.pocket.listeritem1(),
			listeritem2 = me.pocket.listeritem2(),
			store1		= listeritem1.getStore(),
			store2		= listeritem2.getStore(),
			selects		= listeritem1.getSelectionModel().getSelection()
		;

		if(store1.data.items.length == 0 || !selects || selects.length == 0) {
			return;
		}

		store1.remove(selects);
		store1.sync({
			callback : function() {
				store2.reload();
			}
		});
	},

	//거래처 All 삭제
	removeAll : function() {
		var me = this,
			record		= new Array(),
			master		= me.pocket.lister(),
			mrecords	= master.getSelectionModel().getSelection(),
			mrecord		= mrecords[0],
			listeritem1 = me.pocket.listeritem1(),
			listeritem2 = me.pocket.listeritem2(),
			store1		= listeritem1.getStore(),
			store2		= listeritem2.getStore()
		;

		if(store1.data.items.length == 0){
			return;
		};

		for( i = 0; i < store1.data.items.length; i++){
			record[i] = store1.data.items[i];
		};

		store1.remove(record);
		store1.sync({
			callback: function(batch, options) {
				listeritem1.select({
					callback:function(records, operation, success) {
						if (success) {
							//listeritem1.getSelectionModel().select(0);
						} else {
						}
					}, scope:me
				}, Ext.merge({ stor_grp : _global.stor_grp, oemb_idcd : mrecord.get("oemb_idcd")}));
				store2.reload();
			} ,
			scope: me
		},{	synchro : _global.objects.synchro} );
	},

	//추가
	insertAction:function() {
		var me = this,
			lister	= me.pocket.lister(),
			editor	= me.pocket.editor()
		;
		editor.insertRecord({
			caller	: me,
			record	: Ext.create( lister.getStore().model.modelName,{
			}),
			disables: [me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
			callback: function (results){
				if (results.success) {
					results.feedback({success : true , visible : true });
				}
			}
		});
	},

	//저장
	updateAction:function(a) {
		var me = this,
			lister	= me.pocket.lister(),
			editor	= me.pocket.editor(),
			store	= lister.getStore(),
			param	= editor.getValues()
		;
		if(param.oemb_idcd == ''|| param.oemb_idcd == null){
			Ext.Msg.alert("알림","코드를 입력하여 주십시오.");
			return;
		}

		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,

			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){ results.feedback({success : true  });},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({
						}); }
					} );
				}
			},

			finished : function(results, record, operation){
				if (results.success){
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
		var me = this,
			editor = me.pocket.editor()
		;
		editor.cancelRecord({
			caller : me,
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : false});
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
	},

	//수정
	modifyAction:function() {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection()[0],
			editor = me.pocket.editor()
		;
		if(!select){
			Ext.Msg.alert("알림","수정할 데이터를 선택하여주십시오.");
			return;
		}

		editor.modifyRecord({
			caller	: me,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true });
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			}
		});
	},

	//삭제
	deleteAction:function() {
		var me = this,
			editor = me.pocket.editor();

		editor.deleteRecord({
			lister		: me.pocket.lister(),
			callback	: function(results, record, store) {
				store.sync({
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});