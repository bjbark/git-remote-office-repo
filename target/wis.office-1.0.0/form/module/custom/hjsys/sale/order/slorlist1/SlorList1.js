Ext.define('module.custom.hjsys.sale.order.slorlist1.SlorList1', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3'
	],
	models	: [
		'module.custom.hjsys.sale.order.slorlist1.model.SlorList1Master',
		'module.custom.hjsys.sale.order.slorlist1.model.SlorList1Detail',
		'module.custom.hjsys.sale.order.slorlist1.model.SlorList1Detail2',
	],
	stores	: [
		'module.custom.hjsys.sale.order.slorlist1.store.SlorList1Master',
		'module.custom.hjsys.sale.order.slorlist1.store.SlorList1Detail',
		'module.custom.hjsys.sale.order.slorlist1.store.SlorList1Detail2',
	],
	views	: [
		'module.custom.hjsys.sale.order.slorlist1.view.SlorList1Layout',
		'module.custom.hjsys.sale.order.slorlist1.view.SlorList1Master',
		'module.custom.hjsys.sale.order.slorlist1.view.SlorList1Detail',
		'module.custom.hjsys.sale.order.slorlist1.view.SlorList1Editor',
		'module.custom.hjsys.sale.order.slorlist1.view.SlorList1Detail2',
		'module.custom.hjsys.sale.order.slorlist1.view.SlorList1Search'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-hjsys-slorlist1-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			'module-hjsys-slorlist1-layout #mainpanel'							: { tabchange : me.mainTabChange },
			// lister1 event
			'module-hjsys-slorlist1-lister-master button[action=exportAction]'	: { click : me.exportAction },	// 엑셀
			'module-hjsys-slorlist1-lister-detail button[action=exportAction]'	: { click : me.exportAction },	// 엑셀
			'module-hjsys-slorlist1-lister-master' : {
				selectionchange : me.attachRecord
			},
			'module-hjsys-slorlist1-lister-detail' : {
				selectionchange : me.selectAction2
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-hjsys-slorlist1-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-hjsys-slorlist1-search') [0] },
		editor		: function () { return Ext.ComponentQuery.query('module-hjsys-slorlist1-editor') [0] },
		detail		: function () { return Ext.ComponentQuery.query('module-hjsys-slorlist1-lister-detail') [0] },
		detail2		: function () { return Ext.ComponentQuery.query('module-hjsys-slorlist1-lister-detail2') [0] },
		master		: function () { return Ext.ComponentQuery.query('module-hjsys-slorlist1-lister-master')[0] },
	},

	//조회

	selectAction:function() {
		var me = this,
			master = me.pocket.master(),
			detail2 = me.pocket.detail2(),
			search = me.pocket.search(),
			param  = search.getValues(),
			store  = master.getStore(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined, select, selection
		;
		master.select({
			callback:function(records, operation, success) {
				if (success) {
					master.getSelectionModel().select(0,true);
					store.each(function(findrecord){
						selection = master.getSelectionModel().getSelection()[0];
						if(findrecord.get('hidden_numb') == selection.data.hidden_numb){
							master.getSelectionModel().select(findrecord.index,true);
						}
					});
				} else { }
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	selectAction2:function() {
		var me = this,
			detail = me.pocket.detail(),
			editor = me.pocket.editor(),
			select = detail.getSelectionModel().getSelection()[0]
		;
		if(select){
			detail.getStore().each(function(findrecord){
				if(findrecord.get('item_name') == select.get('item_name')){
					detail.getSelectionModel().select(findrecord.index,true);
				}
			});
		}
	},

	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			master = me.pocket.master(),
			search = me.pocket.search(),
			editor = me.pocket.editor(),
			detail = me.pocket.detail(),
			param  = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined,
			select = master.getSelectionModel().getSelection(),
			record
		;
		if(tindex == 0){
			master.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}else{
			if(select.length){
				for (var i = 0; i < select.length; i++) {
					if(select[i].get('cstm_name')){
						record = select[i];
						break;
					}
				}
				editor.selectRecord({ lister : master, record : record }, me);
				detail.select({
					callback:function(records, operation, success) {
						if (success) {
							tabPanel.setActiveTab(1);
						} else { }
					}, scope:me
				}, {hq_id : _global.hqof_idcd,invc_numb:record.get('hidden_numb') });
			}else{
				tabPanel.setActiveTab(0);
				Ext.Msg.alert('알림','수주를 선택해주세요.')
			}
		}
	},

	attachRecord:function( smodel, record ){
		var	me	= this,
			master= smodel ? smodel.view.ownerCt : me.pocket.master(),
			record= record ? record[0] : master.getSelectionModel().getSelection()[0],
			store = master.getStore()
		;

		store.each(function(findrecord){
			selection = master.getSelectionModel().getSelection()[0];
			if(findrecord.get('hidden_numb') == selection.data.hidden_numb){
				master.getSelectionModel().select(findrecord.index,true);
			}
		});
	},

	//선택


	// 엑셀
	exportAction : function(lister) {
		var me = this;
		if(lister.itemId=='detail'){
			me.pocket.detail().writer({enableLoadMask:true});
		}else{
			me.pocket.master().writer({enableLoadMask:true});
		}
	},
});