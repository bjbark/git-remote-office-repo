
Ext.define('module.workshop.print.basic.menumast.MenuMast', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.cust.CustPopup',
		'lookup.popup.view.VendPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ShetPopup',
		'lookup.popup.view.ItemClassPopup',
		'lookup.upload.BoardUpload',
		'lookup.popup.view.ItemPopup'
	],

	models:[
		'module.workshop.print.basic.menumast.model.MenuMastInvoice',
		'module.workshop.print.basic.menumast.model.MenuMastMaster',
		'module.workshop.print.basic.menumast.model.MenuMastDetail',
		'module.workshop.print.basic.menumast.model.MenuMastImage',
		'module.workshop.print.basic.menumast.model.MenuMastFilePopup',
	],
	stores:[
		'module.workshop.print.basic.menumast.store.MenuMastInvoice',
		'module.workshop.print.basic.menumast.store.MenuMastMaster',
		'module.workshop.print.basic.menumast.store.MenuMastDetail',
		'module.workshop.print.basic.menumast.store.MenuMastImage',
		'module.workshop.print.basic.menumast.store.MenuMastFilePopup',
	],
	views : [
		'module.workshop.print.basic.menumast.view.MenuMastLayout',
		/* 현황 */
		'module.workshop.print.basic.menumast.view.MenuMastSearch',
		'module.workshop.print.basic.menumast.view.MenuMastListerMaster',
		'module.workshop.print.basic.menumast.view.MenuMastListerDetail',
		'module.workshop.print.basic.menumast.view.MenuMastListerImage',
		'module.workshop.print.basic.menumast.view.MenuMastFilePopup',
		/* 작업 */
		'module.workshop.print.basic.menumast.view.MenuMastWorkerEditor',
		'module.workshop.print.basic.menumast.view.MenuMastWorkerSearch',
		'module.workshop.print.basic.menumast.view.MenuMastWorkerLister'

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-workshop-menu-lister-master button[action=etcPrintAction]'),  Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-workshop-menu-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */

			'module-workshop-menu-lister-master menuitem[action=closeAction]'			: { click : me.closeAction        }, /* 마감 */
			'module-workshop-menu-lister-master menuitem[action=closecancleAction]'		: { click : me.closecancleAction  }, /* 마감해지 */

			'module-workshop-menu-lister-master button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-workshop-menu-lister-master button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-workshop-menu-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
			'module-workshop-menu-lister-master button[action=fileAction]'				: { click : me.fileAction         }, /* 메인이미지 업로드 */
			'module-workshop-menu-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */

			'module-workshop-menu-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
			'module-workshop-menu-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */
			'module-workshop-menu-lister-master' : {
				selectionchange    : me.selectDetail,
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-workshop-menu-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-workshop-menu-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-workshop-menu-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-workshop-menu-worker-lister')[0] }
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-workshop-menu-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-workshop-menu-lister-detail')[0] },
			image   : function () { return Ext.ComponentQuery.query('module-workshop-menu-lister-image')[0] }
		}
	},

	selectAction:function(callbackFn) {
		var me = this,
			editor = this.pocket.worker.editor()
		;

		var me = this,
			lister = me.pocket.lister.master()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		lister.select({
			 callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true); }
				mask.hide();
			}, scope:me
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
	},

	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.lister.detail()
			image  = me.pocket.lister.image()
		;
		if (record[0]) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
			}, { invc_numb : record[0].get('invc_numb') });
			image.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record[0].get('invc_numb'),orgn_dvcd : 'disp_gods_mast',line_seqn: '0' });
		}
	},
	modifyAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister()
		;

		var err_msg = "";
		if (select){
			if (select.get("line_clos") == "1") {
				err_msg = "입고가 마감되어 수정할 수 없습니다.";
			}

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}

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
	insertAction:function() {
		var me		= this,
			editor	= me.pocket.worker.editor(),
			lister	= me.pocket.worker.lister(),
			parent
		;
		editor.getStore().clearData();
		editor.getStore().loadData([],false);
		editor.getForm().reset();
		lister.getStore().clearData();
		lister.getStore().loadData([],false);

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url			: _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'menu_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						action	: 'invoice',
						caller	: me,
						record	: Ext.create( me.models[0] ,{
							invc_numb		: keygen.records[0].seq,
							esti_typl_yorn	: '0'
						}),
						lister		: me.pocket.worker.lister(),
						callback	: function (results){
							if  (results.success){
								me.pocket.layout().getLayout().setActiveItem(1);
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
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail()
		;

		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record ) {
				if (results.success) {
					var info	= record,
						dirty	= false
					;
					info.product().data.each( function( item ) {
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
								ms = Ext.create( master.getStore().model.modelName , record.data );
								master.getStore().insert(0, ms);
							} else {
								ms = master.getStore().findRecord('invc_numb', record.get('invc_numb'));
								Ext.iterate(ms.data, function (key, value) {
									ms.set( key, record.get(key));
								});
							}

							detail.getStore().loadData(record.product().data.items, false);
							master.getSelectionModel().select(ms);
							master.getStore().commitChanges();

							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });
						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
				editor.getForm().reset();
			}
		});
	},
	cancelAction:function() {
		var me = this,
			editor = me.pocket.worker.editor()
		;
		editor.cancelRecord({
			action		: 'invoice',
			caller		: me,
			callback	: function( results ) {
				if (results.success){
					me.pocket.layout().getLayout().setActiveItem(0);
					results.feedback( {success : true});
				}
			}
		});
	},

	deleteAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			store  = master.getStore(),
			detail = me.pocket.lister.detail(),
			store2 = detail.getStore()
		;

		var err_msg = "";
		var records = master.getSelectionModel().getSelection();

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
			return;
		}
		store.remove(records);
		store.sync();
		store2.reload();

	},
	fileAction:function(){
		var me = this;

		resource.loadPopup({
			select	: 'SINGLE',
			widget	: 'module-workshop-menu-filepopup',
			params : { stor_grp : _global.stor_grp , invc_numb : 'main',line_seqn:0, orgn_dvcd : 'main'},
			result	: function(records) {
			},
		})
	},
	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},

	exportDetailAction : function(self) {
		this.pocket.lister.detail().writer({enableLoadMask:true});
	},


});
