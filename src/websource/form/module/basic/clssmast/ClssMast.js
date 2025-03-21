Ext.define( 'module.basic.clssmast.ClssMast', { extend:'Axt.app.Controller',


	models: [
	 	'module.basic.clssmast.model.ClssMast',
	 	'module.basic.clssmast.model.ClssMastExcel'
	],
	stores: [
		'module.basic.clssmast.store.ClssMastCate1',
		'module.basic.clssmast.store.ClssMastCate2',
		'module.basic.clssmast.store.ClssMastCate3',
		'module.basic.clssmast.store.ClssMastCate4',
		'module.basic.clssmast.store.ClssMastExcel'
	],
	views : [
		'module.basic.clssmast.view.ClssMastEditor',
		'module.basic.clssmast.view.ClssMastLayout',
		'module.basic.clssmast.view.ClssMastListerExcel',
		'module.basic.clssmast.view.ClssMastListerCate1',
		'module.basic.clssmast.view.ClssMastListerCate2',
		'module.basic.clssmast.view.ClssMastListerCate3',
		'module.basic.clssmast.view.ClssMastListerCate4',
		'module.basic.clssmast.view.ClssMastSearch'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-clssmast-lister-cate2 button[action=insertAction]'),	Const.PERMIT.INSERT);
		this.joinPermission(workspace.down('module-clssmast-lister-cate2 button[action=modifyAction]'),	Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-clssmast-lister-cate2 button[action=deleteAction]'),	Const.PERMIT.DELETE);

		this.joinPermission(workspace.down('module-clssmast-lister-cate3 button[action=insertAction]'),	Const.PERMIT.INSERT);
		this.joinPermission(workspace.down('module-clssmast-lister-cate3 button[action=modifyAction]'),	Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-clssmast-lister-cate3 button[action=deleteAction]'),	Const.PERMIT.DELETE);

		this.joinPermission(workspace.down('module-clssmast-lister-cate4 button[action=insertAction]'),	Const.PERMIT.INSERT);
		this.joinPermission(workspace.down('module-clssmast-lister-cate4 button[action=modifyAction]'),	Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-clssmast-lister-cate4 button[action=deleteAction]'),	Const.PERMIT.DELETE);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-clssmast-search button[action=selectAction]'		: { click : me.selectAction }, // 조회
			// editer event
			'module-clssmast-editor button[action=updateAction]'		: { click : me.updateAction }, // 저장
			'module-clssmast-editor button[action=cancelAction]'		: { click : me.cancelAction }, // 취소
			// lister event
			'module-clssmast-lister-cate1 button[action=insertAction]'	: { click : me.insertActionCate1 }, // 신규
			'module-clssmast-lister-cate1 button[action=modifyAction]'	: { click : me.modifyActionCate1 }, // 수정
			'module-clssmast-lister-cate1 button[action=deleteAction]'	: { click : me.deleteActionCate1 }, // 삭제

			'module-clssmast-lister-cate2 button[action=modifyAction]'	: { click : me.modifyActionCate2 }, // 수정
			'module-clssmast-lister-cate2 button[action=insertAction]'	: { click : me.insertActionCate2 }, // 신규
			'module-clssmast-lister-cate2 button[action=deleteAction]'	: { click : me.deleteActionCate2 }, // 삭제

			'module-clssmast-lister-cate3 button[action=modifyAction]'	: { click : me.modifyActionCate3 }, // 수정
			'module-clssmast-lister-cate3 button[action=insertAction]'	: { click : me.insertActionCate3 }, // 신규
			'module-clssmast-lister-cate3 button[action=deleteAction]'	: { click : me.deleteActionCate3 }, // 삭제

			'module-clssmast-lister-cate4 button[action=modifyAction]'	: { click : me.modifyActionCate4 }, // 수정
			'module-clssmast-lister-cate4 button[action=insertAction]'	: { click : me.insertActionCate4 }, // 신규
			'module-clssmast-lister-cate4 button[action=deleteAction]'	: { click : me.deleteActionCate4 }, // 삭제

			'module-clssmast-lister-excel button[action=exportAction]'	: { click : me.exportAction }, // 엑셀
			// lister event
			'module-clssmast-lister-cate1' : {
				 selectionchange: me.selectRecordCate1
				,itemclick      : me.selectRecordCate1
				,itemdblclick   : me.selectActionCate1
			},
			'module-clssmast-lister-cate2' : {
				 selectionchange: me.selectRecordCate2
				,itemclick      : me.selectRecordCate2
				,itemdblclick   : me.selectActionCate2
			},
			'module-clssmast-lister-cate3' : {
				 selectionchange: me.selectRecordCate3
				,itemclick      : me.selectRecordCate3
				,itemdblclick   : me.selectActionCate3
			},
			'module-clssmast-lister-cate4' : {
				 selectionchange: me.selectRecordCate4
				,itemclick      : me.selectRecordCate4
			},
			 'module-clssmast-layout #mainpanel'	: { tabchange : me.mainTabChange }
		});
		me.callParent(arguments);
	},
	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-clssmast-layout')[0] } ,
		editor  : function () { return Ext.ComponentQuery.query('module-clssmast-editor')[0] } ,
		search  : function () { return Ext.ComponentQuery.query('module-clssmast-search')[0] } ,
		lister  : {
			cate1 : function () { return Ext.ComponentQuery.query('module-clssmast-lister-cate1')[0] } ,
			cate2 : function () { return Ext.ComponentQuery.query('module-clssmast-lister-cate2')[0] } ,
			cate3 : function () { return Ext.ComponentQuery.query('module-clssmast-lister-cate3')[0] } ,
			cate4 : function () { return Ext.ComponentQuery.query('module-clssmast-lister-cate4')[0] } ,
			excel : function () { return Ext.ComponentQuery.query('module-clssmast-lister-excel')[0] }
		}
	},


	mainTabChange : function (tabPanel, newCard, oldCard ){
		var  me    = this,
			index = tabPanel.items.indexOf(newCard),
			gPage = tabPanel.items.indexOf(newCard)
		;
		switch (index) {
			case 1: {
				me.pocket.editor().setVisible(false);
				break;
			};
			default :
				me.pocket.editor().setVisible(true);
		};
	},


	/**
	 * 조회
	 */
	selectAction:function() {
		var me = this,
			lister = undefined ,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if ( tindex == 0 ) { /* 상품분류정보 */
			me.pocket.lister.cate4().getStore().removeAll();
			me.pocket.lister.cate3().getStore().removeAll();
			me.pocket.lister.cate2().getStore().removeAll();
			me.pocket.lister.cate1().getStore().removeAll();

			resource.mask.show({msg: Const.SELECT.mask });
			lister = me.pocket.lister.cate1();
			lister.select({
				callback:function(records, operation, success) {
					resource.mask.hide();
				}, scope:me
			},Ext.merge( me.pocket.search().getValues(), {
				hq_id  : _global.hq_id,
				prnt_idcd : '0',
				line_levl :  1
			}));
		} else
		if ( tindex == 1 ) { /* 상품분류현황 */
			lister = me.pocket.lister.excel();
			resource.mask.show({msg: Const.SELECT.mask });
			lister.select({
				callback:function(records, operation, success) {
					resource.mask.hide();
				}, scope:me
			},Ext.merge( me.pocket.search().getValues(), {
				hq_id		: _global.hq_id ,
				stor_grp	:(_global.hq_grp == '1' || _global.hq_grp == '2') ? '' : _global.stor_grp
			}));

		}
	},

	/**
	 *
	 */
	selectActionCate1:function( grid, record, item, index, e ){
		var me = this,
			lister = me.pocket.lister.cate2()
		;
		if (record ){
			resource.mask.show({msg: Const.SELECT.mask });
			lister.select({
				callback:function(records, operation, success) {
					resource.mask.hide();
				}, scope:me
			},Ext.merge( me.pocket.search().getValues(), {
				hq_id		: _global.hq_id,
				prnt_idcd	: record.get('clss_idcd') ,
				line_levl	: '2'
			}));
		}
	},

	/**
	 *
	 */
	selectActionCate2:function( grid, record, item, index, e ){
		var me = this,
			lister = me.pocket.lister.cate3()
		;
		if (record ){
			resource.mask.show({msg: Const.SELECT.mask });
			lister.select({
				callback:function(records, operation, success) {
					resource.mask.hide();
				}, scope:me
			},Ext.merge( me.pocket.search().getValues(),{
				hq_id		: _global.hq_id,
				prnt_idcd	: record.get('clss_idcd') ,
				line_levl	: '3'
			}));
		}
	},

	/**
	 *
	 */
	selectActionCate3:function( grid, record, item, index, e  ){
		var me = this,
		 	lister = me.pocket.lister.cate4()
		 ;
		if (record && !lister.hidden){
			resource.mask.show({msg: Const.SELECT.mask });
			lister.select({
				callback:function(records, operation, success) {
					resource.mask.hide();
				}, scope:me
			},Ext.merge( me.pocket.search().getValues(),{
				hq_id		: _global.hq_id,
				prnt_idcd	: record.get('clss_idcd') ,
				row_levl	: '4'
			}));
		}
	},
	/**
	 * cate1 레코드가 선택 되었을때
	 */
	selectRecordCate1:function( grid, records, item, index, e ){
		var  me = this
			,editor = me.pocket.editor()
			,lister = me.pocket.lister.cate1()
		;
		editor.selectRecord({
			 record		: records
			,lister		: lister
			,title		: lister.title
			,callback	: function(results) {
				me.pocket.lister.cate4().getStore().removeAll();
				me.pocket.lister.cate3().getStore().removeAll();
				me.pocket.lister.cate2().getStore().removeAll();
			}
		});
	},

	/**
	 * cate2 레코드가 선택 되었을때
	 */
	selectRecordCate2:function( grid, records, item, index, e ){
		var  me = this
			,editor = me.pocket.editor()
			,lister = me.pocket.lister.cate2()
		;
		editor.selectRecord({
			 record		: records
			,lister		: lister
			,title		: lister.title
			,callback	: function(results) {
				me.pocket.lister.cate4().getStore().removeAll();
				me.pocket.lister.cate3().getStore().removeAll();
			}
		});
	},

	/**
	 *
	 */
	selectRecordCate3:function( grid, records, item, index, e ){
		var  me = this
			,editor = me.pocket.editor()
			,lister = me.pocket.lister.cate3()
		;
		editor.selectRecord({
			 record		: records
			,lister		: lister
			,title		: lister.title
			,callback	: function(results) {
				me.pocket.lister.cate4().getStore().removeAll();
			}
		});
	},

	selectRecordCate4:function( grid, records, item, index, e ){
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister.cate4()
		;
		editor.selectRecord({
			record		: records ,
			lister		: lister,
			title		: lister.title ,
			callback	: function(results) {}
		});
	},


	/**
	 * 수정
	 */
	modifyActionCate1:function() {
		var  me = this
			,editor = me.pocket.editor()
			,lister = me.pocket.lister.cate1()
			,select = lister.getSelectionModel().getSelection()
		;
		if (select[0]){
			editor.modifyRecord({
				callback : function( results ) {
					if (results.success){
						results.feedback( {success : true, visible : true } );
						me.pocket.layout().down('#mainpanel').setDisabled(true);
						me.pocket.search().setDisabled(true);
					}
				}
			});
		}
	},

	modifyActionCate2:function() {
		var  me = this
			,editor = me.pocket.editor()
			,lister = me.pocket.lister.cate2()
			,select = lister.getSelectionModel().getSelection()
		;
		if (select[0]){
			editor.modifyRecord({
				callback : function( results ) {
					if (results.success){
						results.feedback( {success : true, visible : true } );
						me.pocket.layout().down('#mainpanel').setDisabled(true);
						me.pocket.search().setDisabled(true);
					}
				}
			});
		}
	},

	modifyActionCate3:function() {
		var  me = this
			,editor = me.pocket.editor()
			,lister = me.pocket.lister.cate3()
			,select = lister.getSelectionModel().getSelection()
		;
		if (select[0]){
			editor.modifyRecord({
				callback : function( results ) {
					if (results.success){
						results.feedback( {success : true, visible : true } );
						me.pocket.layout().down('#mainpanel').setDisabled(true);
						me.pocket.search().setDisabled(true);
					}
				}
			});
		}
	},

	modifyActionCate4:function() {
		var  me = this
			,editor = me.pocket.editor()
			,lister = me.pocket.lister.cate4()
			,select = lister.getSelectionModel().getSelection()
		;
		if (select[0]){
			editor.modifyRecord({
				callback : function( results ) {
					if (results.success){
						results.feedback( {success : true, visible : true } );
						me.pocket.layout().down('#mainpanel').setDisabled(true);
						me.pocket.search().setDisabled(true);
					}
				}
			});
		}
	},

	insertAction:function( config ) {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.insertBefore({
			caller : me,
			keygen : {
				url			: _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						hq_id		: _global.hq_id,
						stor_id		: _global.stor_id,
						table_nm	: 'item_class',
						dt			: new Date (),
						clss_dvcd	: config.clss_dvcd
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( config.lister.getStore().model.modelName, {
							prnt_idcd	: config.prnt_idcd,
							line_levl	: config.line_levl,
							clss_idcd	: keygen.records[0].seq,
							clss_code	: '000',
							clss_dvcd	: config.clss_dvcd
						}),
						lister	: config.lister,
						disables:[me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
						callback: function (results){
							if (results.success){

								editor.setTitle( config.lister.title );

								results.feedback({success : true , visible : true });
							}
						}
					});
				}
			}
		});
	},

	/**
	* 신규
	*/
	insertActionCate1:function() {
		var  me = this,
			lister = me.pocket.lister.cate1(),
			search = me.pocket.search(),
			clss_dvcd = search.getValues().clss_dvcd
		;
		console.log(search.getValues().clss_dvcd);


		this.insertAction( { lister : lister, prnt_idcd : '0', line_levl : '1', clss_dvcd : clss_dvcd } );
	},
	/**
	* 신규
	*/
	insertActionCate2:function() {
		var  me = this,
			lister = me.pocket.lister.cate2(),
			parent = me.pocket.lister.cate1().getSelectionModel().getSelection(),
			search = me.pocket.search(),
			clss_dvcd = search.getValues().clss_dvcd
		;
		if (parent[0]){
			this.insertAction({ lister : lister, prnt_idcd : parent[0].data.clss_idcd , line_levl : '2', clss_dvcd : clss_dvcd } );
		}
	},
	/**
	* 신규
	*/
	insertActionCate3:function() {
		var  me = this,
			lister = me.pocket.lister.cate3(),
			parent = me.pocket.lister.cate2().getSelectionModel().getSelection(),
			search = me.pocket.search(),
			clss_dvcd = search.getValues().clss_dvcd
		;
		if (parent[0]){
			this.insertAction( { lister : lister , prnt_idcd : parent[0].data.clss_idcd , line_levl : '3', clss_dvcd : clss_dvcd } );
		}
	},
	insertActionCate4:function() {
		var  me = this,
			lister = me.pocket.lister.cate4(),
			parent = me.pocket.lister.cate3().getSelectionModel().getSelection(),
			search = me.pocket.search(),
			clss_dvcd = search.getValues().clss_dvcd
		;
		if (parent[0]){
			this.insertAction( { lister : lister , prnt_idcd : parent[0].data.clss_idcd , line_levl : '4', clss_dvcd : clss_dvcd } );
		}
	},

	/**
	 * 저장
	 */
	updateAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.updateRecord({
			caller   : me,
			callback : function(results, record, store ) {
				if (results.success){
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					store.sync({
						success : function(operation){
							results.feedback({success : true , visible : false });
						},
						failure : function(operation){ results.feedback({success : false }); },
						callback: function(operation){ results.callback({}); }
					}, {synchro : _global.objects.synchro} );
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
			caller		: me,
			action		: Const.EDITOR.DEFAULT ,
			callback	: function(results, record){
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


	/**
	 * 삭제
	 */
	deleteAction:function(config) {
		var  me = this
			,editor = me.pocket.editor()
		;
		editor.deleteRecord({
			caller		: me,
			lister		: config.lister,
			callback	: function(results, record, store) {
				if (results.success){
					store.sync({ // 저장 성공시
						success : function(operation){ results.feedback({success : true , visible : false });},
						failure : function(operation){ results.feedback({success : false }); },
						callback: function(operation){ results.callback({}); }
					}, {synchro : _global.objects.synchro} );
				}
			}
		});

	},
	deleteActionCate1:function(button) {
		var me = this;
		me.pocket.lister.cate4(me).getStore().removeAll();
		me.pocket.lister.cate3(me).getStore().removeAll();
		me.pocket.lister.cate2(me).getStore().removeAll();
		me.deleteAction({ lister : me.pocket.lister.cate1() });
	},
	deleteActionCate2:function() {
		var me = this;
		me.pocket.lister.cate4(me).getStore().removeAll();
		me.pocket.lister.cate3(me).getStore().removeAll();
		me.deleteAction({ lister : me.pocket.lister.cate2() });
	},
	deleteActionCate3:function() {
		var me = this;
		me.pocket.lister.cate4(me).getStore().removeAll();
		me.deleteAction({ lister : me.pocket.lister.cate3(me) });
	},

	deleteActionCate4:function() {
		var me = this;
		me.deleteAction({ lister : me.pocket.lister.cate4(me) });
	},

	/*
	 * 액셀 저장
	 *
	 */
	exportAction : function(){
		this.pocket.lister.excel().writer({enableLoadMask:true});

	}
});
