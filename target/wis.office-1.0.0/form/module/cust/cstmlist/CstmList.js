Ext.define('module.cust.cstmlist.CstmList', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmClassPopup',
		'Axt.popup.view.ZipcodeSearch'
	],
	models	: [
		'module.cust.cstmlist.model.CstmListDrtr',
		'module.cust.cstmlist.model.CstmListDeli',
		'module.cust.cstmlist.model.CstmItemPriceLister',
		'module.cust.cstmlist.model.CstmList',
		'module.cust.cstmlist.model.CstmListFile',
		'module.cust.cstmlist.model.CstmListOrder',
		'module.cust.cstmlist.model.CstmListVisit'
	],
	stores	: [
		'module.cust.cstmlist.store.CstmListDrtr',
		'module.cust.cstmlist.store.CstmListDeli',
		'module.cust.cstmlist.store.CstmList',
		'module.cust.cstmlist.store.CstmListFile',
		'module.cust.cstmlist.store.CstmListRett',
		'module.cust.cstmlist.store.CstmListVisit',
		'module.cust.cstmlist.store.CstmListIsos',
		'module.cust.cstmlist.store.CstmListRett',
		'module.cust.cstmlist.store.CstmListIsos',
		'module.cust.cstmlist.store.CstmItemPriceLister',
		'module.cust.cstmlist.store.CstmListOrder'
	],
	views	: [
		'module.cust.cstmlist.view.CstmListLayout',
		'module.cust.cstmlist.view.CstmListLister',
		'module.cust.cstmlist.view.CstmListDrtrLister',
		'module.cust.cstmlist.view.CstmListDeliLister',
		'module.cust.cstmlist.view.CstmListEditorLister',
		'module.cust.cstmlist.view.CstmListSearch',
		'module.cust.cstmlist.view.CstmListEditor',
		'module.cust.cstmlist.view.CstmListEditor2',
		'module.cust.cstmlist.view.CstmListIsosLister',
		'module.cust.cstmlist.view.CstmListRettLister',
		'module.cust.cstmlist.view.CstmListOrderLister',
		'module.cust.cstmlist.view.CstmListVisitLister',
		'module.cust.cstmlist.view.CstmItemPriceLister',
		'module.cust.cstmlist.view.CstmListWorkerSearch',
		'module.cust.cstmlist.view.CstmListWorkerSearch2',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-cstmlist-layout button[action=selectAction]' : { click : me.selectAction },
			'module-cstmlist-layout #detail' : {
				tabchange : me.mainTabChange
			},
			'module-cstmlist-editor2 #editTab' : {
				tabchange : me.editTabChange
			},
			'module-cstmlist-lister' : {
				selectionchange : me.selectRecord
			},

			'module-cstmlist-worker-search button[action=selectAction2]': { click : me.selectAction2	},		// 조회
			'module-cstmlist-worker-search2 button[action=selectAction3]': { click : me.selectAction3	},		// 조회
			'module-cstmlist-lister button[action=modifyAction]' : { click : me.modifyAction },
			'module-cstmlist-lister button[action=insertAction]' : { click : me.insertAction },
			'module-cstmlist-lister button[action=exportAction]' : { click : me.exportAction },
			'module-cstmlist-isos button[action=exportAction]'   : { click : me.exportAction1 },	// 엑셀
			'module-cstmlist-rett button[action=exportAction]'   : { click : me.exportAction2 },	// 엑셀
			'module-cstmlist-visit button[action=exportAction]'  : { click : me.exportAction3 },	// 엑셀
			'module-cstmlist-order-lister button[action=exportAction]'  : { click : me.exportAction4 },	// 엑셀
			'module-cstmlist-itempric button[action=exportAction]'  : { click : me.exportAction5 },	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-cstmlist-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-cstmlist-search')[0] },
		editor	: function () { return Ext.ComponentQuery.query('module-cstmlist-editor')[0] },
		editor2	: function () { return Ext.ComponentQuery.query('module-cstmlist-editor2')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-cstmlist-lister')[0] },
		pric	: function () { return Ext.ComponentQuery.query('module-cstmlist-itempric')[0] },
		drtr	: function () { return Ext.ComponentQuery.query('module-cstmlist-drtr-lister')[0] },
		deli	: function () { return Ext.ComponentQuery.query('module-cstmlist-deli-lister')[0] },
		file	: function () { return Ext.ComponentQuery.query('module-cstmlist-file')[0] },
		isos	: function () { return Ext.ComponentQuery.query('module-cstmlist-isos')[0] },
		rett	: function () { return Ext.ComponentQuery.query('module-cstmlist-rett')[0] },
		visit	: function () { return Ext.ComponentQuery.query('module-cstmlist-visit')[0] },
		order	: function () { return Ext.ComponentQuery.query('module-cstmlist-order-lister')[0] },
		editorlister	: function () { return Ext.ComponentQuery.query('module-cstmlist-editorlister')[0] },
		workersearch	: function () { return Ext.ComponentQuery.query('module-cstmlist-worker-search')[0] },
		workersearch2	: function () { return Ext.ComponentQuery.query('module-cstmlist-worker-search2')[0] }
	},

	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
		lister		= me.pocket.lister(),
		tindex		= tabPanel.items.indexOf(newCard),
		isos		= me.pocket.isos(),
		pric		= me.pocket.pric(),
		rett		= me.pocket.rett(),
		order		= me.pocket.order(),
		visit		= me.pocket.visit(),
		records		= lister.getSelectionModel().getSelection()
		search		= me.pocket.workersearch(),
		search2		= me.pocket.workersearch2()
		;

		if (tindex == 1) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "계약내역을 조회할 거래처를 선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			pric.select({
				callback : function(records, operation, success) {
					if (success) {
						pric.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {cstm_idcd : records[0].get('cstm_idcd')},{stor_id : _global.stor_id}) );
		}else if (tindex == 2) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "주문내역을 조회할 거래처를 선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			order.select({
				callback : function(records, operation, success) {
					if (success) {
						isos.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {cstm_idcd : records[0].get('cstm_idcd')},{stor_id : _global.stor_id}) );
		}else if (tindex == 3) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "수불내역을 조회할 거래처를 선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			var param = JSON.stringify({
				stor_id			: _global.stor_id,
				hqof_idcd		: _global.hqof_idcd,
				cstm_idcd		: records[0].get('cstm_idcd'),
				to_date			: me.getFormatDate(new Date()),
				fr_date			: me.getFormatDate(new Date(new Date().setMonth(new Date().getMonth()-1))),
				job_dvcd		: 'cstm'
			})
			isos.select({
				callback : function(records, operation, success) {
					if (success) {
						isos.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {param : param },{stor_id : _global.stor_id}) );
		}else if (tindex == 4) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "반품내역을 조회할 거래처를 선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			rett.select({
				callback : function(records, operation, success) {
					if (success) {
						rett.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {cstm_idcd : records[0].get('cstm_idcd')},{stor_id : _global.stor_id}, {}) );
		}else if (tindex == 5) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "방문일지를 조회할 거래처를  선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			visit.select({
				callback : function(records, operation, success) {
					if (success) {
						rett.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {cstm_idcd : records[0].get('cstm_idcd')},{stor_id : _global.stor_id}, {}) );
		}
		search.getForm().reset(true);
		search2.getForm().reset(true);
	},

	editTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			editor2 = me.pocket.editor2(),
			tindex  = tabPanel.items.indexOf(newCard),
			drtr   = me.pocket.drtr(),
			deli   = me.pocket.deli(),
			lister	= me.pocket.lister(),
			record	= lister.getSelectionModel().getSelection()[0],
			param  = me.pocket.search().getValues(),
			editorlister = me.pocket.editorlister()
		;
		if(record!=''){
			if (tindex == 0) {
			}else if (tindex == 1) {
				drtr.select({
					callback:function(records, operation, success) {
					if (success) {
					} else {}
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id , cstm_idcd : editor2.getRecord().data.cstm_idcd}) );
			}else if (tindex == 2) {
				deli.select({
					callback:function(records, operation, success) {
					if (success) {
					} else {}
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id , cstm_idcd : editor2.getRecord().data.cstm_idcd}) );
			}else if (tindex == 3) {
				editorlister.select({
					callback:function(records, operation, success) {
						if (success) {
						} else {}
						}, scope:me
				}, { invc_numb : editor2.getRecord().data.cstm_idcd,orgn_dvcd : 'cstm_mast', line_seqn : 1 });
			}
		}
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			editor = me.pocket.editor(),
			editor2= me.pocket.editor2(),
			param = search.getValues()
		;
		editor.form.reset();
		editor2.form.reset();

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

