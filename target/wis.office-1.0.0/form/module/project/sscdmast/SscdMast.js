Ext.define('module.project.sscdmast.SscdMast', { extend:'Axt.app.Controller',
	requires: [
			'module.common.view.SearchBar',
			'module.common.view.SearchRowStatus',
			'lookup.popup.project.BonsaPopup'
		],

	models:['module.project.sscdmast.model.SscdMast'],
	stores:['module.project.sscdmast.store.SscdMast'],
	views:
	[
	 	'module.project.sscdmast.view.SscdMastLayout',
	 	'module.project.sscdmast.view.SscdMastSearch',
	 	'module.project.sscdmast.view.SscdMastLister',
	 	'module.project.sscdmast.view.SscdMastEditor'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	/**
	 *
	 */
	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-sscdmast-layout button[action=selectAction]' : { click : me.selectAction }, // 조회
			// editer event
			'module-sscdmast-editor button[action=updateAction]' : { click : me.updateAction }, // 저장
			'module-sscdmast-editor button[action=cancelAction]' : { click : me.cancelAction }, // 취소
			// lister event
			'module-sscdmast-lister button[action=code_ini]' 	: { click : me.copyAction }, // 수정
			'module-sscdmast-lister button[action=modifyAction]' : { click : me.modifyAction }, // 수정
			'module-sscdmast-lister button[action=insertAction]' : { click : me.insertAction }, // 신규
			'module-sscdmast-lister button[action=exportAction]' : { click : me.exportAction }, // 엑셀
			'module-sscdmast-lister button[action=deleteAction]' : { click : me.deleteAction }, // 삭제
			// lister event
			'module-sscdmast-lister' : {
				selectionchange: me.selectRecord  // 메뉴 선택시 이벤트
			},
			'module-sscdmast-search combobox[name=site_id]' : { select: me.selectLookup  }
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-sscdmast-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-sscdmast-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-sscdmast-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-sscdmast-lister')[0] }
	},

	/*
	 * 콤보 박스가 정리 될때
	 */
	selectLookup:function() {
		 this.pocket.lister().eraser();
	},

	/**
	 * 조회
	 */
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
//		if (! Ext.isEmpty(search.getValues().site_id )) {
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
//		}
	},

	/**
	 * 선택
	 */
	selectRecord:function( grid, record ){
		var me = this, editor = me.pocket.editor();
		editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
	},

	/**
	 * 수정
	 */
	modifyAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.modifyRecord({
			caller   : me,
			callback : function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true } );
					me.pocket.layout().down('#mainpanel').setDisabled(true);
				}
			}
		});
	},

	/**
	* 신규
	*/
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search()
			param = search.getValues()
		;
			editor.insertBefore({
				caller   : me,
				keygen : {
					url    : _global.location.http() + '/listener/seq/maxid.do',
					object : resource.keygen,
					params : {
						token : _global.token_id ,
						param : JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm   	: 'sscd_mast'
						})
					}
				},
				callback : function (keygen){
					if (keygen.success){
						editor.insertRecord({
							caller   : me,
							record   : Ext.create( lister.getStore().model.modelName  ,{

								site_id : search.getValues().site_id  , //'system',
								sscd_idcd : keygen.records[0].seq,
								//code_cd : keygen.records ,
								code_gb : 'gb'
							}),
							lister   : lister ,
							disables :[me.pocket.layout().down('#mainpanel')],
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

	/**
	 * 저장
	 */
	updateAction:function() {
		var me = this,
			editor  = me.pocket.editor(),
			sbsc_valu = editor.getForm().findField("sbsc_valu"),
			lkup_valu = editor.getForm().findField("lkup_valu"),
			editAry = [],
			lineAry = [],
			lineSub = [],
			dataAry = [],
			dflt_valu = []
		;
		editAry = sbsc_valu.getValue().split('\n');
		Ext.each(editAry, function( linevalue ) {
			var lineAry = linevalue.split(':');
			if (lineAry.length >= 2) {
				if (lineAry[0].charAt(0) === '/' && lineAry[0].charAt(1) === '/') {
					// 해당 항목은 주석으로 간주한다.
				} else {
					dflt_valu.push( Ext.String.trim( lineAry[0] ) ); /* code */
					lineSub = lineAry[1].split('#');
					if (lineSub.length > 1){
						var name = Ext.String.trim( lineSub[0]) ;
						dflt_valu.push( (name.length == 0) ? '　' : name ); /* name  Ext.String.trim( lineSub[0])  */
						//deflt_val.push( Ext.String.trim( lineSub[0]) ); /* name  Ext.String.trim( lineSub[0])  */
						dflt_valu.push( Ext.String.trim( lineSub[1]) ); /* color */
					} else {
						var name = Ext.String.trim( lineAry[1]) ;
						dflt_valu.push( (name.length == 0) ? '　' : name ); /* '　' name  Ext.String.trim( lineSub[0])  */
						//deflt_val.push( Ext.String.trim( lineAry[1]) );  /* name */
					}
					dataAry.push(dflt_valu);
					dflt_valu = [];
				}
			}
		});
		lkup_valu.setValue( JSON.stringify( dataAry ) );

		/* 필드의 값을 선 조사 하여 경고를 띄우고자 해당 필드를 검하여 조건을 검사한다. */
		editor.updateRecord({
			caller   : me,
			lister   : me.pocket.lister(),
			before   : function(results, record, store ) {
				if (results.success) {
					results.feedback({success : true });
				}
			},
			callback : function(results, record, store ) {
				if (results.success){
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					store.sync({
						success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
						failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
						callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
					});
				}
			}
		});
	},


	/**
	* 취소
	*/
	cancelAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
			}
		}, me);
	},

	/**
	 * 삭제
	 */
	deleteAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.deleteRecord({
			lister   : me.pocket.lister(),
			callback : function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	/**
	* 관제 코드 파일을 자체 DB로 복사
	*/
	copyAction:function() {
		var me = this,
			lister	= me.pocket.lister(),
			hq_id	= lister.down('[name=hqof_idcd]').getValue()
		;
		Ext.Msg.show({
			msg: "System 코드파일을 적용(일괄 복사) 하시겠습니까?" , buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn: function (button) {
				if (button === 'yes'){
					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
					mask.show();
					Ext.Ajax.request({
						url: _global.location.http() +'/project/sscdmast/set/copy.do',
						method:"POST",
						params: {
							token: _global.token_id,
							param: JSON.stringify({
							hq_id  : hq_id
							})
						},
						success: function (response, request) {
							var result = Ext.decode(response.responseText);
							if (result.success){
								Ext.Msg.show({ msg: '복사 성공', buttons: Ext.Msg.YES, icon: Ext.Msg.OK });
							}else{
								Ext.Msg.show({ msg: result.message, buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
							}
						},
						failure: function (response, request) {},
						callback : function() { mask.hide();}
					});
				}
			}
		});
}

});



