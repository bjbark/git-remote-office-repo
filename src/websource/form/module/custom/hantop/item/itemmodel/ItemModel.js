Ext.define('module.custom.hantop.item.itemmodel.ItemModel', { extend:'Axt.app.Controller',

	requires	: [
		'lookup.popup.view.UnitPopup',
		'lookup.popup.view.ItemPopup',
	],
	models		: [
		'module.custom.hantop.item.itemmodel.model.ItemModel',
		'module.custom.hantop.item.itemmodel.model.ItemModelDetail1',
		'module.custom.hantop.item.itemmodel.model.ItemModelDetail2',
	],
	stores		: [
		'module.custom.hantop.item.itemmodel.store.ItemModel',
		'module.custom.hantop.item.itemmodel.store.ItemModelDetail1',
		'module.custom.hantop.item.itemmodel.store.ItemModelDetail2',
	],
	views		: [
		'module.custom.hantop.item.itemmodel.view.ItemModelLayout',
		'module.custom.hantop.item.itemmodel.view.ItemModelSearch',
		'module.custom.hantop.item.itemmodel.view.ItemModelMaster',
		'module.custom.hantop.item.itemmodel.view.ItemModelDetail1',
		'module.custom.hantop.item.itemmodel.view.ItemModelDetail2',
		'module.custom.hantop.item.itemmodel.view.ItemModelEditor',
	],

	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-itemmodel-layout  button[action=selectAction]' : { click : me.selectAction },	// 조회
			'module-itemmodel-detail2 button[action=ItemAction]' : { click : me.ItemAction },		// 품목정보등록
			'module-itemmodel-detail2 button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-itemmodel-detail2 button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			'module-itemmodel-detail2 button[action=insertAction]' : { click : me.insertAction },	// 추가
			'module-itemmodel-detail2 button[action=exportAction]' : { click : me.exportAction },	// 엑셀

			// editor 이벤트
			'module-itemmodel-editor  button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-itemmodel-editor  button[action=cancelAction]' : { click : me.cancelAction },	// 취소

			// 클릭이벤트
			'module-itemmodel-master'	: {
				selectionchange	: me.selectMaster,
			},
			'module-itemmodel-detail1'	: {
				selectionchange	: me.selectRecord,
			},

		});
		me.callParent(arguments);
		setTimeout(function(){	//객체 생성 후 서치실행
			me.selectAction()
		},500);

	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-itemmodel-layout')  [0] },
		search		: function () { return Ext.ComponentQuery.query('module-itemmodel-search')  [0] },
		master		: function () { return Ext.ComponentQuery.query('module-itemmodel-master')  [0] },
		detail1		: function () { return Ext.ComponentQuery.query('module-itemmodel-detail1') [0] },
		detail2		: function () { return Ext.ComponentQuery.query('module-itemmodel-detail2') [0] },
		detail2		: function () { return Ext.ComponentQuery.query('module-itemmodel-detail2') [0] },
		editor		: function () { return Ext.ComponentQuery.query('module-itemmodel-editor')  [0] },
	},

	//조회
	selectAction : function() {
		var me = this,
			search	= me.pocket.search(),
			lister	= me.pocket.master(),
			detail1	= me.pocket.detail1(),
			detail2	= me.pocket.detail2(),
			detail2	= me.pocket.detail2(),
			param	= search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		detail2.getStore().clearData();
		detail2.getStore().loadData([],false);
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { }
			}, scope:me
		}, Ext.merge( {stor_id : _global.stor_id}) );
		detail1.select({
			callback:function(records, operation, success, A, B) {
				if (success) {
				} else { }
			}, scope:me
		}, Ext.merge( {stor_id : _global.stor_id}) );

		if(param.find_name){
			detail2.select({
				callback:function(records, operation, success, A, B) {
					if (success) {
						if(records[0]){
							var	brnd_bacd = records[0].get('brnd_bacd'),
								wdgr_idcd = records[0].get('wdgr_idcd')
							;
							var	listerIndex = lister.getStore().find('brnd_bacd', brnd_bacd),
								detailIndex = detail1.getStore().find('wdgr_idcd', wdgr_idcd)
							;
							lister.getSelectionModel().select(listerIndex);
							detail1.getSelectionModel().select(detailIndex);
							detail2.select({
								callback:function(records, operation, success, A, B) {
									if (success) {
									} else { }
								}, scope:me
							}, Ext.merge({wndw_modl_code : param.find_name}, {stor_id : _global.stor_id}) );
						}
					} else { }
				}, scope:me
			}, Ext.merge({wndw_modl_code : param.find_name}, {stor_id : _global.stor_id}) );
		}
		mask.hide();
	},

	attachRecord:function(){
		var	me = this,
			detail2 = me.pocket.detail2()
		;
		// 선택초기화

		detail2.getStore().clearData();
		detail2.getStore().loadData([],false);

	},
	//선택
	selectRecord:function( grid, record ){
		var	me				= this,
			master			= me.pocket.master(),
			select			= master.getSelectionModel().getSelection()[0],
			detail1			= me.pocket.detail1(),
			detail2			= me.pocket.detail2(),
			selectdetail	= detail1.getSelectionModel().getSelection()[0]

		;
		if(select){
			if(selectdetail){
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				detail2.select({
					callback:function(records, operation, success, A, B) {
						if (success) {
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge({	  brnd_bacd : select.get('brnd_bacd')
								, wdgr_idcd : selectdetail.get('wdgr_idcd')
							 },{stor_id : _global.stor_id}
					)
				);
			}else{
				Ext.Msg.alert('알림','창호그룹을 선택해주세요.');
				return;
			}
		}else{
			Ext.Msg.alert('알림','브랜드를 선택해주세요.');
		}
	},
	//선택
	selectMaster:function( grid, record ){
		var	me				= this,
			master			= me.pocket.master(),
			select			= master.getSelectionModel().getSelection()[0],
			detail1			= me.pocket.detail1(),
			detail2			= me.pocket.detail2(),
			selectdetail	= detail1.getSelectionModel().getSelection()[0]

		;
		if(selectdetail){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			detail2.select({
				callback:function(records, operation, success, A, B) {
					if (success) {
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge({	  brnd_bacd : select.get('brnd_bacd')
							, wdgr_idcd : selectdetail.get('wdgr_idcd')
						 },{stor_id : _global.stor_id}
				)
			);
		}else{
			return;
		}
	},

	//품목정보등록
	ItemAction:function() {

		Ext.Msg.confirm("확인", "품목정보를 등록 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/hantop/item/itemmodel/set/item.do',
						params		: {
						param	: Ext.encode({
								hqof_idcd		: _global.hqof_idcd
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							Ext.Msg.alert("알림", "품목정보가 등록 되었습니다.");
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				}
			});
		},


	// 추가
	insertAction:function() {
		var me = this,
			editor			= me.pocket.editor(),
			lister			= me.pocket.master(),
			search			= me.pocket.search(),
			detail1			= me.pocket.detail1(),
			detail2			= me.pocket.detail2(),
			param			= search.getValues(),
			masterselect	= lister.getSelectionModel().getSelection()[0],
			detail1select	= detail1.getSelectionModel().getSelection()[0],
			detail2select	= detail2.getSelectionModel().getSelection()[0],
			seq	=1
		;
		if(!masterselect){
			Ext.Msg.alert("알림","브랜드를 선택하여주십시오.");
			return;
		}
		if(!detail1select){
			Ext.Msg.alert("알림","창호그룹을 선택하여주십시오.");
			return;
		}
		editor.insertBefore({
			caller	: me,
			keygen	: {
				url			: _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'wind_item_modl'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( detail2.getStore().model.modelName,{
							brnd_name		: masterselect.get('brnd_name'),
							brnd_bacd		: masterselect.get('brnd_bacd'),
							wdgr_name		: detail1select.get('wdgr_name'),
							wdgr_idcd		: detail1select.get('wdgr_idcd'),
							wndw_modl_idcd	: keygen.records[0].seq,
							wndw_modl_code	: keygen.records[0].seq,
							butn_yorn		: 1
						}),
						lister	: detail2,
						disables: [ me.pocket.layout().down('#mainpanel'),
									me.pocket.layout().down('#servepanel'),
									me.pocket.search().setDisabled(true)],
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

	// 수정
	modifyAction : function() {
		var me = this,
			editor = me.pocket.editor(),
			detail1		= me.pocket.detail1(),
			detail2		= me.pocket.detail2(),
			select = me.pocket.detail2().getSelectionModel().getSelection()[0]
		;
		if(select){
			editor.attachRecord({
				caller : me ,
				lister : detail2 ,
				record : select
			});
			editor.modifyRecord({
				caller	: me,
				callback: function( results ) {
					if (results.success){
						results.feedback( {success : true, visible : true });
						me.pocket.layout().down('#mainpanel').setDisabled(true);
						me.pocket.layout().down('#servepanel').setDisabled(true);
						me.pocket.search().setDisabled(true);
					}
				}
			});
		}else{
			Ext.Msg.alert("알림","수정할 모델을 선택하여주십시오.");
			return;
		}
	},

	// 삭제
	deleteAction : function() {
		var me = this,
		editor = me.pocket.editor();
		editor.deleteRecord({
			lister	: me.pocket.detail2(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });},			// 저장 성공시
					failure : function(operation){ results.feedback({success : false }); },							// 저장 실패시 호출
					callback: function(operation){ results.callback({}); }											// 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	// 저장
	updateAction:function() {
		var me			= this,
			editor		= me.pocket.editor(),
			master		= me.pocket.master(),
			detail1		= me.pocket.detail1(),
			detail2		= me.pocket.detail2(),
			store		= detail2.getStore(),
			record		= editor.getValues(),
			select		= detail2.getSelectionModel().getSelection()[0]
			cnt			= 0,
			chk			= ''
		;
		if(select){
			if(select.get('wndw_modl_idcd')==record.wndw_modl_idcd && select.get('wndw_modl_code')==record.wndw_modl_code){
				chk = '1';
			}
		}

		if(chk==1){
		}else{
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/hantop/item/itemmodel/get/modl_code_chek.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						hq_id			: _global.hq_id,
						wndw_modl_code	: record.wndw_modl_code
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						return;
					} else {
						console.log(result.records[0].cnt);
						cnt = result.records[0].cnt;
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
		if(cnt>0){
			Ext.Msg.alert('알림','이미 등록된 모델코드입니다.')
			return;
		}else{
			editor.updateRecord({
				store	: store,
				action	: Const.EDITOR.DEFAULT,
				before	: function(results, record) {
					if	(results.success) {
						if	(record.phantom) {
							resource.keygen({
								url		: _global. location.http () + '/listener/seq/maxid.do',
								object	: resource. keygen,
								params	: {
									token	: _global. token_id ,
									param	: JSON. stringify({
										stor_id	: _global.stor_id,
										table_nm: 'wind_prod_modl'
									})
								 },
								async  : false,
								callback : function( keygen ) {
									if (keygen.success) {
										results.feedback({success : true  });
									} else {
										Ext.Msg.alert("error", keygen.message  );
										return;
									}
								}
							});

						} else { results.feedback({success : true });}
					}
				},
				callback : function(results, record ) {
					if (results.success) {
						store.sync({
							success : function(operation){
								results.feedback({success : true  });
							},
							failure : function(operation){ results.feedback({success : false });},
							callback: function(operation){ results.callback({}); }
						} );
					}
				},
				finished : function(results, record, operation){
					if (results.success){
						me.pocket.layout().down('#mainpanel').setDisabled(false);
						me.pocket.layout().down('#servepanel').setDisabled(false);
						me.pocket.search().setDisabled(false);
						editor.collapse(false);
							switch (operation) {
								case Const.EDITOR.PROCESS.INSERT : detail2.getSelectionModel().select(record ); break;
							}
					}
				}
			});
		}
	},


	// 취소
	cancelAction:function() {
		var me	= this,
		editor	= me.pocket.editor(),
		lister	= me.pocket.master(),
		detail1	= me.pocket.detail1(),
		detail2	= me.pocket.detail2()
		;

		editor.cancelRecord({
			caller : me,
			lister : me.pocket.detail2(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : false });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.layout().down('#servepanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);

	},

	//엑셀
	exportAction : function(){
		this.pocket.detail2().writer({enableLoadMask:true});
	},

});