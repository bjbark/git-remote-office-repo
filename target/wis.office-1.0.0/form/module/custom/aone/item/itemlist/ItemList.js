Ext.define('module.custom.aone.item.itemlist.ItemList', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.InspTypePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.UnitPopup'
	],

	models : [
		'module.custom.aone.item.itemlist.model.ItemList',
		'module.custom.aone.item.itemlist.model.ItemListIsos',
		'module.custom.aone.item.itemlist.model.ItemListMemo',
		'module.custom.aone.item.itemlist.model.ItemListMngt',
		'module.custom.aone.item.itemlist.model.ItemListFile',
		'module.custom.aone.item.itemlist.model.ItemListRett'
	],
	stores : [
		'module.custom.aone.item.itemlist.store.ItemList',
		'module.custom.aone.item.itemlist.store.ItemListIsos',
		'module.custom.aone.item.itemlist.store.ItemListMemo',
		'module.custom.aone.item.itemlist.store.ItemListMngt',
		'module.custom.aone.item.itemlist.store.ItemListFile',
		'module.custom.aone.item.itemlist.store.ItemListRett'
	],
	views: [
		'module.custom.aone.item.itemlist.view.ItemListLayout',
		'module.custom.aone.item.itemlist.view.ItemListSearch',
		'module.custom.aone.item.itemlist.view.ItemListLister',
		'module.custom.aone.item.itemlist.view.ItemListEditor',
		'module.custom.aone.item.itemlist.view.ItemListEditorLister',
		'module.custom.aone.item.itemlist.view.ItemListIsosLister',
		'module.custom.aone.item.itemlist.view.ItemListMngtLister',
		'module.custom.aone.item.itemlist.view.ItemListMemoLister',
		'module.custom.aone.item.itemlist.view.ItemListWorkSearch',
		'module.custom.aone.item.itemlist.view.ItemListRettLister'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-itemlist-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			'module-itemlist-layout #mainpanel' : {
				tabchange : me.mainTabChange
			},
			// lister event
			'module-itemlist-work-search button[action=selectAction2]': { click : me.selectAction2	},		// 조회
			'module-itemlist-work-search button[action=selectAction3]': { click : me.selectAction3	},		// 조회
			'module-itemlist-lister button[action=exportAction]' : { click : me.exportAction  },	// 엑셀
			'module-itemlist-isos button[action=exportAction]'   : { click : me.exportAction1 },	// 엑셀
			'module-itemlist-rett button[action=exportAction]'   : { click : me.exportAction2 },	// 엑셀
			// lister event
			'module-itemlist-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-itemlist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-itemlist-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-itemlist-lister')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-itemlist-editor')[0] },
		isos   : function () { return Ext.ComponentQuery.query('module-itemlist-isos')[0] },
		rett   : function () { return Ext.ComponentQuery.query('module-itemlist-rett')[0] },
		workSearch   : function () { return Ext.ComponentQuery.query('module-itemlist-work-search')[0] }
	},

	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			layout		= me.pocket.layout(),
			lister		= me.pocket.lister(),
			tindex		= tabPanel.items.indexOf(newCard),
			isos		= me.pocket.isos(),
			rett		= me.pocket.rett(),
			records		= lister.getSelectionModel().getSelection(),
			workSearch	= me.pocket.workSearch(),
			search1		= layout.down('[itemId=search1]'),
			search2		= layout.down('[itemId=search2]')
		;
		if (tindex == 1) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "수불내역을 조회할 품목을  선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			var param = JSON.stringify({
				stor_id			: _global.stor_id,
				hqof_idcd		: _global.hqof_idcd,
				item_idcd		: records[0].get('item_idcd'),
				to_date			: me.getFormatDate(new Date()),
				fr_date			: me.getFormatDate(new Date()),
				job_dvcd		: 'item'
			})
			search1.down('[name=item_code]').setValue(records[0].get('item_code'));
			search1.down('[name=item_name]').setValue(records[0].get('item_name'));
			search1.down('[name=item_spec]').setValue(records[0].get('item_spec'));
			workSearch.down('[name=invc_date1]').show();
			workSearch.down('[name=invc_date2]').show();
			workSearch.down('[name=invc_date3]').hide();
			workSearch.down('[name=invc_date4]').hide();
			workSearch.down('[itemId=isos]').show();
			workSearch.down('[itemId=rett]').hide();
			isos.select({
				callback : function(records, operation, success) {
					if (success) {
						isos.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {param : param },{stor_id : _global.stor_id}) );
		}
		else if (tindex == 2) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "반품내역을 조회할 품목을  선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			search2.down('[name=item_code]').setValue(records[0].get('item_code'));
			search2.down('[name=item_name]').setValue(records[0].get('item_name'));
			search2.down('[name=item_spec]').setValue(records[0].get('item_spec'));
			search2.down('[name=invc_date1]').hide();
			search2.down('[name=invc_date2]').hide();
			search2.down('[name=invc_date3]').show();
			search2.down('[name=invc_date4]').show();
			search2.down('[itemId=isos]').hide();
			search2.down('[itemId=rett]').show();
			rett.select({
				callback : function(records, operation, success) {
					if (success) {
						rett.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {item_idcd : records[0].get('item_idcd')} ,{fr_date : me.getFormatDate(new Date())},{to_date : me.getFormatDate(new Date())},{stor_id : _global.stor_id}) );
		}
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
		var me = this,
			editor = me.pocket.editor()
		;
		editor.down('[title=이미지]').down('[name=image]').setSrc('');
		editor.down('[title=이미지]').down('[name=image2]').setSrc('');

		if(record[0]){
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/aone/item/itemmast/get/image.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						item_idcd			: record[0].get('item_idcd'),
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
					} else {
						var item_imge = result.records[0].item_imge;
						var item_imge2 = result.records[0].item_imge2;
						if(item_imge != undefined){
							var x = item_imge.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image]').setSrc(url);
						}
						if(item_imge2 != undefined){
							var x = item_imge2.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image2]').setSrc('');
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	},

	//worker-lister 조회
	selectAction2 : function() {
		var me = this,
			layout		= me.pocket.layout(),
			workSearch	= me.pocket.workSearch(),
			lister		= me.pocket.lister(),
			isos		= me.pocket.isos(),
			records		= lister.getSelectionModel().getSelection(),
			search1		= layout.down('[itemId=search1]'),
			param		= workSearch.getValues()
			invc_date1_1= search1.down('[name=invc_date1]').getValue()
			invc_date1	= Ext.Date.format(invc_date1_1,'Ymd')
			invc_date2_1= search1.down('[name=invc_date2]').getValue()
			invc_date2	= Ext.Date.format(invc_date2_1,'Ymd')
		;
		if(invc_date1 == null || invc_date1 == '' ) {
			Ext.Msg.alert("알림","수불일자를 반드시 입력해주십시오.");
		}

		if(invc_date2 == null || invc_date2 == '' ) {
			Ext.Msg.alert("알림","수불일자를 반드시 입력해주십시오.");
		}else{
			var param = JSON.stringify({
				stor_id			: _global.stor_id,
				hqof_idcd		: _global.hqof_idcd,
				item_idcd		: records[0].get('item_idcd'),
				fr_date			: invc_date1,
				to_date			: invc_date2,
				job_dvcd		: 'item'
			})
			isos.select({
				callback : function(records, operation, success) {
					if (success) {
						isos.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {param : param },{stor_id : _global.stor_id}) );
		}
	},

	//worker-lister 조회
	selectAction3 : function() {
		var me = this,
		layout		= me.pocket.layout(),
		workSearch	= me.pocket.workSearch(),
		lister		= me.pocket.lister(),
		rett		= me.pocket.rett(),
		records		= lister.getSelectionModel().getSelection(),
		search2		= layout.down('[itemId=search2]'),
		param		= workSearch.getValues(),
		invc_date3_1= search2.down('[name=invc_date3]').getValue()
		invc_date3	= Ext.Date.format(invc_date3_1,'Ymd')
		invc_date4_1= search2.down('[name=invc_date4]').getValue()
		invc_date4	= Ext.Date.format(invc_date4_1,'Ymd')
		;

		console.log(invc_date3);
		console.log(invc_date4);

		if(invc_date3 == null || invc_date3 == '' ) {
			Ext.Msg.alert("알림","반품일자를 반드시 입력해주십시오.");
		}

		if(invc_date4 == null || invc_date4 == '' ) {
			Ext.Msg.alert("알림","반품일자를 반드시 입력해주십시오.");
		}else{
			rett.select({
				callback : function(records, operation, success) {
					if (success) {
						rett.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {
				item_idcd : records[0].get('item_idcd'),
				fr_date : invc_date3,
				to_date : invc_date4
				}));
		}
	},


	//수정
	modifyAction:function() {
		var me = this,
		editor = me.pocket.editor();
		editor.modifyRecord({
			caller	: me,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true } );
				}
			}
		});
	},

	//신규
	insertAction:function() {
		var me = this,
			search = me.pocket.search(),
			lister = me.pocket.lister(),
			editor = me.pocket.editor(),
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
						table_nm	: 'item_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							item_idcd : keygen.records[0].seq
						}),
						lister		: lister,
						disables	: [me.pocket.layout().down('#mainpanel')],
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
					if (record.phantom && Ext.isEmpty(record.get('item_code'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'item_mast'
								})
							 },
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('item_idcd' , keygen.records[0].seq );
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

	//삭제
	deleteAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.deleteRecord({
			lister		: me.pocket.lister(),
			callback	: function(results, record, store) {
				store.sync({
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	//엑셀
	exportAction : function(){
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
	getFormatDate:function(date){
		var year = date.getFullYear();              //yyyy
		var month = (1 + date.getMonth());          //M
		month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
		var day = date.getDate();                   //d
		day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
		return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
	}
});
