 Ext.define('module.cost.stndcost.StndCost', { extend:'Axt.app.Controller',

	requires: [
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.MoldPopup',
		'lookup.popup.view.BasePopup',
		'lookup.upload.FileUpload',
	],
	models	: [
		'module.cost.stndcost.model.StndCost'
	],
	stores	: [
		'module.cost.stndcost.store.StndCost'
	],
	views	: [
		'module.cost.stndcost.view.StndCostLayout',
		'module.cost.stndcost.view.StndCostSearch',
		'module.cost.stndcost.view.StndCostLister',
		'module.cost.stndcost.view.StndCostEditor',
		'module.cost.stndcost.view.FileUpload'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-stndcost-layout button[action=selectAction]'		: { click : me.selectAction },	// 조회
			// editer event
			'module-stndcost-editor button[action=updateAction]'		: { click : me.updateAction },	// 저장
			'module-stndcost-editor button[action=cancelAction]'		: { click : me.cancelAction },	// 취소
			// lister event
			'module-stndcost-lister button[action=modifyAction]'		: { click : me.modifyAction },	// 수정
			'module-stndcost-lister button[action=insertAction]'		: { click : me.insertAction },	// 신규
			'module-stndcost-lister button[action=exportAction]'		: { click : me.exportAction },	// 엑셀
			'module-stndcost-lister button[action=deleteAction]'		: { click : me.deleteAction },	// 삭제
			'module-stndcost-lister button[action=uploadAction]'		: { click : me.excelUploadAction },
			'module-stndcost-lister button[action=pasteUploadAction]'	: { click : me.pasteUploadAction }, /* 엑셀 붙여 넣기 액션 */
			// lister event
			'module-stndcost-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-stndcost-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-stndcost-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-stndcost-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-stndcost-lister')[0] },
		upload : function () { return Ext.ComponentQuery.query('module-stndcost-upload')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//선택
	selectRecord:function( grid, record ){
		var me = this, editor = me.pocket.editor();
		editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
	},

	//수정
	modifyAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.modifyRecord({
			caller	: me,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true } );
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
			search = me.pocket.search()
			param = search.getValues()
		;
			editor.insertBefore({
				caller	: me,
				keygen	: {
					url		: _global.location.http() + '/listener/seq/maxid.do',
					object	: resource.keygen,
					params	: {
						token : _global.token_id ,
						param : JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm	: 'stnd_cost'
						})
					}
				},
				callback : function (keygen) {
					if (keygen.success) {
						editor.insertRecord({
							caller	: me,
							record	: Ext.create( lister.getStore().model.modelName,{
								stnd_date : keygen.records[0].date,
								mold_idcd : keygen.records[0].idcd,
								mtrl_bacd : keygen.records[0].bacd,
							}),
							lister	: lister,
							disables: [me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
							callback: function (results) {
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
			lister = me.pocket.lister(),
			editor = me.pocket.editor(),
			store  = lister.getStore()
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('mold_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'stnd_cost'
								})
							 },
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('mold_idcd' , keygen.records[0].seq );
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
						callback: function(operation){ results.callback({}); },
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
		var me = this, editor = me.pocket.editor();
		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
	},

	//삭제
	deleteAction:function() {
		var me = this,
		editor = me.pocket.editor();
		editor.deleteRecord({
			lister	: me.pocket.lister(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	/**
	 * 엑셀 업로드 액션
	 */
	pasteUploadAction : function () {
		var me = this ,
			layout = me.pocket.layout()
		;
		layout.getLayout().setActiveItem(1);
	},
	/**
	 * 엑셀 업로드
	 */
	excelUploadAction : function () {
		var me = this,
			param  = me.pocket.search().getValues(),
			lister = me.pocket.lister()
		;
		// 엑셀 업로드 팝업
		resource.loadPopup({
			widget : 'module-stndcost-upload',
			sample : {
				xtype	: 'button' ,
				text	: '엑셀양식 받기' ,
				iconCls	: Const.FINISH.icon ,
				href	: 'resource/sample/' + Const.UPLOAD.SAMPLE.ITEM
			},

			apiurl : {
				upload : _global.location.href + '/system/cost/stndcost/excel.do', // url (필수)
			},
			params : {

			},

			title			: '표준원가 내역 엑셀 Upload',					// popup title (옵션)
			waitMsg			: '업로드중...',							// upload시 progress bar의 wait message (옵션)
			allowExtension	: ['xls', 'xlsx'],						// 지정하지 않으면 확장자 무제한 (옵션)
			uploadBtnConfig	: {										// upload버튼의 config속성 (속성은 api참고) (옵션)
			text : '엑셀 Upload'
			},
			listeners: {
				close:function(){
					lister.getStore().reload();
				}
			}
		});
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});