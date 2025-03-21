Ext.define('module.sale.project.prjtlist.PrjtList', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.PjodPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.PrjtPopup',
		'lookup.upload.BoardUpload'
	],

	models	: [
		'module.sale.project.prjtlist.model.PrjtListMaster',
		'module.sale.project.prjtlist.model.PrjtListDetail1',
		'module.sale.project.prjtlist.model.PrjtListDetail2',
		'module.sale.project.prjtlist.model.PrjtListDetail3',
		'module.sale.project.prjtlist.model.PrjtListDetail4',
		'module.sale.project.prjtlist.model.PrjtListInvoice',
		'module.sale.project.prjtlist.model.PrjtListFile'
	],
	stores	: [
		'module.sale.project.prjtlist.store.PrjtListMaster',
		'module.sale.project.prjtlist.store.PrjtListDetail1',
		'module.sale.project.prjtlist.store.PrjtListDetail2',
		'module.sale.project.prjtlist.store.PrjtListDetail3',
		'module.sale.project.prjtlist.store.PrjtListDetail4',
		'module.sale.project.prjtlist.store.PrjtListInvoice',
		'module.sale.project.prjtlist.store.PrjtListFile'
	],
	views	: [
		'module.sale.project.prjtlist.view.PrjtListLayout',
		'module.sale.project.prjtlist.view.PrjtListSearch',
		'module.sale.project.prjtlist.view.PrjtListListerMaster',
		'module.sale.project.prjtlist.view.PrjtListListerDetail1',
		'module.sale.project.prjtlist.view.PrjtListListerDetail2',
		'module.sale.project.prjtlist.view.PrjtListListerDetail3',
		'module.sale.project.prjtlist.view.PrjtListListerDetail4',
		'module.sale.project.prjtlist.view.PrjtListEditor',
		'module.sale.project.prjtlist.view.PrjtListEditor2',
		'module.sale.project.prjtlist.view.PrjtListAppendFiles',
		'module.sale.project.prjtlist.view.PrjtListImg'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prjtlist-layout button[action=selectAction]'				: { click : me.selectAction },		// 조회
			'module-prjtlist-layout #detail'									: { tabchange : me.selectDetail },
			// lister master event
			'module-prjtlist-lister-master button[action=exportAction]'			: { click : me.exportAction },		// 엑셀
			// lister detail2 event
			'module-prjtlist-lister-detail1 button[action=exportAction]'		: { click : me.exportAction1 },		// 엑셀
			// lister detail1 event
			'module-prjtlist-lister-detail2 button[action=exportAction]'		: { click : me.exportAction2},		// 엑셀
			// lister detail3 event
			'module-prjtlist-lister-detail3 button[action=exportAction]'		: { click : me.exportAction3},		// 엑셀
			// lister detail4 event
			'module-prjtlist-lister-detail4 button[action=exportAction]'		: { click : me.exportAction4},		// 엑셀
			// lister master event
			'module-prjtlist-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectionchange
			},
			'module-prjtlist-lister-detail1' : {
				selectionchange: me.selectRecord
			},
			'module-prjtlist-layout #mainpanel' : {
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout			: function () { return Ext.ComponentQuery.query('module-prjtlist-layout')[0] },
		search			: function () { return Ext.ComponentQuery.query('module-prjtlist-search')[0] },
		listermaster	: function () { return Ext.ComponentQuery.query('module-prjtlist-lister-master')[0] },
		listerdetail1	: function () { return Ext.ComponentQuery.query('module-prjtlist-lister-detail1')[0] },
		listerdetail2	: function () { return Ext.ComponentQuery.query('module-prjtlist-lister-detail2')[0] },
		listerdetail3	: function () { return Ext.ComponentQuery.query('module-prjtlist-lister-detail3')[0] },
		listerdetail4	: function () { return Ext.ComponentQuery.query('module-prjtlist-lister-detail4')[0] },
		paysearch		: function () { return Ext.ComponentQuery.query('module-prjtlist-paysearch')[0] },
		paylister		: function () { return Ext.ComponentQuery.query('module-prjtlist-paylister')[0] },
		editor			: function () { return Ext.ComponentQuery.query('module-prjtlist-editor')[0] },
		editor2			: function () { return Ext.ComponentQuery.query('module-prjtlist-editor2')[0] },
		consultingpopup	: function () { return Ext.ComponentQuery.query('module-prjtlist-consultingpopup')[0] },
		resultpopup		: function () { return Ext.ComponentQuery.query('module-prjtlist-resultpopup')[0] },
		editorlister	: function () { return Ext.ComponentQuery.query('module-prjtlist-editorlister')[0] },
		img				: function () { return Ext.ComponentQuery.query('module-prjtlist-img')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			search       = me.pocket.search(),
			param        = search.getValues()
		;
		if(param.regi_date1>param.regi_date2 || param.deli_date1>param.deli_date2){
			Ext.Msg.alert("알림","일자를 다시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			listermaster.select({
				callback:function(records, operation, success) {
				if (success) {
					listermaster.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	//선택
	selectDetail:function( grid, record ){
		var me = this,
			editor = me.pocket.editor(),
			tpanel = me.pocket.layout().down('#detail'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined,
			listermaster  = me.pocket.listermaster(),
			listerdetail1 = me.pocket.listerdetail1(),
			listerdetail2 = me.pocket.listerdetail2(),
			listerdetail3 = me.pocket.listerdetail3(),
			listerdetail4 = me.pocket.listerdetail4(),
			editorlister  = me.pocket.editorlister(),
			paylister     = me.pocket.paylister(),
			img           = me.pocket.img(),
			record        = listermaster.getSelectionModel().getSelection()[0]
		;
		if(record==null){
			return;
		}else if(tindex == 5){
			img.down('[name=item_imge]').setValue(record.get('item_imge'));
			img.down('[name=item_imge2]').setValue(record.get('item_imge2'));
		}else{
			if(tindex!=4){
				if(tindex == 0){
					lister = listerdetail1
				}else if(tindex == 1){
					lister = listerdetail2
				}else if(tindex == 2){
					lister = listerdetail3
				}else if(tindex == 3){
					lister = listerdetail4
				}else if(tindex == 4){
					lister = editorlister
				}
				lister.select({
					callback : function(records, operation, success) {
							if (success) {
							} else {}
						}, scope : me
				}, { pjod_idcd : record.get('pjod_idcd') });

			}else{
				editorlister.select({
					 callback : function(records, operation, success) {
							if (success) {
							} else {}
						}, scope : me
				}, { invc_numb : record.get('pjod_idcd'),orgn_dvcd : 'pjod_mast' });

//				editorlister.down('[name=file]').popup.params.invc_numb = record.get('pjod_idcd');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
			}
		}
	},

	selectionchange:function( grid, records ){
		var me = this,
			listerdetail1 = me.pocket.listerdetail1(),
			listerdetail2 = me.pocket.listerdetail2(),
			listerdetail3 = me.pocket.listerdetail3(),
			listerdetail4 = me.pocket.listerdetail4(),
			editorlister  = me.pocket.editorlister(),
			img           = me.pocket.img()
		;
		listerdetail1.getStore().clearData();
		listerdetail1.getStore().loadData([],false);

		listerdetail2.getStore().clearData();
		listerdetail2.getStore().loadData([],false);

		listerdetail3.getStore().clearData();
		listerdetail3.getStore().loadData([],false);

		listerdetail4.getStore().clearData();
		listerdetail4.getStore().loadData([],false);

		editorlister.getStore().clearData();
		editorlister.getStore().loadData([],false);

		img.down('[name=item_imge]').setValue('');
		img.down('[name=item_imge2]').setValue('');
	},

	selectRecord:function( grid, record ){
		var me = this,
			editor2 = me.pocket.editor2()
		;
		editor2.selectRecord({ listerdetail1 : me.pocket.listerdetail1(), record : record }, me);
	},


	// 엑셀
	exportAction : function() {
		this.pocket.listermaster().writer({enableLoadMask:true});
	},

	exportAction1 : function() {
		this.pocket.listerdetail1().writer({enableLoadMask:true});
	},

	exportAction2 : function() {
		this.pocket.listerdetail2().writer({enableLoadMask:true});
	},

	exportAction3 : function() {
		this.pocket.listerdetail3().writer({enableLoadMask:true});
	},

	exportAction4 : function() {
		this.pocket.listerdetail4().writer({enableLoadMask:true});
	}
});