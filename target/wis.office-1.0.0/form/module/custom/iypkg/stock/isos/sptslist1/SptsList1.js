Ext.define('module.custom.iypkg.stock.isos.sptslist1.SptsList1', { extend : 'Axt.app.Controller',

	requires:[
	],

	models:[
		'module.custom.iypkg.stock.isos.sptslist1.model.SptsList1Lister',
	],
	stores:[
		'module.custom.iypkg.stock.isos.sptslist1.store.SptsList1Lister',
		'module.custom.iypkg.stock.isos.sptslist1.store.SptsList1Lister2',
		'module.custom.iypkg.stock.isos.sptslist1.store.SptsList1Lister3',
	],
	views : [
		'module.custom.iypkg.stock.isos.sptslist1.view.SptsList1Layout',
		/* 현황 */
		'module.custom.iypkg.stock.isos.sptslist1.view.SptsList1Search',
		'module.custom.iypkg.stock.isos.sptslist1.view.SptsList1Lister',
		'module.custom.iypkg.stock.isos.sptslist1.view.SptsList1Lister2',
		'module.custom.iypkg.stock.isos.sptslist1.view.SptsList1Lister3',
		'module.custom.iypkg.stock.isos.sptslist1.view.SptsList1ListerDate1',
		'module.custom.iypkg.stock.isos.sptslist1.view.SptsList1ListerDate2',
		'module.custom.iypkg.stock.isos.sptslist1.view.SptsList1ListerDate3',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-sptslist1-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
		});
		me.callParent(arguments);
	},
	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-sptslist1-layout')[0] },
		search  : function () { return Ext.ComponentQuery.query('module-sptslist1-search')[0] },
		lister1 : function () { return Ext.ComponentQuery.query('module-sptslist1-lister')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-sptslist1-lister2')[0] },
		lister3 : function () { return Ext.ComponentQuery.query('module-sptslist1-lister3')[0] },
		date1   : function () { return Ext.ComponentQuery.query('module-sptslist1-lister-date1')[0] },
		date2   : function () { return Ext.ComponentQuery.query('module-sptslist1-lister-date2')[0] },
		date3   : function () { return Ext.ComponentQuery.query('module-sptslist1-lister-date3')[0] },
	},

	selectAction:function(callbackFn) {
		var me = this,
			search	= me.pocket.search(),
			param	= search.getValues(),
			date1	= me.pocket.date1(),
			date2	= me.pocket.date2(),
			date3	= me.pocket.date3(),
			lister1	= me.pocket.lister1(),
			lister2	= me.pocket.lister2(),
			lister3	= me.pocket.lister3(),
			y,m,d, date1_val, date2_val, date3_val
		;

		if(param.plan_date == '' || param.plan_date == null){
			Ext.Msg.alert("알림","기준일자를 선택하여 주십시오.");
			return;
		}

		var date1_val = Ext.Date.format(Ext.Date.add(new Date(search.down('[name=plan_date]').getValue()),Ext.Date.DAY,-1), 'Ymd'),
			date2_val = Ext.Date.format(new Date(search.down('[name=plan_date]').getValue()), 'Ymd'),
			date3_val = Ext.Date.format(Ext.Date.add(new Date(search.down('[name=plan_date]').getValue()),Ext.Date.DAY,1), 'Ymd')
		;

		date1.down('[name=date1]').setValue(date1_val);	//이전날짜
		date2.down('[name=date2]').setValue(date2_val);	//오늘날짜
		date3.down('[name=date3]').setValue(date3_val);	//다음날짜

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		lister1.select({
			 callback:function(records, operation, success) {
				if (success) {
				} else {}
			}, scope:me
		}, Ext.merge(param, { stor_grp : _global.stor_grp, invc_date : date1_val }));

		lister2.select({
			 callback:function(records, operation, success) {
				if (success) {
				} else {}
				mask.hide();
			}, scope:me
		}, Ext.merge(param, { stor_grp : _global.stor_grp, invc_date : date2_val }));

		lister3.select({
			 callback:function(records, operation, success) {
				if (success) {
				} else {}
			}, scope:me
		}, Ext.merge(param, { stor_grp : _global.stor_grp, invc_date : date3_val }));


	},

});
