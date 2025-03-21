Ext.define('module.custom.inkopack.cost.stndcostwork.StndCostWork', { extend : 'Axt.app.Controller',

	requires : [
		'lookup.popup.view.BasePopup',
		'module.common.view.SearchBar',
		'module.common.view.SearchRowStatus'
	],
	models	: [
		'module.custom.inkopack.cost.stndcostwork.model.StndCostWork'
	],
	stores	: [
	 	'module.custom.inkopack.cost.stndcostwork.store.StndCostWork'
	],
	views	: [
		'module.custom.inkopack.cost.stndcostwork.view.StndCostWorkSearch',
		'module.custom.inkopack.cost.stndcostwork.view.StndCostWorkLayout',
		'module.custom.inkopack.cost.stndcostwork.view.StndCostWorkLister',
		'module.custom.inkopack.cost.stndcostwork.view.StndCostWorkEditor'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			'module-stndcostwork-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			'module-stndcostwork-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-stndcostwork-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-stndcostwork-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-stndcostwork-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			'module-stndcostwork-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-stndcostwork-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소

			'module-stndcostwork-lister' : { selectionchange: me.attachRecord }
		});
		me.callParent(arguments);
	},
	pocket : {
		search  : function () { return Ext.ComponentQuery.query('module-stndcostwork-search')[0] },
		layout  : function () { return Ext.ComponentQuery.query('module-stndcostwork-layout')[0] },
		editor  : function () { return Ext.ComponentQuery.query('module-stndcostwork-editor')[0] },
		lister  : function () { return Ext.ComponentQuery.query('module-stndcostwork-lister')[0] }
	},

	/**
	 * 조회
	 */
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search()
		;
		if (!Ext.isEmpty(search.getValues().cost_type_bacd )) {
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success && records.length > 0) {
						lister.getSelectionModel().select(0);
					} else {
						me.pocket.editor().getForm().reset(true);
					}
					mask.hide();
				}, scope:me
			}, Ext.merge( search.getValues(), { hqof_idcd : _global.hq_id , stor_grp : _global.stor_grp } ));
		}else{
			Ext.Msg.alert( Const.NOTICE , "조회 할 원가타입을 선택하여 주시기 바랍니다." );
			return;
		}
	},

	/**
	 * 선택
	 */
	selectRecord:function( grid, record ){
		var me = this,
			editor = me.pocket.editor()
		;
		editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
	},

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
			editor = me.pocket.editor(),
			select = me.pocket.lister().getSelectionModel().getSelection()[0]
		;
		if(select){
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
		}else{
			Ext.Msg.alert(Const.NOTICE,"수정 할 데이터를 선택하여 주십시오.");
		}
	},

	/**
	* 신규
	*/
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			select = lister.getSelectionModel().getSelection()[0]
		;
		if (!Ext.isEmpty(search.getValues().cost_type_bacd )){
				costTypeBacd = search.getValues().cost_type_bacd;
				costTypeName = search.getValues().cost_type_name;
			editor.insertRecord({
				before :
					Ext.Ajax.request({
					url		: _global.location.http() + '/custom/incopack/cost/stndcostwork/get/work.do',
					method	: 'POST',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							cost_type_bacd	: costTypeBacd
						})
					},
					async	: false,
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						} else {
							max = result.records[0].max;
							console.log();
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				}),
				action : Const.EDITOR.DEFAULT,
				record : Ext.create( lister.getStore().model.modelName,{
					cost_type_bacd	: costTypeBacd,
					cost_type_name	: costTypeName,
					emp_id			: _global.emp_id, // 로그인 아이디
					emp_nm			: _global.emp_nm,
					line_seqn		: max +1
				}),
				disables : [ me.pocket.layout().down('#mainpanel'), me.pocket.search().setDisabled(true)],
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
			})
		}else{
			Ext.Msg.alert( Const.NOTICE , "추가 할 원가타입을 선택하여 주시기 바랍니다." );
		}
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
		console.log(editor, "<<<<< ");
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record ) {
				if (results.success) {
						results.feedback({success : true  });
				}
			},

			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){ results.feedback({success : true  });},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
			},

			finished : function(results, record, operation){
				if (results.success){
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
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

	/**
	 * 삭제
	 */
	deleteAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.deleteRecord({
			lister   : me.pocket.lister(),
			callback : function(results, record, store) {
				store.sync({
					success : function(operation){ results.feedback({success : true , visible : false });},
					failure : function(operation){ results.feedback({success : false }); },
					callback: function(operation){ results.callback({}); }
				});
			}
		}, me);
	},

	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	},

});

