Ext.define( 'module.custom.sjflv.haccp.docmmast.DocmMast', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopupSjung',
		'lookup.upload.FileUpload'
	],
	models: [
		'module.custom.sjflv.haccp.docmmast.model.DocmMastModel1',
		'module.custom.sjflv.haccp.docmmast.model.DocmDetailModel1',
		'module.custom.sjflv.haccp.docmmast.model.DocmMastInvoiceModel',
	],
	stores: [
		'module.custom.sjflv.haccp.docmmast.store.DocmMastStore1',
		'module.custom.sjflv.haccp.docmmast.store.DocmDetailStore1',
		'module.custom.sjflv.haccp.docmmast.store.DocmMastInvoiceStore'
	],
	views : [
		'module.custom.sjflv.haccp.docmmast.view.DocmMastLayout',
		'module.custom.sjflv.haccp.docmmast.view.DocmMastSearch',
		'module.custom.sjflv.haccp.docmmast.view.DocmMastSearch2',
		'module.custom.sjflv.haccp.docmmast.view.DocmMastEditor',
		'module.custom.sjflv.haccp.docmmast.view.DocmMastLister1',
		'module.custom.sjflv.haccp.docmmast.view.DocmMastLister2',
		'module.custom.sjflv.haccp.docmmast.view.DocmMastLister3',
		'module.custom.sjflv.haccp.docmmast.view.DocmMastPopup1',
	],
	
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	
	init: function() {
		var me = this;
		me.control({
			'module-sjflv-docmmast-search button[action=selectAction]'		: { click : me.selectAction }, /* 조회 */
			/* HACCP양식 목록 */
			'module-sjflv-docmmast-lister1'									: { itemclick: me.selectAction2 }, /* Detail 조회 */
			'module-sjflv-docmmast-lister1 button[action=insertAction]'		: { click : me.insertAction }, /* 추가 */
			'module-sjflv-docmmast-lister1 button[action=modifyAction]'		: { click : me.modifyAction }, /* 수정 */
			/* HACCP양식 등록 */
			'module-sjflv-docmmast-lister3 button[action=updateAction]'		: { click : me.updateAction }, /* 저장 */
			'module-sjflv-docmmast-lister3 button[action=cancelAction]'		: { click : me.cancelAction }, /* 취소 */
		});
		me.callParent(arguments);
	},
	
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-sjflv-docmmast-layout'		)[0] } ,
		search	: function () { return Ext.ComponentQuery.query('module-sjflv-docmmast-search'		)[0] } ,
		search2	: function () { return Ext.ComponentQuery.query('module-sjflv-docmmast-search2'		)[0] } ,
		editor	: function () { return Ext.ComponentQuery.query('module-sjflv-docmmast-editor'		)[0] } ,
		lister1	: function () { return Ext.ComponentQuery.query('module-sjflv-docmmast-lister1'		)[0] } ,
		lister2	: function () { return Ext.ComponentQuery.query('module-sjflv-docmmast-lister2'		)[0] } ,
		lister3	: function () { return Ext.ComponentQuery.query('module-sjflv-docmmast-lister3'		)[0] } ,
	},
	
	selectAction: function() {
		var me = this,
			lister = me.pocket.lister1(),
			param = me.pocket.search().getValues();
			
		lister.select({
			callback: function(records, operation, success) {
				if (success) {
					
				} else {
					
				}
			},
			scope: me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},
	
	selectAction2: function(self, record, item, index, e, eOpts) {
		var me = this,
			lister = me.pocket.lister2();
		
		lister.select({
			callback: function(records, operation, success) {
				if (success) {
					
				} else {
					
				}
			},
			scope: me
		}, {stor_id: _global.stor_id, mngt_numb: record.get('mngt_numb')} );
	},
	
	insertAction: function() {
		var me = this,
			editor = me.pocket.editor();
		
		editor.insertBefore({
			caller	: me,
			keygen	: {
				url			: _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'haccp_docm_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						action	: 'invoice',
						caller	: me,
						record	: Ext.create( me.models[2] ,{
							mngt_numb	: keygen.records[0].seq
						}),
						lister	: me.pocket.lister3(),
						callback	: function (results){
							if  (results.success){
								me.tabChange(1);
								results.feedback({success : true , visible : true });
							}
						}
					});
				}
			}
		});
	},
	
	modifyAction:function() {
		var me = this,
			selection = me.pocket.lister1().getSelectionModel().getSelection()[0],
			editor = me.pocket.editor(),
			lister = me.pocket.lister3();

		if (selection) {
			editor.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {param:JSON.stringify({ mngt_numb : selection.get('mngt_numb') })},
				lister	: lister,
				callback: function( results ) {
					if (results.success){
						me.tabChange(1);
						lister.getView().refresh();
						results.feedback( {success : true } );
					}
				}
			}, me);
		}
	},
	
	updateAction: function() {
		var me = this,
			editor = me.pocket.editor(),
			master = me.pocket.lister1(),
			detail = me.pocket.lister2();
			
		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record ) {
				if (results.success) {
					var info	= record,
						dirty	= false;
						
					info.product().data.each( function( item ) {
						item.set('mngt_numb', record.get('mngt_numb'));
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
							var param = {};
							param.stor_gp  = _global.stor_gp;
							param.stor_id = _global.stor_id;
							editor.getForm().setValues({
								param : JSON.stringify(Ext.merge(param, editor.getValues()))
							});
							if (editor.down('[name=files]').getValue() != "") {
								editor.submit({
									url: _global.location.href + '/system/custom/sjflv/haccp/docmmast/set/html/template.do',
									waitMsg: 'Uploading your file...',
									success: function(fp, o) {
									}
								});
							}
							var msRecord;
							if (results.inserted){
								msRecord = Ext.create( master.getStore().model.modelName , record.data );
								master.getStore().insert(0, msRecord);
							} else {
								msRecord = master.getStore().findRecord('mngt_numb', record.get('mngt_numb'));
								Ext.iterate(msRecord.data, function (key, value) {
									msRecord.set( key, record.get(key));
								});
							}
							editor.getForm().reset();
							detail.getStore().loadData(record.product().data.items, false);
							master.getSelectionModel().select(msRecord);
							master.getStore().commitChanges();
							me.tabChange(0);
							
							results.feedback({success : true  });
						},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
			}
		});
	},
	
	cancelAction: function() {
		var me = this,
			editor = me.pocket.editor(),
			search = me.pocket.search2(),
			store = me.pocket.lister3().getStore();
		
		editor.cancelRecord({
			action		: 'invoice',
			caller		: me,
			callback	: function(results) {
				if (results.success) {
					results.feedback( {success : true});
				}
				me.tabChange(0);
				search.getForm().reset();
				store.rejectChanges();
			}
		});
	},
	
	showHtmlPage: function() {
		resource.loadPopup({
			widget	: 'module-sjflv-html-popup',
		});
	},
	
	tabChange: function(tabIdx) {
		var me = this,
			tabpanel = me.pocket.layout().down('tab-panel');
			
		tabpanel.allowTabChange = true;  // 프로그램적으로 변경 허용
		tabpanel.setActiveTab(tabIdx);
	}
});