//	selectDetail:function( grid, record ){
//		var me = this,
//			tpanel	= me.pocket.layout().down('#detail'),
//			tindex	= tpanel.items.indexOf(tpanel.getActiveTab()),
//			lister	= me.pocket.lister(),
//			pric	= me.pocket.pric(),
//			isos	= me.pocket.isos(),
//			rett	= me.pocket.rett(),
//			order	= me.pocket.order(),
//			visit	= me.pocket.visit(),
//			editor2	= me.pocket.editor2(),
//			records	= lister.getSelectionModel().getSelection()[0]
//		;
//		if(records==null){
//		}else{
//			editor2.selectRecord({ lister : me.pocket.lister(), record : record }, me);
//			var param = JSON.stringify({
//				stor_id			: _global.stor_id,
//				hqof_idcd		: _global.hqof_idcd,
//				cstm_idcd		: records.data.cstm_idcd,
//				to_date			: me.getFormatDate(new Date()),
//				fr_date			: me.getFormatDate(new Date(new Date().setMonth(new Date().getMonth()-1))),
//				job_dvcd		: 'cstm'
//			})
//			pric.select({
//				callback : function(records, operation, success) {
//					if (success) {
//						pric.getSelectionModel().select(0);
//					} else {
//					}
//				}, scope:me
//			}, Ext.merge( {cstm_idcd : records.data.cstm_idcd},{stor_id : _global.stor_id}) );
//			order.select({
//				callback : function(records, operation, success) {
//					if (success) {
//						isos.getSelectionModel().select(0);
//					} else {
//					}
//				}, scope:me
//			}, Ext.merge( {cstm_idcd : records.data.cstm_idcd},{stor_id : _global.stor_id}) );
//
//			isos.select({
//				callback : function(records, operation, success) {
//					if (success) {
//						isos.getSelectionModel().select(0);
//					} else {
//					}
//				}, scope:me
//			}, Ext.merge( {param : param },{stor_id : _global.stor_id}) );
//
//			rett.select({
//				callback : function(records, operation, success) {
//					if (success) {
//						rett.getSelectionModel().select(0);
//					} else {
//					}
//				}, scope:me
//			}, Ext.merge( {cstm_idcd : records.data.cstm_idcd},{stor_id : _global.stor_id}, {}) );
//
//			visit.select({
//				callback : function(records, operation, success) {
//					if (success) {
//						rett.getSelectionModel().select(0);
//					} else {
//					}
//				}, scope:me
//			}, Ext.merge( {cstm_idcd : records.data.cstm_idcd},{stor_id : _global.stor_id}, {}) );
//		}
//	},

	selectAction2 : function() {
		var me = this,
			lister = me.pocket.pric(),
			editor = me.pocket.editor(),
			search = me.pocket.workersearch(),
			param  = search.getValues(),
			editor2 = me.pocket.editor2(),
			record = undefined
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					mask.hide();
				} else { }
			}, scope:me
		}, Ext.merge(param,{cstm_idcd: editor2.getRecord().data.cstm_idcd}));
	},

	selectAction3 : function() {
		var me = this,
			lister = me.pocket.order(),
			editor = me.pocket.editor(),
			search = me.pocket.workersearch2(),
			param  = search.getValues(),
			editor2 = me.pocket.editor2(),
			record = undefined
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					mask.hide();
				} else { }
			}, scope:me
		}, Ext.merge(param,{cstm_idcd: editor2.getRecord().data.cstm_idcd}));
	},

	//선택
	selectRecord:function( grid, record ){
		var me = this,
			drtr   = me.pocket.drtr(),
			deli   = me.pocket.deli(),
			editorlister = me.pocket.editorlister(),
			editor = me.pocket.editor(),
			editor2= me.pocket.editor2(),
			param  = me.pocket.search().getValues(),
			lister = me.pocket.lister(),
			pric	= me.pocket.pric(),
			isos	= me.pocket.isos(),
			rett	= me.pocket.rett(),
			order	= me.pocket.order(),
			visit	= me.pocket.visit(),
			records	= lister.getSelectionModel().getSelection()[0]
		;
		if(record!=''){
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
			editor2.selectRecord({ lister : me.pocket.lister(), record : record }, me);

			var param2 = JSON.stringify({
				stor_id			: _global.stor_id,
				hqof_idcd		: _global.hqof_idcd,
				cstm_idcd		: records.data.cstm_idcd,
				to_date			: me.getFormatDate(new Date()),
				fr_date			: me.getFormatDate(new Date(new Date().setMonth(new Date().getMonth()-1))),
				job_dvcd		: 'cstm'
			})
			pric.select({
				callback : function(records, operation, success) {
					if (success) {
						pric.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {cstm_idcd : records.data.cstm_idcd},{stor_id : _global.stor_id}) );
			order.select({
				callback : function(records, operation, success) {
					if (success) {
						isos.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {cstm_idcd : records.data.cstm_idcd},{stor_id : _global.stor_id}) );

			isos.select({
				callback : function(records, operation, success) {
					if (success) {
						isos.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {param : param2 },{stor_id : _global.stor_id}) );

			rett.select({
				callback : function(records, operation, success) {
					if (success) {
						rett.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {cstm_idcd : records.data.cstm_idcd},{stor_id : _global.stor_id}, {}) );

			visit.select({
				callback : function(records, operation, success) {
					if (success) {
						rett.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {cstm_idcd : records.data.cstm_idcd},{stor_id : _global.stor_id}, {}) );

			drtr.select({
				callback:function(records, operation, success) {
				if (success) {
				} else {}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id , cstm_idcd : records.data.cstm_idcd}) );

			deli.select({
				callback:function(records, operation, success) {
				if (success) {
				} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id , cstm_idcd : records.data.cstm_idcd}) );

			editorlister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
			}, { invc_numb : records.data.cstm_idcd,orgn_dvcd : 'cstm_mast', line_seqn : 1 });
			//editorlister.down('[name=file]').popup.params.invc_numb = record[0].get('cstm_idcd');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
		}
	},

	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.modifyRecord({
			callback : function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true } );
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			}
		}, me);
	},

	insertAction:function() {
		var me     = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister()
		;
		editor.insertRecord({
			caller   : me,
			record   : Ext.create( lister.getStore().model.modelName ,{
			}),
			lister   : me.pocket.lister(),
			disables : [me.pocket.layout().down('#mainpanel') ],
			callback : function (results , record ){
				if (results.success){
					results.feedback({success : true , visible : true });
				}
			}
		});
	},

	/**
	 * 저장
	 */
	updateAction:function() {
		var me		= this,
			editor	= me.pocket.editor(),
			lister	= me.pocket.lister(),
			store	= lister.getStore(),
			records	= editor.getRecord(),
			success	= false
		;
		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			before	: function(results, record) {
				if	(results.success) {
					if	(record.phantom && Ext.isEmpty(record.get('cstm_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id	: _global.stor_id,
									table_nm: 'cstm_mast'
								})
							 },

							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('cstm_idcd' , keygen.records[0].seq );
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
						callback: function(operation){ results.callback({}); }
					} );
				}
			},
			finished : function(results, record, operation){
				if (results.success){
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
			}
		}, me);
	},

//	downAction : function(){
//		var me = this,
//			lister = me.pocket.lister(),
//			select = lister.getSelectionModel().getSelection(),
//			editorlister = me.pocket.editorlister(),
//			a = editorlister.getStore().data.items,
//			val
//		;
//		var ck = 0;
//
//		for (var c = 0; c < a.length; c++) {
//			var file_dvcd_1fst	= editorlister.getStore().data.items[c].data.file_dvcd_1fst;
//			if(file_dvcd_1fst=='1000'){
//				ck = 1;
//				break;
//			}else{
//				ck = 0;
//			}
//		}
//
//		if(ck == '0'){
//			console.log("ck0");
//			Ext.Msg.alert('알림','사업자등록증이 등록되지 않았습니다.');
//		}else if(ck =='1'){
//			console.log(ck);
//			for (var i = 0; i < a.length; i++) {
//				var file_dvcd_1fst	= editorlister.getStore().data.items[i].data.file_dvcd_1fst,
//					invc_numb 		= editorlister.getStore().data.items[i].data.invc_numb,
//					orgn_dvcd		= editorlister.getStore().data.items[i].data.orgn_dvcd
//				;
//				if(file_dvcd_1fst == '1000'){
//					val = editorlister.getStore().data.items[i].data.file_name;
//				}
//			}
//			Ext.Msg.show({ title: '확인', msg: '사업자 등록증을 다운로드 하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
//				fn: function (button) {
//					if (button=='yes') {
//						Ext.Ajax.request({
//						url		: _global.location.http() + '/upload/set/fileDownload.do',
//								params	: {
//							token : _global.token_id,
//								param : JSON.stringify({
//								stor_id			: _global.stor_id,
//								hqof_idcd		: _global.hqof_idcd,
//									file_name		: val,
//									path			: '/Downloads'
//								})
//							},
//							async	: false,
//							method	: 'POST',
//							success	: function(response, request) {
//								var result = Ext.decode(response.responseText);
//								if	(!result.success ){
//									Ext.Msg.error(result.message );
//									return;
//								} else {
//									Ext.Msg.alert('알림','다운로드 완료');
//									console.log(result);
//								}
//								mask.hide();
//							},
//							failure : function(result, request) {
//									mask.hide();
//							Ext.Msg.error(result.mesage);
//							},
//							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//							}
//						});
//					}
//				}
//			});
//		}
//	},


	deleteAction:function() {
		var me     = this,
			editor = me.pocket.editor()
		;
	},
	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	},
	//수불내역엑셀
	exportAction1 : function(){
		this.pocket.isos().writer({enableLoadMask:true});
	},

	//반품내역엑셀
	exportAction2 : function(){
		this.pocket.rett().writer({enableLoadMask:true});
	},

	//방문목록엑셀
	exportAction3 : function(){
		this.pocket.visit().writer({enableLoadMask:true});
	},

	//주문내역엑셀
	exportAction4 : function(){
		this.pocket.order().writer({enableLoadMask:true});
	},

	//계약단가엑셀
	exportAction5 : function(){
		this.pocket.pric().writer({enableLoadMask:true});
	},
	getFormatDate:function(date){
		var year = date.getFullYear();              //yyyy
		var month = (1 + date.getMonth());          //M
		month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
		var day = date.getDate();                   //d
		day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
		return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
	}
});

