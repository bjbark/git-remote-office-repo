Ext.define( 'module.item.itemclass.ItemClass', { extend:'Axt.app.Controller',
	models: [
	 	'module.item.itemclass.model.ItemClass',
	 	'module.item.itemclass.model.ItemClassExcel'
	],
	stores: [
		'module.item.itemclass.store.ItemClassCate1',
		'module.item.itemclass.store.ItemClassCate2',
		'module.item.itemclass.store.ItemClassCate3',
		'module.item.itemclass.store.ItemClassCate4',
		'module.item.itemclass.store.ItemClassExcel'
	],
	views : [
		'module.item.itemclass.view.ItemClassLayout',
		'module.item.itemclass.view.ItemClassListerExcel',
		'module.item.itemclass.view.ItemClassListerCate1',
		'module.item.itemclass.view.ItemClassListerCate2',
		'module.item.itemclass.view.ItemClassListerCate3',
		'module.item.itemclass.view.ItemClassListerCate4',
		'module.item.itemclass.view.ItemClassEditor',
		'module.item.itemclass.view.ItemClassSearch'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-itemclass-lister-cate2 button[action=insertAction]'),	Const.PERMIT.INSERT);
		this.joinPermission(workspace.down('module-itemclass-lister-cate2 button[action=modifyAction]'),	Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-itemclass-lister-cate2 button[action=deleteAction]'),	Const.PERMIT.DELETE);

		this.joinPermission(workspace.down('module-itemclass-lister-cate3 button[action=insertAction]'),	Const.PERMIT.INSERT);
		this.joinPermission(workspace.down('module-itemclass-lister-cate3 button[action=modifyAction]'),	Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-itemclass-lister-cate3 button[action=deleteAction]'),	Const.PERMIT.DELETE);

		this.joinPermission(workspace.down('module-itemclass-lister-cate4 button[action=insertAction]'),	Const.PERMIT.INSERT);
		this.joinPermission(workspace.down('module-itemclass-lister-cate4 button[action=modifyAction]'),	Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-itemclass-lister-cate4 button[action=deleteAction]'),	Const.PERMIT.DELETE);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-itemclass-search button[action=selectAction]'		: { click : me.selectAction }, // 조회
			// editer event
			'module-itemclass-editor button[action=updateAction]'		: { click : me.updateAction }, // 저장
			'module-itemclass-editor button[action=cancelAction]'		: { click : me.cancelAction }, // 취소
			// lister event
			'module-itemclass-lister-cate1 button[action=insertAction]'	: { click : me.insertActionCate1 }, // 신규
			'module-itemclass-lister-cate1 button[action=modifyAction]'	: { click : me.modifyActionCate1 }, // 수정
			'module-itemclass-lister-cate1 button[action=deleteAction]'	: { click : me.deleteActionCate1 }, // 삭제

			'module-itemclass-lister-cate2 button[action=modifyAction]'	: { click : me.modifyActionCate2 }, // 수정
			'module-itemclass-lister-cate2 button[action=insertAction]'	: { click : me.insertActionCate2 }, // 신규
			'module-itemclass-lister-cate2 button[action=deleteAction]'	: { click : me.deleteActionCate2 }, // 삭제

			'module-itemclass-lister-cate3 button[action=modifyAction]'	: { click : me.modifyActionCate3 }, // 수정
			'module-itemclass-lister-cate3 button[action=insertAction]'	: { click : me.insertActionCate3 }, // 신규
			'module-itemclass-lister-cate3 button[action=deleteAction]'	: { click : me.deleteActionCate3 }, // 삭제

			'module-itemclass-lister-cate4 button[action=modifyAction]'	: { click : me.modifyActionCate4 }, // 수정
			'module-itemclass-lister-cate4 button[action=insertAction]'	: { click : me.insertActionCate4 }, // 신규
			'module-itemclass-lister-cate4 button[action=deleteAction]'	: { click : me.deleteActionCate4 }, // 삭제

			'module-itemclass-lister-excel button[action=exportAction]'	: { click : me.exportAction }, // 엑셀
			// lister event
			'module-itemclass-lister-cate1' : {
				 selectionchange: me.selectRecordCate1
				,itemdblclick      : me.selectRecordCate1
				,itemclick   : me.selectActionCate1
			},
			'module-itemclass-lister-cate2' : {
				 selectionchange: me.selectRecordCate2
				,itemdblclick      : me.selectRecordCate2
				,itemclick   : me.selectActionCate2
			},
			'module-itemclass-lister-cate3' : {
				 selectionchange: me.selectRecordCate3
				,itemdblclick      : me.selectRecordCate3
				,itemclick   : me.selectActionCate3
			},
			'module-itemclass-lister-cate4' : {
				 selectionchange: me.selectRecordCate4
				,itemdblclick      : me.selectRecordCate4
			},
			 'module-itemclass-layout #mainpanel'	: { tabchange : me.mainTabChange }
		});
		me.callParent(arguments);
	},
	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-itemclass-layout')[0] } ,
		editor  : function () { return Ext.ComponentQuery.query('module-itemclass-editor')[0] } ,
		search  : function () { return Ext.ComponentQuery.query('module-itemclass-search')[0] } ,
		lister  : {
			cate1 : function () { return Ext.ComponentQuery.query('module-itemclass-lister-cate1')[0] } ,
			cate2 : function () { return Ext.ComponentQuery.query('module-itemclass-lister-cate2')[0] } ,
			cate3 : function () { return Ext.ComponentQuery.query('module-itemclass-lister-cate3')[0] } ,
			cate4 : function () { return Ext.ComponentQuery.query('module-itemclass-lister-cate4')[0] } ,
			excel : function () { return Ext.ComponentQuery.query('module-itemclass-lister-excel')[0] }
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
				line_levl :  1,
				line_stat :  me.pocket.search().getValues().line_stat,
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
						dt			: new Date ()
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					var code = "000";
					Ext.Ajax.request({
						url		: _global.location.http() + '/item/itemclss/get/maxCode.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: JSON.stringify({
								line_levl	: config.line_levl,
								prnt_idcd	: config.prnt_idcd
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							if	(!result.success ){
								Ext.Msg.error(result.message );
							} else {
								code = result.records[0].code;
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( config.lister.getStore().model.modelName, {
							prnt_idcd	: config.prnt_idcd,
							line_levl	: config.line_levl,
							clss_idcd	: keygen.records[0].seq,
							clss_code	: code
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
		var  me = this
			,lister = me.pocket.lister.cate1()
		;
		this.insertAction( { lister : lister, prnt_idcd : '0', line_levl : '1' } );
	},
	/**
	* 신규
	*/
	insertActionCate2:function() {
		var  me = this
			,lister = me.pocket.lister.cate2()
			,parent = me.pocket.lister.cate1().getSelectionModel().getSelection();
		;
		if (parent[0]){
			this.insertAction({ lister : lister, prnt_idcd : parent[0].data.clss_idcd , line_levl : '2' } );
		}
	},
	/**
	* 신규
	*/
	insertActionCate3:function() {
		var  me = this
			,lister = me.pocket.lister.cate3()
			,parent = me.pocket.lister.cate2().getSelectionModel().getSelection();
		;
		if (parent[0]){
			this.insertAction( { lister : lister , prnt_idcd : parent[0].data.clss_idcd , line_levl : '3' } );
		}
	},
	insertActionCate4:function() {
		var  me = this
			,lister = me.pocket.lister.cate4()
			,parent = me.pocket.lister.cate3().getSelectionModel().getSelection();
		;
		if (parent[0]){
			this.insertAction( { lister : lister , prnt_idcd : parent[0].data.clss_idcd , line_levl : '4' } );
		}
	},

	/**
	 * 저장
	 */
	updateAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			msg    = ""
		;
		editor.updateRecord({
			caller   : me,
			callback : function(results, record, store ) {
				if (results.success){

					if(_global.options.code_check){
						Ext.Ajax.request({
							url			: _global.api_host_info + '/' + _global.app_site + '/listener/seq/checkCode.do',
							method		: "POST",
							async		: false,
							params		: {
								token	: _global.token_id,
								param	: Ext.encode({
									table_nm	: "item_clss",
									column_nm1	: "clss_code",
									column_nm2	: "prnt_idcd",
									notin_column: "clss_idcd",
									code1		: record.get('clss_code'),
									code2		: record.get('prnt_idcd'),
									notin		: record.get('clss_idcd'),
									hqof_idcd	: _global.hqof_idcd
								})
							},
							success : function(response, request) {
								var object = response,
									result = Ext.decode(object.responseText)
								;
								if (result.success) {
									if(result.records[0].seq>0){
										msg = '중복된 코드입니다.';
										results.feedback({success : false })
										results.callback({});
										return;
									}
								} else {
									Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
								}
							},
							failure : function(response, request) {
								resource.httpError(response);
							}
						});
					}
					if(msg != ""){
						Ext.Msg.alert('알림',msg);
						return;
					}
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
