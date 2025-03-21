Ext.define('module.item.itemunit.ItemUnit', { extend   : 'Axt.app.Controller',

	models : ['module.item.itemunit.model.ItemUnit'],
	stores : ['module.item.itemunit.store.ItemUnit'],
	views  : [
		'module.item.itemunit.view.ItemUnitLayout',
		'module.item.itemunit.view.ItemUnitLister',
		'module.item.itemunit.view.ItemUnitEditor',
		'module.item.itemunit.view.ItemUnitSearch'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			'module-itemunit-layout button[action=selectAction]' : { click : me.selectAction },
			'module-itemunit-lister button[action=modifyAction]' : { click : me.modifyAction },
			'module-itemunit-lister button[action=insertAction]' : { click : me.insertAction },
			'module-itemunit-lister button[action=exportAction]' : { click : me.exportAction },
			'module-itemunit-lister button[action=deleteAction]' : { click : me.deleteAction },
			'module-itemunit-editor button[action=updateAction]' : { click : me.updateAction },
			'module-itemunit-editor button[action=cancelAction]' : { click : me.cancelAction },
			'module-itemunit-lister' : {
				selectionchange: me.attachRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-itemunit-layout')[0] },
		search  : function () { return Ext.ComponentQuery.query('module-itemunit-search')[0] } ,
		editor  : function () { return Ext.ComponentQuery.query('module-itemunit-editor')[0] },
		lister  : function () { return Ext.ComponentQuery.query('module-itemunit-lister')[0] }
	},


	selectAction:function(config){
		var me     = this,
			lister = me.pocket.lister()
		;

		var mask = resource.mask.show({msg: Const.SELECT.mask });
		lister.select({
			callback:function(records, operation, success) {
				if (success && records.length > 0) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		},Ext.merge( me.pocket.search().getValues(), {
			hq_id : _global.hq_id,
			stor_grp : _global.stor_grp
		}));
	},

	/**
	 * 선택
	 */
	attachRecord:function( smodel, record ){
		var me     = this,
			editor = me.pocket.editor(),
			lister = smodel ? smodel.view.ownerCt : me.pocket.lister()
		;
		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : record ? record : lister.getSelectionModel().getSelection()
		});
	},

	/**
	 * 수정
	 */
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
				}
			}
		});
	},

	/**
	* 신규
	*/
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor()
			lister = me.pocket.lister()
		;
		editor.insertRecord({
			action : Const.EDITOR.DEFAULT,
			record : Ext.create( lister.getStore().model.modelName,{
				shr_yn : (_global.contract.isowner() && (_global.hq_gb == '1' || _global.hq_gb == '2')) ? '1' : '0'
			}),
			disables : [ me.pocket.layout().down('#mainpanel') ],
			callback: function (results){
				if (results.success) {
					results.feedback({success : true });
				}
			},
			finished : function(results, record){
				if (results.success){
					editor.expand(false);
				}
			}
		});
	},


	/**
	 * 저장
	 */
	updateAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			store  = lister.getStore()
		;
		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			before	: function(results, record ) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('unit_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							params	: {
								token : _global.token_id ,
								param	: JSON. stringify({
									hq_id	: _global.hq_id,
									stor_id	: _global.stor_id,
									table_nm: 'itm_unit',
									dt		: new Date ()
								})
							},
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('unit_idcd' , keygen.records );
									results.feedback({success : true  });
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						});
					} else { results.feedback({success : true  }); }
				}
			},
			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){ results.feedback({success : true  });},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					}, {synchro : _global.objects.synchro} );
				}
			},
			finished : function(results, record, operation){
				if (results.success){
					editor.collapse(false);
					switch (operation) {
					case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
					case Const.EDITOR.PROCESS.UPDATE : me.attachRecord(lister, record );           break;
					}
				}
			}
		});
	},


	/**
	* 취소
	*/
	cancelAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.cancelRecord({
			caller	: me,

			action   : Const.EDITOR.DEFAULT ,
			callback : function(results, record){
				if (results.success){
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


	/**
	 * 삭제
	 */
	deleteAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister()
		;
		var selected = lister.getSelectionModel().getSelection()[0] ;

		if( selected.get('unit_idcd') == 'EA' ){
			Ext.Msg.alert('알림', 'EA 단위는 삭제가 불가능합니다.');
			return;
		}

		editor.deleteRecord({
			caller   : me,
			lister   : me.pocket.lister(),
			callback : function(results, record, store) {
				if (results.success){
					store.sync({ // 저장 성공시
						success : function(operation){ results.feedback({success : true , visible : false });} ,
						failure : function(operation){ results.feedback({success : false }); } ,
						callback: function(operation){ results.callback({}); }
					}, {synchro : _global.objects.synchro} );
				}
			}
		});
	},

	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	},



});


