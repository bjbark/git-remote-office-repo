Ext.define('module.custom.hantop.item.cstmitemmap.CstmItemMap', { extend:'Axt.app.Controller',
	requires : [
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.WindItemPopup',
		'lookup.popup.view.BasePopup'
			],
	models	: [
		'module.custom.hantop.item.cstmitemmap.model.CstmItemMap',
		'module.custom.hantop.item.cstmitemmap.model.CstmItemMapItem1',
		'module.custom.hantop.item.cstmitemmap.model.CstmItemMapItem2',
	],
	stores	: [
		'module.custom.hantop.item.cstmitemmap.store.CstmItemMap',
		'module.custom.hantop.item.cstmitemmap.store.CstmItemMapItem1',
		'module.custom.hantop.item.cstmitemmap.store.CstmItemMapItem2',
	],
	views	: [
		'module.custom.hantop.item.cstmitemmap.view.CstmItemMapLayout',
		'module.custom.hantop.item.cstmitemmap.view.CstmItemMapSearch',
		'module.custom.hantop.item.cstmitemmap.view.CstmItemMapLister1',
		'module.custom.hantop.item.cstmitemmap.view.CstmItemMapListerItem',
		'module.custom.hantop.item.cstmitemmap.view.CstmItemMapListerItem1',
		'module.custom.hantop.item.cstmitemmap.view.CstmItemMapListerItem2',
		'module.custom.hantop.item.cstmitemmap.view.CstmItemMapListerItem3',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-cstmitemmap-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			'module-cstmitemmap-lister-item button[action=selectAction2]'	: { click : me.selectAction2},	//매핑되있는 품목조회
			'module-cstmitemmap-lister-item3 button[action=selectAction3]'	: { click : me.selectAction3},	//매핑안되있는 품목조회

			'module-cstmitemmap-layout button[action=oneenrollment]'		: { click : me.oneenrollment },	//등록(<)
			'module-cstmitemmap-layout button[action=remove]'				: { click : me.remove },		//삭제(>)
			// lister event
			'module-cstmitemmap-lister1 button[action=exportAction]'		: { click : me.exportAction1 },		// 엑셀

			'module-cstmitemmap-search combobox[name=acct_bacd]'			: { select: me.selectLookup  },

			'module-cstmitemmap-layout #mainpanel' : {
				tabchange : me.mainTabChange
			},
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-cstmitemmap-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-cstmitemmap-search') [0] },
		item		: function () { return Ext.ComponentQuery.query('module-cstmitemmap-lister-item')[0] },
		lister		: function () { return Ext.ComponentQuery.query('module-cstmitemmap-lister1')[0] },
		item1		: function () { return Ext.ComponentQuery.query('module-cstmitemmap-lister-item1')[0] },
		item2		: function () { return Ext.ComponentQuery.query('module-cstmitemmap-lister-item2')[0] },
		item3		: function () { return Ext.ComponentQuery.query('module-cstmitemmap-lister-item3')[0] }
	},

	//조회
	selectAction : function() {
		var me = this,
			lister	= me.pocket.lister(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())

		;

		if(param.acct_bacd == '' || param.acct_bacd == null){
			Ext.Msg.alert("알림","계정구분을 선택해주세요.");
			return;
		}

		if(tindex==0 && !Ext.isEmpty(param.acct_bacd )){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( me.pocket.search().getValues(), {stor_id : _global.stor_id}) );
		}else {
			Ext.Msg.alert("알림","자재리스트에서 조회하여 주십시오.");
		}
	},

	selectAction2 : function() {
		var me = this,
			item1 = me.pocket.item1(),
			item = me.pocket.item(),
			search	= me.pocket.search(),
			param = item.getValues()
		;

		if(param.item_code == '' || param.item_code == null){
			Ext.Msg.alert("알림","자재코드를 반드시 선택해주세요.");
			return;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		item1.select({
			callback:function(records, operation, success) {
				if (success) {
					mask.hide();
				} else {
				}
			}, scope:me
		}, Ext.merge(me.pocket.search().getValues(),{
			item_idcd		: param.item_idcd

		}));
	},

	selectAction3 : function() {
		var me = this,
			item3 = me.pocket.item3(),
			item = me.pocket.item(),
			param = item3.getValues()
		;

		if(param.brnd_bacd == '' || param.brnd_bacd == null){
			Ext.Msg.alert("알림","브랜드를 반드시 선택해주세요.");
			return;
		}

		if(param.brnd_bacd == '00' ){
			Ext.Msg.alert("알림","한탑(자사브랜드)는 품목을 매핑시킬수없습니다. 다시 선택후 조회해주세요.");
			return;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		item2.select({
			callback:function(records, operation, success) {
				if (success) {;
				} else { }
				mask.hide();
			}, scope:me
		}, Ext.merge(me.pocket.search().getValues(), {
			brnd_bacd		: param.brnd_bacd,
			acct_bacd		: param.acct_bacd,
			item_name		: param.item_name2
			}) );
	},

	selectLookup:function() {
		this.selectAction();
	},

	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			lister	= me.pocket.lister();
			search	= me.pocket.search();
			tindex	= tabPanel.items.indexOf(newCard),
			item	= me.pocket.item(),
			item1	= me.pocket.item1(),
			item2	= me.pocket.item2(),
			item3	= me.pocket.item3(),
			param	= search.getValues(),
			records	= lister.getSelectionModel().getSelection(),
			searchForm = Ext.ComponentQuery.query('module-cstmitemmap-search')[0]
		;
		if(tindex==0){

//			lister.select({
//				callback:function(records, operation, success) {
//					if (success) {
//						lister.getSelectionModel().select(0);
//					} else { me.pocket.editor().getForm().reset(true);}
//					mask.hide();
//				}, scope:me
//			}, Ext.merge( me.pocket.search().getValues(), {stor_id : _global.stor_id}) );

			searchForm.down('[name=acct_bacd]').setReadOnly(false);

			item2.getStore().clearData();
			item2.getStore().loadData([],false);

			item3.down('[name=brnd_name]').setValue(null);
			item3.down('[name=item_name2]').setValue(null);

		}
		if (tindex == 1 || !records || records.length<1) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "매핑할 자재 선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			var record = records[0];
			item.down('[name=item_idcd]').setValue(record.get('item_idcd'));
			item.down('[name=item_code]').setValue(record.get('item_code'));
			item.down('[name=item_name]').setValue(record.get('item_name'));
			item.down('[name=acct_bacd]').setValue(record.get('acct_bacd'));

			item1.select({
				callback : function(records, operation, success) {
					if (success) {
						item1.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( me.pocket.search().getValues(),{item_idcd : record.get('item_idcd')},{stor_id : _global.stor_id}, {}) );

			searchForm.down('[name=acct_bacd]').setReadOnly(true);

//			item2.select({
//				callback : function(records, operation, success) {
//					if (success) {
//						item2.getSelectionModel().select(0);
//					} else {
//					}
//				}, scope:me
//			}, Ext.merge( {acct_bacd	: param.acct_code},{stor_id : _global.stor_id}, {}) );

		}
	},

	oneenrollment:function() {
		var me = this,
			record		= new Array(),
			item1		= me.pocket.item1(),
			item2		= me.pocket.item2(),
			item3		= me.pocket.item3(),
			seqn		= Number(0),
			store		= item1.getStore(),
			store2		= item2.getStore(),
			lister		= me.pocket.lister(),
			mrecords	= item2.getSelectionModel().getSelection(),
			mrecord		= mrecords[0],
			selects		= item2.getSelectionModel().getSelection(),
			item		= me.pocket.item(),
			param		= item3.getValues()
			val			= item.getForm().getValues()
		;
		if (!selects || selects.length<1) {
			Ext.Msg.alert("알림", "매핑시킬 품목을  선택하여 주십시오.");
			return;
		};

		if(store.data.items.length >0){
			seqn = Number(store.data.items[store.data.items.length-1].data.line_seqn)+1;
		}else{
			seqn = 1;
		}
		if(val.item_idcd == ''){
			Ext.Msg.alert("알림", "품목코드를 선택하여 주십시오.");
			return;
		}

		var i = 0;
		for( i = 0; i<selects.length; i++){
			record[i] = Ext.create( store.model.modelName , {
			_set			: 'insert',
			item_idcd		: val.item_idcd,
			item_code		: selects[i].get('item_code') ,
			item_name		: selects[i].get('item_name') ,
			acct_bacd		: selects[i].get('acct_bacd') ,
			brnd_bacd		: selects[i].get('brnd_bacd') ,
			brnd_name		: selects[i].get('brnd_name') ,
			cont_pric		: selects[i].get('puch_pric') ,
			brnd_item_idcd	: selects[i].get('item_idcd'),
			brnd_item_name	: val.item_name,
			brnd_acct_bacd	: val.acct_bacd,
			line_seqn		: seqn++,
			line_stat		: '0'
			});
		}
		store.add(record);
		store.sync({
			callback: function(batch, options) {
				item2.select({
					callback : function(records, operation, success) {
						if (success) {
							item2.getSelectionModel().select(0);
						} else {
						}
					}, scope:me
				}, Ext.merge( { brnd_bacd	: param.brnd_bacd, },{stor_id : _global.stor_id}, {}) );
			} ,
			scope: me
		},{	synchro : _global.objects.synchro} );
	},

	// > 삭제버튼 클릭
	remove:function() {
		var me = this,
			item1		= me.pocket.item1(),
			store		= item1.getStore(),
			selects		= item1.getSelectionModel().getSelection(),
			store2		= item2.getStore(),
			selects		= item1.getSelectionModel().getSelection()
		;

		if (!selects || selects.length<1) {
			Ext.Msg.alert("알림", "삭제할 품목을  선택하여 주십시오.");
			return;
		};

		store.remove (selects);
		store.sync({
			callback : function() {
				store2.reload();
			}
		});
	},

	// 엑셀
	exportAction1 : function() {
		this.pocket.lister1().writer({enableLoadMask:true});
	},
	exportAction2 : function() {
		this.pocket.lister2().writer({enableLoadMask:true});
	},
	exportAction3 : function() {
		this.pocket.lister3().writer({enableLoadMask:true});
	},

});