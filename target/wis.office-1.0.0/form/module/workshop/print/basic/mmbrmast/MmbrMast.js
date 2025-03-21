Ext.define('module.workshop.print.basic.mmbrmast.MmbrMast', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.InspTypePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.UnitPopup',
		'Axt.popup.view.ZipcodeSearch',
	],

	models : [
		'module.workshop.print.basic.mmbrmast.model.MmbrMast',
		'module.workshop.print.basic.mmbrmast.model.MmbrMast2',
		'module.workshop.print.basic.mmbrmast.model.MmbrMast3'
	],
	stores : [
		'module.workshop.print.basic.mmbrmast.store.MmbrMast',
		'module.workshop.print.basic.mmbrmast.store.MmbrMast2',
		'module.workshop.print.basic.mmbrmast.store.MmbrMast3'
	],
	views: [
		'module.workshop.print.basic.mmbrmast.view.MmbrMastLayout',
		'module.workshop.print.basic.mmbrmast.view.MmbrMastSearch',
		'module.workshop.print.basic.mmbrmast.view.MmbrMastEditor',
		'module.workshop.print.basic.mmbrmast.view.MmbrMastLister',
		'module.workshop.print.basic.mmbrmast.view.MmbrMastLister2',
		'module.workshop.print.basic.mmbrmast.view.MmbrMastLister3'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-mmbrmast-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			'module-mmbrmast-layout #mainpanel' : {
				tabchange : me.selectAction
			},
			// lister event
			'module-mmbrmast-lister button[action=modifyAction]' : { click : me.modifyAction },	//수정
			'module-mmbrmast-lister button[action=insertAction]' : { click : me.insertAction },	//추가
			'module-mmbrmast-lister button[action=deleteAction]' : { click : me.deleteAction },	//삭제

			'module-mmbrmast-lister button[action=Action]' : { click : me.Action },				//가입승인
			'module-mmbrmast-lister button[action=orderAction]' : { click : me.orderAction },	//강제탈퇴

			'module-mmbrmast-editor button[action=updateAction]' : { click : me.updateAction }, //저장
			'module-mmbrmast-editor button[action=cancelAction]' : { click : me.cancelAction },	//취소

			'module-mmbrmast-lister2 button[action=updateAction]' : { click : me.updateAction2 },

			'module-mmbrmast-lister button[action=exportAction]' : { click : me.exportAction  },	// 엑셀
			'module-mmbrmast-isos button[action=exportAction]'   : { click : me.exportAction1 },	// 엑셀
			'module-mmbrmast-rett button[action=exportAction]'   : { click : me.exportAction2 },	// 엑셀
			// lister event
			'module-mmbrmast-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-mmbrmast-layout')[0] },
		search  : function () { return Ext.ComponentQuery.query('module-mmbrmast-search')[0] },
		lister  : function () { return Ext.ComponentQuery.query('module-mmbrmast-lister')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-mmbrmast-lister2')[0] },
		lister3 : function () { return Ext.ComponentQuery.query('module-mmbrmast-lister3')[0] },
		editor  : function () { return Ext.ComponentQuery.query('module-mmbrmast-editor')[0] },
		isos    : function () { return Ext.ComponentQuery.query('module-mmbrmast-isos')[0] },
		rett    : function () { return Ext.ComponentQuery.query('module-mmbrmast-rett')[0] },
		workSearch   : function () { return Ext.ComponentQuery.query('module-mmbrmast-work-search')[0] }
	},
	selectAction:function(callbackFn) {
		var me = this,
			lister ="",
			lister1 = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			search  = me.pocket.search(),
			tpanel  = me.pocket.layout().down('#mainpanel'),
			tindex  = tpanel.items.indexOf(tpanel.getActiveTab()),
			values  = me.pocket.search().getValues(),
			param   = search.getValues(),
			select  = lister1.getSelectionModel().getSelection()[0]
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});

		if(tindex==0){
			lister = lister1;
			mask.show();
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true); }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}else{
			if(select){
				if(tindex==1){
					lister = lister2;
				}
				if(tindex==2){
					lister = lister3;
				}
				mask.show();
				lister.select({
					 callback:function(records, operation, success) {
						if (success) {
						} else { me.pocket.editor().getForm().reset(true); }
						mask.hide();
					}, scope:me
				}, Ext.merge({ stor_grp : _global.stor_grp ,mmbr_idcd : select.get('mmbr_idcd')}));
			}else{
				Ext.Msg.alert('알림','회원을 선택해주세요.');
				tpanel.setActiveTab(0);
				return;
			}
		}
	},

	/**
	 * 선택
	 */
	selectRecord:function( grid, record ){
		var me     = this,
			editor = me.pocket.editor()
		;
		editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
	},


	/**
	 * 수정
	 */
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			search = me.pocket.search()
		;
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

	/**
	* 신규
	*/
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search()
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
						table_nm	: 'mmbr_mast'
					})
				}
			},
			callback : function (keygen) {
				if (keygen.success) {
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							mmbr_idcd : keygen.records[0].seq,
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
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record ) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('mmbr_idcd'))) {
						resource.keygen({
							url			: _global. location.http () + '/listener/seq/maxid.do',
							object		: resource. keygen,
							params		: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'mmbr_idcd',
									dt			: new Date ()
								 })
							 },
							async		: false,
							callback	: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('base_idcd' , keygen.records[0].seq );
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
						case Const.EDITOR.PROCESS.UPDATE : me.selectRecord(lister, record );           break;
					}
				}
			}
		});
	},
	updateAction2:function() {
		var	me		= this,
			lister	= me.pocket.lister2(),
			store	= lister.getStore()
		;
		store.sync({ // 저장 성공시
			success : function(operation){ },
			failure : function(operation){ Ext.Msg.alert('알림','저장 실패하였습니다.'); },
			callback: function(operation){}
		} );
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
	 * 가입승인
	 */
	Action: function (){
		var me = this,

		editor = me.pocket.editor(),
		lister = me.pocket.lister(),
		store  = lister.getStore(),
		master	= Ext.ComponentQuery.query('module-mmbrmast-lister')[0],
		select	= master.getSelectionModel().getSelection()
		;

		if (select) {
			Ext.each(select, function(record) {
				record.dirtyValue('mmbr_stat_dvcd', '2000');
				record.store.commitChanges();
			});
			Ext.each(select, function(record) {
				Ext.Ajax.request({
					url		: _global.location.http() + '/workshop/print/basic/mmbrmast/set/record2.do',
					params	: {
						token	: _global.token_id,
						param	: JSON.stringify({
							mmbr_idcd		: record.get('mmbr_idcd'),
							mmbr_stat_dvcd	: '2000',
							table			: 'prnt_mmbr_mast',
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						} else {
							var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
							mask.show();
							master.select({
								 callback : function(records, operation, success) {
//									 me.setResponse( {success : true });
									if (success) {
									} else {}
									mask.hide();
								}, scope : me
							});
//							me.hide();
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			})
		}
		store.reload();
	},

	/**
	 * 강제탈퇴
	 */
	orderAction: function (){
		var me = this,

		editor = me.pocket.editor(),
		lister = me.pocket.lister(),
		store  = lister.getStore(),
		master	= Ext.ComponentQuery.query('module-mmbrmast-lister')[0],
		select	= master.getSelectionModel().getSelection()
		;

		if (select) {
			Ext.each(select, function(record) {
				record.dirtyValue('mmbr_stat_dvcd', '5000');
//				record.dirtyValue('scsn_date', '');
				record.store.commitChanges();
			});
			Ext.each(select, function(record) {
				Ext.Ajax.request({
					url		: _global.location.http() + '/workshop/print/basic/mmbrmast/set/record3.do',
					params	: {
						token	: _global.token_id,
						param	: JSON.stringify({
							mmbr_idcd		: record.get('mmbr_idcd'),
							mmbr_stat_dvcd	: '5000',
//							scsn_date		: new Date(),
							table			: 'prnt_mmbr_mast',
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						} else {
							var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
							mask.show();
							master.select({
								 callback : function(records, operation, success) {
//									 me.setResponse( {success : true });
									if (success) {
									} else {}
									mask.hide();
								}, scope : me
							});
//							me.hide();
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			})
		}
		store.reload();
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


});
