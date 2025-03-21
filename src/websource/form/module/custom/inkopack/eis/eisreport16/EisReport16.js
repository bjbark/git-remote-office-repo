Ext.define('module.custom.inkopack.eis.eisreport16.EisReport16', { extend:'Axt.app.Controller',
	requires : [
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmPopup',
	],
	models	: [
		'module.custom.inkopack.eis.eisreport16.model.EisReport16Master',
	],
	stores	: [
		'module.custom.inkopack.eis.eisreport16.store.EisReport16Master',
	],
	views	: [
		'module.custom.inkopack.eis.eisreport16.view.EisReport16Layout',
		'module.custom.inkopack.eis.eisreport16.view.EisReport16Search',
		'module.custom.inkopack.eis.eisreport16.view.EisReport16ListerMaster',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-eisreport16-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			'module-eisreport16-lister-master' : {
				itemdblclick : me.selectRecord		// 메뉴 선택시 이벤트
			},
			/*'module-eisreport16-lister-detail' : {
				itemdblclick : me.selectRecord		// 메뉴 선택시 이벤트
			},
			'module-eisreport16-lister-detail2' : {
				itemdblclick : me.selectRecord		// 메뉴 선택시 이벤트
			},
			'module-eisreport16-lister-detail3' : {
				itemdblclick : me.selectRecord		// 메뉴 선택시 이벤트
			},*/
			'module-eisreport16-layout #mainpanel'							: { tabchange : me.selectAction  },
			'module-eisreport16-search'										: {render     : me.selectAction  }
		});
		me.callParent(arguments);
	},

	pocket : {
		layout			: function  () { return Ext.ComponentQuery.query('module-eisreport16-layout')[0] },
		search			: function  () { return Ext.ComponentQuery.query('module-eisreport16-search')[0] },
		listermaster	: function  () { return Ext.ComponentQuery.query('module-eisreport16-lister-master')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster	= me.pocket.listermaster(),
			search			= me.pocket.search(),
			param			= search.getValues(),
			store			= listermaster.getStore()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();

		clearInterval(window.eisInterval);
		listermaster.select({
			callback:function(records, operation, success) {
				if (success) {
				} else {
				}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
		window.eisInterval = setInterval(function(){
			var	pageSize = store.pageSize,
				total    = store.getTotalCount(),
				currentPage = store.currentPage,
				totalPage = Math.ceil(total/pageSize);
			;
			if(currentPage==totalPage){
				listermaster.select({
					callback:function(records, operation, success) {
						if (success) {
						} else {
						}
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}) );
			}else{
				store.nextPage();
			}
		}, 30000);
	},

	// 엑셀
	exportAction : function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	}
});