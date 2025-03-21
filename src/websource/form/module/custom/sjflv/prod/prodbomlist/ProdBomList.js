Ext.define( 'module.custom.sjflv.prod.prodbomlist.ProdBomList', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.CstmPopup',
	],
	models: [
		'module.custom.sjflv.prod.prodbomlist.model.ProdBomListLister1',
		'module.custom.sjflv.prod.prodbomlist.model.ProdBomListLister2',
		'module.custom.sjflv.prod.prodbomlist.model.ProdBomListLister3',
		'module.custom.sjflv.prod.prodbomlist.model.ProdBomListLister5',
	],
	stores: [
		'module.custom.sjflv.prod.prodbomlist.store.ProdBomListLister1',
		'module.custom.sjflv.prod.prodbomlist.store.ProdBomListLister2',
		'module.custom.sjflv.prod.prodbomlist.store.ProdBomListLister3',
		'module.custom.sjflv.prod.prodbomlist.store.ProdBomListLister4',
		'module.custom.sjflv.prod.prodbomlist.store.ProdBomListLister5',
		'module.custom.sjflv.prod.prodbomlist.store.ProdBomListLister6',
		'module.custom.sjflv.prod.prodbomlist.store.ProdBomListLister7',
		
	],
	views : [
		'module.custom.sjflv.prod.prodbomlist.view.ProdBomListLayout',
		'module.custom.sjflv.prod.prodbomlist.view.ProdBomListLister1',
		'module.custom.sjflv.prod.prodbomlist.view.ProdBomListLister2',
		'module.custom.sjflv.prod.prodbomlist.view.ProdBomListLister3',
		'module.custom.sjflv.prod.prodbomlist.view.ProdBomListLister4',
		'module.custom.sjflv.prod.prodbomlist.view.ProdBomListLister5',
		'module.custom.sjflv.prod.prodbomlist.view.ProdBomListLister6',
		'module.custom.sjflv.prod.prodbomlist.view.ProdBomListLister7',
		'module.custom.sjflv.prod.prodbomlist.view.ProdBomListSearch'
	],
	initPermission: function(workspace, permission) {

	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-sjflv-prodbomlist-layout #mainpanel'							: { tabchange : me.tabChange },
			'module-sjflv-prodbomlist-search button[action=selectAction]'			: { click : me.selectAction }, // 조회

			'module-sjflv-prodbomlist-lister3 button[action=printAction]'		: { click : me.printAction       }, // OEM 발주서 발행
			'module-sjflv-prodbomlist-lister3 button[action=exportAction]'		: { click : me.exportAction      }, // 엑셀

			'module-sjflv-prodbomlist-lister4 button[action=calBOMAction]'		: { click : me.calBOMAction       }, // OEM 발주서 발행
			'module-sjflv-prodbomlist-lister5 button[action=exportAction]'		: { click : me.exportAction2      }, // 엑셀
			
			'module-sjflv-prodbomlist-lister6 button[action=calBOMAction]'		: { click : me.calBOMAction2      }, // OEM 발주서 발행
			'module-sjflv-prodbomlist-lister7 button[action=exportAction]'		: { click : me.exportAction3      }, // 엑셀
			
			// lister event
			'module-sjflv-prodbomlist-lister1' : {
				itemclick      : me.selectAction1
			},
			'module-sjflv-prodbomlist-lister2' : {
				itemclick      : me.selectAction2
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-sjflv-prodbomlist-layout')[0] } ,
		search  : function () { return Ext.ComponentQuery.query('module-sjflv-prodbomlist-search')[0] } ,
		lister1 : function () { return Ext.ComponentQuery.query('module-sjflv-prodbomlist-lister1')[0] } ,
		lister2 : function () { return Ext.ComponentQuery.query('module-sjflv-prodbomlist-lister2')[0] } ,
		lister3 : function () { return Ext.ComponentQuery.query('module-sjflv-prodbomlist-lister3')[0] } ,
		lister4 : function () { return Ext.ComponentQuery.query('module-sjflv-prodbomlist-lister4')[0] } ,
		lister5 : function () { return Ext.ComponentQuery.query('module-sjflv-prodbomlist-lister5')[0] } ,
		lister6 : function () { return Ext.ComponentQuery.query('module-sjflv-prodbomlist-lister6')[0] } ,
		lister7 : function () { return Ext.ComponentQuery.query('module-sjflv-prodbomlist-lister7')[0] } ,
	},
	tabChange:function() {
		var me = this,
			tpanel  = me.pocket.layout().down('#mainpanel'),
			tindex  = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if (tindex == 0) {
			me.pocket.search().down('[name=clss_desc]').hide();
		} else {
			me.pocket.search().down('[name=clss_desc]').show();
		}
	},
	/**
	 * 조회
	 */
	selectAction:function() {
		var me = this,
			lister1 = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			lister4 = me.pocket.lister4(),
			lister5 = me.pocket.lister5(),
			lister6 = me.pocket.lister6(),
			lister7 = me.pocket.lister7(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			tpanel  = me.pocket.layout().down('#mainpanel'),
			tindex  = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister  = undefined
		;

		if (tindex == 0) {
			lister = lister1;
			lister2.getStore().clearData();
			lister2.getStore().removeAll();
			lister3.getStore().clearData();
			lister3.getStore().removeAll();
		} else if (tindex == 1) {
			lister = lister4;
			lister5.getStore().clearData();
			lister5.getStore().removeAll();
		} else if (tindex == 2) {
			lister = lister6;
			lister7.getStore().clearData();
			lister7.getStore().removeAll();
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { }
				mask.hide();
			}, scope:me
		},Ext.merge(param, {hq_id  : _global.hq_id}));
	},

	/**
	 *
	 */
	selectAction1:function( grid, record, item, index, e ){
		var me = this,
			lister = me.pocket.lister2(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3()
		;
		lister3.getStore().clearData();
		lister3.getStore().removeAll();

		if (record ){
			resource.mask.show({msg: Const.SELECT.mask });
			lister.select({
				callback:function(records, operation, success) {
					resource.mask.hide();
				}, scope:me
			},Ext.merge( me.pocket.search().getValues(), {
				hq_id		: _global.hq_id,
				item_idcd	: record.get('item_idcd') ,
				revs_dvcd	: lister2.down('[name=revs_dvcd]').getValue(),
			}));
		}
	},

	/**
	 *
	 */
	selectAction2:function( grid, record, item, index, e ){
		var me = this,
			lister = me.pocket.lister3()
		;
		if (record ){
			resource.mask.show({msg: Const.SELECT.mask });
			lister.select({
				callback:function(records, operation, success) {
					resource.mask.hide();
				}, scope:me
			},Ext.merge( me.pocket.search().getValues(),{
				hq_id		: _global.hq_id,
				prnt_item_idcd	: record.get('prnt_item_idcd') ,
				revs_numb	: record.get('revs_numb') ,
				revs_dvcd	: record.get('revs_dvcd') ,
				prnt_idcd	: record.get('prnt_idcd')
			}));
		}
	},

	printAction: function(){
		var me = this,
			lister1 = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			select = lister1.getSelectionModel().getSelection()[0],
			select2 = lister2.getSelectionModel().getSelection()[0],
			jrf = 'sjflv_item_purcorder.jrf',
			resId = _global.hq_id.toUpperCase()
		;

		var acpt_dvcd = select.get('acpt_dvcd'),
			invc_numb = select.get('invc_numb'),
			line_seqn = select.get('line_seqn'),
			item_idcd = select.get('item_idcd')
		;

		if (acpt_dvcd != '2000') {
			Ext.Msg.alert("알림", "OEM 수주를 선택하세요.");
			return;
		}

		if (select2) {
			var	revs_numb = select2.get('revs_numb'),
				revs_dvcd = 1
			;

			var arg =	'invc_numb~'+invc_numb+'~line_seqn~'+line_seqn+'~item_idcd~'+item_idcd+'~revs_numb~'+revs_numb+'~revs_dvcd~'+revs_dvcd+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';

			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
			});
		} else {
			Ext.Msg.alert("알림", "리비전을 선택하세요.");
		}
	},

	calBOMAction: function(){
		var me		= this,
			lister4 = me.pocket.lister4(),
			lister5 = me.pocket.lister5(),
			record	= lister4.getSelectionModel().getSelection(),
			records	= lister4.getSelectionModel().getSelection(),
			search  = me.pocket.search(),
			param   = search.getValues()
		;

		lister5.getStore().clearData();
		lister5.getStore().loadData([],false);

		var a =[];
		var msg = "";
		lister4.getStore().each(function(record) {
			if(record.get('revs_numb') == '') {
				msg = "리비전을 입력하세요.";
			}else{
				a.push({invc_numb : record.get('invc_numb'),line_seqn : record.get('line_seqn'),prnt_item_idcd : record.get('item_idcd'), revs_numb : record.get('revs_numb'), invc_qntt : record.get('invc_qntt')});
			}
		})

		if (msg != "") {
			Ext.Msg.alert('알림',msg);
			return;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		lister5.select({
			callback:function(records, operation, success) {
				if (success) {
				} else {}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {records:a} ) );
	},
	
	calBOMAction2: function(){
		var me		= this,
			lister6 = me.pocket.lister6(),
			lister7 = me.pocket.lister7(),
			record	= lister6.getSelectionModel().getSelection(),
			records	= lister6.getSelectionModel().getSelection(),
			search  = me.pocket.search(),
			param   = search.getValues()
		;

		lister7.getStore().clearData();
		lister7.getStore().loadData([],false);

		var a =[];
		var msg = "";
		lister6.getStore().each(function(record) {
			if(record.get('revs_numb') == '') {
				msg = "리비전을 입력하세요.";
			}else{
				a.push({invc_numb : record.get('invc_numb'),line_seqn : record.get('line_seqn'),prnt_item_idcd : record.get('item_idcd'), revs_numb : record.get('revs_numb'), invc_qntt : record.get('invc_qntt')});
			}
		})

		if (msg != "") {
			Ext.Msg.alert('알림',msg);
			return;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		lister7.select({
			callback:function(records, operation, success) {
				if (success) {
				} else {}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {records:a} ) );
	},
	
	exportAction : function(){
		var me = this;
		me.pocket.lister3().excelExport();
	},

	exportAction2 : function(){
		var me = this;
		me.pocket.lister5().excelExport();
	},
	
	exportAction3 : function(){
		var me = this;
		me.pocket.lister7().excelExport();
	},
});