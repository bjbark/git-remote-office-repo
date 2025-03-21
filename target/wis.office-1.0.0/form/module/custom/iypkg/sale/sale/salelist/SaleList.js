Ext.define('module.custom.iypkg.sale.sale.salelist.SaleList', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ProdPopup'
	],

	models:[
		'module.custom.iypkg.sale.sale.salelist.model.SaleList',
	],
	stores:[
		'module.custom.iypkg.sale.sale.salelist.store.SaleListLister',
		'module.custom.iypkg.sale.sale.salelist.store.SaleListLister2',
		'module.custom.iypkg.sale.sale.salelist.store.SaleListLister3',
		'module.custom.iypkg.sale.sale.salelist.store.SaleListLister4',
	],
	views : [
		'module.custom.iypkg.sale.sale.salelist.view.SaleListLayout',
		'module.custom.iypkg.sale.sale.salelist.view.SaleListSearch',
		/* 작업 */
		'module.custom.iypkg.sale.sale.salelist.view.SaleListWorkerSearch',
		'module.custom.iypkg.sale.sale.salelist.view.SaleListWorkerSearch2',
		'module.custom.iypkg.sale.sale.salelist.view.SaleListWorkerSearch3',
		'module.custom.iypkg.sale.sale.salelist.view.SaleListWorkerSearch4',
		'module.custom.iypkg.sale.sale.salelist.view.SaleListLister',
		'module.custom.iypkg.sale.sale.salelist.view.SaleListLister2',
		'module.custom.iypkg.sale.sale.salelist.view.SaleListLister3',
		'module.custom.iypkg.sale.sale.salelist.view.SaleListLister4',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-salelist-layout #mainpanel'										: { tabchange : me.selectAction   },
			'module-salelist-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-salelist-worker-lister  button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀1 */
			'module-salelist-worker-lister2 button[action=exportAction]'			: { click : me.exportAction2      }, /* 엑셀2 */
			'module-salelist-worker-lister3 button[action=exportAction]'			: { click : me.exportAction3      }, /* 엑셀3 */
			'module-salelist-worker-lister4 button[action=exportAction]'			: { click : me.exportAction4      }, /* 엑셀4 */
			'module-salelist-worker-search2 button[action=printAction]'				: { click : me.printAction        }, /* 매출현황 */
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-salelist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-salelist-search')[0] },
		workersearch : function () { return Ext.ComponentQuery.query('module-salelist-worker-search')[0] },
		workersearch2 : function () { return Ext.ComponentQuery.query('module-salelist-worker-search2')[0] },
		workersearch3 : function () { return Ext.ComponentQuery.query('module-salelist-worker-search3')[0] },
		workersearch4 : function () { return Ext.ComponentQuery.query('module-salelist-worker-search4')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-salelist-worker-lister')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-salelist-worker-lister2')[0] },
		lister3 : function () { return Ext.ComponentQuery.query('module-salelist-worker-lister3')[0] },
		lister4 : function () { return Ext.ComponentQuery.query('module-salelist-worker-lister4')[0] }
	},

	selectAction:function(callbackFn) {
		var me = this,
			lister1 = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			lister4 = me.pocket.lister4(),
			workersearch = me.pocket.workersearch(),
			workersearch2 = me.pocket.workersearch2(),
			workersearch3 = me.pocket.workersearch3(),
			workersearch4 = me.pocket.workersearch4(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			temp = '',
			master = undefined,
			param = workersearch.getValues(),
			param2 = workersearch2.getValues(),
			param3 = workersearch3.getValues(),
			param4 = workersearch4.getValues()
		;

		if(tindex==0 ){
			master = lister1;
			temp = 'query';
		}else{
			master = lister2;
			temp = 'entry';
		}

		if(tindex==0){
			if(param.ck1 == '1') { // 체크해서 tab hide show 처리
				lister1.down('[dataIndex=invc_date]').show();
				lister1.down('[dataIndex=ostt_qntt]').show();
				lister1.down('[dataIndex=rqod_date]').hide();
				lister1.down('[dataIndex=rqod_qntt]').hide();
				lister1.down('[dataIndex=sale_date]').hide();
				lister1.down('[dataIndex=sale_qntt]').hide();
			}else if(param.ck2 == '2') {
				lister1.down('[dataIndex=rqod_date]').show();
				lister1.down('[dataIndex=rqod_qntt]').show();
				lister1.down('[dataIndex=invc_date]').hide();
				lister1.down('[dataIndex=ostt_qntt]').hide();
				lister1.down('[dataIndex=sale_date]').hide();
				lister1.down('[dataIndex=sale_qntt]').hide();
			}else if(param.ck3 == '2') {
				lister1.down('[dataIndex=sale_date]').show();
				lister1.down('[dataIndex=sale_qntt]').show();
				lister1.down('[dataIndex=invc_date]').hide();
				lister1.down('[dataIndex=ostt_qntt]').hide();
				lister1.down('[dataIndex=rqod_date]').hide();
				lister1.down('[dataIndex=rqod_qntt]').hide();
			}
			lister1.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister1.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( me.pocket.workersearch().getValues()
						, me.pocket.search().getValues()
						, { stor_grp : _global.stor_grp}));
		}else if(tindex==1){
			if(param2.ck1 == '1') { // 체크해서 tab hide show 처리
				lister2.down('[dataIndex=invc_date]').show();
				lister2.down('[dataIndex=ostt_qntt]').show();
				lister2.down('[dataIndex=rqod_date]').hide();
				lister2.down('[dataIndex=rqod_qntt]').hide();
				lister2.down('[dataIndex=sale_date]').hide();
				lister2.down('[dataIndex=sale_qntt]').hide();
			}else if(param2.ck2 == '2') {
				lister2.down('[dataIndex=rqod_date]').show();
				lister2.down('[dataIndex=rqod_qntt]').show();
				lister2.down('[dataIndex=invc_date]').hide();
				lister2.down('[dataIndex=ostt_qntt]').hide();
				lister2.down('[dataIndex=sale_date]').hide();
				lister2.down('[dataIndex=sale_qntt]').hide();
			}else if(param2.ck3 == '2') {
				lister2.down('[dataIndex=sale_date]').show();
				lister2.down('[dataIndex=sale_qntt]').show();
				lister2.down('[dataIndex=invc_date]').hide();
				lister2.down('[dataIndex=ostt_qntt]').hide();
				lister2.down('[dataIndex=rqod_date]').hide();
				lister2.down('[dataIndex=rqod_qntt]').hide();
			}
			lister2.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( me.pocket.workersearch2().getValues()
						, me.pocket.search().getValues()
						, { stor_grp : _global.stor_grp }));
		} else if(tindex==2){
			if(param3.ck1 == '1') { // 체크해서 tab hide show 처리
				lister3.down('[dataIndex=invc_date]').show();
				lister3.down('[dataIndex=ostt_qntt]').show();
				lister3.down('[dataIndex=rqod_date]').hide();
				lister3.down('[dataIndex=rqod_qntt]').hide();
				lister3.down('[dataIndex=sale_date]').hide();
				lister3.down('[dataIndex=sale_qntt]').hide();
			}else if(param3.ck2 == '2') {
				lister3.down('[dataIndex=rqod_date]').show();
				lister3.down('[dataIndex=rqod_qntt]').show();
				lister3.down('[dataIndex=invc_date]').hide();
				lister3.down('[dataIndex=ostt_qntt]').hide();
				lister3.down('[dataIndex=sale_date]').hide();
				lister3.down('[dataIndex=sale_qntt]').hide();
			}else if(param3.ck3 == '2') {
				lister3.down('[dataIndex=sale_date]').show();
				lister3.down('[dataIndex=sale_qntt]').show();
				lister3.down('[dataIndex=invc_date]').hide();
				lister3.down('[dataIndex=ostt_qntt]').hide();
				lister3.down('[dataIndex=rqod_date]').hide();
				lister3.down('[dataIndex=rqod_qntt]').hide();
			}
			lister3.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister3.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( me.pocket.workersearch3().getValues()
						, me.pocket.search().getValues()
						, { stor_grp : _global.stor_grp}));
		} else if(tindex==3){
			if(param4.ck1 == '1') { // 체크해서 tab hide show 처리
				lister4.down('[dataIndex=invc_date]').show();
				lister4.down('[dataIndex=ostt_qntt]').show();
				lister4.down('[dataIndex=rqod_date]').hide();
				lister4.down('[dataIndex=rqod_qntt]').hide();
				lister4.down('[dataIndex=sale_date]').hide();
				lister4.down('[dataIndex=sale_qntt]').hide();
			}else if(param4.ck2 == '2') {
				lister4.down('[dataIndex=rqod_date]').show();
				lister4.down('[dataIndex=rqod_qntt]').show();
				lister4.down('[dataIndex=invc_date]').hide();
				lister4.down('[dataIndex=ostt_qntt]').hide();
				lister4.down('[dataIndex=sale_date]').hide();
				lister4.down('[dataIndex=sale_qntt]').hide();
			}else if(param4.ck3 == '2') {
				lister4.down('[dataIndex=sale_date]').show();
				lister4.down('[dataIndex=sale_qntt]').show();
				lister4.down('[dataIndex=invc_date]').hide();
				lister4.down('[dataIndex=ostt_qntt]').hide();
				lister4.down('[dataIndex=rqod_date]').hide();
				lister4.down('[dataIndex=rqod_qntt]').hide();
			}
			lister4.select({
				callback:function(records, operation, success) {
					if (success) {
						lister4.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge(me.pocket.workersearch4().getValues()
						, me.pocket.search().getValues()
						, { stor_grp : _global.stor_grp }));
		}
	},
	printAction:function(){
		var	me      = this,
			search  = me.pocket.workersearch2(),
			records = search.getValues()
		;
		var	msg   = '',
			jrf   = 'Liebe_daily_saleList.jrf',
			resId = _global.hq_id.toUpperCase(),
			chk   = ''
		;
		if(records.invc_date1==''){
			msg = '조회기간을 입력해주세요.';
		}else if(records.invc_date2==''){
			msg = '조회기간을 입력해주세요.';
		}else if(records.cstm_idcd==''){
			msg = '거래처를 선택해주세요.';
		}

		if(records.chk==''){
			chk = '[0]';
		}else{
			chk = records.chk;
		}
		if(msg != ''){
			Ext.Msg.alert('알림',msg);
			return;
		}
		var arg =	  'invc_date1~'+records.invc_date1+'~'
					+ 'invc_date2~'+records.invc_date2+'~'
					+ 'cstm_idcd~' +records.cstm_idcd +'~'
					+ 'chk~'       +chk+'~'
		;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800');
	},

	exportAction : function(button) {
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	},

	exportAction2 : function(button) {
		var value = button.button ;
		this.pocket.lister2().writer({enableLoadMask:true});
	},

	exportAction3 : function(button) {
		var value = button.button ;
		this.pocket.lister3().writer({enableLoadMask:true});
	},

	exportAction4 : function(button) {
		var value = button.button ;
		this.pocket.lister4().writer({enableLoadMask:true});
	}
});
